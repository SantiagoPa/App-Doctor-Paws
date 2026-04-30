import doctorPawsApi from "@/api/doctorPawsApi"
import type { Plan } from "@/types/plan.type"


export const removePlanAction = async (id: string): Promise<Plan> => {
    const { data } = await doctorPawsApi.delete<Plan>(`plan/${id}`);
    return data;
}
