import doctorPawsApi from "@/api/doctorPawsApi";
import type { Plan } from "@/types/plan.type";

export const getPlanesActions = async (): Promise<Plan[]> => {
  const { data } = await doctorPawsApi.get<Plan[]>(`/plan`);
  return data;
}
