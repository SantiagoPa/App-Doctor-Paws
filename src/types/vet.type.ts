
export interface Vet {
    id:                  string;
    nombre:              string;
    nit:                 string;
    contacto_nombre:     string;
    correo:              string;
    celular:             string;
    departamento:        string;
    municipio:           string;
    direccion:           string;
    precio_consulta_min: string;
    precio_consulta_max: string;
    plan_directorio:     string;
    google_maps_url:     string | null;
    whatsapp_directo:    string | null;
    logo_url:            string | null;
    activo:              boolean;
    created_at:          Date;
}
