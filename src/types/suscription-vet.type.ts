
export interface SuscriptionVet {
    id:                string;
    plan_directorio:   string;
    precio_cop:        string;
    estado:            string;
    fecha_inicio:      Date;
    fecha_vencimiento: Date;
    referencia_pago:   string;
    metodo_pago:       string;
    renovacion_auto:   boolean;
    created_at:        Date;
    veterinaria_id:    string;
}
