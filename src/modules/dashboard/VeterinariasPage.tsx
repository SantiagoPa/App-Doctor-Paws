
import { CrudPage } from "@/components/custom/admin";
import type { Vet } from "@/types/vet.type";
import type { FormVetType } from "../shared/schemas/FormVetSchema";
import { Building2, ToggleLeft } from "lucide-react";
import { useVet, useVets } from "../shared/hooks/vets";
import { FormVet } from "./views/vet/components/FormVet";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/ui/button";

const empty: FormVetType = {
    "nombre": "",
    "nit": "",
    "contacto_nombre": "",
    "correo": "",
    "celular": "",
    "departamento": "",
    "municipio": "",
    "direccion": "",
    "precio_consulta_min": "",
    "precio_consulta_max": "",
    "plan_directorio": "BASICO"
};

const VeterinariasPage = () => {
    const { data: vet } = useVets();
    const { mutation, deleteMutation, toggleMutation } = useVet();
    // const { veterinarias, addVeterinaria, updateVeterinaria, removeVeterinaria } = useAdmin();

    return (
        <CrudPage<Vet, FormVetType>
            title="Veterinarias"
            subtitle="Clínicas registradas en la plataforma"
            icon={<Building2 className="w-5 h-5" />}
            data={vet ?? []}
            searchKeys={["nombre", "nit"]}
            columns={[
                { key: "nombre", label: "Nombre" },
                { key: "nit", label: "NIT" },
                { key: "celular", label: "celular" },
                {
                    key: "precio_consulta_min", label: "Precio Consulta min.", render: (v) => (
                        <Badge variant={"outline"}>
                            {formatCurrency(+v.precio_consulta_min)}
                        </Badge>

                    )
                },
                {
                    key: "precio_consulta_max", label: "Precio Consulta max.", render: (v) => (
                        <Badge variant={"outline"}>
                            {formatCurrency(+v.precio_consulta_max)}
                        </Badge>

                    )
                },
                { key: "correo", label: "Correo" },
                { key: "direccion", label: "Direccion" },
                { key: "departamento", label: "departamento" },
                { key: "municipio", label: "Municipio" },
                {
                    key: "plan_directorio", label: "Plan Directorio",
                    render: (v) => (
                        <Badge variant={v.plan_directorio === "PREMIUM" ? "secondary" : v.plan_directorio === "DESTACADO" ? "link" : "outline"}>
                            {v.plan_directorio}
                        </Badge>

                    ),
                },
                {
                    key: "activo", label: "Estado",
                    render: (v) => (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${v.activo ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                            {v.activo ? "ACTIVO" : "INACTIVO"}
                        </span>
                    ),
                },

            ]}
            emptyForm={empty}
            onAdd={(payload) => mutation.mutateAsync({ ...payload, id: "new" })}
            onUpdate={(id, payload) => mutation.mutateAsync({ ...payload, id })}
            onRemove={(id) => deleteMutation.mutateAsync(id)}
            renderForm={(form, isEditing, submit) => (
                <>
                    <FormVet defaultValues={form} isEditing={isEditing} onSubmit={async (payload) => submit(payload)} />
                </>
            )}
            renderAction={(row, triggerConfirm) => (<>
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => triggerConfirm({
                        title: `¿${row.activo ? "Desactivar" : "Activar"} veterinaria?`,
                        description: `La Veterinaria: ${row.nombre} quedará ${row.activo ? "inactivo" : "activo"} en la plataforma.`,
                        textConfirm: `Actualizar`,
                        onConfirm: () => {
                            toggleMutation.mutateAsync(row);
                        },
                    })}
                    aria-label="toggle-user"
                    className="text-primary hover:text-primary"
                >
                    <ToggleLeft className="w-4 h-4" />
                </Button>
            </>)}
        />
    );
};

export default VeterinariasPage;
