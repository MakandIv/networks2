import {lazy} from 'react';
import {MainLayout} from "../layouts";
import {RequiredAuth} from "../utilities";
import {Loadable} from "../components";

const ProfilePage = Loadable(lazy(() => import('../pages/Profile')));
const MainPage = Loadable(lazy(() => import('../pages/MainPage')));
const WorkshopPage = Loadable(lazy(() => import('../pages/Workshop')));
const AllowancePage = Loadable(lazy(() => import('../pages/Allowance')));
const ProfessionPage = Loadable(lazy(() => import('../pages/Profession')));
const SalaryPage = Loadable(lazy(() => import('../pages/Salary')));

const WorkshopFormPage = Loadable(lazy(() => import('../pages/Workshop/WorkshopForm')));
const AllowanceFormPage = Loadable(lazy(() => import('../pages/Allowance/AllowanceForm')));
const ProfessionFormPage = Loadable(lazy(() => import('../pages/Profession/ProfessionForm')));
const SalaryFormPage = Loadable(lazy(() => import('../pages/Salary/SalaryForm')));

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
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <WorkshopPage/>
                        </RequiredAuth>
                    ),
                },
                {
                    path: "create",
                    element: (
                        <RequiredAuth>
                            <WorkshopFormPage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <WorkshopFormPage/>
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'allowance',
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <AllowancePage/>
                        </RequiredAuth>
                    ),
                },
                {
                    path: "create",
                    element: (
                        <RequiredAuth>
                            <AllowanceFormPage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <AllowanceFormPage/>
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'profession',
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <ProfessionPage/>
                        </RequiredAuth>
                    ),
                },
                {
                    path: "create",
                    element: (
                        <RequiredAuth>
                            <ProfessionFormPage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <ProfessionFormPage/>
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'salary',
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <SalaryPage/>
                        </RequiredAuth>
                    ),
                },
                {
                    path: "create",
                    element: (
                        <RequiredAuth>
                            <SalaryFormPage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <SalaryFormPage/>
                        </RequiredAuth>
                    )
                }
            ]
        },
    ]
};

export default MainRoutes;