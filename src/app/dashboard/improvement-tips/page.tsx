'use client'

import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { Textarea } from "@/components/Ui/base/textarea";
import { useUser } from "@/hooks/useUser";
import { getImprovementTips } from "@/services/improvementTips";
import { ImprovementTipsResponseData } from "@/types/responses";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FileText, Lightbulb, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as validator from "zod";

const schema = validator.object({
    jobDescription: validator.string().min(25, "Description must be at least 25 characters"),
    file: validator
        .custom<FileList>((val) => val instanceof FileList && val.length > 0, "File is required")
        .refine((files) => files[0]?.size < 10 * 1024 * 1024, "File size must be under 10MB"),
});

type FormData = validator.infer<typeof schema>;

const priorityConfig = {
    high: { label: 'High Priority', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
    medium: { label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
    low: { label: 'Low Priority', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
};

export default function ImprovementTipsPage() {
    const { user, isLoading, accessToken, userToken } = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<ImprovementTipsResponseData | null>(null);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const fileName = watch("file")?.[0]?.name;

    const showErrors = () => {
        Object.values(errors).forEach((error) => {
            if (error?.message && typeof error.message === 'string') {
                toast.error(error.message);
            }
        });
    };

    const onSubmit = async (data: FormData) => {
        if (!accessToken || !userToken) return;
        setSubmitting(true);
        try {
            const response = await getImprovementTips(data.file[0], data.jobDescription, accessToken, userToken);
            if (response?.success && response.data) {
                toast.success('Analysis complete! Here are your improvement tips.');
                setResult(response.data);
                setStep(3);
            } else {
                setStep(2);
                const errMsg = Array.isArray(response.errors)
                    ? response.errors[0]
                    : response.errors ?? 'Failed to get improvement tips';
                toast.error(errMsg);
            }
        } catch (error) {
            console.error('Error getting improvement tips:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (!user) return null;

    const highTips = result?.improvementTips.filter(t => t.priority === 'high') ?? [];
    const mediumTips = result?.improvementTips.filter(t => t.priority === 'medium') ?? [];
    const lowTips = result?.improvementTips.filter(t => t.priority === 'low') ?? [];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Resume Improvement Tips</h1>
                    <p className="mt-2 text-gray-600">
                        Get specific, actionable advice on how to rewrite your resume for a target role.
                    </p>
                </div>

                <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
                    <CardContent className="p-8">
                        {/* Step indicator */}
                        <div className="flex items-center justify-center w-full mb-6">
                            {[
                                { n: 1, label: 'Upload CV' },
                                { n: 2, label: 'Job Description' },
                                { n: 3, label: 'Your Tips' },
                            ].map((s, i, arr) => (
                                <div key={s.n} className="flex items-center">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${step >= s.n ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                                            {s.n}
                                        </div>
                                        <p className={`ml-2 ${step >= s.n ? 'text-indigo-600 font-semibold' : 'text-gray-400'}`}>{s.label}</p>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className={`w-12 h-1 mx-2 ${step > s.n ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 1 — Upload */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Upload Your Resume</h2>
                                    <p className="text-gray-600">Upload your resume in PDF format.</p>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Input
                                            type="file"
                                            className="hidden"
                                            id="file-upload"
                                            accept=".pdf"
                                            {...register("file")}
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-2">
                                            {fileName ? (
                                                <>
                                                    <div className="flex items-center space-x-2 text-indigo-600">
                                                        <FileText className="h-6 w-6" />
                                                        <span className="font-medium">{fileName}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            reset({ ...watch(), file: undefined });
                                                            const input = document.getElementById('file-upload') as HTMLInputElement;
                                                            if (input) input.value = '';
                                                            toast.info('File removed');
                                                        }}
                                                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                                                    >
                                                        Change file
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-12 w-12 text-gray-400" />
                                                    <span className="text-gray-600">Click to upload or drag and drop</span>
                                                    <span className="text-sm text-gray-500">PDF (max. 10MB)</span>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 — Job description */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Target Job Description</h2>
                                    <p className="text-gray-600">Paste the job description you want to tailor your resume for.</p>
                                    <Textarea
                                        placeholder="Paste job description here..."
                                        className="min-h-[220px]"
                                        {...register("jobDescription")}
                                    />
                                </div>
                            )}

                            {/* Step 3 — Results */}
                            {step === 3 && result && (
                                <div className="space-y-8">
                                    {/* Score + summary gap */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <div className="relative inline-flex shrink-0">
                                            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse" />
                                            <div className="relative bg-white rounded-full p-6 shadow-lg">
                                                <div className={`text-5xl font-bold ${
                                                    result.matchScore < 50 ? 'text-red-500'
                                                    : result.matchScore >= 80 ? 'text-indigo-600'
                                                    : 'text-yellow-500'
                                                }`}>
                                                    {result.matchScore}%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex-1">
                                            <p className="text-sm font-semibold text-indigo-700 mb-1">Summary</p>
                                            <p className="text-gray-700">{result.summaryGap}</p>
                                        </div>
                                    </div>

                                    {/* Keywords to add */}
                                    {result.keywordsToAdd.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Keywords to Add</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {result.keywordsToAdd.map((kw, i) => (
                                                    <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Improvement tips grouped by priority */}
                                    {[
                                        { label: 'High Priority Changes', tips: highTips, cfg: priorityConfig.high },
                                        { label: 'Medium Priority Changes', tips: mediumTips, cfg: priorityConfig.medium },
                                        { label: 'Low Priority Changes', tips: lowTips, cfg: priorityConfig.low },
                                    ].filter(g => g.tips.length > 0).map(group => (
                                        <div key={group.label}>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">{group.label}</h3>
                                            <div className="space-y-3">
                                                {group.tips.map((tip, i) => (
                                                    <div key={i} className={`border rounded-xl p-4 ${group.cfg.color}`}>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`w-2 h-2 rounded-full shrink-0 ${group.cfg.dot}`} />
                                                            <span className="text-xs font-semibold uppercase tracking-wide">{tip.section}</span>
                                                        </div>
                                                        <p className="font-medium text-sm mb-1">{tip.issue}</p>
                                                        <p className="text-sm opacity-90">→ {tip.suggestion}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Strengths to highlight */}
                                    {result.strengthsToHighlight.length > 0 && (
                                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                                                <Lightbulb className="h-5 w-5" />
                                                Strengths to Highlight More
                                            </h3>
                                            <ul className="space-y-1">
                                                {result.strengthsToHighlight.map((s, i) => (
                                                    <li key={i} className="text-sm text-green-700">- {s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between mt-8">
                                {step > 1 && step < 3 && (
                                    <Button type="button" onClick={() => setStep(step - 1)} className="bg-gray-500 text-gray-700 hover:bg-gray-600">
                                        Back
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button
                                        type="button"
                                        onClick={() => { setStep(1); setResult(null); reset(); }}
                                        className="bg-gray-500 text-gray-700 hover:bg-gray-600"
                                    >
                                        Start New
                                    </Button>
                                )}
                                {step < 3 && (
                                    <Button
                                        type={step === 2 ? "submit" : "button"}
                                        onClick={step === 1 ? () => {
                                            if (!fileName) { toast.error('Please upload a resume first'); return; }
                                            setStep(2);
                                        } : step === 2 ? () => {
                                            if (Object.keys(errors).length > 0) { showErrors(); return; }
                                        } : undefined}
                                        className="bg-indigo-600 text-white hover:bg-indigo-700 ml-auto"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <Loader2 className="animate-spin mr-2" /> Analysing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {step === 1 ? 'Next' : 'Get Tips'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </div>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
