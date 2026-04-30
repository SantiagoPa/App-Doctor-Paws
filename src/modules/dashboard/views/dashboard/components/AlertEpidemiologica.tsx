import { Card } from "@/components/ui/card"
import type { AlertEpidemiologica as AlertEpidemiologicaType } from "@/types/alert-epidemiologica"
import { TrendingUp } from "lucide-react"

interface Props {
    alert: AlertEpidemiologicaType[]
}

export const AlertEpidemiologica = ({ alert }: Props) => {
    return (
        <Card className="p-6 bg-gradient-card shadow-card border-border/60">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary-deep" />
                <h3 className="font-display font-bold text-xl">Últimas alertas epidemiológicas</h3>
            </div>
            <div className="space-y-2">
                {alert.slice(0, 5).map((al) => (
                    <div key={al.id} className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border/50">
                        <div>
                            <p className="font-semibold text-sm">{al.condicion}</p>
                            <p className="text-xs text-muted-foreground">{al.departamento} · {al.municipio} · {new Date(al.periodo_inicio).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${al.nivel_alerta === "CRITICO" ? "bg-destructive/15 text-destructive" :
                            al.nivel_alerta === "ALTO" ? "bg-secondary-deep/20 text-secondary-foreground" :
                                al.nivel_alerta === "MEDIO" ? "bg-primary/15 text-primary-deep" :
                                    "bg-muted text-muted-foreground"
                            }`}>
                            {al.nivel_alerta}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    )
}
