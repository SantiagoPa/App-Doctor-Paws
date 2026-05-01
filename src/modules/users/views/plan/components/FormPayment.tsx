import { Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react"
import { motion } from 'framer-motion';

import { Separator } from "@/components/ui/separator"
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { Plan } from "@/types/plan.type";
import type { User as UserType } from "@/types/auth.type";
// import { ButtonWompi } from "@/components/custom/ButtonWompi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
    nombre: z.string().nonempty("El email es requerido"),
    correo: z.string().nonempty("La contraseña es requerida"),
    address: z.string().nonempty("La direccion es requerida"),
    region: z.string().nonempty("La region es requerida"),
});


interface Props {
    plan: Plan;
    user: UserType;
    onSetDataContact: (payload: z.infer<typeof formSchema>) => void;
}


export const FormPayment = ({ plan, user, onSetDataContact }: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { correo: user.correo, nombre: user.nombre_completo, address: "", region: "" }
    });

    const onSubmit = async (payload: z.infer<typeof formSchema>) => {
        onSetDataContact(payload);
        toast.info(`Datos configurados correctamente 🎉 - paga con wompi`)
    }

    return (

        <motion.div
            onSubmit={form.handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 lg:p-10 shadow-card border border-border/50 space-y-8"
        >
            <article>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                    <Sparkles className="w-4 h-4" /> Finaliza tu suscripción
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold">Pagar {plan.nombre}</h1>
                <p className="text-muted-foreground mt-2">
                    Completa tus datos para activar tu plan al instante.
                </p>
            </article>

            {/* Contact */}
            <form className="space-y-4">
                <h2 className="font-display font-bold text-lg">1. Datos de contacto</h2>
                <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Controller
                        name="correo"
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
                                    disabled
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
                        name="nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    <User className={
                                        cn(
                                            "w-4 h-4 text-muted-foreground",
                                            {
                                                "text-red-500": fieldState.error
                                            }
                                        )
                                    } />
                                    Nombre
                                </FieldLabel>
                                <Input
                                    {...field}
                                    disabled
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Jhon Dow"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    <User className={
                                        cn(
                                            "w-4 h-4 text-muted-foreground",
                                            {
                                                "text-red-500": fieldState.error
                                            }
                                        )
                                    } />
                                    Dirreccion
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Carrera 123 # 4-5"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="region"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    <User className={
                                        cn(
                                            "w-4 h-4 text-muted-foreground",
                                            {
                                                "text-red-500": fieldState.error
                                            }
                                        )
                                    } />
                                    Region/Departamento
                                </FieldLabel>
                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Caribe"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Separator />

                <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Lock className="w-4 h-4" /> Confirmar datos
                </Button>
            </form>


            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                Pago cifrado de extremo a extremo. Cancela cuando quieras.
            </p>
        </motion.div>

    )
}
