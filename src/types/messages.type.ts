
export type MessageRol = "USUARIO" | "ASISTENTE";

export interface PayloadMessage {
    rol:         MessageRol;
    contenido:   string;
    consulta_id: string;
    usuario_id:  string;
}

export interface Messages {
    id:           string;
    rol:          MessageRol;
    contenido:    string;
    tiene_imagen: boolean;
    imagen_url:   null;
    tokens:       null;
    created_at:   Date;
    consulta_id:  string;
    usuario_id:   string;
}
