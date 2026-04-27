import { Link, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { motion } from "framer-motion";
import { MessageCircleHeart, PawPrint, Plus, Calendar, Activity, Sparkles } from "lucide-react";
import { useAuthStore } from "../auth/store/auth.store";

const DashboardPage = () => {
  const { pets } = useAuth();
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;

  const dogs = pets.filter((p) => p.species === "perro").length;
  const cats = pets.filter((p) => p.species === "gato").length;

  return (
    <div className="py-10 space-y-8 mx-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-hero rounded-3xl p-8 md:p-10 overflow-hidden shadow-card"
      >
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-bold text-primary-deep mb-3">
            <Sparkles className="w-3 h-3" /> Tu panel de cuidado
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
            Hola, <span className="capitalize">{user.nombre_completo}</span> 👋
          </h1>
          <p className="text-muted-foreground mb-6">
            Aquí tienes todo lo que necesitas para cuidar a tus peluditos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button  asChild>
              <Link to="/app/chat"><MessageCircleHeart className="w-4 h-4" /> Consultar a la IA</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/app/mascotas"><Plus className="w-4 h-4" /> Agregar mascota</Link>
            </Button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 hidden md:flex items-end gap-2 opacity-90">
          <CatSvg className="w-32 h-32" />
          <DogSvg className="w-40 h-40" />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Mascotas", value: pets.length, icon: PawPrint, bg: "bg-gradient-sky", color: "text-primary-deep" },
          { label: "Perritos", value: dogs, icon: PawPrint, bg: "bg-gradient-warm", color: "text-secondary-foreground" },
          { label: "Gatitos", value: cats, icon: PawPrint, bg: "bg-gradient-peach", color: "text-secondary-foreground" },
          { label: "Consultas", value: 0, icon: Activity, bg: "bg-gradient-primary", color: "text-primary-foreground" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-5 shadow-card border border-border/50 hover:shadow-soft transition-smooth"
          >
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-3xl font-display font-extrabold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pets quick view */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-3xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-display font-bold">Tus mascotas</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/mascotas">Ver todas →</Link>
            </Button>
          </div>
          {pets.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-4">
                <DogSvg className="w-full h-full opacity-50" />
              </div>
              <p className="text-muted-foreground mb-4">Aún no has agregado mascotas</p>
              <Button  asChild>
                <Link to="/app/mascotas"><Plus className="w-4 h-4" /> Agregar mi primera mascota</Link>
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {pets.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted transition-smooth">
                  <div className="w-14 h-14 shrink-0">
                    {p.species === "perro" ? <DogSvg className="w-full h-full" /> : <CatSvg className="w-full h-full" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{p.breed} · {p.age} años</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-primary rounded-3xl p-6 text-primary-foreground relative overflow-hidden shadow-glow">
          <PawPrint className="absolute -bottom-6 -right-6 w-32 h-32 text-white/15" />
          <MessageCircleHeart className="w-10 h-10 mb-3" />
          <h3 className="text-xl font-display font-bold mb-2">¿Algo no anda bien?</h3>
          <p className="text-primary-foreground/80 text-sm mb-5">
            Consulta a nuestra IA. Te orienta con los síntomas en segundos.
          </p>
          <Button variant="soft" asChild>
            <Link to="/app/chat">Hacer consulta</Link>
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary-deep" />
          <h2 className="text-xl font-display font-bold">Consejos del día</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Hidratación", d: "Asegúrate de que tu mascota tenga siempre agua fresca y limpia." },
            { t: "Ejercicio diario", d: "30-60 min de actividad ayudan a un perro feliz y sano." },
            { t: "Visita al vet", d: "Una revisión cada 6 meses previene muchos problemas." },
          ].map((t) => (
            <div key={t.t} className="p-4 rounded-2xl bg-gradient-hero">
              <p className="font-bold mb-1">{t.t}</p>
              <p className="text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;