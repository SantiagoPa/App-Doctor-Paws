
// Mock IA response — substituir por edge function cuando se habilite Cloud
export const mockIAResponse = (symptom: string, petName: string, species: string): string => {
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