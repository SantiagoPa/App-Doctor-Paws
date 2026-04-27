import { onDynamicMethod } from "@/services/dynamic.service";
import { useApiCall } from "./useApiCall"
import { useState } from "react";
import { useAsync } from "./useAsync";


export interface ListTerritorialEntity {
    id: number;
    codigo: string;
    nombre: string;
}



export const useDepartamento = (id_departamento?: string) => {

    const [departamentos, setDepartamentos] = useState<ListTerritorialEntity[]>([]);
    const [municipios, setMunicipios] = useState<ListTerritorialEntity[]>([]);

    const { callEndpoint, isLoading } = useApiCall();

    useState();

    const onGetDepartamentos = () => callEndpoint(onDynamicMethod({
        endpoint: "/departamentos",
        method: "GET",
        payload: null
    }));

    const onGetMunicipios = () => {
        if (id_departamento) {
            return callEndpoint(onDynamicMethod({
                endpoint: `/departamentos/${id_departamento}/municipios`,
                method: "GET",
                payload: null
            }));
        }
    }

    useAsync<ListTerritorialEntity[]>(onGetDepartamentos, (data) => setDepartamentos(data), () => { }, []);
    useAsync<ListTerritorialEntity[]>(onGetMunicipios, (data) => setMunicipios(data), () => { }, [id_departamento]);


    return { departamentos, municipios, isLoading };


}
