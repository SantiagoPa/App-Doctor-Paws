import doctorPawsApi from "@/api/doctorPawsApi"
import type { Messages } from "@/types/messages.type"


export const getMessagesAction = async (consulta_id: string): Promise<Messages[]> => {
    const { data } = await doctorPawsApi.get<Messages[]>(`/mensaje/consulta/${consulta_id}`);
    return data;
}
