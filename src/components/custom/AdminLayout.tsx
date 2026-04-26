import { NavLink, Outlet, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Package,
  Building2,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { title: "Resumen", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Usuarios", url: "/admin/user", icon: Users },
  { title: "Planes", url: "/admin/planes", icon: Package },
  { title: "Veterinarias", url: "/admin/veterinarias", icon: Building2 },
  { title: "Suscripciones", url: "/admin/suscripciones", icon: CreditCard },
  { title: "Suscripciones Vet.", url: "/admin/suscripciones-vet", icon: ShieldCheck },
  { title: "Alertas Epidemiológicas", url: "/admin/alertas", icon: AlertTriangle },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="p-2">
        <div className="flex items-center gap-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
            <Stethoscope className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-display font-bold text-sm leading-tight">Doctor Huellitas</p>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-xl",
                          isActive
                            ? "bg-primary/15 text-primary-deep font-semibold"
                            : "hover:bg-muted/70 text-foreground"
                        )
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-linear-to-br from-background via-muted/30 to-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div>
                <h1 className="font-display font-bold text-lg leading-none">Panel de Administración</h1>
                <p className="text-xs text-muted-foreground">Gestiona la plataforma Doctor Huellitas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-muted-foreground">Administrador</p>
                  <p className="text-sm font-semibold capitalize">{user.name}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  logout();
                  nav("/");
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;