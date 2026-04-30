import { useMemo } from "react";
import { Users, Package, Building2, CreditCard, ShieldCheck, AlertTriangle } from "lucide-react";

import { AlertEpidemiologica, Stat } from "./views/dashboard/components";
import { LayoutLoader } from "@/components/custom/Loader";

import { useUsers } from "../shared/hooks/useUsers";
import { usePlanes } from "../shared/hooks/usePlanes";
import { useVets } from "../shared/hooks/useVets";
import { useSuscriptions } from "../shared/hooks/useSuscriptions";
import { useSuscriptionsVet } from "../shared/hooks/useSuscriptionsVet";
import { useAlertsEpidemiologica } from "../shared/hooks/useAlertsEpidemiologica";



const DashboardAdmin = () => {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: planes, isLoading: isLoadingPlanes } = usePlanes();
  const { data: vets, isLoading: isLoadingVets } = useVets();
  const { data: suscriptions, isLoading: isLoadingSuscriptions } = useSuscriptions();
  const { data: suscriptionsVet, isLoading: isLoadingSuscriptionsVet } = useSuscriptionsVet();
  const { data: alert, isLoading: isLoadingAlert } = useAlertsEpidemiologica();
  // const activeAlerts = alertas.filter((x) => x.level === "alta" || x.level === "crítica").length;
  // const activeSus = suscripciones.filter((s) => s.status === "activa").length + suscripcionesVet.filter((s) => s.status === "activa").length;

  const activeSuscription = useMemo(() => {
    if (!suscriptions) return [];
    return suscriptions.filter(s => s.estado === "ACTIVA");
  }, [suscriptions]);

  // const activeSuscription = useMemo(() => {
  //   if (!suscriptions) return [];
  //   return suscriptions.filter(s => s.estado === "ACTIVA");
  // }, [suscriptions]);

  return (
    <LayoutLoader fullScreen isLoading={isLoadingUsers || isLoadingPlanes || isLoadingVets || isLoadingSuscriptions || isLoadingSuscriptionsVet || isLoadingAlert}>

      <div className="space-y-6 animate-fade-up">
        <div>
          <h2 className="font-display font-bold text-3xl">Resumen general</h2>
          <p className="text-muted-foreground">Vista rápida del estado de la plataforma</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            users && (
              <Stat label="Usuarios" value={users.length} icon={Users} to="/admin/user" gradient="bg-gradient-primary" />
            )
          }

          {
            planes && (
              <Stat label="Planes" value={planes.length} icon={Package} to="/admin/planes" gradient="bg-gradient-warm" />
            )
          }

          {
            vets && (
              <Stat label="Veterinarias" value={vets.length} icon={Building2} to="/admin/veterinarias" gradient="bg-gradient-sky" />
            )
          }

          {
            activeSuscription && (
              <Stat label="Suscripciones activas" value={activeSuscription.length} icon={CreditCard} to="/admin/suscripciones" gradient="bg-gradient-primary" />
            )
          }

          {
            suscriptionsVet && (
              <Stat label="Suscripciones veterinarias" value={suscriptionsVet.length} icon={ShieldCheck} to="/admin/suscripciones-vet" gradient="bg-gradient-peach" />
            )
          }

          {
            alert && (
              <Stat label="Alertas" value={alert.length} icon={AlertTriangle} to="/admin/alertas" gradient="bg-gradient-warm" />
            )
          }

        </div>
        {
          alert && (
            <AlertEpidemiologica alert={alert} />
          )
        }
      </div>
    </LayoutLoader>

  );
};

export default DashboardAdmin;