import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service — ResumeLens",
    description: "Read ResumeLens's terms of service. Understand your rights and responsibilities when using our AI-powered CV matching platform.",
    openGraph: {
        title: "Terms of Service — ResumeLens",
        description: "Understand your rights and responsibilities when using ResumeLens.",
        url: "https://resumelens.ai/terms",
        siteName: "ResumeLens",
        type: "website",
    },
    alternates: {
        canonical: "https://resumelens.ai/terms",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsOfService() {
    const lastUpdated = "21 March 2026";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-indigo-600 pt-24 pb-12 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
                    <p className="text-indigo-200 text-sm">Last updated: {lastUpdated}</p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-10 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern your use of ResumeLens (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
                            accessible at <strong>resumelens.ai</strong>. By creating an account or using our service,
                            you agree to be bound by these Terms. If you do not agree, please do not use ResumeLens.
                        </p>
                        <p className="mt-3">
                            ResumeLens is operated as a sole trader / independent business. These Terms are governed
                            by the laws of England and Wales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. The service</h2>
                        <p>
                            ResumeLens provides an AI-powered CV analysis tool that allows users to:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li>Upload a CV and receive a match score against a job description</li>
                            <li>Receive AI-generated improvement tips and keyword suggestions</li>
                            <li>Compare their CV against multiple job listings</li>
                            <li>Review their analysis history</li>
                        </ul>
                        <p className="mt-3">
                            We reserve the right to modify, suspend, or discontinue any part of the service at any time,
                            with reasonable notice where possible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account registration</h2>
                        <p>
                            To access most features you must create an account. You agree to:
                        </p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li>Provide accurate and complete information during registration</li>
                            <li>Keep your login credentials confidential</li>
                            <li>Notify us immediately if you suspect unauthorised access to your account</li>
                            <li>Be responsible for all activity that occurs under your account</li>
                        </ul>
                        <p className="mt-3">
                            You must be at least 16 years old to create an account and use ResumeLens.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable use</h2>
                        <p>You agree not to use ResumeLens to:</p>
                        <ul className="mt-3 space-y-2 list-disc list-inside text-gray-600">
                            <li>Upload files containing malware, viruses, or harmful code</li>
                            <li>Upload content that is illegal, defamatory, or infringes third-party rights</li>
                            <li>Attempt to reverse-engineer, scrape, or extract data from the service by automated means</li>
                            <li>Impersonate another person or misrepresent your identity</li>
                            <li>Use the service for any unlawful purpose</li>
                            <li>Interfere with or disrupt the service or its infrastructure</li>
                        </ul>
                        <p className="mt-3">
                            We reserve the right to suspend or terminate accounts that violate these rules without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Free and paid plans</h2>
                        <p>
                            ResumeLens offers a free tier with limited usage and a paid Pro subscription. The features
                            available under each plan are described on our{" "}
                            <Link href="/pricing" className="text-indigo-600 hover:underline">Pricing page</Link>.
                        </p>
                        <p className="mt-3">
                            We reserve the right to change pricing at any time. Existing subscribers will be given at
                            least 30 days&apos; notice before any price increase takes effect. You may cancel your subscription
                            at any time; access continues until the end of your current billing period.
                        </p>
                        <p className="mt-3">
                            Pro subscriptions are billed monthly. We offer a 7-day money-back guarantee for new Pro
                            subscribers — contact us within 7 days of your first payment if you are not satisfied.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your content</h2>
                        <p>
                            You retain full ownership of any CV files, job descriptions, or other content you upload
                            to ResumeLens. By uploading content, you grant us a limited, non-exclusive licence to
                            process that content solely for the purpose of providing the service to you.
                        </p>
                        <p className="mt-3">
                            We do not use your content to train AI models. Your uploaded content is not shared with
                            other users and is not used for any purpose beyond operating the service.
                        </p>
                        <p className="mt-3">
                            You are responsible for ensuring that any content you upload does not infringe the rights
                            of third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">7. AI-generated content</h2>
                        <p>
                            The analysis, match scores, improvement tips, and other outputs generated by ResumeLens are
                            produced by AI and are provided for informational purposes only. They do not constitute
                            professional career, legal, or recruitment advice.
                        </p>
                        <p className="mt-3">
                            AI outputs may contain errors or inaccuracies. We make no guarantee that following the
                            suggestions provided will result in a successful job application or employment outcome.
                            You are responsible for reviewing and verifying any AI-generated content before acting on it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">8. Intellectual property</h2>
                        <p>
                            All content, branding, software, and technology that makes up ResumeLens — including its
                            name, logo, design, and code — is owned by or licenced to us. You may not copy, reproduce,
                            modify, or distribute any part of the service without our written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">9. Disclaimers and limitation of liability</h2>
                        <p>
                            ResumeLens is provided &quot;as is&quot; and &quot;as available&quot;. We do not warrant that the service
                            will be uninterrupted, error-free, or that results will meet your expectations.
                        </p>
                        <p className="mt-3">
                            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental,
                            special, or consequential damages arising from your use of the service, including but not
                            limited to loss of employment opportunity, loss of data, or loss of revenue.
                        </p>
                        <p className="mt-3">
                            Our total liability to you for any claim arising from use of the service shall not exceed
                            the amount you paid us in the 3 months preceding the claim.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">10. Termination</h2>
                        <p>
                            You may delete your account at any time by contacting us. We may suspend or terminate your
                            account if you breach these Terms, with or without notice depending on the severity of the breach.
                        </p>
                        <p className="mt-3">
                            Upon termination, your right to use the service ceases immediately. We will delete your
                            personal data in accordance with our{" "}
                            <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to these Terms</h2>
                        <p>
                            We may update these Terms from time to time. We will notify you of material changes by
                            email or by displaying a prominent notice in the app at least 14 days before the changes
                            take effect. Continued use of the service after changes take effect constitutes acceptance
                            of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">12. Governing law</h2>
                        <p>
                            These Terms are governed by the laws of England and Wales. Any disputes arising from these
                            Terms or your use of ResumeLens shall be subject to the exclusive jurisdiction of the courts
                            of England and Wales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">13. Contact</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:{" "}
                            <a href="mailto:legal@resumelens.ai" className="text-indigo-600 hover:underline">
                                legal@resumelens.ai
                            </a>
                        </p>
                    </section>

                    <div className="border-t border-gray-100 pt-8 text-sm text-gray-500">
                        <p>
                            <strong>ResumeLens</strong> · resumelens.ai ·{" "}
                            <a href="mailto:legal@resumelens.ai" className="text-indigo-600 hover:underline">
                                legal@resumelens.ai
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
