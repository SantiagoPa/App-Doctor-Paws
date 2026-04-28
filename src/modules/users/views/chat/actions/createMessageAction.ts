import doctorPawsApi from "@/api/doctorPawsApi";
import type { Messages, PayloadMessage } from "@/types/messages.type";


export const createMessageAction = async (payload: PayloadMessage): Promise<Messages> => {
  const { data } = await doctorPawsApi.post<Messages>(`/mensaje`, payload);
  return data;
}
