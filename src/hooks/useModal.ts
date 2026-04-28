import { useState } from "react";


export const useModal = <T>() => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const onOpen = (data: T) => {
        setOpen(true);
        setData(data);
    }

    const onClosed = () => {
        setOpen(false);
        setData(null);
    }

    const onOpenChange = (value: boolean) => {
        setOpen(value);
    }

    return { open, data, onOpen, onClosed, onOpenChange };
}
