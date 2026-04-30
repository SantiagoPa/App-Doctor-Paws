import doctorPawsApi from "@/api/doctorPawsApi"
import type { Payment } from "@/types/payment.type"

type PayloadPayment = {
    usuario_id: string;
    monto_cop: number;
    estado: string;
    redirect_url: string;
}

export const createAttemptPaymentAction = async (payload: PayloadPayment): Promise<Payment> => {
    const { data } = await doctorPawsApi.post<Payment>(`/payment`, payload)
    return data;
}
