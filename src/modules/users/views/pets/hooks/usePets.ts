import { useQuery } from "@tanstack/react-query";
import { getPetsAction } from "../actions/getPetsAction";
import { useAuthStore } from "@/modules/auth/store/auth.store";


export const usePets = () => {

  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ['pets'],
    queryFn: () => getPetsAction(user?.id!),
    retry: false,
  });

  return {
    ...query
  };
  
}
