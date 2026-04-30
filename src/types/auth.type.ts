import type { Suscription } from "./suscription.type";

export type UserRoles = "USER" | "ADMIN" | "SUPER_ADMIN"
export type UserSexo = "MASCULINO" | "FEMENINO" | "PREFIERO_NO_DECIR"
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
    activo: true;
    fuente_registro: string;
    sexo: UserSexo;
    acepta_terminos: boolean;
    version_terminos: string;
}

export interface LoginUser {
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
    activo: true;
    fuente_registro: string;
    sexo: UserSexo;
    acepta_terminos: boolean;
    version_terminos: string;
    access_token: string;
    suscription: Suscription
}


export interface VerifyToken {
    user: UserVerify;
    token: string;
}

export interface UserVerify {
    uid: string;
    roles: string;
    user: string;
}