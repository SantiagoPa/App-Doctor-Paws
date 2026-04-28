

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getQueryByUserAction } from "../actions/getQueryByUserAction"
import { useAuthStore } from "@/modules/auth/store/auth.store"
import { createUpdateQueryAction } from "../actions/createUpdateQueryAction";

export const useConsultas = () => {

  const { user } = useAuthStore();

  const queryClinet = useQueryClient();


  const query = useQuery({
    queryKey: ["queries"],
    queryFn: () => getQueryByUserAction(user?.id!),
    retry: false,
    staleTime: 1000 * 60 * 5 // 5min
  });

  const mutation = useMutation({
    mutationFn: createUpdateQueryAction,
    onSuccess: (query) => {
      //Invalidar cache
      queryClinet.invalidateQueries({ queryKey: ['queries'] });
      queryClinet.invalidateQueries({ queryKey: ['query', { id: query.id }] });
      // actualizar pet
      queryClinet.setQueryData(['pet', { id: query.id }], query);
    }
  });

  return { ...query, mutation };
}
