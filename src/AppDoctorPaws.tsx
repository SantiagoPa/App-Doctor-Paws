
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

import { appRouter } from './router/app.router';
import { AuthProvider } from './context/AuthContext';
import { TooltipProvider } from './components/ui/tooltip';
import { AdminProvider } from './context/AdminContext';
import type { PropsWithChildren } from 'react';
import { LayoutLoader } from './components/custom/Loader';
import { useAuthStore } from './modules/auth/store/auth.store';

const queryClient = new QueryClient();


const CheckAuthProvider = ({ children }: PropsWithChildren) => {

  const { checkAuth } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["Auth"],
    queryFn: checkAuth,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  return <LayoutLoader isLoading={isLoading} fullScreen>{children}</LayoutLoader>
}


export function App() {



  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='top-center' />
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>

            <CheckAuthProvider>
              <RouterProvider router={appRouter} />
            </CheckAuthProvider>

          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>

  )
}

export default App
