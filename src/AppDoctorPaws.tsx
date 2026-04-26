
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

import { appRouter } from './router/app.router';
import { AuthProvider } from './context/AuthContext';
import { TooltipProvider } from './components/ui/tooltip';
import { AdminProvider } from './context/AdminContext';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' />
      <TooltipProvider>
        <AuthProvider>
          <AdminProvider>
            <RouterProvider router={appRouter} />
          </AdminProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>

  )
}

export default App
