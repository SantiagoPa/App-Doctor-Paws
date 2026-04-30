import { useQuery } from "@tanstack/react-query"
import { getSuscriptionByUserAction } from "../actions/getSuscriptionByUserAction";
import { useAuthStore } from "@/modules/auth/store/auth.store";



export const useSuscription = () => {

    const { user } = useAuthStore();

    const query = useQuery({
        queryKey: ["suscription"],
        queryFn: () => getSuscriptionByUserAction(user?.id!),
        retry: false,
        staleTime: 1000 * 60 * 5 // 5min
    });

    return { ...query }

}
