import { createBrowserRouter, Navigate } from 'react-router';


export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            // {
            //     path: 'gender/:gender',
            //     element: <GenderPage />,
            // },
        ],
    },

    // Auth Routes
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
    // Admin Routes
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'products',
                element: <AdminProductsPage />,
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
]);
