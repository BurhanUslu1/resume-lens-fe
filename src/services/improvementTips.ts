import API_BASE_URL from "@/config/api";
import { BaseResponse, ImprovementTipsResponseData } from "@/types/responses";
import { apiClient } from "@/utils/apiClient";

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

    const response = await apiClient(`${API_BASE_URL}/improvement-tips`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': `userToken ${userToken}`,
        },
        body: formData,
    });

    return response.json();
}
