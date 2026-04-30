import { useQuery } from "@tanstack/react-query";
import { getPlanByIdActions } from "../actions/getPlanByIdActions";


export const usePlan = (id_plan: string) => {

    const query = useQuery({
        queryKey: ["plan", { id: id_plan }],
        queryFn: () => getPlanByIdActions(id_plan),
        retry: false,
        staleTime: 1000 * 60 * 5 //5min
    });


    return {...query};
}
