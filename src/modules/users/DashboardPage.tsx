import { useMemo } from "react";
import { usePets } from "./views/pets/hooks/usePets";
import { Welcome } from "./views/dashboard/components/Welcome";
import { Stats } from "./views/dashboard/components/Stats";
import { Tips } from "./views/dashboard/components/Tips";
import { PetsView } from "./views/dashboard/components/PetsView";

const DashboardPage = () => {
  const { data: pets } = usePets();

  const { dogs, cats } = useMemo(() => {
    const dogs = pets?.filter((p) => p.especie === "PERRO").length;
    const cats = pets?.filter((p) => p.especie === "GATO").length;
    return { dogs, cats }
  }, [pets])

  return (
    <div className="py-10 space-y-8 mx-10">
      {/* Welcome */}
      <Welcome />

      {/* Stats */}
      <Stats pets={pets} cats={cats} dogs={dogs} />

      {/* Pets quick view */}
      <PetsView pets={pets} />

      {/* Tips */}
      <Tips />
    </div>
  );
};

export default DashboardPage;