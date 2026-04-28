import type { Pet } from "@/types/pet.type";
import { mockIAResponse } from "@/utils/mockIAResponse";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };


export const useChat = (pets?: Pet[]) => {

    const [selectedPet, setSelectedPet] = useState(pets ? pets[0]?.id : "");

    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    const pet = useMemo(() => pets?.find((p) => p.id === selectedPet), [selectedPet]);

    const send = (text?: string) => {
        const content = (text ?? input).trim();
        if (!content) return;
        if (!pet) return toast.info("Seleccione una mascota para iniciar las consultas");
        setInput("");
        setMessages((m) => [...m, { role: "user", content }]);
        setLoading(true);

        // Simula streaming
        setTimeout(() => {
            const reply = mockIAResponse(content, pet.nombre, pet.especie);
            setMessages((m) => [...m, { role: "assistant", content: reply }]);
            setLoading(false);
        }, 1200);
    };

    const onSelectPet = (value: string) => {
        setSelectedPet(value);
    }

    const handleInputChange = (value: string) => {
        setInput(value);
    }

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, loading]);

    return { selectedPet, pet, messages, input, loading, scrollRef, onSelectPet, send, handleInputChange };
}
