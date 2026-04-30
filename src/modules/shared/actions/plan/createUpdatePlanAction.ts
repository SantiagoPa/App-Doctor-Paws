import type { Plan } from "@/types/plan.type";
import type { FormPlansType } from "../../schemas/FormPlansSchema";
import doctorPawsApi from "@/api/doctorPawsApi";

export const createUpdatePlanAction = async (payload: FormPlansType & { id: string } ): Promise<Plan> => {
        const { id, ...rest } = payload;
    const isCreating = id === "new"
    const { data } = await doctorPawsApi<Plan>({
        url: isCreating ? `/plan` : `plan/${id}`,
        method: isCreating ? "POST" : "PATCH",
        data: rest
    });
    return data;
}
