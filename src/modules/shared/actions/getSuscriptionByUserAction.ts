import doctorPawsApi from "@/api/doctorPawsApi"
import type { Suscription } from "@/types/suscription.type";


export const getSuscriptionByUserAction = async (uid: string): Promise<Suscription> => {
    const { data } = await doctorPawsApi.get(`/suscripcion/user/${uid}`);
    return data;
}
