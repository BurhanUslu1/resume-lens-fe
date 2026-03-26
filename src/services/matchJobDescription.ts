import { BaseResponse, MatchResponseInterface } from "@/types/responses";
import { apiClient } from "@/utils/apiClient";
import API_BASE_URL from "@/config/api";

export const checkJobScore = async (file: File, jobDescription: string): Promise<BaseResponse<MatchResponseInterface>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    return fetch(`${API_BASE_URL}/checkJobScore`, {
        method: "POST",
        body: formData,
    }).then((response) => response.json());
}

export async function checkRegisteredUserScore(file: File, jobDescription: string, accessToken: string, userToken: string): Promise<BaseResponse<MatchResponseInterface>> {
    if (!accessToken) {
        throw new Error('No access token found. Please login again.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    const response = await apiClient(`${API_BASE_URL}/checkRegisteredUserScore`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': `userToken ${userToken}`
        },
        body: formData,
    });

    return response.json();
}