import doctorPawsApi from "@/api/doctorPawsApi";
import type { Vet } from "@/types/vet.type";


export const toggleVetAction = async (payload: Vet): Promise<Vet> => {
    const { data } = await doctorPawsApi.patch<Vet>(`/veterinaria/active/${payload.id}`, { activo: !payload.activo })
    return data;
}
