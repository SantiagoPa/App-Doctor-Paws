import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { Button } from "@/components/ui/button"
import type { Pet } from "@/types/pet.type"
import { MessageCircleHeart, PawPrint, Plus } from "lucide-react";
import { Link } from "react-router"

interface Props {
    pets?: Pet[];

}

export const PetsView = ({ pets }: Props) => {
    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card rounded-3xl p-6 shadow-card border border-border/50">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-display font-bold">Tus mascotas</h2>
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/app/mascotas">Ver todas →</Link>
                    </Button>
                </div>
                {pets?.length === 0 ? (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 mx-auto mb-4">
                            <DogSvg className="w-full h-full opacity-50" />
                        </div>
                        <p className="text-muted-foreground mb-4">Aún no has agregado mascotas</p>
                        <Button asChild>
                            <Link to="/app/mascotas"><Plus className="w-4 h-4" /> Agregar mi primera mascota</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                        {pets?.slice(0, 4).map((p) => (
                            <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted transition-smooth">
                                <div className="w-14 h-14 shrink-0">
                                    {p.especie === "PERRO" ? <DogSvg className="w-full h-full" /> : <CatSvg className="w-full h-full" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold truncate">{p.nombre}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{p.raza} · {p.edad_aproximada} años</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gradient-primary rounded-3xl p-6 text-primary-foreground relative overflow-hidden shadow-glow">
                <PawPrint className="absolute -bottom-6 -right-6 w-32 h-32 text-white/15" />
                <MessageCircleHeart className="w-10 h-10 mb-3" />
                <h3 className="text-xl font-display font-bold mb-2">¿Algo no anda bien?</h3>
                <p className="text-primary-foreground/80 text-sm mb-5">
                    Consulta a nuestra IA. Te orienta con los síntomas en segundos.
                </p>
                <Button variant="soft" asChild>
                    <Link to="/app/chat">Hacer consulta</Link>
                </Button>
            </div>
        </div>
    )
}
