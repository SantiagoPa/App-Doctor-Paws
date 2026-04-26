import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth, type Pet } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const empty = { name: "", species: "perro" as "perro" | "gato", breed: "", age: 1, weight: 5, notes: "" };

const PetsPage = () => {
  const { user, pets, addPet, removePet, updatePet } = useAuth();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pet | null>(null);
  const [form, setForm] = useState(empty);

  if (!user) return <Navigate to="/login" replace />;

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (p: Pet) => {
    setEditing(p);
    setForm({ name: p.name, species: p.species, breed: p.breed, age: p.age, weight: p.weight, notes: p.notes ?? "" });
    setOpen(true);
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.breed) {
      toast.error("Nombre y raza son obligatorios");
      return;
    }
    if (editing) {
      updatePet(editing.id, form);
      toast.success(`${form.name} actualizado 🐾`);
    } else {
      addPet(form);
      toast.success(`¡${form.name} agregado a la familia! 🎉`);
    }
    setOpen(false);
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold">Mis Mascotas 🐾</h1>
          <p className="text-muted-foreground mt-1">Gestiona la información de tus peluditos.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" onClick={openNew}>
              <Plus className="w-5 h-5" /> Agregar mascota
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">
                {editing ? "Editar mascota" : "Nueva mascota"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, species: "perro" })}
                  className={`p-4 rounded-2xl border-2 transition-smooth flex flex-col items-center gap-1 ${
                    form.species === "perro" ? "border-primary bg-primary/10" : "border-border bg-muted/30"
                  }`}
                >
                  <DogSvg className="w-16 h-16" />
                  <span className="font-bold text-sm">Perro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, species: "gato" })}
                  className={`p-4 rounded-2xl border-2 transition-smooth flex flex-col items-center gap-1 ${
                    form.species === "gato" ? "border-primary bg-primary/10" : "border-border bg-muted/30"
                  }`}
                >
                  <CatSvg className="w-16 h-16" />
                  <span className="font-bold text-sm">Gato</span>
                </button>
              </div>
              <div>
                <Label>Nombre</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Firulais" className="rounded-2xl h-11" />
              </div>
              <div>
                <Label>Raza</Label>
                <Input value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} placeholder="Labrador" className="rounded-2xl h-11" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Edad (años)</Label>
                  <Input type="number" min={0} value={form.age} onChange={(e) => setForm({ ...form, age: +e.target.value })} className="rounded-2xl h-11" />
                </div>
                <div>
                  <Label>Peso (kg)</Label>
                  <Input type="number" min={0} step={0.1} value={form.weight} onChange={(e) => setForm({ ...form, weight: +e.target.value })} className="rounded-2xl h-11" />
                </div>
              </div>
              <div>
                <Label>Notas (opcional)</Label>
                <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Alergias, medicamentos, condiciones..." className="rounded-2xl" />
              </div>
              <Button type="submit"  size="lg" className="w-full">
                {editing ? "Guardar cambios" : "Agregar mascota"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {pets.length === 0 ? (
        <div className="bg-gradient-hero rounded-3xl p-12 text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <DogSvg className="w-full h-full animate-float" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Aún no tienes mascotas registradas</h2>
          <p className="text-muted-foreground mb-6">Agrega a tu primer peludito para empezar.</p>
          <Button  size="lg" onClick={openNew}>
            <Plus className="w-5 h-5" /> Agregar mascota
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {pets.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card rounded-3xl p-6 shadow-card border border-border/50 hover:shadow-float transition-smooth group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 shrink-0 rounded-2xl ${p.species === "perro" ? "bg-gradient-warm" : "bg-gradient-sky"} flex items-center justify-center`}>
                    {p.species === "perro" ? <DogSvg className="w-16 h-16" /> : <CatSvg className="w-16 h-16" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-xl truncate">{p.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{p.breed}</p>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span>🎂 {p.age} años</span>
                      <span>⚖️ {p.weight} kg</span>
                    </div>
                  </div>
                </div>
                {p.notes && (
                  <p className="text-sm text-muted-foreground mt-4 p-3 rounded-xl bg-muted/40">{p.notes}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => openEdit(p)}>
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { removePet(p.id); toast.success(`${p.name} eliminado`); }}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PetsPage;