import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router";


export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { status } = useAuthStore();

    // if (status === "authenticathing") return null;

    if (status === "not-authenticated") return <Navigate to={"/auth/login"} />

    return children;
}

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { status } = useAuthStore();

    if (status === "authenticathing") return null;

    if (status === "authenticated") return <Navigate to={"/app"} />

    return children;
}

export const AdminRoute = ({ children }: PropsWithChildren) => {
    const { status, isAdmin } = useAuthStore();

    if (status === "authenticathing") return null;

    if (status === "not-authenticated") return <Navigate to={"/auth/login"} />;

    if (!isAdmin()) return <Navigate to={"/"} />;

    return children;
}


