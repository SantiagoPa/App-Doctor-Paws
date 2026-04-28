import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations"
import { Button } from "@/components/ui/button"
import type { Pet } from "@/types/pet.type"
import { Pencil, Trash2 } from "lucide-react"
import { usePet } from "../hooks/usePet"
import { useModal } from "@/hooks/useModal"
import { ConfirmAction } from "@/components/custom/ConfirmAction"

interface Props {
    pet: Pet;
    onEdit: (id: string) => void;
}

export const PetCard = ({ pet, onEdit }: Props) => {


    const { deleteMutation } = usePet(pet.id);

    const { open, onOpen, onOpenChange } = useModal<{ id: string; name: string; }>();

    const onConfirmRemove = (pet: Pet) => {
        deleteMutation.mutateAsync(pet.id);
    }

    return (
        <>
            <div className="flex items-start gap-4">
                <div className={`w-20 h-20 shrink-0 rounded-2xl ${pet.especie === "PERRO" ? "bg-gradient-warm" : "bg-gradient-sky"} flex items-center justify-center`}>
                    {pet.especie === "PERRO" ? <DogSvg className="w-16 h-16" /> : <CatSvg className="w-16 h-16" />}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-display font-extrabold text-xl truncate">{pet.nombre}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{pet.raza}</p>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                        <span>🎂 {pet.edad_aproximada} años</span>
                        <span>⚖️ {pet.peso_kg} kg</span>
                    </div>
                </div>
            </div>
            {
                pet && (
                    <>
                        <p className="text-sm text-muted-foreground mt-4 p-3 rounded-xl bg-muted/40">
                            color: {pet.color_pelaje}
                            <br />
                            vacuna: {pet.vacunado.split("_").join(" ").toLowerCase()}
                            <br />
                            {pet.sexo.toLowerCase()}
                        </p>
                    </>
                )
            }

            <div className="flex gap-2 mt-4">
                <Button variant="hero" size="sm" className="flex-1" onClick={() => onEdit(pet.id)}>
                    <Pencil className="w-3.5 h-3.5" /> Editar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { onOpen({ id: pet.id, name: pet.nombre }) }}>
                    <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
                </Button>
            </div>

            <ConfirmAction open={open} onOpenChange={onOpenChange} confirmDelete={()=>onConfirmRemove(pet)} />

        </>

    )
}
