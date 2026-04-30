import { Card } from "@/components/ui/card";
import { Link } from "react-router";

export const Stat = ({
    label,
    value,
    icon: Icon,
    to,
    gradient,
}: {
    label: string;
    value: number | string;
    icon: any;
    to: string;
    gradient: string;
}) => (
    <Link to={to}>
        <Card className="p-5 bg-gradient-card shadow-card hover:shadow-float transition-smooth border-border/60 hover:-translate-y-1 group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{label}</p>
                    <p className="font-display font-bold text-3xl mt-2">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-bounce`}>
                    <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
            </div>
        </Card>
    </Link>
);