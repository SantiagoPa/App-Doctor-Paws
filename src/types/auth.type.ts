
export type UserRoles =  "USER" | "ADMIN" | "SUPER_ADMIN"
export interface User {
    id: string;
    nombre_completo: string;
    user: string;
    correo: string;
    celular: string;
    roles: UserRoles;
    municipio: string;
    departamento: string;
    fecha_registro: Date;
    suscription: Suscription
}

export interface LoginUser {
    id: string;
    nombre_completo: string;
    user: string;
    correo: string;
    celular: string;
    roles: UserRoles;
    municipio: string;
    departamento: string;
    fecha_registro: Date;
    access_token: string;
    suscription: Suscription
}


export interface VerifyToken {
    user:  UserVerify;
    token: string;
}

export interface UserVerify {
    uid:   string;
    roles: string;
    user:  string;
}

export interface Suscription {
    id:                string;
    estado:            string;
    fecha_inicio:      Date;
    fecha_vencimiento: Date;
    consultas_usadas:  number;
    consultas_limite:  number;
    metodo_pago:       string;
    referencia_pago:   string;
    renovacion_auto:   boolean;
    created_at:        Date;
    usuario_id:        string;
    plan_id:           number;
}

