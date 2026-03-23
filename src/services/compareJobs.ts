import { BaseResponse, CompareJobsResponseData } from "@/types/responses";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api';

export async function compareJobs(
    file: File,
    jobDescriptions: string[],
    accessToken: string,
    userToken: string
): Promise<BaseResponse<CompareJobsResponseData>> {
    if (!accessToken) {
        throw new Error('No access token found. Please login again.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescriptions', JSON.stringify(jobDescriptions));

    const response = await fetch(`${API_BASE}/compare-jobs`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': `userToken ${userToken}`,
        },
        body: formData,
    });

    return response.json();
}
