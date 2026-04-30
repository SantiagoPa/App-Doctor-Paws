import { Calendar } from "lucide-react"


export const Tips = () => {
    return (
        <div className="bg-card rounded-3xl p-6 shadow-card border border-border/50">
            <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary-deep" />
                <h2 className="text-xl font-display font-bold">Consejos del día</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {[
                    { t: "Hidratación", d: "Asegúrate de que tu mascota tenga siempre agua fresca y limpia." },
                    { t: "Ejercicio diario", d: "30-60 min de actividad ayudan a un perro feliz y sano." },
                    { t: "Visita al vet", d: "Una revisión cada 6 meses previene muchos problemas." },
                ].map((t) => (
                    <div key={t.t} className="p-4 rounded-2xl bg-gradient-hero">
                        <p className="font-bold mb-1">{t.t}</p>
                        <p className="text-sm text-muted-foreground">{t.d}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
