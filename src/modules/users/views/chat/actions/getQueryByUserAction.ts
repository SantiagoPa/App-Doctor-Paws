import doctorPawsApi from "@/api/doctorPawsApi"
import type { Query } from "@/types/query.type"


export const getQueryByUserAction = async (uid: string): Promise<Query[]> => {
  const { data } = await doctorPawsApi.get(`/consulta/user/${uid}`);
  return data;
}
