'use client'

import StepProgress from "@/components/features/step-progress";
import Button from "@/components/Ui/base/button";
import { Card, CardContent } from "@/components/Ui/base/card";
import { Input } from "@/components/Ui/base/input";
import { Textarea } from "@/components/Ui/base/textarea";
import { useUser } from "@/hooks/useUser";
import { checkJobScore } from "@/services/matchJobDescription";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, FileText, GitCompare, Lightbulb, Loader2, Upload, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as validator from "zod";

const schema = validator.object({
  jobDescription: validator.string().min(10, "Description must be at least 10 characters"),
  file: validator
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, "File is required")
    .refine((files) => files[0]?.size < 10 * 1024 * 1024, "File size must be under 10MB"),
});

type FormData = validator.infer<typeof schema>;

// Example data


export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const [step, setStep] = useState(1);
  const [matchScore, setMatchScore] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const file = watch("file");

  // Update selected file name when file changes
  useEffect(() => {
    if (file && file[0]) {
      setSelectedFileName(file[0].name);
      toast.success('File uploaded successfully!');
    } else {
      setSelectedFileName(null);
    }
  }, [file]);

  // Show validation errors as toasts
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([_field, error]) => {
        if (error?.message) {
          toast.error(error.message);
        }
      });
    }
  }, [errors]);

  const onSubmit = async (data: FormData) => {
    if (!isValid) return;
    setSubmitting(true);

    try {
      await toast.promise(
        checkJobScore(data.file[0], data.jobDescription).then(response => {
          if (!response?.success) {
            throw new Error(response?.errors?.[0] || "Failed to analyze resume");
          }
          const score = response.data?.matchScore ?? 0;
          setMatchScore(score);
          setStep(3);
          return response;
        }),
        {
          loading: 'Analyzing your resume...',
          error: (error: Error) => error.message || "Failed to analyze your resume. Please try again.",
        }
      );
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 pt-24 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/60 text-indigo-100 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            Free to use — no credit card required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            See your CV through the<br className="hidden md:block" /> lens of every job
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            ResumeLens uses AI to instantly score your CV against any job description — and tells you exactly what to improve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-yellow-400 text-indigo-900 px-8 py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-indigo-100 hover:text-white transition text-base underline underline-offset-4"
            >
              See pricing
            </Link>
          </div>
          {/* Mini stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-indigo-100 text-sm">
            <span>✓ Instant AI match score</span>
            <span>✓ Tailored improvement tips</span>
            <span>✓ Compare up to 5 jobs</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Form Section */}
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
                      {selectedFileName ? (
                        <>
                          <div className="flex items-center space-x-2 text-indigo-600">
                            <FileText className="h-6 w-6" />
                            <span className="font-medium">{selectedFileName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFileName(null);
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
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Match Results</h2>
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse"></div>
                    <div className="relative bg-white rounded-full p-8 shadow-lg">
                      <div className={`text-6xl font-bold ${matchScore < 50
                        ? 'text-red-500'
                        : matchScore >= 80
                          ? 'text-indigo-600'
                          : 'text-yellow-500'
                        }`}>
                        {matchScore}%
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
                      if (!file || !file[0]) {
                        toast.error('Please upload a resume first');
                        return;
                      }
                      setStep(2);
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

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything you need to land the role
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            From instant scoring to detailed rewrite advice — ResumeLens gives you the full picture.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Instant Match Score</h3>
                <p className="text-gray-600">Upload your CV and get an AI-powered match score against any job description in seconds.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Improvement Tips</h3>
                <p className="text-gray-600">Get specific, prioritised advice on exactly what to rewrite — tied to real phrases in the job posting.</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GitCompare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Compare Jobs</h3>
                <p className="text-gray-600">Rank up to 5 job listings at once to find which role your CV is best suited for.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition"
            >
              View pricing <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}


