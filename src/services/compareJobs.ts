import API_BASE_URL from "@/config/api";
import { BaseResponse, CompareJobsResponseData } from "@/types/responses";
import { apiClient } from "@/utils/apiClient";

export async function compareJobs(
    file: File,
    jobDescriptions: string[],
    accessToken: string,
    userToken: string
): Promise<BaseResponse<CompareJobsResponseData>> {
    if (!accessToken) {
        throw new Error('No access token found. Please login again.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescriptions', JSON.stringify(jobDescriptions));

    const response = await apiClient(`${API_BASE_URL}/compare-jobs`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': `userToken ${userToken}`,
        },
        body: formData,
    });

    return response.json();
}
