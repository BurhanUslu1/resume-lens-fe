"use client";

import Button from "@/components/Ui/base/button";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Header() {
    const { user, logout } = useUser();

    return (
        <>
            {/* Spacer to prevent content jump when header becomes fixed */}
            <div className="h-16"></div>

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-indigo-600/95 backdrop-blur-sm z-50 shadow-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-white tracking-tight">
                        Resume<span className="text-yellow-400">Lens</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        {!user && <Link href="/login" className="text-white hover:text-yellow-400 transition">Login</Link>}
                        <Link href="/about" className="text-white hover:text-yellow-400 transition">About</Link>
                        {user
                            ? <Link href="/dashboard" className="text-white hover:text-yellow-400 transition">Dashboard</Link>
                            : <Link href="/pricing" className="text-white hover:text-yellow-400 transition">Pricing</Link>
                        }
                        <Link href="/contact" className="text-white hover:text-yellow-400 transition">Contact</Link>
                    </nav>

                    {/* Auth Buttons */}
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/profile" className="text-white hover:text-yellow-300 transition">Welcome, {user.userName}</Link>
                            <Button
                                onClick={logout}
                                className="bg-yellow-400 text-black hover:bg-yellow-500 transition"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/register">
                            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                                Get Started Free
                            </button>
                        </Link>
                    )}
                </div>
            </header>
        </>
    );
} 