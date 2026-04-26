import { Input } from "@/components/ui/input";
import { useAdmin, type Suscripcion } from "@/context/AdminContext";
import { CreditCard } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CrudPage, Field, Grid2 } from "@/components/custom/admin";

const empty: Omit<Suscripcion, "id"> = {
  userId: "", userName: "", planId: "", planName: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "", status: "activa",
};

const statusTone = (s: string) =>
  s === "activa" ? "bg-success/15 text-success"
    : s === "vencida" ? "bg-secondary-deep/20 text-secondary-foreground"
    : "bg-muted text-muted-foreground";

const SuscripcionesPage = () => {
  const { suscripciones, users, plans, addSuscripcion, updateSuscripcion, removeSuscripcion } = useAdmin();
  const clientes = users.filter((u) => u.role === "cliente");

  return (
    <CrudPage<Suscripcion>
      title="Suscripciones"
      subtitle="Suscripciones de usuarios finales"
      icon={<CreditCard className="w-5 h-5" />}
      data={suscripciones}
      searchKeys={["userName", "planName", "status"]}
      columns={[
        { key: "userName", label: "Usuario" },
        { key: "planName", label: "Plan" },
        { key: "startDate", label: "Inicio" },
        { key: "endDate", label: "Fin" },
        {
          key: "status", label: "Estado",
          render: (s) => <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusTone(s.status)}`}>{s.status}</span>,
        },
      ]}
      emptyForm={empty}
      onAdd={addSuscripcion}
      onUpdate={updateSuscripcion}
      onRemove={removeSuscripcion}
      renderForm={(form, set) => (
        <>
          <Grid2>
            <Field label="Usuario">
              <Select
                value={form.userId}
                onValueChange={(v) => {
                  const u = users.find((x) => x.id === v);
                  set({ ...form, userId: v, userName: u?.name || "" });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Selecciona usuario" /></SelectTrigger>
                <SelectContent>
                  {clientes.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Plan">
              <Select
                value={form.planId}
                onValueChange={(v) => {
                  const p = plans.find((x) => x.id === v);
                  set({ ...form, planId: v, planName: p?.name || "" });
                }}
              >
                <SelectTrigger><SelectValue placeholder="Selecciona plan" /></SelectTrigger>
                <SelectContent>
                  {plans.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </Grid2>
          <Grid2>
            <Field label="Fecha inicio">
              <Input type="date" value={form.startDate} onChange={(e) => set({ ...form, startDate: e.target.value })} />
            </Field>
            <Field label="Fecha fin">
              <Input type="date" value={form.endDate} onChange={(e) => set({ ...form, endDate: e.target.value })} />
            </Field>
          </Grid2>
          <Field label="Estado">
            <Select value={form.status} onValueChange={(v: any) => set({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="activa">Activa</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="vencida">Vencida</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </>
      )}
    />
  );
};

export default SuscripcionesPage;
