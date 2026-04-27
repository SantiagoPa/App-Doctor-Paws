
export type LoginForm = {
    correo: string;
    password: string;
}

export interface User {
    id: string;
    nombre_completo: string;
    user: string;
    correo: string;
    celular: string;
    roles: string;
    municipio: string;
    departamento: string;
    fecha_registro: Date;
}

export interface LoginUser {
    id: string;
    nombre_completo: string;
    user: string;
    correo: string;
    celular: string;
    roles: string;
    municipio: string;
    departamento: string;
    fecha_registro: Date;
    access_token: string;
}


export interface VerifyToken {
    user:  User;
    token: string;
}

export interface UserVerify {
    uid:   string;
    roles: string;
    user:  string;
}
