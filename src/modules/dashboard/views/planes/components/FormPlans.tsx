import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formPlansSchema, type FormPlansType } from "@/modules/shared/schemas/FormPlansSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

interface Props {
    onSubmit: (payload: FormPlansType) => Promise<void>;
    defaultValues: FormPlansType;
    isEditing?: boolean;
}

export const FormPlans = ({ defaultValues, isEditing, onSubmit }: Props) => {


    const form = useForm<FormPlansType>({
        resolver: zodResolver(formPlansSchema),
        defaultValues: defaultValues
    });

    return (
        <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-6">

            <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Controller
                    name="nombre"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="col-span-2" data-invalid={fieldState.invalid}>
                            <FieldLabel>Nombre Plan</FieldLabel>
                            <Input {...field} placeholder="Plan Premiun" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="descripcion"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="col-span-2" data-invalid={fieldState.invalid}>
                            <FieldLabel>descripcion</FieldLabel>
                            <Textarea {...field} placeholder="descripcion del plan" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="precio_cop"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Precio COP</FieldLabel>
                            <Input {...field} placeholder="jcamilo" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="consultas_incluidas"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Consultas Incluidas</FieldLabel>
                            <Input {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" placeholder="-1 ilimitadas" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="duracion_dias"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Duracion Dias</FieldLabel>
                            <Input {...field} onChange={(e) => field.onChange(+e.target.value)} type="text" placeholder="ej: 30 (30 dias)" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

            </FieldGroup>

            {/* Sección: submit */}
            <FieldGroup className="flex flex-col gap-3">
                <Button type="submit" size="lg" className="w-full">
                    {isEditing ? "Actulizar" : "Crear Plan"}
                </Button>
            </FieldGroup>

        </form>
    )
}
