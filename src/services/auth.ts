import { BaseResponse } from "@/types/responses";
import * as validator from "zod";

interface RegisterRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

const registerResponseSchema = validator.object({
    user: validator.object({
        userEmail: validator.string().email(),
        userName: validator.string(),
        userId: validator.string(),
    }),
    accessToken: validator.string(),
    idToken: validator.string(),
});

type AuthResponse = validator.infer<typeof registerResponseSchema>;

export const register = async (data: RegisterRequest): Promise<BaseResponse<AuthResponse | null>> => {
    try {
        const response = await fetch("http://localhost:7071/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json() as BaseResponse<AuthResponse> | BaseResponse<null>;

        return responseData
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Error",
            errors: ["An unexpected error occurred during registration"],
            timestamp: new Date().toISOString(),
        };
    }
};

export const login = async (data: LoginRequest): Promise<BaseResponse<AuthResponse | null>> => {
    try {
        const response = await fetch("http://localhost:7071/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json() as BaseResponse<AuthResponse> | BaseResponse<null>;

        return responseData;
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Error",
            errors: ["An unexpected error occurred during login"],
            timestamp: new Date().toISOString(),
        };
    }
}; 