
import { type AxiosRequestHeaders, type InternalAxiosRequestConfig } from "axios";
import doctorPawsApi from "@/api/doctorPawsApi";
import { toast } from "sonner";

const FORM_DATA_URL = ["/attachment"];

export const PublicPrivateInterceptor = () => {
    const updatedHeaders = (request: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        let newHeaders: any = {};

        if (request.url) {

            if (FORM_DATA_URL.includes("test")) {
                newHeaders = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                };
            } else {
                newHeaders = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                };
            }

        }

        request.headers = newHeaders as unknown as AxiosRequestHeaders;
        return request;
    };

    doctorPawsApi.interceptors.request.use((request) => {
        return updatedHeaders(request);
    });

    doctorPawsApi.interceptors.response.use(
        (response) => {
            // if (import.meta.env.DEV) {
            //     console.log("response", response.data);
            // }
            return response;
        },
        (error) => {
            if (error.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
                toast.error("Sin Autorización - Se ha terminado la sesión");
            }

            if (error.code === "ERR_CANCELED") {
                toast.warning("Se ha cancela la peticion");
            }
            if (error.code === "ERR_NETWORK") {
                toast.error(`Error Network - error de conexion: ${error.respons} - ${JSON.stringify(error)}`);
            }
            if (error.code === "ERR_CONNECTION_REFUSED") {
                toast.error("Error conexion rechazada - error de conexion");
            }

            const msgErrors = error.response.data.message as string | string[];
            if (Array.isArray(msgErrors)) {
                const showError = msgErrors.reduce((acc, el) => acc += `- ${el}\n`, "");
                toast.error("Error de validación", {
                    description: (
                        <span style={{ whiteSpace: "pre-line" }}>
                            {showError}
                        </span>
                    ),
                });
            } else {
                toast.error("Error de validación", {
                    description: msgErrors
                });
            }

            if (import.meta.env.DEV) {
                console.log({ error });
            }

            return Promise.reject(error);
        }
    );
};
