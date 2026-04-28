import type { Pet } from "@/types/pet.type";
import { mockIAResponse } from "@/utils/mockIAResponse";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useMessages } from "./useMessages";
import type { PayloadQuery, Query } from "@/types/query.type";
import { useAuthStore } from "@/modules/auth/store/auth.store";

interface Props {
    pets?: Pet[];
    queries?: Query[];
    query?: Query;
    mutationCreateQuery: (payload: PayloadQuery) => Promise<Query>;
}

export const useChat = ({ pets, queries, query, mutationCreateQuery }: Props) => {

    const { user } = useAuthStore();

    const { data: messages, mutation } = useMessages(query?.id ?? "");
    
    const [selectedPet, setSelectedPet] = useState(pets ? pets[0]?.id : "");

    // const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    const pet = useMemo(() => pets?.find((p) => p.id === selectedPet), [selectedPet]);

    const onValidateAndSendQuery = async (content: string) => {
        if (user && pet) {
            await mutationCreateQuery({
                "condicion_detectada": content,
                "nivel_urgencia": "VERDE",
                "sintoma_principal": content,
                "municipio_consulta": user.municipio,
                "departamento_consulta": user.departamento,
                "resolucion": "PENDIENTE",
                "usuario_id": user.id,
                "mascota_id": pet.id,
                "suscripcion_id": user.suscription.id,
                id: "new"
            });
        }
    }

    const send = async (text?: string) => {
        const content = (text ?? input).trim();
        if (!content || !user) return;
        if (!pet) return toast.warning("Seleccione una mascota para iniciar las consultas");
        setInput("");
        // setMessages((m) => [...m, { role: "user", content }]);
        setLoading(true);
        if (queries?.length === 0 ) {
            await onValidateAndSendQuery(content);
            setLoading(false);
            return;
        }
        // Simula streaming
        if (query) {
            mutation.mutateAsync({
                rol: "USUARIO",
                contenido: content,
                consulta_id: query.id,
                usuario_id: user?.id
            });
            setLoading(false);
            return;
        }

        setTimeout(() => {
            const reply = mockIAResponse(content, pet.nombre, pet.especie);
            console.log({ reply })
            setLoading(false);
        }, 1200);
    }

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
