import { motion } from "framer-motion";
import { PawPrint, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactElement, ReactNode } from "react";

type LoaderProps = {
    /** Mensaje opcional debajo del loader */
    message?: string;
    /** Tamaño del icono central */
    size?: "sm" | "md" | "lg";
    /** Si es true, ocupa toda la pantalla con overlay */
    fullScreen?: boolean;
    /** Clases adicionales para el contenedor */
    className?: string;
    isLoading: boolean;
};

const sizeMap = {
    sm: { wrap: "w-12 h-12", icon: "w-5 h-5", paw: "w-3 h-3", orbit: 28 },
    md: { wrap: "w-20 h-20", icon: "w-8 h-8", paw: "w-4 h-4", orbit: 48 },
    lg: { wrap: "w-28 h-28", icon: "w-12 h-12", paw: "w-5 h-5", orbit: 70 },
};

/**
 * Loader reutilizable de Doctor Huellitas.
 * Muestra un estetoscopio pulsante con huellitas orbitando.
 */
const Loader = ({ message = "Cargando...", size = "md", fullScreen = false, isLoading, className }: LoaderProps) => {
    const s = sizeMap[size];

    const content = (
        <div className={cn("fixed inset-0 z-100 flex flex-col items-center justify-center gap-4", className)}>
            <div className="relative" style={{ width: s.orbit * 2 + 16, height: s.orbit * 2 + 16 }}>
                {/* Halo */}
                <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Icono central pulsante */}
                <motion.div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        "rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow",
                        s.wrap,
                    )}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Stethoscope className={cn("text-primary-foreground", s.icon)} />
                </motion.div>

                {/* Huellitas orbitando */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    aria-hidden
                >
                    {[0, 1, 2, 3].map((i) => {
                        const angle = (i * Math.PI) / 2;
                        const x = Math.cos(angle) * s.orbit;
                        const y = Math.sin(angle) * s.orbit;
                        return (
                            <PawPrint
                                key={i}
                                className={cn("absolute text-secondary-deep", s.paw)}
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${i * 90}deg)`,
                                }}
                            />
                        );
                    })}
                </motion.div>
            </div>

            {message && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium text-muted-foreground text-center max-w-xs"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );

    if (fullScreen) {
        return (<>
            {
                isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-background/70 backdrop-blur-md"
                        role="status"
                        aria-live="polite"
                        aria-busy="true"
                    >
                        {content}
                    </motion.div>
                )
            }
        </>
        );
    }

    return (
        <div role="status" aria-live="polite" aria-busy="true" className="py-8">
            {isLoading && content}
        </div>
    );
};

type LayoutLoader = LoaderProps & { children: ReactElement | ReactNode }

export const LayoutLoader = ({ children, ...props }: LayoutLoader) => {
    return (
        <>
            {children}
            <Loader  {...props} />
        </>
    )
};

