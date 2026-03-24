import { BaseResponse, ImprovementTipsResponseData } from "@/types/responses";
import { apiClient } from "@/utils/apiClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api';

export async function getImprovementTips(
    file: File,
    jobDescription: string,
    accessToken: string,
    userToken: string
): Promise<BaseResponse<ImprovementTipsResponseData>> {
    if (!accessToken) {
        throw new Error('No access token found. Please login again.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    const response = await apiClient(`${API_BASE}/improvement-tips`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': `userToken ${userToken}`,
        },
        body: formData,
    });

    return response.json();
}
