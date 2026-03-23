'use client'

import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { register } from "@/services/auth";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as validator from "zod";

const schema = validator.object({
    name: validator.string().min(2, "Name must be at least 2 characters"),
    surname: validator.string().min(2, "Surname must be at least 2 characters"),
    email: validator.string().email("Invalid email address"),
    password: validator
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: validator.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormData = validator.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-sm text-red-500 mt-1">{message}</p>;
}

export default function RegisterPage() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const password = watch("password") ?? "";

    // Password strength indicator
    const strengthChecks = [
        { label: "8+ characters", pass: password.length >= 8 },
        { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
        { label: "Number", pass: /[0-9]/.test(password) },
        { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
    ];
    const strengthScore = strengthChecks.filter(c => c.pass).length;
    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
    const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"][strengthScore];

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        try {
            // Don't send confirmPassword to the backend
            const { confirmPassword: _, ...payload } = data;
            const response = await register(payload);

            if (response.success && response.data) {
                const { user } = response.data;
                router.replace(`/verify-email?email=${encodeURIComponent(user.userEmail)}`);
            } else {
                if (Array.isArray(response.errors)) {
                    response.errors.forEach((err) => toast.error(err));
                } else {
                    toast.error(response.errors ?? 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred during registration");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Hero Section */}
            <section className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="relative flex flex-col justify-center items-center px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Create Your Account</h1>
                    <p className="text-xl text-indigo-100 max-w-md">
                        Join us to start matching your resume with your dream job
                    </p>
                </div>
            </section>

            {/* Register Form */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="lg:hidden text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                                <p className="text-gray-600">Join us to start matching your resume with your dream job</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Name</label>
                                    <Input
                                        type="text"
                                        className={`w-full ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        placeholder="First name"
                                        {...registerField("name")}
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>

                                {/* Surname */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Surname</label>
                                    <Input
                                        type="text"
                                        className={`w-full ${errors.surname ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        placeholder="Last name"
                                        {...registerField("surname")}
                                    />
                                    <FieldError message={errors.surname?.message} />
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <Input
                                        type="email"
                                        className={`w-full ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        placeholder="you@example.com"
                                        {...registerField("email")}
                                    />
                                    <FieldError message={errors.email?.message} />
                                </div>

                                {/* Password */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                                            placeholder="••••••••"
                                            {...registerField("password")}
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

                                    {/* Password strength bar */}
                                    {password.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div
                                                        key={i}
                                                        className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strengthScore ? strengthColor : 'bg-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-3">
                                                    {strengthChecks.map(c => (
                                                        <span key={c.label} className={`text-xs ${c.pass ? 'text-green-600' : 'text-gray-400'}`}>
                                                            {c.pass ? '✓' : '○'} {c.label}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className={`text-xs font-medium ${strengthScore === 4 ? 'text-green-600' : strengthScore >= 2 ? 'text-yellow-600' : 'text-red-500'}`}>
                                                    {strengthLabel}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirm ? "text" : "password"}
                                            className={`w-full pr-10 ${errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : ''}`}
                                            placeholder="••••••••"
                                            {...registerField("confirmPassword")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            tabIndex={-1}
                                        >
                                            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <FieldError message={errors.confirmPassword?.message} />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="animate-spin mr-2" />
                                            Creating account...
                                        </div>
                                    ) : "Create Account"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Sign in
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
