
import type { User } from '@/types/auth.type';
import { create, type StateCreator } from 'zustand';

import { createJSONStorage, devtools, persist, type StateStorage } from 'zustand/middleware';


type AuthStore = {
    status: "not-authenticated" | "authenticated" | "authenticathing"
    user: User | null;
    access_token: string | null;

    startLogin: () => void;
    login: ({ token, user }: { user: User, token: string }) => void;
    updateToken: (token: string) => void;
    logout: () => void;
}


const storeApi: StateCreator<AuthStore> = (set) => ({
    status: "not-authenticated",
    user: null,
    access_token: null,
    startLogin: () => set({ status: "authenticathing" }),
    login: ({ token, user }) => {
        localStorage.setItem("token", token);
        set({ status: "authenticated", access_token: token, user });
    },
    logout: () => set({
        status: "not-authenticated",
        access_token: null,
        user: null,
    }),
    updateToken: (token) => {
        localStorage.setItem("token", token);
        set({ access_token: token});
    }
});



const customSessionStorage: StateStorage = {
    getItem: function (name: string): string | null {
        const data = localStorage.getItem(name)
        return data;
    },

    setItem: function (name: string, value: string): void {
        localStorage.setItem(name, value);
    },

    removeItem: function (name: string): void {
        localStorage.removeItem(name)
    }
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            storeApi,
            {
                name: "auth-store",
                storage: createJSONStorage(() => customSessionStorage)
            }
        )
    )
)