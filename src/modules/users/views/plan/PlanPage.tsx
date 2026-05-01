import { Link, Navigate, useParams } from "react-router";
import { usePlan } from "./hooks/usePlan";
import { LayoutLoader } from "@/components/custom/Loader";
import { formatCurrency } from "@/utils/formatCurrency";
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { FormPayment } from "./components/FormPayment";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { ButtonWompi } from "@/components/custom/ButtonWompi";
import { Activity, useState } from "react";
import { usePayment } from "@/modules/shared/hooks/payments";

const PlanPage = () => {

    const { idPlan, idPayment } = useParams();
    const { user } = useAuthStore();
    const { data: plan, isLoading } = usePlan(idPlan ?? "");
    const { data: payment, isLoading: isLoadingPayment } = usePayment(idPayment ?? "");

    const [dataContact, setDataContact] = useState({ correo: "", nombre: "", address: "", region: "" });

    const onSetDataContact = (payload: typeof dataContact) => setDataContact(payload);

    if (!isLoadingPayment && !payment) return <Navigate to={"/app/planes/"} />

    return (
        <LayoutLoader fullScreen isLoading={isLoading || isLoadingPayment}>
            <div className="min-h-[calc(100vh-4rem)] py-10 lg:py-14 px-4 bg-linear-to-b from-background to-muted/30">
                <div className="max-w-6xl mx-auto">
                    <Link
                        to="/app/planes"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver a planes
                    </Link>

                    <div className="grid lg:grid-cols-[1fr_420px] gap-8">
                        {/* FORM */}
                        {
                            (plan && user) && <FormPayment plan={plan} user={user} onSetDataContact={onSetDataContact} />
                        }

                        {/* SUMMARY */}
                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:sticky lg:top-24 h-fit space-y-4"
                        >
                            <div className="bg-card rounded-3xl p-7 shadow-card border border-border/50">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="font-display font-bold text-lg">Resumen</h2>
                                </div>

                                <div className="flex items-center gap-4 mb-6">

                                    <div>
                                        <p className="font-display font-bold text-xl">{plan?.nombre}</p>
                                        <p className="text-sm text-muted-foreground">Renovación en {plan?.duracion_dias} Dias</p>
                                    </div>
                                </div>


                                <Separator className="my-5" />

                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Subtotal</dt>
                                        <dd>{formatCurrency(Number(plan?.precio_cop))}</dd>
                                    </div>
                                    <div className="flex justify-between text-success">
                                        <dt className="text-muted-foreground">Impuestos (0%)</dt>
                                        <dd>$0</dd>
                                    </div>
                                    <div className="flex justify-between text-success">
                                        <dt>7 días de prueba</dt>
                                        <dd className="font-semibold">Gratis</dd>
                                    </div>
                                </dl>

                                <Separator className="my-5" />

                                <div className="flex justify-between items-baseline">
                                    <span className="font-display font-bold text-lg">Total</span>
                                    <span className="font-display font-extrabold text-3xl">
                                        {formatCurrency(Number(plan?.precio_cop))}
                                    </span>
                                </div>
                                <div className="flex justify-center my-10">
                                    <Activity mode={(payment && user && plan && dataContact.address) ? "visible" : "hidden"} >
                                        <ButtonWompi amountInCents={Number(plan?.precio_cop) * 100} user={user!} payment={payment!} contact={dataContact} />
                                    </Activity>
                                    {
                                        !dataContact.address && (
                                            <span className="text-sm text-muted-foreground flex flex-row gap-1 justify-center">
                                                <AlertCircle />
                                                Esperando confirmacion de datos de contacto
                                            </span>
                                        )
                                    }
                                </div>
                            </div>


                            <div className="bg-gradient-sky dark:bg-primary-deep rounded-2xl p-5 text-sm text-primary-deep dark:text-white flex gap-3">
                                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>
                                    <span className="font-bold">Garantía 7 días.</span> Si no te encanta, te
                                    devolvemos tu dinero, sin preguntas.
                                </p>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </div>
        </LayoutLoader >
    )
}

export default PlanPage;
