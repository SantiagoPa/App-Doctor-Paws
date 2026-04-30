import z from "zod";

export const formVetSchema = z.object({
    "nombre": z.string().min(6, "debe tener al menos 6 caracteres").nonempty("El nombre es requerido"),
    "nit": z.string().nonempty("El nit es requerido"),
    "contacto_nombre": z.string().nonempty("El contacto_nombre es requerido"),
    "correo": z.string().nonempty("El correo es requerido"),
    "celular": z.string().nonempty("El celular es requerido"),
    "departamento": z.string().nonempty("El departamento es requerido"),
    "municipio": z.string().nonempty("El municipio es requerido"),
    "direccion": z.string().nonempty("El direccion es requerido"),
    "precio_consulta_min": z.string().nonempty("El precio_consulta_min es requerido"),
    "precio_consulta_max": z.string().nonempty("El precio_consulta_max es requerido"),
    "plan_directorio":  z.string().nonempty("El plan_directorio es requerido")
});

export type FormVetType = z.infer<typeof formVetSchema>;