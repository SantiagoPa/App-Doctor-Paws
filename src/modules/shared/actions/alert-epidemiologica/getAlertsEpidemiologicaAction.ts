import doctorPawsApi from "@/api/doctorPawsApi";
import type { AlertEpidemiologica } from "@/types/alert-epidemiologica";

export const getAlertsEpidemiologicaAction = async (): Promise<AlertEpidemiologica[]> => {
    const { data } = await doctorPawsApi.get<AlertEpidemiologica[]>(`/alerta-epidemiologica`);
    return data;
}
