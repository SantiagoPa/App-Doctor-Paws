import doctorPawsApi from "@/api/doctorPawsApi"
import type { Pet } from "@/types/pet.type"


export const removePetAction = async (id_pet: string): Promise<Pet> => {
    const { data } = await doctorPawsApi.delete<Pet>(`/pets/${id_pet}`);
    return data;
}
