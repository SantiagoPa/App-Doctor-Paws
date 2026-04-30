import { useQuery } from "@tanstack/react-query";
import { getUsersAction } from "../../actions/user";


export const useUsers = () => {

    const query = useQuery({
        queryKey: ["users"],
        queryFn: getUsersAction,
        retry: false,
        staleTime: 1000 * 60 * 5 //min
    })

    return { ...query };
}
