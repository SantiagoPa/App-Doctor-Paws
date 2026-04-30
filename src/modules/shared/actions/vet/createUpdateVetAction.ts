import type { Vet } from "@/types/vet.type"
import type { FormVetType } from "../../schemas/FormVetSchema";
import doctorPawsApi from "@/api/doctorPawsApi";

export const createUpdateVetAction = async (payload: FormVetType & { id: string }): Promise<Vet> => {
  const { id, ...rest } = payload;
    const isCreating = id === "new"
    const { data } = await doctorPawsApi<Vet>({
        url: isCreating ? `/veterinaria` : `veterinaria/${id}`,
        method: isCreating ? "POST" : "PATCH",
        data: rest
    });
    return data;
}
