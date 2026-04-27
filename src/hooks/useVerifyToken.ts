import { onDynamicMethod } from "@/services/dynamic.service";
import { useApiCall } from "./useApiCall"
import { useAsync } from "./useAsync";
import type { VerifyToken } from "@/types/auth.type";
import { useAuthStore } from "@/modules/auth/store/auth.store";


export const useVerifyToken = () => {

    const { callEndpoint, isLoading } = useApiCall();
    const { updateToken } = useAuthStore();

    const onVerify = () => callEndpoint<VerifyToken>(onDynamicMethod({
        endpoint: "/auth/verify",
        method: "GET",
        payload: null
    }));

    const onSuccess = (data: VerifyToken) => {
        updateToken(data.token);
    }


    useAsync(onVerify, onSuccess, ()=>{}, []);
    return { isLoading };
}
