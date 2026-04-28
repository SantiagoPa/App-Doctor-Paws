import doctorPawsApi from "@/api/doctorPawsApi";
import type { Pet } from "@/types/pet.type";
import { format } from "date-fns";


export const getPetByIdAction = async (id: string): Promise<Pet> => {
    if (!id) throw new Error(`ID is required`);

    if (id === "new") {
        return {
            "nombre": "",
            "especie": "",
            "fecha_nacimiento": "",
            "raza": "",
            "edad_aproximada": "",
            "sexo": "",
            "vacunado": "",
            "color_pelaje": "",
            "foto_url": "",
            "esterilizado": false,
            peso_kg: 1
        } as unknown as Pet;
    }

    const { data } = await doctorPawsApi.get<Pet>(`/pets/${id}`);

    return {
        ...data, 
        peso_kg: Number(data.peso_kg),
        "fecha_nacimiento": format(data.fecha_nacimiento, "yyyy-MM-dd"),
    };

}