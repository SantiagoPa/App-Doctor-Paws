import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Crown, Gift, Star } from "lucide-react"
import { useMemo } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { LayoutLoader } from '@/components/custom/Loader';
import { useNavigate } from 'react-router';
import type { Plan } from '@/types/plan.type';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useSuscriptionByUser } from '@/modules/shared/hooks/suscriptions';
import { usePlanes } from '@/modules/shared/hooks/planes';
import { useUserPayment } from '@/modules/shared/hooks/payments';



export const Planes = () => {

    const { user } = useAuthStore();
    const { data: suscription, isLoading: isLoadingSuscription } = useSuscriptionByUser();
    const { data: planes, isLoading: isLoadingPlan } = usePlanes();
    const { data: payment, mutation } = useUserPayment();

    const navigate = useNavigate();

    const newPlanes = useMemo(() => {
        return planes?.map((plan) => {
            if (!suscription) return;

            if (Number(plan.id) === 1) {
                return {
                    ...plan,
                    icon: Gift,
                    bg: "bg-gradient-sky",
                    iconColor: "text-primary-deep",
                    features: [
                        "2 mascota registrada",
                        "35 consultas IA al mes",
                        "Recordatorios básicos",
                        "Acceso a la comunidad",
                    ],
                    cta: suscription.plan_id === +plan.id ? "Plan Actual" : "Elegir Plan",
                    variant: "soft" as const,
                    featured: false,
                    isCurrentPlan: suscription.plan_id === +plan.id
                }
            }

            if (+plan.id === 2) {
                return {
                    ...plan,
                    icon: Star,
                    bg: "bg-gradient-primary",
                    iconColor: "text-primary-foreground",
                    features: [
                        "Hasta 6 mascotas",
                        "Consultas IA ilimitadas",
                        "Alertas epidemiológicas",
                        "Historial veterinario",
                        "Soporte prioritario",
                    ],
                    cta: suscription.plan_id === +plan.id ? "Plan Actual" : "Elegir Mensual",
                    variant: "hero" as const,
                    featured: true,
                    isCurrentPlan: suscription.plan_id === +plan.id
                }
            }

            if (+plan.id === 3) {
                return {
                    ...plan,
                    icon: Crown,
                    bg: "bg-gradient-warm",
                    iconColor: "text-secondary-foreground",
                    features: [
                        "Todo lo del plan Mensual",
                        "2 meses gratis",
                        "Mascotas ilimitadas",
                        // "Reportes mensuales PDF",
                        // "Atención VIP veterinaria",
                    ],
                    cta: suscription.plan_id === +plan.id ? "Plan Actual" : "Elegir Anual",
                    variant: "peach" as const,
                    featured: false,
                    isCurrentPlan: suscription.plan_id === +plan.id
                }
            }
        })
    }, [suscription, planes]);

    const onCreateAttempPayment = (plan?: Plan) => {

        if (!user && !plan) return;

        if (payment && payment.id) {
            return navigate(`/app/planes/${plan?.id}/payment/${payment.id}`);
        }

        mutation.mutateAsync({
            usuario_id: user?.id!,
            monto_cop: Number(plan?.precio_cop),
            estado: "INICIADO",
            redirect_url: "http://localhost:5173/app/planes/payment/success"
        }, {
            onSuccess: (payment) => {
                navigate(`/app/planes/${plan?.id}/payment/${payment.id}`);
            }
        });
    }

    return (
        <LayoutLoader isLoading={isLoadingSuscription || isLoadingPlan}>
            <section id="planes" className="py-10 lg:py-10 bg-background relative overflow-hidden">
                <div className="container relative">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-sm font-bold text-primary-deep uppercase tracking-wider mb-3">
                            Planes y precios
                        </p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Elige el plan ideal para tu peludito
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Empieza gratis y mejora cuando lo necesites. Sin permanencia.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {newPlanes && newPlanes?.map((p, i) => (
                            <motion.div
                                key={p?.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`relative rounded-3xl p-8 border transition-smooth flex flex-col ${p?.featured
                                    ? "bg-card shadow-glow border-primary/40 md:-translate-y-4 scale-[1.02]"
                                    : "bg-card shadow-card hover:shadow-float border-border/50"
                                    }`}
                            >
                                {p?.featured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-soft uppercase tracking-wider">
                                        Más popular
                                    </div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl ${p?.bg} flex items-center justify-center mb-5`}>
                                    {p && <p.icon className={`w-7 h-7 ${p?.iconColor}`} />}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-1">{p?.nombre}</h3>
                                <p className="text-muted-foreground text-sm mb-5">{p?.descripcion}</p>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-display font-extrabold">{formatCurrency(Number(p?.precio_cop))}</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {p?.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm">
                                            <span className="mt-0.5 w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-success" strokeWidth={3} />
                                            </span>
                                            <span className="text-foreground/80">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button onClick={() => onCreateAttempPayment(p)} variant={p?.variant} size="lg" disabled={p?.isCurrentPlan} className="w-full">
                                    {p?.cta}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-10">
                        🐾 Todos los planes incluyen 7 días de prueba gratis · Cancela cuando quieras
                    </p>
                </div>
            </section>
        </LayoutLoader>

    )
}
