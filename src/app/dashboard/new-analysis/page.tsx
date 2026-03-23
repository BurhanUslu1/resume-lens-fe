'use client'

import ProjectCard from "@/components/features/project-card";
import StepProgress from "@/components/features/step-progress";
import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { Textarea } from "@/components/Ui/base/textarea";
import { useUser } from "@/hooks/useUser";
import { checkRegisteredUserScore } from "@/services/matchJobDescription";
import { MatchResponseInterface } from "@/types/responses";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FileText, Loader2, Upload } from "lucide-react";
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

export default function NewAnalysis() {
    const { user, isLoading, accessToken, userToken } = useUser();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setSubmitting] = useState(false);
    const [jobMatchDetails, setJobMatchDetails] = useState<MatchResponseInterface>();


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
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const fileName = watch("file")?.[0]?.name


    const showError = () => {
        if (!errors) return;

        Object.values(errors).forEach((error) => {
            if (error?.message && typeof error.message === 'string') {
                toast.error(error.message);
            }
        });
    }


    const onSubmit = async (data: FormData) => {
        if (!accessToken || !userToken) return;
        setSubmitting(true);
        try {
            const response = await checkRegisteredUserScore(
                data.file[0],
                data.jobDescription,
                accessToken,
                userToken
            )
            if (response?.success) {
                toast.success(`Analysis complete! Your match score is ${response.data?.matchScore ?? 0}%`);
                setJobMatchDetails(response.data);
                setStep(3);
            } else {
                setStep(2);
                if (Array.isArray(response.errors)) {
                    response.errors.forEach((error) => {
                        toast.error(error);
                    });
                } else {
                    toast.error(response?.errors || "Failed to analyze resume");
                }
            }

            return response;

        } catch (error) {
            console.error('Error analyzing resume:', error);
        } finally {
            setSubmitting(false);
        }
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
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">New Resume Analysis</h1>
                    <p className="mt-2 text-gray-600">Upload your resume and job description to get a match score.</p>
                </div>

                <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
                    <CardContent className="p-8">
                        <StepProgress step={step} />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Upload Your Resume</h2>
                                    <p className="text-gray-600">Upload your resume in PDF format to get started.</p>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Input
                                            type="file"
                                            className="hidden"
                                            id="file-upload"
                                            accept=".pdf"
                                            {...register("file")}
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer flex flex-col items-center space-y-2"
                                        >
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
                                                            if (input) {
                                                                input.value = '';
                                                                toast.info('File removed');
                                                            }
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

                            {step === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Job Description</h2>
                                    <p className="text-gray-600">Paste the job description you want to match against.</p>
                                    <Textarea
                                        placeholder="Paste job description here..."
                                        className="min-h-[200px]"
                                        {...register("jobDescription")}
                                    />
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-6">
                                        <h2 className="text-2xl font-semibold text-gray-800">Match Results</h2>
                                        <div className="relative inline-flex">
                                            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse"></div>
                                            <div className="relative bg-white rounded-full p-8 shadow-lg">
                                                {jobMatchDetails && <div className={`text-6xl font-bold ${jobMatchDetails?.matchScore < 50
                                                    ? 'text-red-500'
                                                    : jobMatchDetails?.matchScore >= 80
                                                        ? 'text-indigo-600'
                                                        : 'text-yellow-500'
                                                    }`}>
                                                    {jobMatchDetails?.matchScore ?? 0}%
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="bg-gray-500 text-gray-700 hover:bg-gray-600"
                                    >
                                        Back
                                    </Button>
                                )}
                                {step < 3 && (
                                    <Button
                                        type={step === 2 ? "submit" : "button"}
                                        onClick={step === 1 ? () => {
                                            if (!fileName) {
                                                toast.error('Please upload a resume first');
                                                return;
                                            }
                                            setStep(2);
                                        } : step === 2 ? () => {
                                            if (errors) {
                                                showError()
                                                return;
                                            }
                                            setStep(3);
                                        } : undefined}
                                        className="bg-indigo-600 text-white hover:bg-indigo-700 ml-auto"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <Loader2 className="animate-spin mr-2" />
                                                Processing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {step === 1 ? "Next" : "Check Match"}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </div>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {jobMatchDetails?.matchDetails?.strengths
                        && (
                            <ProjectCard
                                title="Your Strengths"
                                subTitle="Matching Skills"
                                details={jobMatchDetails?.matchDetails?.strengths ?? []}
                                className="bg-gradient-to-br from-green-50 to-white"
                                dotIndicatorColor="bg-green-500"
                            />
                        )}

                    {jobMatchDetails?.matchDetails?.weaknesses && (
                        <ProjectCard
                            title="Areas to Improve"
                            subTitle="Missing Skills"
                            details={jobMatchDetails?.matchDetails?.weaknesses ?? []}
                            className="bg-gradient-to-br from-red-50 to-white"
                            dotIndicatorColor="bg-red-500"
                        />
                    )}
                </div>
            </div>
        </div >
    );
} 