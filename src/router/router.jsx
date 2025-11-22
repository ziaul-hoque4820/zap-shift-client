import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/authentications/Login";
import Register from "../pages/authentications/Register";
import ForgotPassword from "../pages/authentications/ForgotPassword";
import VerifyPassword from "../pages/authentications/VerifyPassword";
import ResetPassword from "../pages/authentications/ResetPassword";
import RiderRegister from "../pages/rider-register/RiderRegister";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'riderRegister',
                Component: RiderRegister
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'forgot-password',
                Component: ForgotPassword
            },
            {
                path: 'forgot-password',
                Component: ForgotPassword
            },
            {
                path: 'verifyPassword',
                Component: VerifyPassword
            },
            {
                path: 'resetPassword',
                Component: ResetPassword
            },
        ]
    }
]);

export default router