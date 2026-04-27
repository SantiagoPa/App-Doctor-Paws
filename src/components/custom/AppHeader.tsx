import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageCircleHeart, PawPrint, LogOut, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const AppHeader = () => {

    //   const { user, logout } = useAuth();
    const { user, status,  logout } = useAuthStore();
    const location = useLocation();
    const nav = useNavigate();

    const links = [
        { to: "/app", label: "Dashboard", icon: LayoutDashboard },
        { to: "/app/mascotas", label: "Mis Mascotas", icon: PawPrint },
        { to: "/app/chat", label: "Consulta IA", icon: MessageCircleHeart },
        { to: "/admin", label: "Dashboard Admin", icon: LayoutDashboard },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50 mx-2">
            <div className="container flex items-center justify-between h-16">
                <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-bounce">
                        <Stethoscope className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-display font-bold text-lg leading-none">Doctor Huellitas</h1>
                        <p className="text-[10px] text-muted-foreground font-medium">Asistente veterinario IA</p>
                    </div>
                </Link>

                {user ? (
                    <>
                        <nav className="hidden md:flex items-center gap-1">
                            {links.map((l) => {
                                const active = location.pathname === l.to;
                                return (
                                    <Link
                                        key={l.to}
                                        to={l.to}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-smooth",
                                            active
                                                ? "bg-primary/15 text-primary-deep"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            l.to === "/admin" ? "text-dark bg-secondary-deep" : ""
                                        )}
                                    >
                                        <l.icon className="w-4 h-4" />
                                        {l.label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-xs text-muted-foreground">Hola,</p>
                                <p className="text-sm font-semibold capitalize">{user.user}</p>
                            </div>
                            <Button variant="default" size="icon" onClick={() => { logout(); nav("/"); }} aria-label="Salir">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" asChild><Link to="/auth/login">Iniciar sesión</Link></Button>
                        <Button variant="hero" asChild><Link to="/auth/register">Crear cuenta</Link></Button>
                    </div>
                )}
            </div>

            {status === "authenticated" && (
                <nav className="md:hidden border-t border-border/50 flex items-center justify-around py-2">
                    {links.map((l) => {
                        const active = location.pathname === l.to;
                        return (
                            <Link key={l.to} to={l.to} className={cn(
                                "flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-xs",
                                active ? "text-primary-deep" : "text-muted-foreground"
                            )}>
                                <l.icon className="w-5 h-5" />
                                {l.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
};