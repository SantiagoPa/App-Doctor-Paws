import doctorPawsApi from "@/api/doctorPawsApi"
import type { Plan } from "@/types/plan.type"


export const getPlanByIdActions = async (id: string): Promise<Plan> => {
  const { data } = await doctorPawsApi.get<Plan>(`/plan/${id}`);
  return data;
}
