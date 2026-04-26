import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '@/components/custom/Layout';

const LandingLazy = lazy(() => import('@/modules/home/Landing'));

const AuthPageLazy = lazy(() => import('@/modules/auth/AuthPage'));

// USER
const DashboardPageLazy = lazy(() => import('@/modules/users/DashboardPage'));
const PetsPageLazy = lazy(() => import('@/modules/users/PetsPage'));
const ChatPageLazy = lazy(() => import('@/modules/users/ChatPage'));

// ADMIN
const LayoutAdminLazy = lazy(() => import('@/components/custom/AdminLayout'));
const DashboardAdminLazy = lazy(() => import('@/modules/dashboard/DashboardAdmin'));
const UserPageLazy = lazy(() => import('@/modules/dashboard/UserPage'));
const PlanesPageLazy = lazy(() => import('@/modules/dashboard/PlanesPage'));
const SuscripcionesPageLazy = lazy(() => import('@/modules/dashboard/SuscripcionesPage'));
const SuscripcionesVetPageLazy = lazy(() => import('@/modules/dashboard/SuscripcionesVetPage'));
const VeterinariasPageLazy = lazy(() => import('@/modules/dashboard/VeterinariasPage'));
const AlertasPageLazy = lazy(() => import('@/modules/dashboard/AlertasPage'));




export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingLazy />,
            },
        ],
    },

    // Auth Routes
    {
        path: '/auth',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />,
            },
            {
                path: 'login',
                element: <AuthPageLazy mode='login' />,
            },
            {
                path: 'register',
                element: <AuthPageLazy mode='register' />,
            },
        ],
    },
    // Auth users
    {
        path: "/app",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <DashboardPageLazy />
            },
            {
                path: "mascotas",
                element: <PetsPageLazy />
            },
            {
                path: "chat",
                element: <ChatPageLazy />
            }
        ]
    },
    // Admin Routes
    {
        path: '/admin',
        element: <LayoutAdminLazy />,
        children: [
            {
                index: true,
                element: <DashboardAdminLazy />,
            },
            {
                path: 'user',
                element: <UserPageLazy />,
            },
            {
                path: "/admin/planes",
                element: <PlanesPageLazy />
            },
            {
                path: "/admin/veterinarias",
                element: <VeterinariasPageLazy />
            },
            {
                path: "/admin/suscripciones",
                element: <SuscripcionesPageLazy />
            },
            {
                path: "/admin/suscripciones-vet",
                element: <SuscripcionesVetPageLazy />
            },
            {
                path: "/admin/alertas",
                element: <AlertasPageLazy />
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
]);
