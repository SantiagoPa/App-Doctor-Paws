import { useQuery } from "@tanstack/react-query";
import { getPlanesActions } from "../actions/getPlanesActions";


export const usePlanes = () => {

    const query = useQuery({
        queryKey: ["planes"],
        queryFn: getPlanesActions,
        retry: false,
        staleTime: 1000 * 60 * 5 //5min
    })

    return { ...query };
}
