

export interface PayloadQuery {
    condicion_detectada:   string;
    nivel_urgencia:        string;
    sintoma_principal:     string;
    municipio_consulta:    string;
    departamento_consulta: string;
    resolucion:            string;
    usuario_id:            string;
    mascota_id:            string;
    suscripcion_id:        string;

    id: string;
}

export interface Query {
    id:                    string;
    condicion_detectada:   string;
    nivel_urgencia:        string;
    sintoma_principal:     string;
    tiene_foto:            boolean;
    municipio_consulta:    string;
    departamento_consulta: string;
    resolucion:            string;
    tokens_usados:         null;
    duracion_segundos:     null;
    fecha_consulta:        Date;
    usuario_id:            string;
    mascota_id:            string;
    suscripcion_id:        string;
}
