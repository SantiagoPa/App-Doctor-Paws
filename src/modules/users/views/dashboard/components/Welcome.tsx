
import { CatSvg, DogSvg } from '@/components/custom/PetIllustrations';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { motion } from 'framer-motion';
import { MessageCircleHeart, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export const Welcome = () => {

    const { user } = useAuthStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-hero rounded-3xl p-8 md:p-10 overflow-hidden shadow-card"
        >
            <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-bold text-primary-deep mb-3">
                    <Sparkles className="w-3 h-3" /> Tu panel de cuidado
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
                    Hola, <span className="capitalize">{user?.nombre_completo}</span> 👋
                </h1>
                <p className="text-muted-foreground mb-6">
                    Aquí tienes todo lo que necesitas para cuidar a tus peluditos.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Button asChild>
                        <Link to="/app/chat"><MessageCircleHeart className="w-4 h-4" /> Consultar a la IA</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link to="/app/mascotas"><Plus className="w-4 h-4" /> Agregar mascota</Link>
                    </Button>
                </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden md:flex items-end gap-2 opacity-90">
                <CatSvg className="w-32 h-32" />
                <DogSvg className="w-40 h-40" />
            </div>
        </motion.div>
    )
}
