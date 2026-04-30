
import { CrudPage } from "@/components/custom/admin";
import type { Suscription } from "@/types/suscription.type";
import { CreditCard } from "lucide-react";
import { useSuscriptions } from "../shared/hooks/suscriptions";
import { Badge } from "@/components/ui/badge";


const SuscripcionesPage = () => {
  const { data: suscription } = useSuscriptions();

  return (
    <CrudPage<Suscription, any>
      title="Suscripciones"
      subtitle="Suscripciones de usuarios finales"
      icon={<CreditCard className="w-5 h-5" />}
      notActions
      data={suscription ?? []}
      searchKeys={["estado", "metodo_pago"]}
      columns={[
        { key: "usuario.nombre_completo", label: "Usuario" },
        {
          key: "plan.nombre", label: "Plan Directorio",
          render: (s) => (<Badge variant={"outline"}>{s.plan.nombre}</Badge>),
        },
        {
          key: "estado", label: "Estado",
          render: (s) => (<Badge variant={"secondary"}>{s.estado}</Badge>),
        },
        { key: "fecha_inicio", label: "Fecha Inicio" },
        { key: "fecha_vencimiento", label: "Fecha Vencimiento" },
        { key: "metodo_pago", label: "Metodo de pago" },
        { key: "referencia_pago", label: "Referencia Pago" },
      ]}
      emptyForm={undefined}
      onAdd={() => null}
      onUpdate={() => null}
      onRemove={() => null}
      renderForm={() => null}
    />
  );
};

export default SuscripcionesPage;
