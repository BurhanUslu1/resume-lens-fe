'use client'

import React from "react";
import { Clock, Mail, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api';
            const response = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    email: form.email,
                    subject: form.subject,
                    message: form.message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
            } else {
                toast.error(data?.errors ?? 'Failed to send message. Please try again.');
            }
        } catch {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="bg-indigo-600 text-white py-16 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
                <p className="text-indigo-100 text-lg max-w-xl mx-auto">
                    Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
                </p>
            </section>

            <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

                {/* Contact form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center text-center py-8">
                            <div className="bg-green-100 rounded-full p-4 mb-4">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h2>
                            <p className="text-gray-500 text-sm">
                                Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            required
                                            placeholder="First name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Last name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help?"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Tell us more..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Info panel */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Other ways to reach us</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            We&apos;re a small team and we read every message. You can also reach us directly by email.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Mail className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Email us</p>
                                <a
                                    href="mailto:hello@resumelens.ai"
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    hello@resumelens.ai
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Clock className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Response time</p>
                                <p className="text-sm text-gray-500">We usually reply within 24 hours on business days.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Feedback</p>
                                <p className="text-sm text-gray-500">Feature requests and bug reports are always welcome.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
