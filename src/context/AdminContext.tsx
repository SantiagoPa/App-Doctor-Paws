import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "cliente" | "veterinario";
  status: "activo" | "inactivo";
  createdAt: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  interval: "mensual" | "anual";
  features: string;
  status: "activo" | "inactivo";
};

export type Veterinaria = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  status: "activa" | "inactiva";
};

export type Suscripcion = {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: "activa" | "cancelada" | "vencida";
};

export type SuscripcionVeterinaria = {
  id: string;
  veterinariaId: string;
  veterinariaName: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: "activa" | "cancelada" | "vencida";
};

export type AlertaEpidemiologica = {
  id: string;
  title: string;
  disease: string;
  species: "perro" | "gato" | "ambos";
  region: string;
  level: "baja" | "media" | "alta" | "crítica";
  date: string;
  description: string;
};

type AdminCtx = {
  users: AdminUser[];
  plans: Plan[];
  veterinarias: Veterinaria[];
  suscripciones: Suscripcion[];
  suscripcionesVet: SuscripcionVeterinaria[];
  alertas: AlertaEpidemiologica[];
  addUser: (u: Omit<AdminUser, "id">) => void;
  updateUser: (id: string, u: Omit<AdminUser, "id">) => void;
  removeUser: (id: string) => void;
  addPlan: (p: Omit<Plan, "id">) => void;
  updatePlan: (id: string, p: Omit<Plan, "id">) => void;
  removePlan: (id: string) => void;
  addVeterinaria: (v: Omit<Veterinaria, "id">) => void;
  updateVeterinaria: (id: string, v: Omit<Veterinaria, "id">) => void;
  removeVeterinaria: (id: string) => void;
  addSuscripcion: (s: Omit<Suscripcion, "id">) => void;
  updateSuscripcion: (id: string, s: Omit<Suscripcion, "id">) => void;
  removeSuscripcion: (id: string) => void;
  addSuscripcionVet: (s: Omit<SuscripcionVeterinaria, "id">) => void;
  updateSuscripcionVet: (id: string, s: Omit<SuscripcionVeterinaria, "id">) => void;
  removeSuscripcionVet: (id: string) => void;
  addAlerta: (a: Omit<AlertaEpidemiologica, "id">) => void;
  updateAlerta: (id: string, a: Omit<AlertaEpidemiologica, "id">) => void;
  removeAlerta: (id: string) => void;
};

const Ctx = createContext<AdminCtx | null>(null);

const seed = {
  users: [
    { id: "u1", name: "María Gómez", email: "maria@example.com", role: "cliente", status: "activo", createdAt: "2025-01-15" },
    { id: "u2", name: "Carlos Pérez", email: "carlos@example.com", role: "cliente", status: "activo", createdAt: "2025-02-03" },
    { id: "u3", name: "Dra. Ana López", email: "ana@vetcentral.com", role: "veterinario", status: "activo", createdAt: "2024-11-20" },
    { id: "u4", name: "Admin Principal", email: "admin@huellitas.com", role: "admin", status: "activo", createdAt: "2024-10-01" },
  ] as AdminUser[],
  plans: [
    { id: "p1", name: "Básico", price: 9.99, interval: "mensual", features: "1 mascota, consultas IA limitadas", status: "activo" },
    { id: "p2", name: "Premium", price: 19.99, interval: "mensual", features: "5 mascotas, consultas ilimitadas, alertas", status: "activo" },
    { id: "p3", name: "Veterinaria Pro", price: 49.99, interval: "mensual", features: "Para clínicas, dashboard, reportes", status: "activo" },
    { id: "p4", name: "Anual Premium", price: 199.99, interval: "anual", features: "Premium con 2 meses gratis", status: "activo" },
  ] as Plan[],
  veterinarias: [
    { id: "v1", name: "VetCentral", city: "Bogotá", address: "Calle 100 #15-20", phone: "+57 300 123 4567", email: "info@vetcentral.com", status: "activa" },
    { id: "v2", name: "Clínica Patitas Felices", city: "Medellín", address: "Cra 43 #5-30", phone: "+57 311 555 7788", email: "contacto@patitas.co", status: "activa" },
    { id: "v3", name: "Animal Care", city: "Cali", address: "Av. Roosevelt #80", phone: "+57 320 999 1122", email: "hola@animalcare.com", status: "inactiva" },
  ] as Veterinaria[],
  suscripciones: [
    { id: "s1", userId: "u1", userName: "María Gómez", planId: "p2", planName: "Premium", startDate: "2025-01-15", endDate: "2025-12-15", status: "activa" },
    { id: "s2", userId: "u2", userName: "Carlos Pérez", planId: "p1", planName: "Básico", startDate: "2025-02-03", endDate: "2025-03-03", status: "vencida" },
  ] as Suscripcion[],
  suscripcionesVet: [
    { id: "sv1", veterinariaId: "v1", veterinariaName: "VetCentral", planId: "p3", planName: "Veterinaria Pro", startDate: "2024-12-01", endDate: "2025-12-01", status: "activa" },
    { id: "sv2", veterinariaId: "v2", veterinariaName: "Clínica Patitas Felices", planId: "p3", planName: "Veterinaria Pro", startDate: "2025-01-10", endDate: "2026-01-10", status: "activa" },
  ] as SuscripcionVeterinaria[],
  alertas: [
    { id: "a1", title: "Brote de parvovirus canino", disease: "Parvovirus", species: "perro", region: "Bogotá - Norte", level: "alta", date: "2025-04-10", description: "Aumento de casos en cachorros no vacunados. Reforzar vacunación." },
    { id: "a2", title: "Casos de rinotraqueítis felina", disease: "Rinotraqueítis", species: "gato", region: "Medellín", level: "media", date: "2025-04-15", description: "Brote leve en colonias urbanas." },
    { id: "a3", title: "Leptospirosis estacional", disease: "Leptospirosis", species: "ambos", region: "Costa Caribe", level: "crítica", date: "2025-04-20", description: "Aumento de lluvias incrementa riesgo. Vacunación urgente." },
  ] as AlertaEpidemiologica[],
};

function useStored<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setVal(JSON.parse(stored));
  }, [key]);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal] as const;
}

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useStored<AdminUser[]>("dh_admin_users", seed.users);
  const [plans, setPlans] = useStored<Plan[]>("dh_admin_plans", seed.plans);
  const [veterinarias, setVets] = useStored<Veterinaria[]>("dh_admin_vets", seed.veterinarias);
  const [suscripciones, setSus] = useStored<Suscripcion[]>("dh_admin_sus", seed.suscripciones);
  const [suscripcionesVet, setSusVet] = useStored<SuscripcionVeterinaria[]>("dh_admin_susvet", seed.suscripcionesVet);
  const [alertas, setAlertas] = useStored<AlertaEpidemiologica[]>("dh_admin_alertas", seed.alertas);

  const id = () => crypto.randomUUID();

  return (
    <Ctx.Provider
      value={{
        users, plans, veterinarias, suscripciones, suscripcionesVet, alertas,
        addUser: (u) => setUsers((x) => [...x, { ...u, id: id() }]),
        updateUser: (i, u) => setUsers((x) => x.map((y) => (y.id === i ? { ...u, id: i } : y))),
        removeUser: (i) => setUsers((x) => x.filter((y) => y.id !== i)),
        addPlan: (p) => setPlans((x) => [...x, { ...p, id: id() }]),
        updatePlan: (i, p) => setPlans((x) => x.map((y) => (y.id === i ? { ...p, id: i } : y))),
        removePlan: (i) => setPlans((x) => x.filter((y) => y.id !== i)),
        addVeterinaria: (v) => setVets((x) => [...x, { ...v, id: id() }]),
        updateVeterinaria: (i, v) => setVets((x) => x.map((y) => (y.id === i ? { ...v, id: i } : y))),
        removeVeterinaria: (i) => setVets((x) => x.filter((y) => y.id !== i)),
        addSuscripcion: (s) => setSus((x) => [...x, { ...s, id: id() }]),
        updateSuscripcion: (i, s) => setSus((x) => x.map((y) => (y.id === i ? { ...s, id: i } : y))),
        removeSuscripcion: (i) => setSus((x) => x.filter((y) => y.id !== i)),
        addSuscripcionVet: (s) => setSusVet((x) => [...x, { ...s, id: id() }]),
        updateSuscripcionVet: (i, s) => setSusVet((x) => x.map((y) => (y.id === i ? { ...s, id: i } : y))),
        removeSuscripcionVet: (i) => setSusVet((x) => x.filter((y) => y.id !== i)),
        addAlerta: (a) => setAlertas((x) => [...x, { ...a, id: id() }]),
        updateAlerta: (i, a) => setAlertas((x) => x.map((y) => (y.id === i ? { ...a, id: i } : y))),
        removeAlerta: (i) => setAlertas((x) => x.filter((y) => y.id !== i)),
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin must be used within AdminProvider");
  return c;
};