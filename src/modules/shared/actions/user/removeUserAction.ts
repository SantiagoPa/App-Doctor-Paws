import doctorPawsApi from "@/api/doctorPawsApi";
import type { User } from "@/types/auth.type"


export const removeUserAction = async (uid: string): Promise<User> => {
    const { data } = await doctorPawsApi.delete<User>(`/users/${uid}`);
    return data;
}
