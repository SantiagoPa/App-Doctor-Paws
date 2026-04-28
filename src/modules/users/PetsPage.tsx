

import { GridPets, InfoPets } from "./views/pets";
import { usePets } from "./views/pets/hooks/usePets";
import { LayoutLoader } from "@/components/custom/Loader";
import { useNavigate } from "react-router";


const PetsPage = () => {

  const navigate = useNavigate();
  const { data, isLoading } = usePets();


  const onNavigateEdit = (id: string) => {
    navigate(`/app/mascotas/${id}`);
  }

  const onNavigateAddPet = () => navigate(`/app/mascotas/new`);



  return (
    <LayoutLoader isLoading={isLoading} >
      <>

      {data?.length === 0 ? (
        <InfoPets onAddPet={onNavigateAddPet} />
      ) : (
        <GridPets pets={data ?? []} onEdit={onNavigateEdit} />
      )}
      </>
    </LayoutLoader>

  );
};

export default PetsPage;