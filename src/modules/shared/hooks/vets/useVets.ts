import { useQuery } from "@tanstack/react-query"
import { getVetsAction } from "../../actions/vet";

export const useVets = () => {

  const query = useQuery({
    queryKey: ['vets'],
    queryFn: getVetsAction,
    retry: false,
    staleTime: 1000 * 60 * 5 //5min
  })

  return { ...query };
}
