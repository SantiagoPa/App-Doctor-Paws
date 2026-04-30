import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '@/components/custom/Layout';
import { AdminRoute, AuthenticatedRoute, NotAuthenticatedRoute } from '@/components/routes/ProtectedRoute';

const LandingLazy = lazy(() => import('@/modules/home/Landing'));

const AuthPageLazy = lazy(() => import('@/modules/auth/AuthPage'));

// USER
const DashboardPageLazy = lazy(() => import('@/modules/users/DashboardPage'));
const PetsPageLazy = lazy(() => import('@/modules/users/PetsPage'));
const LayoutPetsLazy = lazy(() => import('@/modules/users/views/pets/layout/LayoutPets'));
const PetPageLazy = lazy(() => import('@/modules/users/views/pets/PetPage'));
const PlanesPageLazy = lazy(() => import('@/modules/users/PlanesPage'));
const PlanPagetLazy = lazy(() => import('@/modules/users/views/plan/PlanPage'));
const PlanLayoutLazy = lazy(() => import('@/modules/users/views/plan/layaout/PlanLayout'));
const PaymentSuccessPageLazy = lazy(() => import('@/modules/users/views/plan/PaymentSuccess'));
const ChatPageLazy = lazy(() => import('@/modules/users/ChatPage'));

// ADMIN
const LayoutAdminLazy = lazy(() => import('@/components/custom/AdminLayout'));
const DashboardAdminLazy = lazy(() => import('@/modules/dashboard/DashboardAdmin'));
const UserPageLazy = lazy(() => import('@/modules/dashboard/UserPage'));
const AdminPlanesPageLazy = lazy(() => import('@/modules/dashboard/PlanesPage'));
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
        element: (
            <NotAuthenticatedRoute>
                <Layout />,
            </NotAuthenticatedRoute>),
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
        element: (
            <AuthenticatedRoute>
                <Layout />
            </AuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPageLazy />
            },
            {
                path: "mascotas",
                element: (
                    <LayoutPetsLazy />
                ),
                children: [
                    {
                        index: true,
                        element: <PetsPageLazy />
                    },
                    {
                        path: ":id",
                        element: <PetPageLazy />
                    }
                ]
            },
            {
                path: "planes",
                element: <PlanLayoutLazy />,
                children: [
                    {
                        index: true,
                        element: <PlanesPageLazy />
                    },
                    {
                        path: "payment/success",
                        element:<PaymentSuccessPageLazy/>
                    },
                    {
                        path: ":idPlan/payment/:idPayment",
                        element: <PlanPagetLazy />
                    }
                ]
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
        element: (
            <AdminRoute>
                <LayoutAdminLazy />
            </AdminRoute>
        ),
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
                path: "planes",
                element: <AdminPlanesPageLazy />
            },
            {
                path: "veterinarias",
                element: <VeterinariasPageLazy />
            },
            {
                path: "suscripciones",
                element: <SuscripcionesPageLazy />
            },
            {
                path: "suscripciones-vet",
                element: <SuscripcionesVetPageLazy />
            },
            {
                path: "alertas",
                element: <AlertasPageLazy />
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
]);
