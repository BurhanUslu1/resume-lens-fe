'use client'

import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import RecentActivity from "@/components/features/recent-activity";
import { useUser } from "@/hooks/useUser";
import { userService } from "@/services/user.service";
import { formatDate } from "@/utils/format-date";
import { FileText, History, Lightbulb, User, GitCompare, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RecentActivities {
    title: string;
    score: number;
    date: string;
    analysisId: string;
}

export default function Dashboard() {
    const { user, isLoading, accessToken, userToken } = useUser();
    const router = useRouter();
    const [recentActivities, setRecentActivities] = useState<RecentActivities[]>([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(true);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const fetchAnalysisHistory = async () => {
            if (accessToken && userToken) {
                try {
                    const response = await userService.getAnalysisHistory(accessToken, userToken, 1, 4);
                    if (response.data?.history) {
                        setRecentActivities(response.data.history.map(analysis => ({
                            title: analysis.matchDetails.jobTitle,
                            score: analysis.score,
                            date: formatDate(analysis.lastUpdated),
                            analysisId: analysis.id
                        })));
                    }
                } catch (error) {
                    console.error('Error fetching analysis history:', error);
                } finally {
                    setIsLoadingActivities(false);
                }
            }
        };

        if (user) {
            fetchAnalysisHistory();
        }
    }, [user, accessToken, userToken]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.userName}!</h1>
                    <p className="mt-2 text-gray-600">Manage your resume analysis and track your job matches.</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
                    <Link href="/dashboard/new-analysis" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">New Analysis</h3>
                                        <p className="text-gray-600 mt-1">Upload a resume and match it with a job description.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/analysis-history" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <History className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Analysis History</h3>
                                        <p className="text-gray-600 mt-1">View your past resume analyses and scores.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/improvement-tips" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <Lightbulb className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Improvement Tips</h3>
                                        <p className="text-gray-600 mt-1">Get specific advice on rewriting your resume for a target role.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/dashboard/compare-jobs" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <GitCompare className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Compare Jobs</h3>
                                        <p className="text-gray-600 mt-1">Rank up to 5 job listings to find your best fit.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/profile" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <User className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                                        <p className="text-gray-600 mt-1">Update your account information and preferences.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/contact" className="block">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Mail className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
                                        <p className="text-gray-600 mt-1">Have a question or feedback? We&apos;d love to hear from you.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Recent Activity */}
                {isLoadingActivities ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : recentActivities.length > 0 ? (
                    <RecentActivity activities={recentActivities} />
                ) : (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-500 text-lg">No activities yet 😊</p>
                        <p className="text-gray-400 mt-2">Start by uploading your resume for analysis!</p>
                    </div>
                )}

                {/* Premium Features Banner */}
                <div className="mt-12 bg-indigo-600 rounded-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
                            <p className="text-indigo-100">Get detailed analysis, unlimited matches, and more premium features.</p>
                        </div>
                        <Button
                            onClick={() => router.push('/pricing')}
                            className="mt-4 md:mt-0 bg-yellow-400 text-indigo-600 hover:bg-indigo-50"
                        >
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 