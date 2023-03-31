import {lazy} from 'react';
import {MainLayout} from "../layouts";
import {RequiredAuth} from "../utilities";
import {Loadable} from "../components";

// dashboard routing
const MainPage = Loadable(lazy(() => import('../pages/MainPage')));
const WorkshopPage = Loadable(lazy(() => import('../pages/Workshop')));
const AllowancePage = Loadable(lazy(() => import('../pages/Allowance')));
const ProfilePage = Loadable(lazy(() => import('../pages/Profile')));
const ProfessionPage = Loadable(lazy(() => import('../pages/Profession')));
const SalaryPage = Loadable(lazy(() => import('../pages/Salary')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <RequiredAuth>
            <MainLayout/>
        </RequiredAuth>
    ),
    children: [
        {
            path: '/',
            element: (
                <RequiredAuth>
                    <MainPage/>
                </RequiredAuth>
            )
        },
        {
            path: 'profile',
            element: (
                <RequiredAuth>
                    <ProfilePage/>
                </RequiredAuth>
            )
        },
        {
            path: 'workshop',
            element: (
                <RequiredAuth>
                    <WorkshopPage/>
                </RequiredAuth>
            )
        },
        {
            path: 'allowance',
            element: (
                <RequiredAuth>
                    <AllowancePage/>
                </RequiredAuth>
            )
        },
        {
            path: 'profession',
            element: (
                <RequiredAuth>
                    <ProfessionPage/>
                </RequiredAuth>
            )
        },
        {
            path: 'salary',
            element: (
                <RequiredAuth>
                    <SalaryPage/>
                </RequiredAuth>
            )
        },
    ]
};

export default MainRoutes;