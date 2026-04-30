import { LayoutLoader } from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDepartamento, type ListTerritorialEntity } from "@/hooks/useDepartamento";
import { formVetSchema, type FormVetType } from "@/modules/shared/schemas/FormVetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";


interface Props {
    onSubmit: (payload: FormVetType) => Promise<void>;
    defaultValues: FormVetType;
    isEditing?: boolean;
}

export const FormVet = ({ defaultValues, isEditing, onSubmit }: Props) => {

    const form = useForm<FormVetType>({
        resolver: zodResolver(formVetSchema),
        defaultValues: defaultValues
    });

    const { departamentos, municipios, isLoading: isLoadingTerritorialEntity } = useDepartamento(form.watch("departamento"));


    return (
        <LayoutLoader fullScreen isLoading={isLoadingTerritorialEntity}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-6">

                <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <Controller
                        name="nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field className="col-span-2" data-invalid={fieldState.invalid}>
                                <FieldLabel>Nombre</FieldLabel>
                                <Input {...field} placeholder="Veterinaria Perritos Mimosos" autoComplete="off" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="nit"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>NIT</FieldLabel>
                                <Input {...field} placeholder="7283837" autoComplete="off" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="contacto_nombre"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Nombre Contacto</FieldLabel>
                                <Input {...field} placeholder="ej: Jhon Doe" autoComplete="off" aria-invalid={fieldState.invalid} />
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
                                <FieldLabel>celular</FieldLabel>
                                <Input {...field} placeholder="3125467373" autoComplete="off" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Sección: Ubicación y datos adicionales */}
                <FieldGroup className="grid grid-cols-2 gap-x-4 gap-y-3">

                    <Controller
                        name="precio_consulta_min"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Precion Consulta Minimo</FieldLabel>
                                <Input {...field} placeholder="40000" autoComplete="off" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="precio_consulta_max"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Precio Consulta Maximo</FieldLabel>
                                <Input {...field} placeholder="60000" autoComplete="off" aria-invalid={fieldState.invalid} />
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
                                        <ComboboxList className={"z-80"}>
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
                                        <ComboboxList className={"z-80"}>
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
                        name="plan_directorio"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Plan Directorio</FieldLabel>
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
                                        <SelectItem value="BASICO">Basico</SelectItem>
                                        <SelectItem value="DESTACADO">Destacado</SelectItem>
                                        <SelectItem value="PREMIUM">Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="direccion"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Direccion</FieldLabel>
                                <Input {...field} placeholder="ej: Calle 123 # 4-5" autoComplete="off" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* Sección: Términos y submit */}
                <FieldGroup className="flex flex-col gap-3">

                    <Button type="submit" size="lg" className="w-full">
                        {isEditing ? "Actulizar" : "Crear Veterinaria"}
                    </Button>
                </FieldGroup>

            </form>
        </LayoutLoader>
    )
}
