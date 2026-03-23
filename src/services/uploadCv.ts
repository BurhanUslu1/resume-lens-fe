import { BaseResponse, UploadResponseData } from "@/types/responses";

export const uploadResume = async (file: File): Promise<BaseResponse<UploadResponseData>> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:7071/api/uploadCV", {
        method: "POST",
        body: formData,
    });
    return await response.json();
};