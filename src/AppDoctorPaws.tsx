
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

import { appRouter } from './router/app.router';
import { AuthProvider } from './context/AuthContext';
import { TooltipProvider } from './components/ui/tooltip';
import { AdminProvider } from './context/AdminContext';
import { useVerifyToken } from './hooks/useVerifyToken';
import { LayoutLoader } from './components/custom/Loader';

const queryClient = new QueryClient();

export function App() {

  const { isLoading } = useVerifyToken();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='top-center' />
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>
            <LayoutLoader isLoading={isLoading} fullScreen >
              <RouterProvider router={appRouter} />
            </LayoutLoader>
          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>

  )
}

export default App
