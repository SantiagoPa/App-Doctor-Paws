import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CatSvg, DogSvg, FloatingPaws } from "@/components/custom/PetIllustrations";
import { motion } from "framer-motion";
import { Stethoscope, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

type Mode = "login" | "register";

const AuthPage = ({ mode }: { mode: Mode }) => {
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = mode === "login" ? login(email, password) : register(name, email, password);
    if (ok) {
      toast.success(mode === "login" ? "¡Bienvenido de vuelta! 🐾" : "¡Cuenta creada! 🎉");
      nav("/app");
    } else {
      toast.error("Por favor completa todos los campos");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-gradient-hero relative">
      <FloatingPaws />

      {/* Form side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-float border border-white"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <Stethoscope className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-center mb-2">
            {mode === "login" ? "¡Bienvenido de vuelta!" : "Crea tu cuenta"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {mode === "login"
              ? "Tu peludito te está esperando 🐾"
              : "Únete y cuida mejor a tu mascota"}
          </p>

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Tu nombre</Label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="María"
                    className="pl-9 h-12 rounded-2xl"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="pl-9 h-12 rounded-2xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-12 rounded-2xl"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <Link to="/auth/register" className="text-primary-deep font-bold hover:underline">
                  Regístrate
                </Link>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <Link to="/auth/login" className="text-primary-deep font-bold hover:underline">
                  Inicia sesión
                </Link>
              </>
            )}
          </p>
        </motion.div>
      </div>

      {/* Visual side */}
      <div className="hidden lg:flex items-center justify-center p-12 relative">
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-8 rounded-full bg-white/40 backdrop-blur" />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-0 top-8 w-56 h-56"
          >
            <DogSvg className="w-full h-full drop-shadow-2xl" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            className="absolute right-0 bottom-8 w-48 h-48"
          >
            <CatSvg className="w-full h-full drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;