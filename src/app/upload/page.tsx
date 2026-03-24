"use client";

import Button from "@/components/Ui/base/button";
//import { matchJobDescription } from "@/services/matchJobDescription";
import { uploadResume } from "@/services/uploadCv";
import React, { useState } from "react";

export default function UploadPage() {
    const [file, _setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a resume and enter a job description");
            return;
        }

        const resumeResult = await uploadResume(file);
        if (resumeResult.success && resumeResult.data) {
            // if (jobDescription) {
            //     const scoreMatchResponse = await matchJobDescription(resumeResult.data.fileName, jobDescription);
            //     if (scoreMatchResponse?.success) {
            //         alert("Match Score: " + scoreMatchResponse.data?.matchScore);
            //     } else {
            //         alert("Error: " + scoreMatchResponse.error);
            //     }
            // }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold my-6 text-indigo-600">Upload Your Resume</h1>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg 
            shadow-md w-full max-w-lg flex flex-col gap-4">
                <label className="block">
                    Resume (PDF):
                    {/* <Input type="file" onChange={handleFileChange} className="mt-2" /> */}
                </label>
                <label className="block">
                    Job Description:
                    {/* <TextArea
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="mt-2"
                    /> */}
                </label>
                <Button className="bg-indigo-600" type="submit">Check Match</Button>
            </form>
        </div>
    );
}
