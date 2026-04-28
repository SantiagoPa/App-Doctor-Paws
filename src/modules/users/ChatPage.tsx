import { Send, Sparkles, Stethoscope, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { motion } from "framer-motion";
import { useAuthStore } from "../auth/store/auth.store";
import { usePets } from "./views/pets/hooks/usePets";
import { LayoutLoader } from "@/components/custom/Loader";
import { useChat } from "./views/chat/hooks/useChat";
import { NotPetsInfo } from "./views/chat/components/NotPetsInfo";
import { HeaderChat } from "./views/chat/components/HeaderChat";
import { useConsultas } from "./views/chat/hooks/useConsultas";
import { useQueryUniq } from "./views/chat/hooks/useQueryUniq";


const SUGGESTED = [
    "No quiere comer hace 2 días",
    "Vomita después de comer",
    "Está muy decaído y duerme mucho",
    "Se rasca mucho la oreja",
];

const ChatPage = () => {

    const { user } = useAuthStore();
    const { data: pets, isLoading } = usePets();
    const { data: queries, mutation } = useConsultas();
    const { data: query } = useQueryUniq(queries ? queries[0]?.id : undefined);

    const { selectedPet, scrollRef, messages, pet, input, loading, onSelectPet, send, handleInputChange } = useChat({
        pets,
        queries,
        query: query,
        mutationCreateQuery: mutation.mutateAsync
    });

    if (pets?.length === 0) {
        return (
            <NotPetsInfo />
        );
    }
    
    return (
        <LayoutLoader isLoading={isLoading}>
            <div className="py-6 mx-5 lg:py-8 flex flex-col justify-center">
                {/* Header */}
                <HeaderChat selectedPet={selectedPet} pets={pets} onSelectPet={onSelectPet} />

                {/* Chat area */}
                <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden flex flex-col h-[calc(100vh-22rem)] min-h-112.5">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                        {!messages || messages?.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="flex gap-3 mb-2 mt-10">
                                    <div className="w-20 h-20"><DogSvg className="w-full h-full animate-bounce-soft" /></div>
                                    <div className="w-20 h-20" style={{ animationDelay: "0.3s" }}><CatSvg className="w-full h-full animate-bounce-soft" /></div>
                                </div>
                                <h2 className="text-xl font-display font-bold mb-2">¡Hola! ¿En qué puedo ayudarte?</h2>
                                <p className="text-muted-foreground mb-6 max-w-sm">
                                    Cuéntame qué síntomas observas en {pet?.nombre}.
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
                            messages?.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${m.rol === "USUARIO" ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center ${m.rol === "USUARIO" ? "bg-gradient-warm" : "bg-gradient-primary"
                                        }`}>
                                        {m.rol === "USUARIO" ? (
                                            <span className="font-bold text-secondary-foreground">{user?.user[0].toUpperCase()}</span>
                                        ) : (
                                            <Stethoscope className="w-5 h-5 text-primary-foreground" />
                                        )}
                                    </div>
                                    <div className={`max-w-[80%] rounded-3xl px-4 py-3 ${m.rol === "USUARIO"
                                        ? "bg-primary text-primary-foreground rounded-tr-md"
                                        : "bg-muted rounded-tl-md"
                                        }`}>
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.contenido}</div>
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
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder={`¿Qué síntomas observas en ${pet?.nombre}?`}
                                className="rounded-2xl h-12 bg-background"
                                disabled={loading}
                            />
                            <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={loading || (!input.trim() )}>
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </LayoutLoader>

    );
};

export default ChatPage;