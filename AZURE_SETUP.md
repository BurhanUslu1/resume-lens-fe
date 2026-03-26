# Azure Container Apps Setup Guide

One-time setup to provision the Azure resources and GitHub secrets needed for the CI/CD pipeline.

**Already done ✅**
- Azure subscription
- Resource group: `resumelens-dev-rg`

---

## Prerequisites

- Azure CLI installed: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
- Contributor access on `resumelens-dev-rg`

---

## Step 1 — Login and confirm your subscription

```bash
az login

# Confirm the correct subscription is active
az account show --output table

# If not correct, switch to it
az account set --subscription "1e2f5744-a118-4295-8aa5-f853e93a34a4"
```

---

## Step 2 — Create Azure Container Registry (ACR)

```bash
az acr create \
  --resource-group resumelens-dev-rg \
  --name resumelensacr \
  --sku Basic
```

> `resumelensacr` must be globally unique across Azure — change it if the name is taken.
> Your registry URL will be: `resumelensacr.azurecr.io`

---

## Step 3 — Create a Container Apps Environment

```bash
az containerapp env create \
  --name cae-resumelens \
  --resource-group resumelens-dev-rg \
  --location uksouth
```

> Change `uksouth` to match your resource group's region (e.g. `westeurope`, `eastus`).

---

## Step 4 — Create the Container App

Run this once to bootstrap the app. All future deployments are handled by GitHub Actions.

```bash
az containerapp create \
  --name ca-resumelens-fe \
  --resource-group resumelens-dev-rg \
  --environment cae-resumelens \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 3000 \
  --ingress external \
  --registry-server resumelensacr.azurecr.io \
  --min-replicas 0 \
  --max-replicas 3 \
  --cpu 0.5 \
  --memory 1Gi
```

> The placeholder image is replaced on the first GitHub Actions deployment.

---

## Step 5 — Grant the Container App permission to pull from ACR

```bash
# Get the Container App's managed identity
PRINCIPAL_ID=$(az containerapp show \
  --name ca-resumelens-fe \
  --resource-group resumelens-dev-rg \
  --query "identity.principalId" \
  --output tsv)

# Get the ACR resource ID
ACR_ID=$(az acr show \
  --name resumelensacr \
  --resource-group resumelens-dev-rg \
  --query "id" \
  --output tsv)

# Assign AcrPull role to the Container App identity
az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role AcrPull \
  --scope $ACR_ID
```

---

## Step 6 — Set up GitHub Actions OIDC authentication

OIDC lets GitHub Actions authenticate with Azure **without storing a client secret**.

### 6a — Create a Service Principal

```bash
SUBSCRIPTION_ID=$(az account show --query id --output tsv)

az ad sp create-for-rbac \
  --name "resumelens-github-actions" \
  --role contributor \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/resumelens-dev-rg \
  --output json
```

Save the output — you'll need `clientId`, `tenantId`, and `subscriptionId`.

### 6b — Add federated credentials (OIDC)

```bash
APP_ID="1e2f5744-a118-4295-8aa5-f853e93a34a4"

az ad app federated-credential create \
  --id $APP_ID \
  --parameters '{
    "name": "resumelens-fe-dev-push",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:BurhanUslu1/resume-lens-fe:ref:refs/heads/dev",
    "audiences": ["api://AzureADTokenExchange"]
  }'
```

> Replace `<YOUR_GITHUB_ORG>/<YOUR_REPO_NAME>` with your actual repo path,
> e.g. `bifrostech/resume-lens-fe`

### 6c — Grant ACR push permission to the service principal

```bash
ACR_ID=$(az acr show \
  --name resumelensacr \
  --resource-group resumelens-dev-rg \
  --query "id" \
  --output tsv)

az role assignment create \
  --assignee $APP_ID \
  --role AcrPush \
  --scope $ACR_ID
```

---

## Step 7 — Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret Name             | Value                                          |
|-------------------------|------------------------------------------------|
| `AZURE_CLIENT_ID`       | `clientId` from Step 6a output                 |
| `AZURE_TENANT_ID`       | `tenantId` from Step 6a output                 |
| `AZURE_SUBSCRIPTION_ID` | `subscriptionId` from Step 6a output           |
| `NEXT_PUBLIC_API_URL`   | Your Azure Functions base URL                  |

---

## Step 8 — Confirm workflow env vars match your resource names

Open `.github/workflows/azure-container-apps.yml` and verify the `env:` block at the top:

```yaml
env:
  ACR_NAME: resumelensacr            # Must match Step 2
  RESOURCE_GROUP: resumelens-dev-rg  # Your existing resource group
  CONTAINER_APP_NAME: ca-resumelens-fe    # Must match Step 4
  CONTAINER_APP_ENV: cae-resumelens       # Must match Step 3
  IMAGE_NAME: resumelens-fe
```

---

## Done!

Push to the `dev` branch and the pipeline will:
1. Lint the code
2. Build the Docker image and push it to ACR
3. Deploy the new image to Azure Container Apps

The deployment job prints the live URL at the end.

---

## Estimated Monthly Cost

| Resource                 | Tier        | Est. Cost                          |
|--------------------------|-------------|------------------------------------|
| Azure Container Registry | Basic        | ~£4/month                         |
| Azure Container Apps     | Consumption  | ~£0–15/month (scales to 0 at idle) |
| **Total**                |              | **~£4–20/month**                   |
