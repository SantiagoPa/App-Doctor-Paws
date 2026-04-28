
export type PetSpecies = "PERRO" | "GATO";
export type PetSexo = "MASCULINO" | "FEMENINO";
export type PetStatusVacuna = "AL_DIA" | "PARCIALMENTE" | "NO" | "NO_SE";

export interface Pet {
    id:               string;
    nombre:           string;
    especie:          PetSpecies;
    raza:             string;
    fecha_nacimiento: string;
    edad_aproximada:  string;
    sexo:             PetSexo;
    esterilizado:     boolean;
    vacunado:         PetStatusVacuna;
    color_pelaje:     string;
    peso_kg:          number;
    foto_url:         string;
    activo:           boolean;
    created_at:       Date;
    updated_at:       Date;
    usuario_id:       string;
}
