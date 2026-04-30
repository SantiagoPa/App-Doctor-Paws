import doctorPawsApi from "@/api/doctorPawsApi"
import type { User } from "@/types/auth.type"
import type { FormRegisterType } from "../../schemas/FormRegisterSchema";


export const createUpdateUserAction = async (payload: FormRegisterType & { id: string }): Promise<User> => {
    const { id, ...rest } = payload;
    const isCreating = id === "new"
    const { data } = await doctorPawsApi<User>({
        url: isCreating ? `/users` : `users/${id}`,
        method: isCreating ? "POST" : "PATCH",
        data: rest
    });
    return data;
}
