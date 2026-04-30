
export interface Suscription {
    id: string;
    estado: string;
    fecha_inicio: Date;
    fecha_vencimiento: Date;
    consultas_usadas: number;
    consultas_limite: number;
    metodo_pago: string;
    referencia_pago: string;
    renovacion_auto: boolean;
    created_at: Date;
    usuario_id: string;
    plan_id: number;
}
