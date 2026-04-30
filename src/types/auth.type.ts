import type { Suscription } from "./suscription.type";

export type UserRoles =  "USER" | "ADMIN" | "SUPER_ADMIN"
export interface User {
    id: string;
    nombre_completo: string;
    user: string;
    correo: string;
    celular: string;
    cedula: string;
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