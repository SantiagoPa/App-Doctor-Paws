
import { CrudPage } from "@/components/custom/admin";
import type { SuscriptionVet } from "@/types/suscription-vet.type";
import { ShieldCheck } from "lucide-react";
import { useSuscriptionsVet } from "../shared/hooks/suscriptions";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils";


const SuscripcionesVetPage = () => {

  const { data: suscriptionVet } = useSuscriptionsVet();

  return (
    <CrudPage<SuscriptionVet, any>
      title="Suscripciones Veterinarias"
      subtitle="Planes contratados por clínicas veterinarias"
      icon={<ShieldCheck className="w-5 h-5" />}
      data={suscriptionVet ?? []}
      notActions
      searchKeys={["estado", "plan_directorio", "metodo_pago"]}
      columns={[
        { key: "veterinaria.nombre", label: "Veterinaria" },
        {
          key: "estado", label: "Estado Suscripcion",
          render: (s) => <Badge variant={s.estado === "ACTIVA" ? "default" : "outline"} >{s.estado}</Badge>,
        },
        {
          key: "veterinaria.plan_directorio", label: "Plan",
          render: (s) => <Badge variant={s.veterinaria.plan_directorio === "PREMIUM" ? "default" : "outline"} >{s.veterinaria.plan_directorio}</Badge>,
        },
        {
          key: "precio_cop", label: "Precio COP",
          render: (s) => <Badge variant={"ghost"} >{formatCurrency(+s.precio_cop)}</Badge>,
        },
        { key: "metodo_pago", label: "Metodo Pago" },
        { key: "referencia_pago", label: "Referencia Pago" },
        { key: "fecha_inicio", label: "Fecha Inicio" },
        { key: "fecha_vencimiento", label: "Fecha Vencimiento" },
      ]}
      emptyForm={undefined}
      onAdd={() => null}
      onUpdate={() => null}
      onRemove={() => null}
      renderForm={() => null}
    />
  );
};

export default SuscripcionesVetPage;
