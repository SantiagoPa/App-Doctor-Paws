import doctorPawsApi from "@/api/doctorPawsApi"
import type { Payment } from "@/types/payment.type"


export const getAttemptPaymentByUserAction = async (uid: string): Promise<Payment> => {
    const { data } = await doctorPawsApi.get<Payment>(`/payment/user/${uid}`);
    return data;

}
