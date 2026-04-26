import { Input } from "@/components/ui/input";
import { useAdmin, type Veterinaria } from "@/context/AdminContext";
import { Building2 } from "lucide-react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CrudPage, Field, Grid2 } from "@/components/custom/admin";

const empty: Omit<Veterinaria, "id"> = {
    name: "", city: "", address: "", phone: "", email: "", status: "activa",
};

const VeterinariasPage = () => {
    const { veterinarias, addVeterinaria, updateVeterinaria, removeVeterinaria } = useAdmin();

    return (
        <CrudPage<Veterinaria>
            title="Veterinarias"
            subtitle="Clínicas registradas en la plataforma"
            icon={<Building2 className="w-5 h-5" />}
            data={veterinarias}
            searchKeys={["name", "city", "email"]}
            columns={[
                { key: "name", label: "Nombre" },
                { key: "city", label: "Ciudad" },
                { key: "phone", label: "Teléfono" },
                { key: "email", label: "Email" },
                {
                    key: "status", label: "Estado",
                    render: (v) => (
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${v.status === "activa" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                            {v.status}
                        </span>
                    ),
                },
            ]}
            emptyForm={empty}
            onAdd={addVeterinaria}
            onUpdate={updateVeterinaria}
            onRemove={removeVeterinaria}
            renderForm={(form, set) => (
                <>
                    <Grid2>
                        <Field label="Nombre"><Input value={form.name} onChange={(e) => set({ ...form, name: e.target.value })} /></Field>
                        <Field label="Ciudad"><Input value={form.city} onChange={(e) => set({ ...form, city: e.target.value })} /></Field>
                    </Grid2>
                    <Field label="Dirección"><Input value={form.address} onChange={(e) => set({ ...form, address: e.target.value })} /></Field>
                    <Grid2>
                        <Field label="Teléfono"><Input value={form.phone} onChange={(e) => set({ ...form, phone: e.target.value })} /></Field>
                        <Field label="Email"><Input type="email" value={form.email} onChange={(e) => set({ ...form, email: e.target.value })} /></Field>
                    </Grid2>
                    <Field label="Estado">
                        <Select value={form.status} onValueChange={(v: any) => set({ ...form, status: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activa">Activa</SelectItem>
                                <SelectItem value="inactiva">Inactiva</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </>
            )}
        />
    );
};

export default VeterinariasPage;
