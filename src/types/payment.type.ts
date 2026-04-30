
export type StatusPayment = "INICIADO" | "PENDIENTE" | "APROBADO" | "RECHAZADO" | "ANULADO" | "ERROR";

export type WompiStatus = "TARJETA_CREDITO" | "TARJETA_DEBITO" | "PSE" | "NEQUI" | "BANCOLOMBIA_TRANSFER" | "EFECTY" | "DAVIPLATA"

export interface Payment {
    id:                    string;
    usuario_id:            string;
    suscripcion_id:        string | null;
    referencia:            string;
    monto_cop:             string;
    moneda:                "COP";
    estado:                StatusPayment;
    firma_integridad:      string;
    redirect_url:          string;
    expiration_time:       string;
    wompi_id:              string | null;
    wompi_estado:          WompiStatus;
    wompi_metodo_pago:     string | null;
    wompi_referencia_pago: string | null;
    wompi_webhook_raw:     string | null;
    wompi_fecha_pago:      string | null;
    ip_usuario:            string;
    user_agent:            string;
    created_at:            Date;
    updated_at:            Date;
}
