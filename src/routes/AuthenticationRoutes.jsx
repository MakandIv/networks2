import {Loadable} from "../components";
import {MinimalLayout} from "../layouts";
import {RequiredNoAuth} from "../utilities";
import {lazy} from "react";


const LoginPage = Loadable(lazy(() => import('../pages/UserPages/Login')));
const RegistrationPage = Loadable(lazy(() => import('../pages/UserPages/Registration')))

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: (
                <RequiredNoAuth>
                    <LoginPage />
                </RequiredNoAuth>
            )
        },
        {
            path: '/registration',
            element: (
                <RequiredNoAuth>
                    <RegistrationPage />
                </RequiredNoAuth>
            )
        }
    ]
};
export default AuthenticationRoutes;