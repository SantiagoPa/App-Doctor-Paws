import doctorPawsApi from "@/api/doctorPawsApi"


export const getSuscriptionByUserAction = async (uid: string) => {
    const { data } = await doctorPawsApi.get(`/suscripcion/user/${uid}`);
    return data;
}
