import doctorPawsApi from "@/api/doctorPawsApi"
import type { Vet } from "@/types/vet.type"

export const getVetsAction = async (): Promise<Vet[]> => {
    const { data } = await doctorPawsApi.get<Vet[]>(`/veterinaria`);
    return data;
}
