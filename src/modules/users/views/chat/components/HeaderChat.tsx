import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Pet } from "@/types/pet.type"
import { Stethoscope } from "lucide-react"

interface Props {
    pets?: Pet[];
    selectedPet: string;
    onSelectPet: (value: string) => void;
}

export const HeaderChat = ({ pets, selectedPet, onSelectPet }: Props) => {
    return (
        <div className="bg-gradient-hero rounded-3xl p-6 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <Stethoscope className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-2xl font-display font-extrabold">Consulta con la IA</h1>
                    <p className="text-sm text-muted-foreground">Describe los síntomas que observas</p>
                </div>
            </div>
            <Select value={selectedPet} onValueChange={onSelectPet}>
                <SelectTrigger className="w-full sm:w-56 rounded-2xl bg-white/80 dark:bg-primary-foreground h-12">
                    <SelectValue placeholder="Elige mascota" />
                </SelectTrigger>
                <SelectContent>
                    {pets?.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                            {p.especie === "PERRO" ? "🐶" : "🐱"} {p.nombre} · {p.raza}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
