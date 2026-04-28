import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessagesAction } from "../actions/getMessagesAction";
import { createMessageAction } from "../actions/createMessageAction";

export const useMessages = (consulta_id?: string) => {

    const queryClinet = useQueryClient();

    const query = useQuery({
        queryKey: ['messages', { id: consulta_id }],
        queryFn: () => getMessagesAction(consulta_id ?? ""),
        retry: false,
        staleTime: 1000 * 60 * 5, //5min,
        enabled: !!consulta_id
    });

    const mutation = useMutation({
        mutationFn: createMessageAction,
        onSuccess: (message) => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['messages', { id: message.consulta_id }] });
            // queryClinet.invalidateQueries({ queryKey: ['messages', { id: pet.id }] });
            // actualizar pet
            // queryClinet.setQueryData(['pet', { id: pet.id }], pet);
        }
    });

    return {
        ...query,
        mutation
    };
}
