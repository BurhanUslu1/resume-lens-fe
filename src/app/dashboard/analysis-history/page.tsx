'use client'

import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Modal } from "@/components/Ui/base/modal";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/Ui/base/pagination";
import { useUser } from "@/hooks/useUser";
import { userService } from "@/services/user.service";
import { AnalysisHistory } from "@/types/analysis";
import { formatDate } from "@/utils/format-date";
import { History, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function AnalysisHistoryPage() {
    const { user, isLoading, accessToken, userToken } = useUser();
    const router = useRouter();
    const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisHistory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const fetchAnalysisHistory = async () => {
            if (accessToken && userToken) {
                try {
                    setIsLoadingHistory(true);
                    const response = await userService.getAnalysisHistory(accessToken, userToken, currentPage, ITEMS_PER_PAGE);
                    if (response.data?.history) {
                        setAnalysisHistory(response.data.history);
                        setTotalPages(Math.ceil((response.data.totalCount || 0) / ITEMS_PER_PAGE));
                    }
                } catch (error) {
                    console.error('Error fetching analysis history:', error);
                } finally {
                    setIsLoadingHistory(false);
                }
            }
        };

        if (user) {
            fetchAnalysisHistory();
        }
    }, [user, accessToken, userToken, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewDetails = (analysis: AnalysisHistory) => {
        setSelectedAnalysis(analysis);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAnalysis(null);
    };

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
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
                    <p className="mt-2 text-gray-600">View your past resume analyses and their results.</p>
                </div>

                {/* History Table */}
                {isLoadingHistory ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : analysisHistory.length > 0 ? (
                    <>
                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                <div className="overflow-x-auto rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Job Title
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Match Score
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {analysisHistory.map((analysis) => (
                                                <tr
                                                    key={analysis.id}
                                                    className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {analysis.matchDetails.jobTitle || 'Unknown Role'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${analysis.score >= 80 ? 'bg-green-100 text-green-800' :
                                                            analysis.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                            {analysis.score}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-600">
                                                            {formatDate(analysis.lastUpdated)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <Button
                                                            onClick={() => handleViewDetails(analysis)}
                                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pagination */}
                        <div className="mt-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index + 1}>
                                            <PaginationLink
                                                onClick={() => handlePageChange(index + 1)}
                                                isActive={currentPage === index + 1}
                                                className="cursor-pointer"
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>

                        {/* Analysis Details Modal */}
                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            title={`Analysis Details - ${selectedAnalysis?.matchDetails.jobTitle}`}
                        >
                            {selectedAnalysis && (
                                <div className="space-y-6">
                                    {/* Score + date header — always shown */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Analyzed on {formatDate(selectedAnalysis.lastUpdated)}
                                        </div>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            selectedAnalysis.score >= 80 ? 'bg-green-100 text-green-800' :
                                            selectedAnalysis.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            Match Score: {selectedAnalysis.score}%
                                        </span>
                                    </div>

                                    {/* ── Improvement Tips view ── */}
                                    {selectedAnalysis.matchDetails.improvementTips?.length ? (
                                        <div className="space-y-5">
                                            {/* Summary gap */}
                                            {selectedAnalysis.matchDetails.summaryGap && (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                    <p className="text-sm font-semibold text-yellow-800 mb-1">Summary</p>
                                                    <p className="text-sm text-yellow-700">{selectedAnalysis.matchDetails.summaryGap}</p>
                                                </div>
                                            )}

                                            {/* Improvement tips */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Improvement Tips</h3>
                                                <div className="space-y-3">
                                                    {selectedAnalysis.matchDetails.improvementTips.map((tip, i) => {
                                                        const priorityConfig = {
                                                            high:   { icon: <ChevronUp className="h-4 w-4" />,   bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700' },
                                                            medium: { icon: <Minus className="h-4 w-4" />,        bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
                                                            low:    { icon: <ChevronDown className="h-4 w-4" />,  bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700' },
                                                        }[tip.priority];
                                                        return (
                                                            <div key={i} className={`rounded-lg border p-4 ${priorityConfig.bg} ${priorityConfig.border}`}>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${priorityConfig.badge}`}>
                                                                        {priorityConfig.icon}
                                                                        {tip.priority.charAt(0).toUpperCase() + tip.priority.slice(1)}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">{tip.section}</span>
                                                                </div>
                                                                <p className="text-sm font-medium text-gray-800 mb-1">{tip.issue}</p>
                                                                <p className="text-sm text-gray-600">{tip.suggestion}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Keywords to add */}
                                            {selectedAnalysis.matchDetails.keywordsToAdd?.length ? (
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Keywords to Add</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedAnalysis.matchDetails.keywordsToAdd.map((kw, i) => (
                                                            <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                                                {kw}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {/* Strengths to highlight */}
                                            {selectedAnalysis.matchDetails.strengths?.length ? (
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Strengths to Highlight</h3>
                                                    <ul className="space-y-1">
                                                        {selectedAnalysis.matchDetails.strengths.map((s, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                                                                <span className="h-2 w-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : null}
                                        </div>

                                    ) : /* ── Compare Jobs / regular analysis view ── */ (
                                        <div className="space-y-5">
                                            {/* Recommendation (compare jobs) */}
                                            {selectedAnalysis.matchDetails.summaryGap && (
                                                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                                                    <p className="text-sm font-semibold text-indigo-800 mb-1">Recommendation</p>
                                                    <p className="text-sm text-indigo-700">{selectedAnalysis.matchDetails.summaryGap}</p>
                                                </div>
                                            )}

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {selectedAnalysis.matchDetails.strengths?.length ? (
                                                    <div className="bg-green-50 rounded-lg p-4">
                                                        <h3 className="text-sm font-semibold text-green-800 mb-3">Strengths</h3>
                                                        <ul className="space-y-2">
                                                            {selectedAnalysis.matchDetails.strengths.map((s, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                                                                    <span className="h-2 w-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                    {s}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : null}

                                                {selectedAnalysis.matchDetails.weaknesses?.length ? (
                                                    <div className="bg-red-50 rounded-lg p-4">
                                                        <h3 className="text-sm font-semibold text-red-800 mb-3">Areas to Improve</h3>
                                                        <ul className="space-y-2">
                                                            {selectedAnalysis.matchDetails.weaknesses.map((w, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                                                                    <span className="h-2 w-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                    {w}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Modal>
                    </>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <History className="h-6 w-6 text-indigo-600" />
                                </div>
                                <p className="text-gray-500 text-lg">No analysis history yet</p>
                                <p className="text-gray-400">Start by uploading your resume for analysis!</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
} 