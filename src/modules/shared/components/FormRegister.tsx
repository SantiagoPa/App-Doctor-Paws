import z from "zod"
import { LayoutLoader } from "@/components/custom/Loader"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDepartamento, type ListTerritorialEntity } from "@/hooks/useDepartamento"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { formRegisterSchema, type FormRegisterType } from "../schemas/FormRegisterSchema"




interface Props {
    onSubmit: (payload: FormRegisterType) => Promise<void>;
    defaultValues?: FormRegisterType;
    isEditing?: boolean;
}

export const FormRegister = ({ defaultValues, isEditing, onSubmit }: Props) => {

    const form = useForm<z.infer<typeof formRegisterSchema>>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: defaultValues ? defaultValues : {
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

    const { departamentos, municipios, isLoading: isLoadingTerritorialEntity } = useDepartamento(form.watch("departamento"));


    return (
        <LayoutLoader fullScreen isLoading={isLoadingTerritorialEntity}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-6">

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
                                <Input {...field} type="password" placeholder="••••••••" autoComplete="off" aria-invalid={fieldState.invalid} disabled={isEditing} />
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
                                        disabled={isEditing}
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
                        {isEditing ? "Actulizar" : "Crear cuenta"}
                    </Button>
                </FieldGroup>

            </form>
        </LayoutLoader>
    )
}
