
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useApiCall } from '@/hooks/useApiCall';


import { onDynamicMethod } from '@/services/dynamic.service';
import { toast } from 'sonner';
import { LayoutLoader } from '@/components/custom/Loader';
import { useAuthStore } from '../store/auth.store';
import type { LoginUser } from '@/types/auth.type';
import type { FormRegisterType } from '@/modules/shared/schemas/FormRegisterSchema';
import { FormRegister } from '@/modules/shared/components/FormRegister';

export const RegisterForm = () => {

    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { callEndpoint, isLoading } = useApiCall();


    const onSubmit = async (payload: FormRegisterType) => {
        const { result, status } = await callEndpoint<LoginUser>(onDynamicMethod({
            method: "POST",
            endpoint: "/auth/register",
            payload: { ...payload }
        }));
        if (status === 201 && result) {
            const { access_token, ...user } = result;
            login({ token: result.access_token, user });
            navigate("/app");
            toast.success("¡Cuenta creada! 🎉");
        }
    }

    return (
        <LayoutLoader fullScreen isLoading={isLoading}>
            <div className="flex items-center justify-center p-6 lg:p-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-float border border-white dark:bg-primary-foreground"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
                            <Stethoscope className="w-8 h-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-display font-extrabold text-center mb-2">
                        Crea tu cuenta
                    </h1>
                    <p className="text-center text-muted-foreground mb-8">
                        Únete y cuida mejor a tu mascota"
                    </p>

                    <FormRegister onSubmit={onSubmit} />

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/auth/login" className="text-primary-deep font-bold hover:underline">
                            Inicia sesión
                        </Link>

                    </p>
                </motion.div>
            </div>
        </LayoutLoader>
    )
}
