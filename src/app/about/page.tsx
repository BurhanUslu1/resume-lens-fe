import { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, GitCompare, History, Lightbulb, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "About ResumeLens — How AI-Powered CV Matching Works",
    description: "Learn how ResumeLens uses advanced AI to match your CV against job descriptions, score your fit, and give you actionable improvement tips to land more interviews.",
    openGraph: {
        title: "About ResumeLens — How AI-Powered CV Matching Works",
        description: "Learn how ResumeLens uses advanced AI to match your CV against job descriptions, score your fit, and give you actionable improvement tips.",
        url: "https://resumelens.ai/about",
        siteName: "ResumeLens",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About ResumeLens — How AI-Powered CV Matching Works",
        description: "Learn how ResumeLens uses advanced AI to match your CV against job descriptions and give you actionable improvement tips.",
    },
    alternates: {
        canonical: "https://resumelens.ai/about",
    },
};

const features = [
    {
        icon: <Zap className="h-6 w-6 text-indigo-600" />,
        title: "Instant Match Score",
        description: "Upload your CV and paste a job description. Our AI calculates a similarity score in seconds using state-of-the-art embeddings.",
    },
    {
        icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
        title: "Actionable Improvement Tips",
        description: "Don't just see a score — understand exactly what to rewrite. Get prioritised, specific advice tied to real phrases in the job posting.",
    },
    {
        icon: <GitCompare className="h-6 w-6 text-purple-500" />,
        title: "Compare Multiple Jobs",
        description: "Upload your CV once and compare up to 5 job descriptions side by side. Find out which role is the best fit before you apply.",
    },
    {
        icon: <History className="h-6 w-6 text-indigo-600" />,
        title: "Analysis History",
        description: "Every analysis is saved to your account. Review past results, track your progress, and see how your CV improves over time.",
    },
    {
        icon: <BrainCircuit className="h-6 w-6 text-indigo-600" />,
        title: "Powered by AI",
        description: "We use advanced large language models for deep language understanding — not just keyword matching, but genuine semantic similarity.",
    },
    {
        icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
        title: "Secure & Private",
        description: "Your CV is processed securely. We never share your data with employers or third parties. You own your information.",
    },
];

const steps = [
    { number: "01", title: "Upload your CV", description: "Select your PDF resume — we'll extract and analyse the text automatically." },
    { number: "02", title: "Paste the job description", description: "Copy the full job posting from any job board and paste it in." },
    { number: "03", title: "Get your score", description: "Receive an instant match score, strengths, weaknesses, and improvement tips." },
    { number: "04", title: "Improve and reapply", description: "Use the specific suggestions to refine your CV and climb the score." },
];

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to match your CV to a job description with ResumeLens",
    description: "Use ResumeLens to upload your CV, paste a job description, get an AI match score, and receive improvement tips.",
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Upload your CV",
            text: "Upload your resume as a PDF. ResumeLens extracts the text and prepares it for analysis.",
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Paste the job description",
            text: "Copy and paste the job description you want to apply for.",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Get your match score",
            text: "Our AI compares your CV against the job description and gives you a match score out of 100.",
        },
        {
            "@type": "HowToStep",
            position: 4,
            name: "Improve and reapply",
            text: "Follow the tailored improvement tips to strengthen your CV and improve your match score.",
        },
    ],
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            {/* Hero */}
            <section className="bg-indigo-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Built to help you land the job
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                        AI Resume Matcher uses artificial intelligence to tell you exactly how well your CV matches a job description — and more importantly, how to close the gap.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-center"
                        >
                            Get started free
                        </Link>
                        <Link
                            href="/"
                            className="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition text-center"
                        >
                            Try without signing up
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why it exists */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Why we built this</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        Most job applications never get seen by a human. Applicant Tracking Systems (ATS) automatically filter CVs before a recruiter even opens them — often rejecting strong candidates simply because the wording doesn&apos;t match the job description closely enough.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        AI Resume Matcher was built to level the playing field. We give every job seeker the same insight that professional CV writers charge hundreds of pounds for — instantly, and for free.
                    </p>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How it works</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div key={step.number} className="text-center">
                                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 text-indigo-700 text-xl font-bold mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Everything you need</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="h-11 w-11 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 bg-indigo-600 text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to improve your CV?</h2>
                    <p className="text-indigo-100 mb-8">
                        Join thousands of job seekers getting smarter about their applications. Free to start, no credit card required.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                    >
                        Create your free account
                    </Link>
                </div>
            </section>

        </div>
    );
}
