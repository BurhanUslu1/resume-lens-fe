import { Metadata } from "next";
import Link from "next/link";
import { Check, X, Zap, ShieldCheck, Lightbulb, GitCompare, History, HeadphonesIcon } from "lucide-react";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Can I cancel at any time?",
            acceptedAnswer: { "@type": "Answer", text: "Yes, absolutely. There are no long-term commitments. Cancel any time and you'll keep access until the end of your billing period." },
        },
        {
            "@type": "Question",
            name: "What happens when I hit the Free plan limits?",
            acceptedAnswer: { "@type": "Answer", text: "You'll see a prompt to upgrade. Your existing analyses and history remain safe — nothing is deleted." },
        },
        {
            "@type": "Question",
            name: "Is my CV data kept private?",
            acceptedAnswer: { "@type": "Answer", text: "Yes. Your CV is only used to run the analysis you request and is never shared with third parties or used to train AI models." },
        },
        {
            "@type": "Question",
            name: "Do you offer refunds?",
            acceptedAnswer: { "@type": "Answer", text: "If you're not happy within the first 7 days of a Pro subscription, contact us and we'll refund you, no questions asked." },
        },
        {
            "@type": "Question",
            name: "Will there be team or enterprise plans?",
            acceptedAnswer: { "@type": "Answer", text: "We're focused on individual job seekers for now. If you're interested in a team plan, drop us a message and we'll be in touch." },
        },
    ],
};

export const metadata: Metadata = {
    title: "Pricing — ResumeLens | Free & Pro CV Matching Plans",
    description: "ResumeLens is free to get started. Upgrade to Pro for unlimited CV analyses, detailed improvement tips, multi-job comparison, and priority support.",
    openGraph: {
        title: "Pricing — ResumeLens | Free & Pro CV Matching Plans",
        description: "Get started free. Upgrade to Pro for unlimited analyses, improvement tips, and multi-job comparison.",
        url: "https://resumelens.ai/pricing",
        siteName: "ResumeLens",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing — ResumeLens | Free & Pro Plans",
        description: "Get started free. Upgrade to Pro for unlimited CV analyses and deeper insights.",
    },
    alternates: {
        canonical: "https://resumelens.ai/pricing",
    },
};

const freePlanFeatures = [
    { text: "3 CV analyses per month", included: true },
    { text: "Basic improvement tips (3 per analysis)", included: true },
    { text: "Analysis history (last 3 results)", included: true },
    { text: "Match score & key strengths", included: true },
    { text: "Compare Jobs (up to 5 listings)", included: false },
    { text: "Full improvement tips & keywords", included: false },
    { text: "Unlimited analysis history", included: false },
    { text: "Priority support", included: false },
];

const proPlanFeatures = [
    { text: "Unlimited CV analyses", included: true },
    { text: "Full improvement tips & keyword suggestions", included: true },
    { text: "Complete analysis history", included: true },
    { text: "Match score & key strengths", included: true },
    { text: "Compare Jobs (up to 5 listings)", included: true },
    { text: "Detailed gap analysis & recommendations", included: true },
    { text: "Export results (coming soon)", included: true },
    { text: "Priority support", included: true },
];

const faqs = [
    {
        question: "Can I cancel at any time?",
        answer: "Yes, absolutely. There are no long-term commitments. Cancel any time and you'll keep access until the end of your billing period.",
    },
    {
        question: "What happens when I hit the Free plan limits?",
        answer: "You'll see a prompt to upgrade. Your existing analyses and history remain safe — nothing is deleted.",
    },
    {
        question: "Is my CV data kept private?",
        answer: "Yes. Your CV is only used to run the analysis you request and is never shared with third parties or used to train AI models.",
    },
    {
        question: "Do you offer refunds?",
        answer: "If you're not happy within the first 7 days of a Pro subscription, contact us and we'll refund you, no questions asked.",
    },
    {
        question: "Will there be team or enterprise plans?",
        answer: "We're focused on individual job seekers for now. If you're interested in a team plan, drop us a message and we'll be in touch.",
    },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {/* Hero */}
            <section className="bg-indigo-600 pt-24 pb-20 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-xl text-indigo-100">
                        Start for free. Upgrade when you need more power.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Free Plan */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col h-full">
                        <div className="mb-6">
                            <span className="inline-block text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4">Free</span>
                            <div className="flex items-end gap-1">
                                <span className="text-5xl font-bold text-gray-900">£0</span>
                                <span className="text-gray-500 mb-2">/month</span>
                            </div>
                            <p className="text-gray-600 mt-2">Perfect for trying out the tool and running a few analyses.</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {freePlanFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {feature.included ? (
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                        {feature.text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/register"
                            className="block w-full text-center py-3 px-6 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
                        >
                            Get started free
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-indigo-600 rounded-2xl shadow-xl p-8 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-4 right-4">
                            <span className="inline-block text-xs font-bold text-indigo-600 bg-yellow-400 px-3 py-1 rounded-full">
                                Most Popular
                            </span>
                        </div>

                        <div className="mb-6">
                            <span className="inline-block text-sm font-semibold text-indigo-200 bg-indigo-500 px-3 py-1 rounded-full mb-4">Pro</span>
                            <div className="flex items-end gap-1">
                                <span className="text-5xl font-bold text-white">£9.99</span>
                                <span className="text-indigo-200 mb-2">/month</span>
                            </div>
                            <p className="text-indigo-100 mt-2">Everything you need to land your next role, without limits.</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {proPlanFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-indigo-100">{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            disabled
                            className="w-full py-3 px-6 rounded-xl bg-yellow-400 text-indigo-900 font-semibold cursor-not-allowed opacity-80"
                        >
                            Coming soon — join the waitlist ↓
                        </button>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { icon: <ShieldCheck className="h-6 w-6 text-indigo-600 mx-auto mb-2" />, label: "No card required on Free" },
                        { icon: <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />, label: "Instant results" },
                        { icon: <Lightbulb className="h-6 w-6 text-indigo-600 mx-auto mb-2" />, label: "AI-powered insights" },
                        { icon: <HeadphonesIcon className="h-6 w-6 text-indigo-600 mx-auto mb-2" />, label: "7-day money-back guarantee" },
                    ].map((badge, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            {badge.icon}
                            <p className="text-sm text-gray-600 font-medium">{badge.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Waitlist / CTA */}
            <section className="bg-white border-t border-gray-200 py-16">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Interested in Pro?</h2>
                    <p className="text-gray-600 mb-6">
                        Pro is in active development. Leave your email and we'll notify you the moment it launches — early users get a discounted rate.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Join the waitlist
                    </Link>
                </div>
            </section>

            {/* Feature comparison callout */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What's inside Pro?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <GitCompare className="h-7 w-7 text-purple-600" />,
                            bg: "bg-purple-50",
                            title: "Compare Jobs",
                            desc: "Upload your CV once and rank up to 5 job descriptions. Find which role fits you best before spending time on a cover letter.",
                        },
                        {
                            icon: <Lightbulb className="h-7 w-7 text-yellow-500" />,
                            bg: "bg-yellow-50",
                            title: "Full Improvement Tips",
                            desc: "Get every tailored suggestion — rewrite recommendations, priority-coded tips, and a curated list of missing keywords.",
                        },
                        {
                            icon: <History className="h-7 w-7 text-indigo-600" />,
                            bg: "bg-indigo-50",
                            title: "Unlimited History",
                            desc: "Every analysis you've ever run, saved and searchable. Track how your CV improves across multiple job applications over time.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className={`h-12 w-12 ${item.bg} rounded-lg flex items-center justify-center mb-4`}>
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white border-t border-gray-100 py-16">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently asked questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-indigo-600 py-14 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-3">Ready to match smarter?</h2>
                    <p className="text-indigo-100 mb-8">Start free today. No credit card required.</p>
                    <Link
                        href="/register"
                        className="inline-block bg-yellow-400 text-indigo-900 px-10 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition"
                    >
                        Create your free account
                    </Link>
                </div>
            </section>
        </div>
    );
}
