'use client'

import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { Textarea } from "@/components/Ui/base/textarea";
import { useUser } from "@/hooks/useUser";
import { compareJobs } from "@/services/compareJobs";
import { CompareJobsResponseData } from "@/types/responses";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FileText, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as validator from "zod";

const schema = validator.object({
    file: validator
        .custom<FileList>((val) => val instanceof FileList && val.length > 0, "File is required")
        .refine((files) => files[0]?.size < 10 * 1024 * 1024, "File size must be under 10MB"),
});

type FormData = validator.infer<typeof schema>;

const fitConfig = {
    strong: { label: 'Strong Fit', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', badge: 'bg-green-500' },
    moderate: { label: 'Moderate Fit', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', badge: 'bg-yellow-500' },
    weak: { label: 'Weak Fit', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', badge: 'bg-red-500' },
};

export default function CompareJobsPage() {
    const { user, isLoading, accessToken, userToken } = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<CompareJobsResponseData | null>(null);
    const [jobDescriptions, setJobDescriptions] = useState<string[]>(['', '']);

    useEffect(() => {
        if (!isLoading && !user) router.push('/login');
    }, [user, isLoading, router]);

    const { register, handleSubmit, reset, watch } = useForm<FormData>({ resolver: zodResolver(schema) });
    const fileName = watch("file")?.[0]?.name;

    const addJob = () => {
        if (jobDescriptions.length < 5) {
            setJobDescriptions([...jobDescriptions, '']);
        } else {
            toast.info('Maximum 5 job descriptions allowed.');
        }
    };

    const removeJob = (index: number) => {
        if (jobDescriptions.length <= 1) return;
        setJobDescriptions(jobDescriptions.filter((_, i) => i !== index));
    };

    const updateJob = (index: number, value: string) => {
        const updated = [...jobDescriptions];
        updated[index] = value;
        setJobDescriptions(updated);
    };

    const onSubmit = async (data: FormData) => {
        const validJobs = jobDescriptions.map(j => j.trim()).filter(j => j.length >= 20);
        if (validJobs.length === 0) {
            toast.error('Please add at least one job description (minimum 20 characters).');
            return;
        }
        if (!accessToken || !userToken) return;

        setSubmitting(true);
        try {
            const response = await compareJobs(data.file[0], validJobs, accessToken, userToken);
            if (response?.success && response.data) {
                toast.success(`Comparison complete! ${response.data.rankedJobs.length} jobs ranked.`);
                setResult(response.data);
                setStep(3);
            } else {
                setStep(2);
                const errMsg = Array.isArray(response.errors)
                    ? response.errors[0]
                    : response.errors ?? 'Failed to compare jobs';
                toast.error(errMsg);
            }
        } catch (error) {
            console.error('Error comparing jobs:', error);
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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Compare Jobs</h1>
                    <p className="mt-2 text-gray-600">
                        Upload your resume and paste up to 5 job descriptions to see which role you match best.
                    </p>
                </div>

                <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
                    <CardContent className="p-8">
                        {/* Step indicator */}
                        <div className="flex items-center justify-center w-full mb-6">
                            {[
                                { n: 1, label: 'Upload CV' },
                                { n: 2, label: 'Add Jobs' },
                                { n: 3, label: 'Results' },
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
                            {/* Step 1 — Upload CV */}
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

                            {/* Step 2 — Job descriptions */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-gray-800">Add Job Descriptions</h2>
                                            <p className="text-gray-600">Paste 1–5 job descriptions to compare against your resume.</p>
                                        </div>
                                        <span className="text-sm text-gray-500">{jobDescriptions.length}/5</span>
                                    </div>

                                    {jobDescriptions.map((jd, index) => (
                                        <div key={index} className="relative">
                                            <div className="flex items-center mb-1 gap-2">
                                                <span className="text-sm font-medium text-gray-700">Job {index + 1}</span>
                                                {jobDescriptions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeJob(index)}
                                                        className="text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <Textarea
                                                placeholder={`Paste job description ${index + 1} here...`}
                                                className="min-h-[140px]"
                                                value={jd}
                                                onChange={(e) => updateJob(index, e.target.value)}
                                            />
                                        </div>
                                    ))}

                                    {jobDescriptions.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={addJob}
                                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add another job
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Step 3 — Results */}
                            {step === 3 && result && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">Your Job Rankings</h2>

                                    {/* Ranked job cards */}
                                    <div className="space-y-4">
                                        {result.rankedJobs.map((job) => {
                                            const cfg = fitConfig[job.fit] ?? fitConfig.moderate;
                                            return (
                                                <div key={job.rank} className={`border rounded-xl p-5 ${cfg.bg} ${cfg.border}`}>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${cfg.badge}`}>
                                                                #{job.rank}
                                                            </div>
                                                            <div>
                                                                <p className={`font-semibold text-lg ${cfg.text}`}>{job.title || `Job ${job.jobIndex + 1}`}</p>
                                                                <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
                                                            </div>
                                                        </div>
                                                        <div className={`text-3xl font-bold shrink-0 ${cfg.text}`}>{job.score}%</div>
                                                    </div>

                                                    <p className="text-sm text-gray-700 mt-3 italic">{job.oneLineSummary}</p>

                                                    <div className="grid sm:grid-cols-2 gap-3 mt-4">
                                                        {job.topStrengths.length > 0 && (
                                                            <div>
                                                                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Strengths</p>
                                                                {job.topStrengths.map((s, i) => (
                                                                    <p key={i} className="text-sm text-gray-700">- {s}</p>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {job.topGaps.length > 0 && (
                                                            <div>
                                                                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Gaps</p>
                                                                {job.topGaps.map((g, i) => (
                                                                    <p key={i} className="text-sm text-gray-700">- {g}</p>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Recommendation */}
                                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                                        <p className="text-sm font-semibold text-indigo-700 mb-2">Recommendation</p>
                                        <p className="text-gray-800">{result.recommendation}</p>
                                    </div>
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
                                        onClick={() => { setStep(1); setResult(null); reset(); setJobDescriptions(['', '']); }}
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
                                        } : undefined}
                                        className="bg-indigo-600 text-white hover:bg-indigo-700 ml-auto"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <Loader2 className="animate-spin mr-2" /> Comparing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {step === 1 ? 'Next' : 'Compare Jobs'}
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
