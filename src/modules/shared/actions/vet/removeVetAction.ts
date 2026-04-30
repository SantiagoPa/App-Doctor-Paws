import doctorPawsApi from "@/api/doctorPawsApi";
import type { Vet } from "@/types/vet.type"


export const removeVetAction = async (id: string): Promise<Vet> => {
    const { data } = await doctorPawsApi.delete<Vet>(`/veterinaria/${id}`);
    return data;
}
