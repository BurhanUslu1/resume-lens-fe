'use client'

import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import Button from "@/components/Ui/base/button";
import { useUser } from "@/hooks/useUser";
import { changePassword, updateProfile } from "@/services/profile";
import { setAuthCookies } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, KeyRound, Loader2, Mail, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name is too long"),
    surname: z.string().min(1, "Surname is required").max(50, "Surname is too long"),
});

type ProfileForm = z.infer<typeof profileSchema>;

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-sm text-red-500 mt-1">{message}</p>;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-indigo-600">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
    );
}

export default function ProfilePage() {
    const { user, isLoading, accessToken, userToken, refetch } = useUser();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isSendingReset, setIsSendingReset] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    // Pre-fill the form with the user's current name
    const nameParts = user?.userName?.split(' ') ?? [];
    const defaultName = nameParts[0] ?? '';
    const defaultSurname = nameParts.slice(1).join(' ') ?? '';

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: defaultName, surname: defaultSurname },
    });

    // Once user loads, reset the form with real values
    useEffect(() => {
        if (user?.userName) {
            const parts = user.userName.split(' ');
            reset({ name: parts[0] ?? '', surname: parts.slice(1).join(' ') ?? '' });
        }
    }, [user?.userName, reset]);

    const onSaveProfile = async (data: ProfileForm) => {
        if (!accessToken || !userToken) return;
        setIsSaving(true);
        try {
            const response = await updateProfile(data, accessToken, userToken);
            if (response.success) {
                // Update the auth cookie with the new combined name
                await setAuthCookies(accessToken, {
                    userEmail: user!.userEmail,
                    userName: `${data.name} ${data.surname}`.trim(),
                }, userToken);
                await refetch();
                toast.success('Profile updated successfully!');
                reset(data); // clear dirty state
            } else {
                const msg = Array.isArray(response.errors)
                    ? response.errors[0]
                    : response.errors ?? 'Failed to update profile.';
                toast.error(msg);
            }
        } catch {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const onChangePassword = async () => {
        if (!accessToken || !userToken) return;
        setIsSendingReset(true);
        try {
            const response = await changePassword(accessToken, userToken);
            if (response.success) {
                setResetSent(true);
                toast.success('Password reset email sent! Check your inbox.');
            } else {
                const msg = Array.isArray(response.errors)
                    ? response.errors[0]
                    : response.errors ?? 'Failed to send reset email.';
                toast.error(msg);
            }
        } catch {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsSendingReset(false);
        }
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const initials = user.userName
        ? user.userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : user.userEmail[0].toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your account information and security.</p>
                </div>

                {/* Avatar + Summary */}
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-5">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                {initials}
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{user.userName || 'User'}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {user.userEmail}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Info */}
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <User className="h-5 w-5 text-indigo-600" />
                            <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                        </div>

                        <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <Input
                                        {...register('name')}
                                        placeholder="First name"
                                        className={errors.name ? 'border-red-400' : ''}
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <Input
                                        {...register('surname')}
                                        placeholder="Last name"
                                        className={errors.surname ? 'border-red-400' : ''}
                                    />
                                    <FieldError message={errors.surname?.message} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <Input
                                    value={user.userEmail}
                                    disabled
                                    className="bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-400">Email address cannot be changed.</p>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSaving || !isDirty}
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-6"
                                >
                                    {isSaving ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </span>
                                    ) : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Shield className="h-5 w-5 text-indigo-600" />
                            <h2 className="text-base font-semibold text-gray-900">Security</h2>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Password</p>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {resetSent
                                        ? "Check your inbox — we've sent a password reset link."
                                        : "We'll send a password reset link to your email address."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onChangePassword}
                                disabled={isSendingReset || resetSent}
                                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSendingReset ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : resetSent ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                    <KeyRound className="h-4 w-4" />
                                )}
                                {resetSent ? 'Email Sent' : 'Change Password'}
                            </button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
