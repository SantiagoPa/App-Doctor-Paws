import { getEnv } from "@/helper";
import type { User } from "@/types/auth.type";
import type { Payment } from "@/types/payment.type";
import { useEffect, useRef } from "react";

const { VITE_PUBLIC_KEY_WOMPI } = getEnv();

interface Props {
    amountInCents: number;
    payment: Payment;
    user: User;
    contact: {
        correo: string;
        nombre: string;
        address: string;
        region: string;
    }
}

export const ButtonWompi = ({ amountInCents, payment, user, contact }: Props) => {

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current) return;

        // Limpia scripts previos para evitar duplicados en re-renders
        formRef.current.innerHTML = '';
        console.log({payment, expiration_time: payment.expiration_time});

        const script = document.createElement('script');
        script.src = 'https://checkout.wompi.co/widget.js';
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', VITE_PUBLIC_KEY_WOMPI);
        script.setAttribute('data-currency', 'COP');
        script.setAttribute('data-amount-in-cents', String(amountInCents));
        script.setAttribute('data-reference', payment.referencia);
        script.setAttribute('data-signature:integrity', payment.firma_integridad);
        script.setAttribute('data-redirect-url', payment.redirect_url);
        script.setAttribute('data-expiration-time', payment.expiration_time);

        script.setAttribute('data-customer-data:email', user.correo);
        script.setAttribute('data-customer-data:full-name', user.nombre_completo);
        script.setAttribute('data-customer-data:phone-number', user.celular);
        script.setAttribute('data-customer-data:phone-number-prefix', '+57');
        script.setAttribute('data-customer-data:legal-id', user.cedula);
        script.setAttribute('data-customer-data:legal-id-type', 'CC');

        script.setAttribute('data-shipping-address:address-line-1', contact.address);
        script.setAttribute('data-shipping-address:region', contact.region ?? user.departamento);
        script.setAttribute('data-shipping-address:name', user.nombre_completo);
        script.setAttribute('data-shipping-address:country', 'CO');
        script.setAttribute('data-shipping-address:city', user.municipio);
        script.setAttribute('data-shipping-address:phone-number', user.celular);

        // data - shipping - address: address - line - 1="Carrera 123 # 4-5"
        // data - shipping - address: address - line - 2="apto 123"
        // data - shipping - address: country = "CO"
        // data - shipping - address: city = "Bogota"
        // data - shipping - address: phone - number="3019988888"
        // data - shipping - address: region = "Cundinamarca"
        // data - shipping - address: name = "Pedro Perez"
        script.async = true;

        formRef.current.appendChild(script);
    }, [amountInCents, payment, user]);

    return <form ref={formRef} />;
}
