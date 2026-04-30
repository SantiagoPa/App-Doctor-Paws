import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePlanAction } from "../../actions/plan";
import { removePlanAction } from "../../actions/plan/removePlanAction";


export const usePlan = () => {

    const queryClinet = useQueryClient();


    const mutation = useMutation({
        mutationFn: createUpdatePlanAction,
        onSuccess: () => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['planes'] });
            // queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
            // toast.success(`¡Tu mascota ${pet.nombre} fue ${id === "new" ? "creada" : "actualizada"}! 🎉`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: removePlanAction,
        onSuccess: () => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['planes'] });
            // queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
            // toast.success(`¡Tu mascota ${pet.nombre} fue ${id === "new" ? "creada" : "actualizada"}! 🎉`);
        }
    });

    return { mutation, deleteMutation };
}
