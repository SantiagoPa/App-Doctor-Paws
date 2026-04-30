import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateUserAction, removeUserAction } from "../actions/user";
import { toggleActiveUserAction } from "../actions/user/toggleActiveUserAction";
import { toast } from "sonner";


export const useUser = () => {
    const queryClinet = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateUserAction,
        onSuccess: () => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['users'] });
            // queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
            // toast.success(`¡Tu mascota ${pet.nombre} fue ${id === "new" ? "creada" : "actualizada"}! 🎉`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: removeUserAction,
        onSuccess: () => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['users'] });
            // queryClinet.invalidateQueries({ queryKey: ['pet', { id: pet.id }] });
            // toast.success(`¡Tu mascota ${pet.nombre} fue ${id === "new" ? "creada" : "actualizada"}! 🎉`);
        }
    });

    const toggleMutation = useMutation({
        mutationFn: toggleActiveUserAction,
        onSuccess: (user) => {
            //Invalidar cache
            queryClinet.invalidateQueries({ queryKey: ['users'] });
            toast.success(`El usuario ${user.nombre_completo} se actualizo a ${user.activo ? "inactivo" : "activo"} en la plataforma.! 🎉`);

        }
    });

    return { mutation, deleteMutation, toggleMutation };
}
