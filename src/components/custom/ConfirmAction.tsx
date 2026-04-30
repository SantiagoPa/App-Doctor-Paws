import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

interface Props {
    title?: string;
    description?: string;
    open: boolean;
    confirmAction: () => void;
    onOpenChange: (value: boolean) => void;
    textConfirm?: string;
}

export const ConfirmAction = ({ title = "¿Eliminar registro?", description = "Esta acción no se puede deshacer.", textConfirm = "Eliminar", open, confirmAction, onOpenChange }: Props) => {

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={confirmAction}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {textConfirm}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
