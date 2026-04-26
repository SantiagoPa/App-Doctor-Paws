import { Input } from "@/components/ui/input";
import { useAdmin, type AdminUser } from "@/context/AdminContext";
import { Users } from "lucide-react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CrudPage } from "@/components/custom/admin/CrudPage";
import { Field, Grid2 } from "@/components/custom/admin";

const empty: Omit<AdminUser, "id"> = {
    name: "", email: "", role: "cliente", status: "activo",
    createdAt: new Date().toISOString().slice(0, 10),
};

const Badge = ({ children, tone }: { children: string; tone: string }) => (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tone}`}>{children}</span>
);

const UserPage = () => {
    const { users, addUser, updateUser, removeUser } = useAdmin();

    return (
        <CrudPage<AdminUser>
            title="Usuarios"
            subtitle="Gestiona las cuentas de la plataforma"
            icon={<Users className="w-5 h-5" />}
            data={users}
            searchKeys={["name", "email", "role"]}
            columns={[
                { key: "name", label: "Nombre" },
                { key: "email", label: "Email" },
                {
                    key: "role", label: "Rol",
                    render: (u) => <Badge tone={u.role === "admin" ? "bg-secondary/30 text-secondary-foreground" : u.role === "veterinario" ? "bg-primary/15 text-primary-deep" : "bg-muted text-foreground"}>{u.role}</Badge>,
                },
                {
                    key: "status", label: "Estado",
                    render: (u) => <Badge tone={u.status === "activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}>{u.status}</Badge>,
                },
                { key: "createdAt", label: "Registro" },
            ]}
            emptyForm={empty}
            onAdd={addUser}
            onUpdate={updateUser}
            onRemove={removeUser}
            renderForm={(form, set) => (
                <>
                    <Grid2>
                        <Field label="Nombre">
                            <Input value={form.name} onChange={(e) => set({ ...form, name: e.target.value })} />
                        </Field>
                        <Field label="Email">
                            <Input type="email" value={form.email} onChange={(e) => set({ ...form, email: e.target.value })} />
                        </Field>
                    </Grid2>
                    <Grid2>
                        <Field label="Rol">
                            <Select value={form.role} onValueChange={(v: any) => set({ ...form, role: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cliente">Cliente</SelectItem>
                                    <SelectItem value="veterinario">Veterinario</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
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
                    <Field label="Fecha de registro">
                        <Input type="date" value={form.createdAt} onChange={(e) => set({ ...form, createdAt: e.target.value })} />
                    </Field>
                </>
            )}
        />
    );
};

export default UserPage;
