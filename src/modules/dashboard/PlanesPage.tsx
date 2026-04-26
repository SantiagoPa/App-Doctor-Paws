import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin, type Plan } from "@/context/AdminContext";
import { Package } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CrudPage, Field, Grid2 } from "@/components/custom/admin";

const empty: Omit<Plan, "id"> = {
  name: "", price: 0, interval: "mensual", features: "", status: "activo",
};

const PlanesPage = () => {
  const { plans, addPlan, updatePlan, removePlan } = useAdmin();

  return (
    <CrudPage<Plan>
      title="Planes"
      subtitle="Configura los planes de suscripción"
      icon={<Package className="w-5 h-5" />}
      data={plans}
      searchKeys={["name", "interval"]}
      columns={[
        { key: "name", label: "Nombre" },
        { key: "price", label: "Precio", render: (p) => <span className="font-semibold">${p.price.toFixed(2)}</span> },
        { key: "interval", label: "Intervalo" },
        { key: "features", label: "Características", className: "max-w-xs truncate" },
        {
          key: "status", label: "Estado",
          render: (p) => (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.status === "activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
              {p.status}
            </span>
          ),
        },
      ]}
      emptyForm={empty}
      onAdd={addPlan}
      onUpdate={updatePlan}
      onRemove={removePlan}
      renderForm={(form, set) => (
        <>
          <Grid2>
            <Field label="Nombre">
              <Input value={form.name} onChange={(e) => set({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Precio (USD)">
              <Input type="number" step="0.01" value={form.price} onChange={(e) => set({ ...form, price: parseFloat(e.target.value) || 0 })} />
            </Field>
          </Grid2>
          <Grid2>
            <Field label="Intervalo">
              <Select value={form.interval} onValueChange={(v: any) => set({ ...form, interval: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Estado">
              <Select value={form.status} onValueChange={(v: any) => set({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </Grid2>
          <Field label="Características">
            <Textarea rows={3} value={form.features} onChange={(e) => set({ ...form, features: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
};

export default PlanesPage;
