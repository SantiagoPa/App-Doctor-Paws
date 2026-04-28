
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import * as z from 'zod';
import { useApiCall } from '@/hooks/useApiCall';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { onDynamicMethod } from '@/services/dynamic.service';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LayoutLoader } from '@/components/custom/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { useDepartamento, type ListTerritorialEntity } from '@/hooks/useDepartamento';
import { useAuthStore } from '../store/auth.store';
import type { LoginUser } from '@/types/auth.type';

const formSchema = z.object({
    "nombre_completo": z.string().min(6, "debe tener al menos 6 caracteres").nonempty("El nombre_completo es requerido"),
    "user": z.string().nonempty("El user es requerido"),
    "password": z.string().min(6, "La contraseña debe tener mínimo 6 caracteres")
        .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
        .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
        .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
    "cedula": z.string().min(7, "debe tener al menos 7 caracteres").nonempty("La cedula es requerido"),
    "correo": z.string().nonempty("El correo es requerido"),
    "celular": z.string().min(10, "Debe tener al menos 10 caracteres").max(10, "No debe tener mas de 10 caracteres").nonempty("El celular es requerido"),
    "sexo": z.string().nonempty("El sexo es requerido"),
    "roles": z.string().nonempty("El roles es requerido"),
    "departamento": z.string().nonempty("El departamento es requerido"),
    "municipio": z.string().nonempty("El municipio es requerido"),
    "acepta_terminos": z.literal(true, "Debe aceptar los terminos"),
    "fuente_registro": z.string().nonempty("La fuente_registro es requerida"),
    "version_terminos": z.string().nonempty("La fuente_registro es requerida"),
});

export const RegisterForm = () => {

    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { callEndpoint, isLoading } = useApiCall();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "nombre_completo": "",
            "user": "",
            "password": "",
            "cedula": "",
            "correo": "",
            "celular": "",
            "sexo": "",
            "departamento": "",
            "municipio": "",
            "acepta_terminos": undefined,
            "fuente_registro": "",
            "version_terminos": "1.1",
            "roles": "USER",
        }
    });

    const { departamentos, municipios, isLoading: isLoadingTerritorialEntity } = useDepartamento(form.watch("departamento"))

    const onSubmit = async (payload: z.infer<typeof formSchema>) => {
        const { result, status } = await callEndpoint<LoginUser>(onDynamicMethod({
            method: "POST",
            endpoint: "/auth/register",
            payload: { ...payload }
        }));
        if (status === 201 && result) {
            const { access_token, ...user} = result;
            login({token: result.access_token, user });
            navigate("/app");
            toast.success("¡Cuenta creada! 🎉");
        }
    }

    return (
        <LayoutLoader fullScreen isLoading={isLoading || isLoadingTerritorialEntity}>
            <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-float border border-white dark:bg-primary-foreground"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
                            <Stethoscope className="w-8 h-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-display font-extrabold text-center mb-2">
                        Crea tu cuenta
                    </h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Únete y cuida mejor a tu mascota"
                    </p>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        {/* Sección: Información personal */}
                        <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">
                            <Controller
                                name="nombre_completo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="col-span-2" data-invalid={fieldState.invalid}>
                                        <FieldLabel>Nombre completo</FieldLabel>
                                        <Input {...field} placeholder="Juan Camilo..." autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="user"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Usuario</FieldLabel>
                                        <Input {...field} placeholder="jcamilo" autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Contraseña</FieldLabel>
                                        <Input {...field} type="password" placeholder="••••••••" autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="cedula"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Cédula</FieldLabel>
                                        <Input {...field} placeholder="7288229" autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="correo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Correo</FieldLabel>
                                        <Input {...field} type="email" placeholder="tu@correo.com" autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="celular"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Celular</FieldLabel>
                                        <Input {...field} placeholder="3123425326" autoComplete="off" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {/* Sección: Ubicación y datos adicionales */}
                        <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">
                            <Controller
                                name="sexo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Sexo</FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                aria-invalid={fieldState.invalid}
                                            >
                                                <SelectValue placeholder="seleccione una opcion" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MASCULINO">Masculino</SelectItem>
                                                <SelectItem value="FEMENINO">Femenino</SelectItem>
                                                <SelectItem value="PREFIERO_NO_DECIR">Prefiero no decir</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="fuente_registro"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Fuente de registro</FieldLabel>
                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                aria-invalid={fieldState.invalid}
                                            >
                                                <SelectValue placeholder="Seleccione una opcion" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="TikTok">TikTok</SelectItem>
                                                <SelectItem value="Facebook">Facebook</SelectItem>
                                                <SelectItem value="Instagram">Instagram</SelectItem>
                                                <SelectItem value="Qr">Qr</SelectItem>
                                                <SelectItem value="Referido">Referido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="departamento"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Departamento</FieldLabel>
                                        <Combobox items={departamentos} name={field.name} value={field.value} onValueChange={field.onChange}>
                                            <ComboboxInput placeholder="Seleccione un departamento" />
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item: ListTerritorialEntity) => (
                                                        <ComboboxItem key={item.codigo} value={item.nombre}>
                                                            {item.nombre}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="municipio"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Municipio</FieldLabel>
                                        <Combobox items={municipios} name={field.name} value={field.value} onValueChange={field.onChange}>
                                            <ComboboxInput placeholder="Seleccione un municipio" />
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item: ListTerritorialEntity) => (
                                                        <ComboboxItem key={item.codigo} value={item.nombre}>
                                                            {item.nombre}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        {/* Sección: Términos y submit */}
                        <FieldGroup className="flex flex-col gap-3">
                            <Controller
                                name="acepta_terminos"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field className="flex flex-row items-start" data-invalid={fieldState.invalid}>
                                        <div className="flex flex-row items-center gap-2">
                                            <Checkbox
                                                name={field.name}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="size-4 shrink-0"  // 👈 shrink-0 evita que se estire
                                            />
                                            <FieldLabel className="mb-0 cursor-pointer font-normal">
                                                Acepto términos y condiciones
                                            </FieldLabel>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </div>
                                    </Field>
                                )}
                            />
                            <Button type="submit" size="lg" className="w-full">
                                Crear cuenta
                            </Button>
                        </FieldGroup>

                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/auth/login" className="text-primary-deep font-bold hover:underline">
                            Inicia sesión
                        </Link>

                    </p>
                </motion.div>
            </div>
        </LayoutLoader>
    )
}
