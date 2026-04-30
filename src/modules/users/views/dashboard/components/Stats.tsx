import { Activity, PawPrint } from "lucide-react";
import { motion } from 'framer-motion';
import type { Pet } from "@/types/pet.type";

interface Props {
    pets?: Pet[];
    dogs?: number;
    cats?: number;
}

export const Stats = ({ pets, dogs, cats }: Props) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { label: "Mascotas", value: pets?.length, icon: PawPrint, bg: "bg-gradient-sky", color: "text-primary-deep" },
                { label: "Perritos", value: dogs, icon: PawPrint, bg: "bg-gradient-warm", color: "text-secondary-foreground" },
                { label: "Gatitos", value: cats, icon: PawPrint, bg: "bg-gradient-peach", color: "text-secondary-foreground" },
                { label: "Consultas", value: 0, icon: Activity, bg: "bg-gradient-primary", color: "text-primary-foreground" },
            ].map((s, i) => (
                <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl p-5 shadow-card border border-border/50 hover:shadow-soft transition-smooth"
                >
                    <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <p className="text-3xl font-display font-extrabold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                </motion.div>
            ))}
        </div>
    )
}
