import doctorPawsApi from "@/api/doctorPawsApi"
import type { Suscription } from "@/types/suscription.type";


export const getSuscriptionsActions = async (): Promise<Suscription[]> => {
    const { data } = await doctorPawsApi.get<Suscription[]>(`/suscripcion`);
  return data
}
