import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy — ResumeLens",
    description: "Read ResumeLens's privacy policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR.",
    openGraph: {
        title: "Privacy Policy — ResumeLens",
        description: "Learn how ResumeLens collects, uses, and protects your personal data in compliance with UK GDPR.",
        url: "https://resumelens.ai/privacy",
        siteName: "ResumeLens",
        type: "website",
    },
    alternates: {
        canonical: "https://resumelens.ai/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicy() {
    const lastUpdated = "21 March 2026";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-indigo-600 pt-24 pb-12 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
                    <p className="text-indigo-200 text-sm">Last updated: {lastUpdated}</p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
                        <p>
                            ResumeLens (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website <strong>resumelens.ai</strong> and provides
                            an AI-powered CV analysis and job matching service. We are committed to protecting your personal
                            data and handling it responsibly in accordance with UK data protection law (UK GDPR and the Data
                            Protection Act 2018).
                        </p>
                        <p className="mt-3">
                            If you have any questions about this policy, contact us at:{" "}
                            <a href="mailto:privacy@resumelens.ai" className="text-indigo-600 hover:underline">
                                privacy@resumelens.ai
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. What data we collect</h2>
                        <p>We collect the following categories of personal data:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li><strong>Account data</strong> — your name, email address, and encrypted password when you register.</li>
                            <li><strong>CV / resume files</strong> — PDF files you upload for analysis. These are processed temporarily and stored securely in Azure Blob Storage.</li>
                            <li><strong>Job descriptions</strong> — text you paste into the tool for matching purposes.</li>
                            <li><strong>Analysis results</strong> — match scores, improvement tips, and comparison results associated with your account.</li>
                            <li><strong>Usage data</strong> — pages visited, features used, and timestamps, collected to improve the service.</li>
                            <li><strong>Technical data</strong> — IP address, browser type, and device information collected automatically.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. How we use your data</h2>
                        <p>We use your data for the following purposes:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li>To provide and operate the ResumeLens service</li>
                            <li>To analyse your CV against job descriptions using AI</li>
                            <li>To store and display your analysis history</li>
                            <li>To manage your account and authenticate your identity</li>
                            <li>To send you service-related communications (account confirmations, password resets)</li>
                            <li>To improve and develop the service based on usage patterns</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                        <p className="mt-3">
                            We do <strong>not</strong> use your CV data to train AI models. Your documents are used solely
                            to generate the analysis you request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Legal basis for processing</h2>
                        <p>Under UK GDPR, we process your data under the following legal bases:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li><strong>Contract performance</strong> — to deliver the service you signed up for</li>
                            <li><strong>Legitimate interests</strong> — to improve the service, prevent fraud, and ensure security</li>
                            <li><strong>Legal obligation</strong> — where we are required to process data by law</li>
                            <li><strong>Consent</strong> — for any optional communications such as marketing emails</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third parties we share data with</h2>
                        <p>We share your data only with the following trusted third-party services, which are necessary to operate ResumeLens:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li><strong>OpenAI</strong> — CV and job description text is sent to OpenAI&apos;s API to generate analysis results. OpenAI processes this data under their API data usage policy and does not use API inputs to train their models by default.</li>
                            <li><strong>Microsoft Azure</strong> — your data is stored securely in Azure Storage (UK region). Azure is certified under ISO 27001 and complies with UK GDPR.</li>
                            <li><strong>Auth0 (Okta)</strong> — manages account authentication and stores your login credentials securely.</li>
                        </ul>
                        <p className="mt-3">We do not sell your data to any third party. Ever.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data retention</h2>
                        <p>
                            We retain your account and analysis data for as long as your account is active. If you delete
                            your account, we will delete your personal data within 30 days, except where we are required
                            to retain it for legal or accounting purposes.
                        </p>
                        <p className="mt-3">
                            Uploaded CV files are stored in Azure Blob Storage and are retained for the duration of your
                            account. You may request deletion at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your rights</h2>
                        <p>Under UK GDPR, you have the following rights:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li><strong>Right of access</strong> — to request a copy of the data we hold about you</li>
                            <li><strong>Right to rectification</strong> — to correct inaccurate or incomplete data</li>
                            <li><strong>Right to erasure</strong> — to request deletion of your data (&quot;right to be forgotten&quot;)</li>
                            <li><strong>Right to restrict processing</strong> — to limit how we use your data</li>
                            <li><strong>Right to data portability</strong> — to receive your data in a structured, machine-readable format</li>
                            <li><strong>Right to object</strong> — to object to processing based on legitimate interests</li>
                            <li><strong>Right to withdraw consent</strong> — where processing is based on consent</li>
                        </ul>
                        <p className="mt-3">
                            To exercise any of these rights, contact us at{" "}
                            <a href="mailto:privacy@resumelens.ai" className="text-indigo-600 hover:underline">
                                privacy@resumelens.ai
                            </a>
                            . We will respond within 30 days. You also have the right to lodge a complaint with the
                            Information Commissioner&apos;s Office (ICO) at{" "}
                            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                ico.org.uk
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
                        <p>
                            We use essential cookies only — these are required for authentication and session management.
                            We do not use advertising or tracking cookies. No cookie consent banner is required for
                            essential cookies under UK law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">9. Security</h2>
                        <p>
                            We take security seriously. All data is transmitted over HTTPS. Passwords are hashed and
                            never stored in plain text. CV files are stored in private Azure Blob containers with no
                            public access. We conduct regular security reviews of our infrastructure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to this policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. When we do, we will update the
                            &quot;last updated&quot; date at the top of this page. For significant changes, we will notify
                            you by email. Continued use of ResumeLens after changes are posted constitutes your
                            acceptance of the updated policy.
                        </p>
                    </section>

                    <div className="border-t border-gray-100 pt-8 text-sm text-gray-500">
                        <p>
                            <strong>ResumeLens</strong> · resumelens.ai ·{" "}
                            <a href="mailto:privacy@resumelens.ai" className="text-indigo-600 hover:underline">
                                privacy@resumelens.ai
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
