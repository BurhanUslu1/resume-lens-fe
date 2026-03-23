export interface UserInfo {
    userEmail: string;
    userName: string;
}

export interface LoginResponse {
    success: boolean;
    data?: {
        accessToken: string;
        userEmail: string;
        userName: string;
        idToken: string;
    };
    error?: string;
}

export interface AuthApiResponse {
    success: boolean;
    error?: string;
} 