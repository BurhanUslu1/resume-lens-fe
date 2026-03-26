import { BaseResponse, UploadResponseData } from "@/types/responses";
import API_BASE_URL from "@/config/api";

export const uploadResume = async (file: File): Promise<BaseResponse<UploadResponseData>> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/uploadCV`, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};