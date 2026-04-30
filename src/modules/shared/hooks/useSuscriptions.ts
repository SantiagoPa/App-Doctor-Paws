import { useQuery } from "@tanstack/react-query";
import { getSuscriptionsActions } from "../actions/suscription";



export const useSuscriptions = () => {

    const query = useQuery({
        queryKey: ['suscriptions'],
        queryFn: getSuscriptionsActions,
        retry: false,
        staleTime: 1000 * 60 * 5 //5min
    });

    return { ...query };
}
