import type { StatusPlanDirVet } from "./vet.type";

export type StatusSuscriptionVet = "ACTIVA" | "VENCIDA" | "CANCELADA" | "PENDIENTE_PAGO" | "COMPLETADA";
export interface SuscriptionVet {
    id: string;
    plan_directorio: string;
    precio_cop: string;
    estado: StatusSuscriptionVet;
    fecha_inicio: Date;
    fecha_vencimiento: Date;
    referencia_pago: string;
    metodo_pago: string;
    renovacion_auto: boolean;
    created_at: Date;
    veterinaria_id: string;
    veterinaria: { 
        nombre: string; 
        plan_directorio: StatusPlanDirVet
    }
}
