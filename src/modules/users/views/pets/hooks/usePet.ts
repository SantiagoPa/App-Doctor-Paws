import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPetByIdAction } from "../actions/getPetByIdAction";
import { createUpdatePetAction } from "../actions/createUpdatePetAction";
import { toast } from "sonner";
import { removePetAction } from "../actions/removePetAction";
import type { Pet } from "@/types/pet.type";


export const usePet = (id: string) => {

  const queryClinet = useQueryClient();

  const query = useQuery({
    queryKey: ["pet", { id }],
    queryFn: () => getPetByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5min,
    // enabled: !!id
  });

  // TODO: MUTATION
  const mutation = useMutation({
    mutationFn: createUpdatePetAction,
    onSuccess: (pet) => {
      //Invalidar cache
      queryClinet.invalidateQueries({ queryKey: ['pets'] });
      queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
      // actualizar pet
      queryClinet.setQueryData(['pet', { id: pet.id }], pet);
      toast.success(`¡Tu mascota ${pet.nombre} fue ${id === "new" ? "creada" : "actualizada"}! 🎉`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => removePetAction(id),
    onSuccess: (pet) => {
      //Invalidar cache
      queryClinet.invalidateQueries({ queryKey: ['pets'] });
      queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
      // actualizar pet
      queryClinet.setQueryData<Pet[]>(['pets'], (prev)=> prev?.filter((item) => item.id !== id) );
      toast.success(`¡Tu mascota ${pet.nombre} fue eliminada correctamente! 🎉`);
    }
  })

  return {
    ...query,
    mutation,
    deleteMutation,
  };
}
