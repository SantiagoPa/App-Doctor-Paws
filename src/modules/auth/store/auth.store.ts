
import type { User, UserRoles } from '@/types/auth.type';
import { create, type StateCreator } from 'zustand';

import { createJSONStorage, devtools, persist, type StateStorage } from 'zustand/middleware';
import { onCheckAuth } from '../actions';


const ADMINS_ROLES: UserRoles[] = ["ADMIN", "SUPER_ADMIN"]

type AuthStore = {
    //properties
    status: "not-authenticated" | "authenticated" | "authenticathing"
    user: User | null;
    access_token: string | null;
    
    //getters
    isAdmin: () => boolean;

    // actiosn
    startLogin: () => void;
    login: ({ token, user }: { user: User, token: string }) => void;
    checkAuth: () => Promise<boolean>;
    logout: () => void;
}


const storeApi: StateCreator<AuthStore> = (set, get) => ({
    status: "not-authenticated",
    user: null,
    access_token: null,


    // getters
    isAdmin: () => {
        const roles = get().user?.roles
        if (roles) return ADMINS_ROLES.includes(roles)
        return false;
    },
    // actions
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

    checkAuth: async () => {
        try {
            const { token } = await onCheckAuth();
            set({ access_token: token, status: "authenticated" });
            return true;
        } catch (error) {
            set({
                status: "not-authenticated",
                access_token: null,
                user: null,
            })
            return false;
        }
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