import { Copy, type Hash } from "lucide-react";

export const DetailRow = ({
    icon: Icon,
    label,
    value,
    onCopy,
    mono = false,
}: {
    icon: typeof Hash;
    label: string;
    value: string;
    onCopy?: () => void;
    mono?: boolean;
}) => {
    return (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {label}
                </dt>
                <dd className="flex items-center gap-2 mt-0.5">
                    <span
                        className={`text-sm font-semibold text-foreground truncate ${mono ? "font-mono" : ""
                            }`}
                    >
                        {value}
                    </span>
                    {onCopy && (
                        <button
                            type="button"
                            onClick={onCopy}
                            className="text-muted-foreground hover:text-primary transition-smooth shrink-0"
                            aria-label={`Copiar ${label}`}
                        >
                            <Copy className="w-3.5 h-3.5" />
                        </button>
                    )}
                </dd>
            </div>
        </div>
    );
}