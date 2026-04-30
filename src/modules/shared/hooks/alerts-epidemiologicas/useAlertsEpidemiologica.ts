import { useQuery } from "@tanstack/react-query";
import { getAlertsEpidemiologicaAction } from "../../actions/alert-epidemiologica";


export const useAlertsEpidemiologica = () => {

    const query = useQuery({
        queryKey: ["alert-epidemiologica"],
        queryFn: getAlertsEpidemiologicaAction,
        retry: false,
        staleTime: 1000 * 60 * 5 //5min
    });

    return { ...query };
}
