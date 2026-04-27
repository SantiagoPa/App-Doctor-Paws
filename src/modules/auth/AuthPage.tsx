import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CatSvg, DogSvg, FloatingPaws } from "@/components/custom/PetIllustrations";
import { motion } from "framer-motion";
import { Stethoscope, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { useCustomForm } from "@/hooks/useCustomForm";
import type { LoginForm, LoginUser } from "@/types/auth.type";
import { useApiCall } from "@/hooks/useApiCall";
import { onDynamicMethod } from "@/services/dynamic.service";
import { useAuthStore } from "./store/auth.store";
import { LayoutLoader } from "@/components/custom/Loader";

type Mode = "login" | "register";

const AuthPage = ({ mode }: { mode: Mode }) => {

  const { callEndpoint, isLoading } = useApiCall();
  // const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, handleInputChange } = useCustomForm({ name: "", email: "", password: "" });
  const { login } = useAuthStore();

  const onLogin = async (payload: LoginForm) => {
    const { result, status } = await callEndpoint<LoginUser>(onDynamicMethod({
      method: "POST",
      endpoint: "/auth/login",
      payload: payload
    }));
    if (status === 201 && result) {
      const { access_token, ...user } = result;
      login({ token: access_token, user });
      toast.success("¡Bienvenido de vuelta! 🐾");
      navigate("/app");
    }

  }

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "login") {
      await onLogin({ correo: email, password });
    }
    // const ok = mode === "login" ? await onLogin({email, password}) : register(name, email, password);
    // if (ok) {
    //   toast.success(mode === "login" ? "¡Bienvenido de vuelta! 🐾" : "¡Cuenta creada! 🎉");
    //   navigate("/app");
    // } else {
    //   toast.error("Por favor completa todos los campos");
    // }
  };

  return (
    <LayoutLoader isLoading={isLoading} >
      <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-gradient-hero relative">
        <FloatingPaws />
        {/* Form side */}
        <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-float border border-white dark:bg-primary-foreground"
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
                      name="name"
                      value={name}
                      onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
                    name="password"
                    value={password}
                    onChange={(e) => handleInputChange(e.target.value, e.target.name)}
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
    </LayoutLoader>

  );
};

export default AuthPage;