import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    "nombre": z.string().min(3, "debe tener al menos 6 caracteres").nonempty("El nombre es requerido"),
    "especie": z.string().nonempty("la especie es requerida"),
    "fecha_nacimiento": z.string().nonempty("la fecha_nacimiento es requerida"),
    "raza": z.string().nonempty("El raza es requerido"),
    "edad_aproximada": z.string().nonempty("El edad_aproximada es requerido"),
    "sexo": z.string().nonempty("la sexo es requerida"),
    "vacunado": z.string().nonempty("la vacunado es requerida"),
    "color_pelaje": z.string().nonempty("el color_pelaje es requerida"),
    "peso_kg": z.number().nonoptional("el peso_kg es requerida"),
    "foto_url": z.string(),
    "esterilizado": z.boolean().nonoptional("el campo esterilizado es requerida")
});

export type PayloadPet = z.infer<typeof formSchema>;

interface Props {
    dataEdit: PayloadPet;
    isPending: boolean;
    handleSubmit: (payload: PayloadPet) => Promise<void>;
}


export const FormPet = ({ dataEdit, isPending,  handleSubmit }: Props) => {

    const form = useForm<PayloadPet>({
        resolver: zodResolver(formSchema),
        defaultValues: dataEdit
    });


    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">

            {/* Sección: Información personal */}
            <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Controller
                    name="nombre"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="col-span-2" data-invalid={fieldState.invalid}>
                            <FieldLabel>Nombre mascota</FieldLabel>
                            <Input {...field} placeholder="Peacky" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="especie"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Especie</FieldLabel>
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
                                    <SelectItem value="PERRO">Perro</SelectItem>
                                    <SelectItem value="GATO">Gato</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
                <Controller
                    name="fecha_nacimiento"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>fecha de nacimiento</FieldLabel>
                            <Input {...field} type="date" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="raza"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>raza</FieldLabel>
                            <Input {...field} placeholder="Ej: Pitbull" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="edad_aproximada"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>edad años</FieldLabel>
                            <Input {...field} type="number" placeholder="1" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="color_pelaje"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Color pelaje</FieldLabel>
                            <Input {...field} placeholder="blanco, negro o mono" autoComplete="off" aria-invalid={fieldState.invalid} />
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
                                    <SelectItem value="MASCULINO">Macho</SelectItem>
                                    <SelectItem value="FEMENINO">Hembra</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="vacunado"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Estado vacuna</FieldLabel>
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
                                    <SelectItem value="AL_DIA">al dia</SelectItem>
                                    <SelectItem value="PARCIALMENTE">parcialmente</SelectItem>
                                    <SelectItem value="NO">No</SelectItem>
                                    <SelectItem value="NO_SE">No se</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="peso_kg"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>peso_kg</FieldLabel>
                            <Input {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} type="number" placeholder="2" autoComplete="off" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="esterilizado"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field className="flex flex-row items-center" data-invalid={fieldState.invalid}>
                            <div className="flex flex-row items-center gap-2">
                                <Checkbox
                                    name={field.name}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="size-4 shrink-0"  // 👈 shrink-0 evita que se estire
                                />
                                <FieldLabel className="mb-0 cursor-pointer font-normal">
                                    Esterilizado
                                </FieldLabel>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </div>
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* Sección: Términos y submit */}
            <FieldGroup className="flex flex-col gap-3">
                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                    {dataEdit ? "Guardar cambios" : "Agregar mascota"}
                </Button>
            </FieldGroup>

        </form>

    )
}
