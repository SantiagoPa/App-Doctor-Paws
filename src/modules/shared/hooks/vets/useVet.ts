import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateVetAction, removeVetAction } from "../../actions/vet";
import { toggleVetAction } from "../../actions/vet/toggleVetAction";
import { toast } from "sonner";


export const useVet = () => {

    const queryClinet = useQueryClient();


    const mutation = useMutation({
        mutationFn: createUpdateVetAction,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ['vets'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: removeVetAction,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ['vets'] });
        }
    });

    const toggleMutation = useMutation({
        mutationFn: toggleVetAction,
        onSuccess: (vet) => {
            queryClinet.invalidateQueries({ queryKey: ['vets'] });
            toast.success(`La Veterinaria ${vet.nombre} se actualizo a ${vet.activo ? "inactivo" : "activo"} en la plataforma.! 🎉`);
        }
    });

    return { mutation, deleteMutation, toggleMutation };
}
