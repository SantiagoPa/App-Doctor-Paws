import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
//   Download,
  Hash,
  Mail,
  PartyPopper,
  Receipt,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { LayoutLoader } from "@/components/custom/Loader";
import { DetailRow } from "./components/DetailRow";

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  mensual: "Mensual",
  anual: "Anual",
};

const METHOD_LABEL: Record<string, string> = {
  card: "Tarjeta de crédito",
  paypal: "PayPal",
  yape: "Yape / Plin",
};

const genId = (prefix = "TXN") =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Simula la "verificación" del callback de la pasarela
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVerifying(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // Datos vienen por query (como una pasarela real)
  const data = useMemo(() => {
    const status = params.get("status") ?? "approved";
    const planKey = (params.get("plan") ?? "mensual").toLowerCase();
    const amount = Number(params.get("amount") ?? 11.79);
    const currency = params.get("currency") ?? "USD";
    const method = params.get("method") ?? "card";
    const email = params.get("email") ?? "cliente@ejemplo.com";
    const transactionId = params.get("transaction_id") ?? genId("TXN");
    const orderId = params.get("order_id") ?? genId("ORD");
    const authCode = params.get("auth_code") ?? Math.floor(100000 + Math.random() * 900000).toString();
    const last4 = params.get("last4") ?? "4242";
    const date = params.get("date") ?? new Date().toISOString();

    return {
      status,
      planKey,
      planLabel: PLAN_LABEL[planKey] ?? "Mensual",
      amount,
      currency,
      method,
      methodLabel: METHOD_LABEL[method] ?? method,
      email,
      transactionId,
      orderId,
      authCode,
      last4,
      date,
    };
  }, [params]);

  const formattedDate = useMemo(
    () =>
      new Date(data.date).toLocaleString("es-PE", {
        dateStyle: "long",
        timeStyle: "short",
      }),
    [data.date],
  );

  const copy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copiado`);
  };


  return (
    <LayoutLoader fullScreen isLoading={verifying} message="Verificando tu pago...">
    <div className="min-h-[calc(100vh-4rem)] py-10 lg:py-14 px-4 bg-linear-to-b from-background to-muted/30">
      <div className="max-w-3xl mx-auto">
        {/* Hero éxito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-8 lg:p-12 shadow-float border border-border/50 text-center relative overflow-hidden"
        >
          {/* Confetti decorativo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-primary rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-warm rounded-full opacity-10 blur-3xl" />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="relative w-24 h-24 mx-auto rounded-full bg-success/15 flex items-center justify-center mb-6"
          >
            <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={2.5} />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-success/30"
            />
          </motion.div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-sm text-success font-semibold mb-3">
              <PartyPopper className="w-4 h-4" /> Pago aprobado
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-extrabold mb-3">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Tu plan{" "}
              <span className="font-bold text-foreground">{data.planLabel}</span> ya está activo.
              Te enviamos el comprobante a{" "}
              <span className="font-semibold text-foreground">{data.email}</span>.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 bg-muted/50 rounded-full px-5 py-2.5">
              <span className="text-sm text-muted-foreground">Total cobrado</span>
              <span className="font-display font-extrabold text-2xl">
                ${data.amount.toFixed(2)} {data.currency}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Detalle de la transacción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-3xl p-7 lg:p-8 shadow-card border border-border/50 mt-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-xl">Detalle de la transacción</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-success/15 text-success text-xs font-bold uppercase tracking-wider">
              {data.status}
            </span>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <DetailRow
              icon={Hash}
              label="ID de transacción"
              value={data.transactionId}
              onCopy={() => copy("ID de transacción", data.transactionId)}
              mono
            />
            <DetailRow
              icon={Receipt}
              label="N° de orden"
              value={data.orderId}
              onCopy={() => copy("N° de orden", data.orderId)}
              mono
            />
            <DetailRow icon={Sparkles} label="Plan" value={`Plan ${data.planLabel}`} />
            <DetailRow
              icon={CreditCard}
              label="Método de pago"
              value={
                data.method === "card"
                  ? `${data.methodLabel} •••• ${data.last4}`
                  : data.methodLabel
              }
            />
            <DetailRow icon={ShieldCheck} label="Código de autorización" value={data.authCode} mono />
            <DetailRow icon={Calendar} label="Fecha" value={formattedDate} />
            <DetailRow icon={Mail} label="Email" value={data.email} />
            <DetailRow
              icon={Sparkles}
              label="Próxima renovación"
              value={
                data.planKey === "anual"
                  ? new Date(Date.now() + 365 * 86400000).toLocaleDateString("es-PE", {
                      dateStyle: "long",
                    })
                  : data.planKey === "mensual"
                    ? new Date(Date.now() + 30 * 86400000).toLocaleDateString("es-PE", {
                        dateStyle: "long",
                      })
                    : "—"
              }
            />
          </dl>

          <Separator className="my-7" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" className="flex-1" onClick={() => navigate("/app")}>
              Ir al dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              onClick={() => toast.success("Descargando comprobante...")}
            >
              <Download className="w-4 h-4" />
              Descargar comprobante
            </Button> */}
          </div>
        </motion.div>

        {/* Footer de ayuda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-sky rounded-2xl p-5 text-sm text-primary-deep flex gap-3"
        >
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            ¿Necesitas ayuda con tu compra? Escríbenos a{" "}
            <a href="mailto:soporte@doctorhuellitas.com" className="font-bold underline">
              soporte@doctorhuellitas.com
            </a>{" "}
            citando tu ID de transacción.
          </p>
        </motion.div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-smooth"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
    </LayoutLoader>

  );
}
