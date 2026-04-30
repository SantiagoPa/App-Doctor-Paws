import doctorPawsApi from "@/api/doctorPawsApi";
import type { SuscriptionVet } from "@/types/suscription-vet.type";

export const getSuscriptionsVetAction = async (): Promise<SuscriptionVet[]> => {
    const { data } = await doctorPawsApi.get<SuscriptionVet[]>(`/suscripcion-veterinaria`);
    return data;
}
