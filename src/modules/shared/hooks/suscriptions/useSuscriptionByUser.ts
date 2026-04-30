import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { getSuscriptionByUserAction } from "../../actions/suscription";



export const useSuscriptionByUser = () => {

    const { user } = useAuthStore();

    const query = useQuery({
        queryKey: ["suscription"],
        queryFn: () => getSuscriptionByUserAction(user?.id!),
        retry: false,
        staleTime: 1000 * 60 * 5 // 5min
    });

    return { ...query }

}
