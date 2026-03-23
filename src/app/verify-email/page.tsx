'use client'

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-indigo-100 rounded-full p-5">
                        <MailCheck className="h-12 w-12 text-indigo-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Check your inbox
                </h1>

                <p className="text-gray-500 mb-2">
                    We've sent a verification link to
                </p>
                {email && (
                    <p className="text-indigo-600 font-semibold mb-6">
                        {email}
                    </p>
                )}

                <p className="text-gray-500 text-sm mb-8">
                    Click the link in the email to activate your account. The link expires in 24 hours.
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-500 mb-1">
                        Didn't receive an email?
                    </p>
                    <p className="text-sm text-gray-400">
                        Check your spam folder, or{" "}
                        <Link href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            try registering again
                        </Link>
                        .
                    </p>
                </div>

                <div className="mt-6">
                    <Link
                        href="/login"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Already verified? <span className="text-indigo-600 font-medium">Sign in</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense>
            <VerifyEmailContent />
        </Suspense>
    );
}
