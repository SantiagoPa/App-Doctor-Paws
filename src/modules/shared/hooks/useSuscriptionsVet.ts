import { useQuery } from "@tanstack/react-query"
import { getSuscriptionsVetAction } from "../actions/suscription-vet";

export const useSuscriptionsVet = () => {

    const query = useQuery({
        queryKey: ['suscriptions-vet'],
        queryFn: getSuscriptionsVetAction,
        retry: false,
        staleTime: 1000 * 60 * 5 //5min
    });

  return {...query}
}
