import { Card } from "@/components/ui/card";
import { useAdmin } from "@/context/AdminContext";
import { Users, Package, Building2, CreditCard, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const Stat = ({
  label,
  value,
  icon: Icon,
  to,
  gradient,
}: {
  label: string;
  value: number | string;
  icon: any;
  to: string;
  gradient: string;
}) => (
  <Link to={to}>
    <Card className="p-5 bg-gradient-card shadow-card hover:shadow-float transition-smooth border-border/60 hover:-translate-y-1 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
          <p className="font-display font-bold text-3xl mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-bounce`}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </Card>
  </Link>
);

const DashboardAdmin = () => {
  const a = useAdmin();
  const activeAlerts = a.alertas.filter((x) => x.level === "alta" || x.level === "crítica").length;
  const activeSus = a.suscripciones.filter((s) => s.status === "activa").length + a.suscripcionesVet.filter((s) => s.status === "activa").length;

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display font-bold text-3xl">Resumen general</h2>
        <p className="text-muted-foreground">Vista rápida del estado de la plataforma</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat label="Usuarios" value={a.users.length} icon={Users} to="/admin/users" gradient="bg-gradient-primary" />
        <Stat label="Planes" value={a.plans.length} icon={Package} to="/admin/planes" gradient="bg-gradient-warm" />
        <Stat label="Veterinarias" value={a.veterinarias.length} icon={Building2} to="/admin/veterinarias" gradient="bg-gradient-sky" />
        <Stat label="Suscripciones activas" value={activeSus} icon={CreditCard} to="/admin/suscripciones" gradient="bg-gradient-primary" />
        <Stat label="Susc. veterinarias" value={a.suscripcionesVet.length} icon={ShieldCheck} to="/admin/suscripciones-vet" gradient="bg-gradient-peach" />
        <Stat label="Alertas críticas" value={activeAlerts} icon={AlertTriangle} to="/admin/alertas" gradient="bg-gradient-warm" />
      </div>

      <Card className="p-6 bg-gradient-card shadow-card border-border/60">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-deep" />
          <h3 className="font-display font-bold text-xl">Últimas alertas epidemiológicas</h3>
        </div>
        <div className="space-y-2">
          {a.alertas.slice(0, 5).map((al) => (
            <div key={al.id} className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border/50">
              <div>
                <p className="font-semibold text-sm">{al.title}</p>
                <p className="text-xs text-muted-foreground">{al.region} · {al.date}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                al.level === "crítica" ? "bg-destructive/15 text-destructive" :
                al.level === "alta" ? "bg-secondary-deep/20 text-secondary-foreground" :
                al.level === "media" ? "bg-primary/15 text-primary-deep" :
                "bg-muted text-muted-foreground"
              }`}>
                {al.level.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardAdmin;