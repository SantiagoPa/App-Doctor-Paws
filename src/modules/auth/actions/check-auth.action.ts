import doctorPawsApi from "@/api/doctorPawsApi";
import type { VerifyToken } from "@/types/auth.type";

export const onCheckAuth = async (): Promise<VerifyToken> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error('token not found');
    try {

        const { data } = await doctorPawsApi.get<VerifyToken>('/auth/verify');

        localStorage.setItem("token", data.token);

        return data;

    } catch (error) {
        localStorage.removeItem("token");
        throw new Error('Token not valid')
    }
}