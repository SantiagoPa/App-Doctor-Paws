import { useQuery } from "@tanstack/react-query";
import { getAttemptsPaymentAction } from "../actions/getAttemptsPaymentAction";

export const usePayment = (id: string) => {

    const query = useQuery({
        queryKey: ["payment", { id: id }],
        queryFn: () => getAttemptsPaymentAction(id),
        enabled: !!id,
        retry: false,
        staleTime: 1000 * 60 * 5 // 5min
    });

    return { ...query };
}
