import doctorPawsApi from '@/api/doctorPawsApi';
import type { Pet } from "@/types/pet.type"

export const getPetsAction = async (user_id: string): Promise<Pet[]> => {
    const { data } = await doctorPawsApi.get<Pet[]>(`/pets/user/${user_id}`);
    return data;
}
