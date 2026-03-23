"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
                    <div>
                        <h3 className="text-xl font-bold mb-3">Resume<span className="text-yellow-400">Lens</span></h3>
                        <p className="text-gray-300 text-sm">
                            AI-powered CV matching and improvement tool. See your CV through the lens of every job you want.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
                            <li><Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <p className="text-gray-400 text-sm text-center pt-6">&copy; {new Date().getFullYear()} ResumeLens. All rights reserved.</p>
            </div>
        </footer>
    );
} 