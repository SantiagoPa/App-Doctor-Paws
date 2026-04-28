import { AnimatePresence, motion } from "framer-motion";
import type { Pet } from "@/types/pet.type";
import { PetCard } from "./PetCard";

interface Props {
  pets: Pet[];
  onEdit: (id: string) => void;
}

export const GridPets = ({ pets, onEdit }: Props) => {

  return (
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
            <PetCard pet={p} onEdit={onEdit} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
