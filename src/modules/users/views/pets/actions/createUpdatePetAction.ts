import type { Pet } from "@/types/pet.type";
import doctorPawsApi from "@/api/doctorPawsApi";


export const createUpdatePetAction = async (payload: Pet): Promise<Pet> => {


    const { id, ...rest } = payload;
    const isCreating = id === "new"

    console.log({id});
    
    const { data } = await doctorPawsApi<Pet>({
        url: isCreating ? `/pets` : `pets/${id}`,
        method: isCreating ? "POST" : "PATCH" ,
        data: rest
    });

    return {
        ...data,
    }
}   
