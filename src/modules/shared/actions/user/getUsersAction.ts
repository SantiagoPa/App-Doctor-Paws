import doctorPawsApi from "@/api/doctorPawsApi";
import type { User } from "@/types/auth.type";


export const getUsersAction = async (): Promise<User[]> => {
    const { data } = await doctorPawsApi.get<User[]>(`users`);
    return data;
}
