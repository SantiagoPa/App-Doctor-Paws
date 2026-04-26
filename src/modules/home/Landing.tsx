import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CatSvg, DogSvg, FloatingPaws, PawPrint } from "@/components/custom/PetIllustrations";
import { Sparkles, MessageCircleHeart, ShieldCheck, Heart, Stethoscope, Clock } from "lucide-react";

const Landing = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-hero pt-12 pb-20 px-5 lg:pt-20 lg:pb-32">
        <FloatingPaws />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur shadow-soft text-sm font-medium text-primary-deep">
              <Sparkles className="w-4 h-4" />
              Asistente veterinario con IA
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.05]">
              Cuidamos a tu{" "}
              <span className="bg-linear-to-r from-primary-deep via-primary to-secondary-deep bg-clip-text text-transparent">
                mejor amigo
              </span>{" "}
              con cariño 🐾
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Describe los síntomas de tu perrito o gatito y nuestra IA te dará una orientación inicial,
              clara y empática, mientras encuentras un veterinario.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button  variant="hero" size="lg" asChild>
                <Link to="/auth/register">
                  <Heart className="w-5 h-5" />
                  Empezar gratis
                </Link>
              </Button>
              <Button variant="soft" size="lg" asChild>
                <Link to="/auth/login">Ya tengo cuenta</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-sky border-2 border-background" />
                <div className="w-10 h-10 rounded-full bg-gradient-warm border-2 border-background" />
                <div className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-background" />
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">+2.300</span> tutores ya nos consultan
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-125 hidden lg:block"
          >
            {/* Big circle backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-105 h-105 rounded-full bg-gradient-sky shadow-glow" />
              <div className="absolute w-85 h-85 rounded-full bg-white/40 backdrop-blur" />
            </div>
            {/* Cat */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 top-12 w-56 h-56 drop-shadow-2xl"
            >
              <CatSvg className="w-full h-full" />
            </motion.div>
            {/* Dog */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-2 bottom-8 w-64 h-64 drop-shadow-2xl"
            >
              <DogSvg className="w-full h-full" />
            </motion.div>
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 right-12 bg-white rounded-2xl shadow-float p-4 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Diagnóstico inicial</p>
                <p className="text-sm font-bold">en 30 segundos</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-float p-4 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/40 flex items-center justify-center">
                <MessageCircleHeart className="w-5 h-5 text-secondary-deep" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Chat 24/7</p>
                <p className="text-sm font-bold">siempre disponible</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 flex justify-center lg:py-28 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-bold text-primary-deep uppercase tracking-wider mb-3">
              ¿Cómo te ayudamos?
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Pensado para tutores que aman a sus mascotas
            </h2>
            <p className="text-muted-foreground text-lg">
              Una guía clara cuando notas algo extraño en tu peludito.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Síntomas claros",
                desc: "Describe lo que ves: vómito, decaimiento, no come… La IA hace preguntas específicas.",
                bg: "bg-gradient-sky",
                color: "text-primary-deep",
              },
              {
                icon: Heart,
                title: "Tono empático",
                desc: "Te orientamos sin alarmismos, con un lenguaje cálido y profesional.",
                bg: "bg-gradient-warm",
                color: "text-secondary-foreground",
              },
              {
                icon: Clock,
                title: "Disponible siempre",
                desc: "A las 3 a.m. tu mascota no se siente bien. Estamos aquí para orientarte.",
                bg: "bg-gradient-peach",
                color: "text-secondary-foreground",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card rounded-3xl p-8 shadow-card hover:shadow-float transition-smooth border border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-bounce`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 flex justify-center bg-gradient-hero relative overflow-hidden">
        <FloatingPaws />
        <div className="container relative">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">Tres pasitos sencillos</h2>
            <p className="text-muted-foreground">Empieza a cuidar mejor a tu mascota hoy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { n: "01", t: "Crea tu cuenta", d: "Regístrate y agrega a tus mascotas con su raza y edad." },
              { n: "02", t: "Cuéntanos los síntomas", d: "Describe lo que notas raro: comportamiento, apetito, físico." },
              { n: "03", t: "Recibe orientación", d: "La IA te sugiere posibles causas y cuándo ir al veterinario." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl p-8 shadow-soft text-center"
              >
                <div className="text-6xl font-display font-extrabold bg-linear-to-br from-primary to-secondary-deep bg-clip-text text-transparent mb-3">
                  {s.n}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-muted-foreground text-sm">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 flex justify-center bg-background">
        <div className="container">
          <div className="relative bg-gradient-primary rounded-[3rem] p-10 md:p-16 text-center overflow-hidden shadow-glow">
            <PawPrint className="absolute -top-8 -left-8 w-40 h-40 text-white/10" />
            <PawPrint className="absolute -bottom-12 -right-8 w-52 h-52 text-white/10" />
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-primary-foreground mb-4 relative">
              Tu mascota merece atención inmediata
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto relative">
              Únete gratis y empieza a cuidar mejor a tu peludito.
            </p>
            <Button variant="secondary" size="lg" asChild className="relative">
              <Link to="/auth/register">
                <Heart className="w-5 h-5" /> Crear mi cuenta gratis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        🐾 Doctor Huellitas · Asistente con IA · No reemplaza una consulta veterinaria profesional
      </footer>
    </div>
  );
};

export default Landing;