import { ToggleLeft, Users } from "lucide-react";

import { CrudPage } from "@/components/custom/admin/CrudPage";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "../shared/hooks/useUsers";
import { LayoutLoader } from "@/components/custom/Loader";
import type { User } from "@/types/auth.type";
import { FormRegister } from "../shared/components/FormRegister";
import type { FormRegisterType } from "../shared/schemas/FormRegisterSchema";
import { useUser } from "../shared/hooks/useUser";
import { Button } from "@/components/ui/button";


// type TFormRegister = Omit<FormRegisterType, 'acepta_terminos'> & {
//     acepta_terminos: true | undefined;
// };

const empty: FormRegisterType = {
    "nombre_completo": "",
    "user": "",
    "password": "",
    "cedula": "",
    "correo": "",
    "celular": "",
    "sexo": "MASCULINO",
    "roles": "USER",
    "departamento": "",
    "municipio": "",
    "fuente_registro": "",
    "version_terminos": "",
    "acepta_terminos": undefined as unknown as true,
};


const UserPage = () => {

    const { data: users, isLoading } = useUsers();

    const { mutation, deleteMutation, toggleMutation } = useUser();

    return (
        <LayoutLoader fullScreen isLoading={isLoading}>
            <CrudPage<User, FormRegisterType>
                title="Usuarios"
                subtitle="Gestiona las cuentas de la plataforma"
                icon={<Users className="w-5 h-5" />}
                data={users ?? []}
                searchKeys={["user", "correo", "roles"]}
                columns={[
                    { key: "nombre_completo", label: "Nombre" },
                    { key: "correo", label: "Email" },
                    { key: "departamento", label: "Departamento" },
                    { key: "municipio", label: "Municipio" },
                    {
                        key: "roles", label: "Rol",
                        render: (u) => <Badge className={
                            u.roles === "ADMIN"
                                ? "bg-secondary/30 text-secondary-foreground"
                                : u.roles === "SUPER_ADMIN"
                                    ? "bg-primary/15 text-primary-deep"
                                    : "bg-muted text-foreground"}>{u.roles}</Badge>,
                    },
                    {
                        key: "activo", label: "Estado",
                        render: (u) => <Badge className={
                            u.activo
                                ? "bg-success/15 text-success"
                                : "bg-muted text-muted-foreground"}>
                            {u.activo ? "ACTIVO" : "INACTIVO"}
                        </Badge>,
                    },
                    { key: "fecha_registro", label: "Fecha Registro" },
                ]}
                emptyForm={empty}
                onAdd={(payload) => mutation.mutateAsync({ ...payload, id: "new" })}
                onUpdate={(id, payload) => mutation.mutateAsync({ ...payload, id })}
                onRemove={(id) => deleteMutation.mutateAsync(id)}
                renderForm={(form, isEditing, submit) => (
                    <>
                        <FormRegister defaultValues={form} isEditing={isEditing} onSubmit={async (payload) => submit(payload)} />
                    </>
                )}
                renderAction={(row, triggerConfirm) => (<>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => triggerConfirm({
                            title: `¿${row.activo ? "Desactivar" : "Activar"} usuario?`,
                            description: `El usuario ${row.nombre_completo} quedará ${row.activo ? "inactivo" : "activo"} en la plataforma.`,
                            textConfirm: `Actualizar`,
                            onConfirm: () => {
                                // toggleMutation.mutateAsync(row.id)
                                toggleMutation.mutateAsync(row);
                            },
                        })}
                        aria-label="toggle-user"
                        className="text-primary hover:text-primary"
                    >
                        <ToggleLeft className="w-4 h-4" />
                    </Button>
                </>)}
            />
        </LayoutLoader>

    );
};

export default UserPage;
