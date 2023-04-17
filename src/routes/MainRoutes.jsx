import {lazy} from 'react';
import {MainLayout} from "../layouts";
import {RequiredAdminRight, RequiredAuth} from "../utilities";
import {Loadable} from "../components";

const MainPage = Loadable(lazy(() => import('../pages/MainPage')));

const ProfilePage = Loadable(lazy(() => import('../pages/UserPages/Profile')));
const ProfileFormPage = Loadable(lazy(() => import('../pages/UserPages/ProfileForm')));
const ProfileChangePasswordPage = Loadable(lazy(() => import('../pages/UserPages/ProfileForm/ChangePassword')));

const WorkshopPage = Loadable(lazy(() => import('../pages/Workshop')));
const AllowancePage = Loadable(lazy(() => import('../pages/Allowance')));
const ProfessionPage = Loadable(lazy(() => import('../pages/Profession')));
const SalaryPage = Loadable(lazy(() => import('../pages/Salary')));
const UserSalaryPage = Loadable(lazy(() => import('../pages/UserSalary')));

const WorkshopFormPage = Loadable(lazy(() => import('../pages/Workshop/WorkshopForm')));
const AllowanceFormPage = Loadable(lazy(() => import('../pages/Allowance/AllowanceForm')));
const ProfessionFormPage = Loadable(lazy(() => import('../pages/Profession/ProfessionForm')));
const SalaryFormPage = Loadable(lazy(() => import('../pages/Salary/SalaryForm')));
const UserSalaryFormPage = Loadable(lazy(() => import('../pages/UserSalary/UserSalaryForm')));

const DeletePage = Loadable(lazy(() => import('../pages/Delete')));

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
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <ProfilePage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <ProfileFormPage/>
                        </RequiredAuth>
                    )
                },
                {
                    path: "password",
                    element: (
                        <RequiredAuth>
                            <ProfileChangePasswordPage/>
                        </RequiredAuth>
                    )
                }
            ]
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
                },
                {
                    path: "delete",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                                <DeletePage/>
                            </RequiredAdminRight>
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
                },
                {
                    path: "delete",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                                <DeletePage/>
                            </RequiredAdminRight>
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
                },
                {
                    path: "delete",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                                <DeletePage/>
                            </RequiredAdminRight>
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
                },
                {
                    path: "delete",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                                <DeletePage/>
                            </RequiredAdminRight>
                        </RequiredAuth>
                    )
                }
            ]
        },
        {
            path: 'worker_salary',
            children: [
                {
                    path: "",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                            <UserSalaryPage/>
                            </RequiredAdminRight>
                        </RequiredAuth>
                    ),
                },
                {
                    path: "create",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                            <UserSalaryFormPage/>
                            </RequiredAdminRight>
                        </RequiredAuth>
                    )
                },
                {
                    path: "edit",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                            <UserSalaryFormPage/>
                            </RequiredAdminRight>
                        </RequiredAuth>
                    )
                },
                {
                    path: "delete",
                    element: (
                        <RequiredAuth>
                            <RequiredAdminRight>
                                <DeletePage/>
                            </RequiredAdminRight>
                        </RequiredAuth>
                    )
                }
            ]
        },
    ]
};

export default MainRoutes;