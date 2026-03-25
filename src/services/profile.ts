import API_BASE_URL from "@/config/api";
import { BaseResponse } from "@/types/responses";
import { apiClient } from "@/utils/apiClient";

export const updateProfile = async (
    data: { name: string; surname: string },
    accessToken: string,
    userToken: string
): Promise<BaseResponse<{ name: string; surname: string }>> => {
    const response = await apiClient(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'userToken': userToken,
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const changePassword = async (
    accessToken: string,
    userToken: string
): Promise<BaseResponse<{ email: string }>> => {
    const response = await apiClient(`${API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'userToken': userToken,
        },
    });
    return response.json();
};
