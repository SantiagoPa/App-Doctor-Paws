import doctorPawsApi from "@/api/doctorPawsApi";
import type { User } from "@/types/auth.type"

export const toggleActiveUserAction = async (payload: User): Promise<User> => {
    const { data } = await doctorPawsApi.patch<User>(`/users/active/${payload.id}`, { activo: !payload.activo })
    return data;
}
