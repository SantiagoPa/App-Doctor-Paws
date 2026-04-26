import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <AppHeader />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

export default Layout;