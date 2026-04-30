
import z from "zod";

export const formPlansSchema = z.object({
    nombre: z.string().min(4, "debe tener al menos 6 caracteres").nonempty("El nombre_completo es requerido"), 
    precio_cop:  z.string().nonempty("El precio es requerido"), 
    consultas_incluidas: z.number({ message: "Debe ingresar un numero"}), 
    duracion_dias: z.number({ message: "Debe ingresar la duracion de dias"}), 
    descripcion: z.string().nonempty("La descripcion es requerido"), 
});

export type FormPlansType = z.infer<typeof formPlansSchema>;