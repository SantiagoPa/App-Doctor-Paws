import { DogSvg } from "@/components/custom/PetIllustrations"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export const NotPetsInfo = () => {
    return (
        <div className="container py-16 text-center max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-4">
                <DogSvg className="w-full h-full animate-float" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Primero agrega una mascota</h1>
            <p className="text-muted-foreground mb-6">
                Para una mejor consulta, necesito saber sobre tu peludito.
            </p>
            <Button asChild>
                <Link to="/app/mascotas">Agregar mascota</Link>
            </Button>
        </div>
    )
}
