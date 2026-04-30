import z from "zod";

export const formRegisterSchema = z.object({
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

export type FormRegisterType = z.infer<typeof formRegisterSchema>;