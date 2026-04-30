

import { CrudPage, } from "@/components/custom/admin";
import type { AlertEpidemiologica } from "@/types/alert-epidemiologica";
import { AlertTriangle } from "lucide-react";
import { useAlertsEpidemiologica } from "../shared/hooks/alerts-epidemiologicas";
import { Badge } from "@/components/ui/badge";




const AlertasPage = () => {

    const { data: alerts } = useAlertsEpidemiologica()

    return (
        <CrudPage<AlertEpidemiologica, any>
            title="Alertas Epidemiológicas"
            subtitle="Vigilancia sanitaria y brotes"
            icon={<AlertTriangle className="w-5 h-5" />}
            notActions
            data={alerts ?? []}
            searchKeys={["departamento", "municipio", "nivel_alerta"]}
            columns={[
                { key: "title", label: "Título" },
                { key: "departamento", label: "Departamento" },
                { key: "municipio", label: "municipio" },
                { key: "especie_afectada", label: "Especie Afectada" },
                { key: "num_casos", label: "Numero de casos" },
                {
                    key: "nivel_alerta", label: "Nivel Alerta",
                    render: (a) => <Badge variant={["ALTO", "CRITICO"].includes(a.nivel_alerta) ? "destructive" : "secondary"}>{a.nivel_alerta}</Badge>
                },
                { key: "periodo_inicio", label: "Periodo Inicio" },
                { key: "periodo_fin", label: "Periodo Fin" },
                { key: "condicion", label: "Condicion" },
            ]}
            emptyForm={undefined}
            onAdd={() => null}
            onUpdate={() => null}
            onRemove={() => null}
            renderForm={() => null}
        />
    );
};

export default AlertasPage;
