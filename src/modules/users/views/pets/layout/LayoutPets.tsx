import { FloatingPaws } from "@/components/custom/PetIllustrations";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

const LayoutPets = () => {

    const navigate = useNavigate();

    return (
        <>
            <FloatingPaws />

            <div className="mx-4 py-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-extrabold">Mis Mascotas 🐾</h1>
                        <p className="text-muted-foreground mt-1">Gestiona la información de tus peluditos.</p>
                    </div>

                    <Button size="lg" onClick={() => navigate('/app/mascotas/new')} >
                        <Plus className="w-5 h-5" /> Agregar mascota
                    </Button>
                </div>
                <Outlet />
            </div>

        </>

    )
}

export default LayoutPets;
