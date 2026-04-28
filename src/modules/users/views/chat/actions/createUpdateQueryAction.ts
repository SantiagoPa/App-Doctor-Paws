import doctorPawsApi from "@/api/doctorPawsApi";
import type { PayloadQuery, Query } from "@/types/query.type";


export const createUpdateQueryAction = async (query: PayloadQuery): Promise<Query> => {
    const { id, ...payload } = query;
    const isCreating = id === "new"

    if (isCreating) {
        const { data } = await doctorPawsApi.post<Query>("/consulta", payload);
        return data;
    }
    
    const { data } = await doctorPawsApi.patch<Query>(`/consulta/${id}`, payload);
    return data
}
