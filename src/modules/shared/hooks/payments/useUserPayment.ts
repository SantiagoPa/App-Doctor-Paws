import { useAuthStore } from "@/modules/auth/store/auth.store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAttemptPaymentAction, getAttemptPaymentByUserAction } from "../actions/payment";


export const useUserPayment = () => {

    const { user } = useAuthStore();

    const queryClinet = useQueryClient();

    const query = useQuery({
        queryKey: ["payment-user", { id: user?.id }],
        queryFn: () => getAttemptPaymentByUserAction(user?.id!),
        retry: false,
        staleTime: 1000 * 60 * 5
    });

    const mutation = useMutation({
        mutationFn: createAttemptPaymentAction,
        onSuccess: (payment) => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['payment', { id: payment.id }] });
            queryClinet.invalidateQueries({ queryKey: ['payment-user', { id: user?.id }] });
            // actualizar
            queryClinet.setQueryData(['payment', { id: payment.id }], payment);
            toast.success("¡Datos confirmados correctamente! 🎉");
        }
    });


    return { ...query, mutation }
}
