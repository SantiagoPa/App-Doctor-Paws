import {  useQuery } from "@tanstack/react-query"
import { getQueryByIdAction } from "../actions/getQueryByIdAction"

export const useQueryUniq = (id?: string) => {

    const query = useQuery({
        queryKey: ["query", { id: id }],
        queryFn: () => getQueryByIdAction(id ?? ""),
        retry: false,
        staleTime: 1000 * 60 * 5, //5min,
        enabled: !!id
    });

    return { ...query };

}
