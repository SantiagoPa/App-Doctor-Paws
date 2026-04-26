import { type ReactNode } from "react";
import { Label } from "@/components/ui/label";

export const Field = ({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) => (
    <div className="space-y-1.5">
        <Label className="text-sm font-semibold">{label}</Label>
        {children}
    </div>
);

export const Grid2 = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
);
