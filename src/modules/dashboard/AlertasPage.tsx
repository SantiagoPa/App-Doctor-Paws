import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdmin, type AlertaEpidemiologica } from "@/context/AdminContext";
import { AlertTriangle } from "lucide-react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CrudPage, Field, Grid2 } from "@/components/custom/admin";

const empty: Omit<AlertaEpidemiologica, "id"> = {
    title: "", disease: "", species: "ambos", region: "",
    level: "media", date: new Date().toISOString().slice(0, 10), description: "",
};

const levelTone = (l: string) =>
    l === "crítica" ? "bg-destructive/15 text-destructive"
        : l === "alta" ? "bg-secondary-deep/20 text-secondary-foreground"
            : l === "media" ? "bg-primary/15 text-primary-deep"
                : "bg-muted text-muted-foreground";

const AlertasPage = () => {
    const { alertas, addAlerta, updateAlerta, removeAlerta } = useAdmin();

    return (
        <CrudPage<AlertaEpidemiologica>
            title="Alertas Epidemiológicas"
            subtitle="Vigilancia sanitaria y brotes"
            icon={<AlertTriangle className="w-5 h-5" />}
            data={alertas}
            searchKeys={["title", "disease", "region"]}
            columns={[
                { key: "title", label: "Título" },
                { key: "disease", label: "Enfermedad" },
                { key: "species", label: "Especie" },
                { key: "region", label: "Región" },
                { key: "date", label: "Fecha" },
                {
                    key: "level", label: "Nivel",
                    render: (a) => <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelTone(a.level)}`}>{a.level}</span>,
                },
            ]}
            emptyForm={empty}
            onAdd={addAlerta}
            onUpdate={updateAlerta}
            onRemove={removeAlerta}
            renderForm={(form, set) => (
                <>
                    <Field label="Título">
                        <Input value={form.title} onChange={(e) => set({ ...form, title: e.target.value })} />
                    </Field>
                    <Grid2>
                        <Field label="Enfermedad">
                            <Input value={form.disease} onChange={(e) => set({ ...form, disease: e.target.value })} />
                        </Field>
                        <Field label="Especie afectada">
                            <Select value={form.species} onValueChange={(v: any) => set({ ...form, species: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="perro">Perro</SelectItem>
                                    <SelectItem value="gato">Gato</SelectItem>
                                    <SelectItem value="ambos">Ambos</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </Grid2>
                    <Grid2>
                        <Field label="Región">
                            <Input value={form.region} onChange={(e) => set({ ...form, region: e.target.value })} />
                        </Field>
                        <Field label="Nivel">
                            <Select value={form.level} onValueChange={(v: any) => set({ ...form, level: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="baja">Baja</SelectItem>
                                    <SelectItem value="media">Media</SelectItem>
                                    <SelectItem value="alta">Alta</SelectItem>
                                    <SelectItem value="crítica">Crítica</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </Grid2>
                    <Field label="Fecha">
                        <Input type="date" value={form.date} onChange={(e) => set({ ...form, date: e.target.value })} />
                    </Field>
                    <Field label="Descripción">
                        <Textarea rows={3} value={form.description} onChange={(e) => set({ ...form, description: e.target.value })} />
                    </Field>
                </>
            )}
        />
    );
};

export default AlertasPage;
