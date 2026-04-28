import { Button } from "@/components/ui/button";
import { FormPet, type PayloadPet } from "./components/FormPet";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";
import { Card } from "@/components/ui/card";
import { VisualSidePets } from "@/modules/auth/components/VisualSidePets";
import { usePet } from "./hooks/usePet";
import { LayoutLoader } from "@/components/custom/Loader";
import type { Pet } from "@/types/pet.type";



const PetPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const onBack = () => navigate(`/app/mascotas`);

    const { isLoading, isError, data: dataPet, mutation } = usePet(id || "");

    if (isError) {
        return <Navigate to={"/app/mascotas"} />
    }

    const handleSubmit = async (petLike: PayloadPet) => {
        const newPet = { ...petLike, id } as unknown as Pet;
        await mutation.mutateAsync(newPet, {
            onSuccess: () => navigate(`/app/mascotas`)
        });
    }

    return (
        <LayoutLoader isLoading={isLoading} >
            <Button onClick={onBack}>
                <ArrowLeft /> volver
            </Button>

            <div className="grid lg:grid-cols-2 relative">
                <Card className="p-5 bg-gradient-card shadow-card border-border/60 rounded-md max-w-lg lg:ml-50">
                    {
                        dataPet && (<FormPet dataEdit={dataPet} handleSubmit={handleSubmit} isPending={mutation.isPending} />)
                    }
                </Card>

                <VisualSidePets />
            </div>
        </LayoutLoader>
    )
}

export default PetPage;