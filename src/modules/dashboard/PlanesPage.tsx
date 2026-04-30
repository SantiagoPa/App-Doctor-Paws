// import { useAdmin, type Plan } from "@/context/AdminContext";
import { Package } from "lucide-react";
import { CrudPage } from "@/components/custom/admin";
import { formatCurrency } from "@/utils/formatCurrency";
import { FormPlans } from "./views/planes/components/FormPlans";
import type { Plan } from "@/types/plan.type";
import type { FormPlansType } from "../shared/schemas/FormPlansSchema";
import { usePlan, usePlanes } from "../shared/hooks/planes";

const empty: FormPlansType = {
  nombre: "",
  precio_cop: "0",
  consultas_incluidas: 0,
  duracion_dias: 0,
  descripcion: ""
};


const PlanesPage = () => {
  const { data: planes } = usePlanes();
  const { mutation, deleteMutation } = usePlan()

  return (
    <CrudPage<Plan, FormPlansType>
      title="Planes"
      subtitle="Configura los planes de suscripción"
      icon={<Package className="w-5 h-5" />}
      data={planes ?? []}
      searchKeys={["nombre", "duracion_dias"]}
      columns={[
        { key: "nombre", label: "Nombre" },
        { key: "descripcion", label: "Descripcion" },
        { key: "precio_cop", label: "Precio", render: (p) => <span className="font-semibold">{formatCurrency(+p.precio_cop)}</span> },
        { key: "consultas_incluidas", label: "Consultas Incluidas", render: (p) => <span className="font-semibold">{ p.consultas_incluidas === -1 ? "Ilimitadas": p.consultas_incluidas}</span> },
        { key: "duracion_dias", label: "Duracion", },
        {
          key: "activo", label: "Estado",
          render: (p) => (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.activo ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
              {p.activo ? "ACTIVO" : "INACTIVO"}
            </span>
          ),
        },
      ]}
      emptyForm={empty}
      onAdd={(payload) => mutation.mutateAsync({ ...payload, id: "new" })}
      onUpdate={(id, payload) => mutation.mutateAsync({ id, ...payload })}
      onRemove={(id) => deleteMutation.mutateAsync(id)}
      renderForm={(form, isEditing, submit) => (
        <>
          <FormPlans defaultValues={form} isEditing={isEditing} onSubmit={async (payload) => submit(payload)} />
        </>
      )}
    />
  );
};

export default PlanesPage;
