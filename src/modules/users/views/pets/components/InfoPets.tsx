import { DogSvg } from "@/components/custom/PetIllustrations"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Props {
    onAddPet: () => void;
}

export const InfoPets = ({ onAddPet }: Props) => {
    return (
        <div className="bg-gradient-hero rounded-3xl p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-4">
                <DogSvg className="w-full h-full animate-float" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">Aún no tienes mascotas registradas</h2>
            <p className="text-muted-foreground mb-6">Agrega a tu primer peludito para empezar.</p>
            <Button size="lg" onClick={onAddPet}>
                <Plus className="w-5 h-5" /> Agregar mascota
            </Button>
        </div>
    )
}
