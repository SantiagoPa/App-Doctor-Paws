import doctorPawsApi from "@/api/doctorPawsApi";
import type { Query } from "@/types/query.type";


export const getQueryByIdAction = async (id: string): Promise<Query> => {
  const { data } = await doctorPawsApi.get<Query>(`/consulta/${id}`);
  return data;
}
