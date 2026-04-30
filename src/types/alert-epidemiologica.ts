

export type SpecieAfectada = "PERRO" | "GATO" | "AMBOS";

export type LevelAlert = "BAJO" | "MEDIO" | "ALTO" | "CRITICO";

export interface AlertEpidemiologica {
    id: string;
    condicion: string;
    departamento: string;
    municipio: string;
    especie_afectada: SpecieAfectada;
    num_casos: number;
    umbral_alerta: number;
    nivel_alerta: LevelAlert;
    periodo_inicio: Date;
    periodo_fin: null;
    notificado_ica: boolean;
    notificado_users: boolean;
    created_at: Date;
}
