import { CatSvg, DogSvg } from "@/components/custom/PetIllustrations";
import { motion } from "framer-motion";


export const VisualSidePets = () => {
    return (
        <div className="hidden lg:flex items-center justify-center p-12 relative" >
            <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-8 rounded-full bg-white/40 backdrop-blur" />
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute left-0 top-8 w-56 h-56"
                >
                    <DogSvg className="w-full h-full drop-shadow-2xl" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
                    className="absolute right-0 bottom-8 w-48 h-48"
                >
                    <CatSvg className="w-full h-full drop-shadow-2xl" />
                </motion.div>
            </div>
        </div>
    )
}
