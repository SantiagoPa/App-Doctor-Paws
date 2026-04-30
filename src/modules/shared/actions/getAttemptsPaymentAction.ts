import doctorPawsApi from "@/api/doctorPawsApi";
import type { Payment } from "@/types/payment.type";


export const getAttemptsPaymentAction = async (id_payment: string): Promise<Payment> => {
    const { data } = await doctorPawsApi.get<Payment>(`/payment/${id_payment}`);
    return data;
}
