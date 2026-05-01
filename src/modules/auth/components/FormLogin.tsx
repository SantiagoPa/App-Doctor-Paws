
import { motion } from 'framer-motion';
import { Lock, Mail, Stethoscope } from 'lucide-react';
import { Link } from 'react-router';
import * as z from 'zod';
import { useAuthStore } from '../store/auth.store';
import { useApiCall } from '@/hooks/useApiCall';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginUser } from '@/types/auth.type';
import { onDynamicMethod } from '@/services/dynamic.service';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutLoader } from '@/components/custom/Loader';

const formSchema = z.object({
    email: z.string().nonempty("El email es requerido"),
    password: z.string().nonempty("La contraseña es requerida")
});

export const FormLogin = () => {

    const { login } = useAuthStore();
    const { callEndpoint, isLoading } = useApiCall();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = async (payload: z.infer<typeof formSchema>) => {
        const { result, status } = await callEndpoint<LoginUser>(onDynamicMethod({
            method: "POST",
            endpoint: "/auth/login",
            payload: { correo: payload.email, password: payload.password }
        }));
        if (status === 201 && result) {
            const { access_token, ...user } = result;
            login({ token: access_token, user });
            console.log("navigate: app");
            toast.success("¡Bienvenido de vuelta! 🐾");
        }
    }

    return (
        <LayoutLoader fullScreen isLoading={isLoading}>
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
                        ¡Bienvenido de vuelta!
                    </h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Tu peludito te está esperando 🐾
                    </p>

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            <Mail className={
                                                cn(
                                                    "w-4 h-4 text-muted-foreground",
                                                    {
                                                        "text-red-500": fieldState.error
                                                    }
                                                )
                                            } />
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="tu@correo.com"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            <Lock className={
                                                cn(
                                                    "w-4 h-4 text-muted-foreground",
                                                    {
                                                        "text-red-500": fieldState.error
                                                    }
                                                )
                                            } />
                                            Contraseña
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="••••••••"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        <FieldGroup>

                            <Button type="submit" size="lg" className="w-full mt-2">
                                Iniciar sesión
                            </Button>
                        </FieldGroup>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿No tienes cuenta?{" "}
                        <Link to="/auth/register" className="text-primary-deep font-bold hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </motion.div>
            </div>
        </LayoutLoader>
    )
}
