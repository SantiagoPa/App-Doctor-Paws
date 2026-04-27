import { useState } from "react"


export const useCustomForm = <T extends Record<string, any>>(initialState: T) => {

    const [form, setForm] = useState(initialState);

    const handleInputChange = (value: string, key: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return { ...form, handleInputChange}
}
