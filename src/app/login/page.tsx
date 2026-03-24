'use client'

import { setAuthCookies } from "@/actions/auth";
import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { login } from "@/services/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as validator from "zod";

const schema = validator.object({
    email: validator.string().email("Invalid email address"),
    password: validator.string().min(1, "Password is required"),
});

type FormData = validator.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-sm text-red-500 mt-1">{message}</p>;
}

function LoginContent() {
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setMounted(true);
        if (searchParams.get('registered')) {
            toast.success('Registration successful! Please sign in.');
        }
    }, [searchParams]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);

        try {
            const response = await login(data);

            if (response.success && response.data) {
                const { accessToken, user, idToken } = response.data;

                try {
                    await setAuthCookies(accessToken, { userEmail: user.userEmail, userName: user.userName }, idToken);
                    toast.success('Signed in successfully!');
                    router.replace('/dashboard');
                } catch (error) {
                    toast.error('Failed to complete login. Please try again.');
                    console.error('Cookie setting error:', error);
                }
            } else {
                if (Array.isArray(response.errors)) {
                    response.errors.forEach((err) => toast.error(err));
                } else {
                    toast.error(response.errors ?? 'Sign in failed. Please try again.');
                }
            }
        } catch (_error) {
            toast.error("An unexpected error occurred during login");
        } finally {
            setSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Hero Section */}
            <section className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative flex flex-col justify-center items-center px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-md">
                        Sign in to continue matching your resume with your dream job
                    </p>
                </div>
            </section>

            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
                        <CardContent className="p-8">
                            {/* Mobile Hero Section */}
                            <div className="lg:hidden text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-600">
                                    Sign in to continue matching your resume with your dream job
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <Input
                                        type="email"
                                        className={`w-full ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        {...register("email")}
                                        placeholder="you@example.com"
                                    />
                                    <FieldError message={errors.email?.message} />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                                            {...register("password")}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <FieldError message={errors.password?.message} />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="animate-spin mr-2" />
                                            Signing in...
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Sign up
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginContent />
        </Suspense>
    );
}