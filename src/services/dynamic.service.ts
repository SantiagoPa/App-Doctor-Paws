import doctorPawsApi from "@/api/doctorPawsApi";
import { loadAbort } from "@/utils";

export interface OnDynamicMethod {
    endpoint: string;
    payload: any;
    method: "POST" | "PUT" | "GET" | "DELETE" | "PATCH";
    responseType?: "arraybuffer";
}

export const onDynamicMethod = ({ endpoint, payload, method, responseType }: OnDynamicMethod) => {
    const controller = loadAbort();
    switch (method) {
        case "POST":
            return {
                call: doctorPawsApi.post(endpoint, payload, {
                    responseType: responseType ? responseType : "json",
                    signal: controller.signal,
                }),
                controller,
            };

        case "PUT":
            return {
                call: doctorPawsApi.put(endpoint, payload, {
                    signal: controller.signal,
                }),
                controller,
            };
            
        case "PATCH":
            return {
                call: doctorPawsApi.patch(endpoint,payload, {
                    signal: controller.signal,
                }), 
                controller,
            };

        case "GET":
            return {
                call: doctorPawsApi.get(endpoint, {
                    signal: controller.signal,
                }),
                controller,
            };

        case "DELETE":
            return {
                call: doctorPawsApi.delete(endpoint, {
                    signal: controller.signal,
                }),
                controller,
            };

    }

}