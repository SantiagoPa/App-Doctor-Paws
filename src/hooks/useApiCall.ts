
import type { AxiosCall } from "@/types/axios.type";
import { AxiosError, type AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useApiCall = () => {

    const [isLoading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async <T>(axiosCall: AxiosCall<T>) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);
        let response = {} as AxiosResponse<T>;
        try {
            response = await axiosCall.call;
            setLoading(false);
            return { result: response.data, status: response.status }
        } catch (error: any) {
            // console.log({error})
            setLoading(false);
            const tempError = error as AxiosError<T>;
            return { result: tempError.response?.data, status: 0 }
        }
    };

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
    }, []);

    return { isLoading, callEndpoint }
};
