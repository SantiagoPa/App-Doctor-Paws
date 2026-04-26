import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { Send, Sparkles, Stethoscope, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
    "No quiere comer hace 2 días",
    "Vomita después de comer",
    "Está muy decaído y duerme mucho",
    "Se rasca mucho la oreja",
];

// Mock IA response — substituir por edge function cuando se habilite Cloud
const mockResponse = (symptom: string, petName: string, species: string): string => {
    const intros = [
        `Entiendo tu preocupación por ${petName}. 💛`,
        `Gracias por contarme sobre ${petName}.`,
    ];
    const intro = intros[Math.floor(Math.random() * intros.length)];

    return `${intro}
    Por lo que describes ("${symptom}"), en un ${species} esto podría estar relacionado con varias causas:

    **Posibles causas comunes:**
    • Cambios en la dieta o intolerancia a algún alimento
    • Estrés o cambios en su entorno
    • Una infección leve o malestar gastrointestinal
    • En ${species}s, también puede deberse a parásitos intestinales

    **Qué te recomiendo hacer ahora:**
    1. 💧 Asegúrate de que tenga agua fresca disponible
    2. 🍽️ Ofrece comida blanda en pequeñas porciones
    3. 👀 Observa su comportamiento las próximas 12-24 horas
    4. 🌡️ Revisa si tiene fiebre o cambios visibles

    **🚨 Acude al veterinario si notas:**
    - Vómitos repetidos o con sangre
    - Decaimiento extremo
    - No bebe agua por más de 24h
    - Dificultad para respirar

    Recuerda: esta es una orientación inicial. Para un diagnóstico real, lo mejor es una consulta veterinaria. ¿Quieres contarme más detalles?`;
};

const ChatPage = () => {
    const { user, pets } = useAuth();
    const [selectedPet, setSelectedPet] = useState(pets[0]?.id ?? "");
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, loading]);

    if (!user) return <Navigate to="/login" replace />;

    const pet = pets.find((p) => p.id === selectedPet);

    const send = (text?: string) => {
        const content = (text ?? input).trim();
        if (!content) return;
        if (!pet) return;
        setInput("");
        setMessages((m) => [...m, { role: "user", content }]);
        setLoading(true);

        // Simula streaming
        setTimeout(() => {
            const reply = mockResponse(content, pet.name, pet.species);
            setMessages((m) => [...m, { role: "assistant", content: reply }]);
            setLoading(false);
        }, 1200);
    };

    if (pets.length === 0) {
        return (
            <div className="container py-16 text-center max-w-md mx-auto">
                <div className="w-32 h-32 mx-auto mb-4">
                    <DogSvg className="w-full h-full animate-float" />
                </div>
                <h1 className="text-2xl font-display font-bold mb-2">Primero agrega una mascota</h1>
                <p className="text-muted-foreground mb-6">
                    Para una mejor consulta, necesito saber sobre tu peludito.
                </p>
                <Button asChild>
                    <Link to="/app/mascotas">Agregar mascota</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="py-6 mx-5 lg:py-8 flex flex-col justify-center">
            {/* Header */}
            <div className="bg-gradient-hero rounded-3xl p-6 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                        <Stethoscope className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-extrabold">Consulta con la IA</h1>
                        <p className="text-sm text-muted-foreground">Describe los síntomas que observas</p>
                    </div>
                </div>
                <Select value={selectedPet} onValueChange={setSelectedPet}>
                    <SelectTrigger className="w-full sm:w-56 rounded-2xl bg-white/80 h-12">
                        <SelectValue placeholder="Elige mascota" />
                    </SelectTrigger>
                    <SelectContent>
                        {pets.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                                {p.species === "perro" ? "🐶" : "🐱"} {p.name} · {p.breed}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Chat area */}
            <div className="bg-card rounded-3xl shadow-card border border-border/50 overflow-hidden flex flex-col h-[calc(100vh-22rem)] min-h-112.5">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="flex gap-3 mb-2 mt-10">
                                <div className="w-20 h-20"><DogSvg className="w-full h-full animate-bounce-soft" /></div>
                                <div className="w-20 h-20" style={{ animationDelay: "0.3s" }}><CatSvg className="w-full h-full animate-bounce-soft" /></div>
                            </div>
                            <h2 className="text-xl font-display font-bold mb-2">¡Hola! ¿En qué puedo ayudarte?</h2>
                            <p className="text-muted-foreground mb-6 max-w-sm">
                                Cuéntame qué síntomas observas en {pet?.name}.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-2 max-w-xl w-full">
                                {SUGGESTED.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => send(s)}
                                        className="text-left text-sm p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:border-primary border-2 border-transparent transition-smooth flex items-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4 text-primary-deep shrink-0" />
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-gradient-warm" : "bg-gradient-primary"
                                    }`}>
                                    {m.role === "user" ? (
                                        <span className="font-bold text-secondary-foreground">{user.name[0].toUpperCase()}</span>
                                    ) : (
                                        <Stethoscope className="w-5 h-5 text-primary-foreground" />
                                    )}
                                </div>
                                <div className={`max-w-[80%] rounded-3xl px-4 py-3 ${m.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-md"
                                    : "bg-muted rounded-tl-md"
                                    }`}>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                                </div>
                            </motion.div>
                        ))
                    )}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="bg-muted rounded-3xl rounded-tl-md px-5 py-4 flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }} />
                                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-border/50 p-3 sm:p-4 bg-background/50">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground px-2">
                        <AlertCircle className="w-3 h-3" />
                        Esto es una orientación inicial, no reemplaza una consulta veterinaria.
                    </div>
                    <form
                        onSubmit={(e) => { e.preventDefault(); send(); }}
                        className="flex gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`¿Qué síntomas observas en ${pet?.name}?`}
                            className="rounded-2xl h-12 bg-background"
                            disabled={loading}
                        />
                        <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={loading || !input.trim()}>
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;