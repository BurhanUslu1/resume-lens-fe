import API_BASE_URL from '@/config/api';
import { AnalysisHistoryResponse } from '@/types/analysis';
import { BaseResponse } from '@/types/responses';
import { apiClient } from '@/utils/apiClient';

export class UserService {
    private static instance: UserService;

    private constructor() { }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async getAnalysisHistory(accessToken: string, userToken: string, page: number = 1, pageSize: number = 10): Promise<BaseResponse<AnalysisHistoryResponse>> {
        try {
            const response = await apiClient(`${API_BASE_URL}/analysis-history?page=${page}&pageSize=${pageSize}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'userToken': `userToken ${userToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching analysis history:', error);
            throw error;
        }
    }
}

export const userService = UserService.getInstance(); 