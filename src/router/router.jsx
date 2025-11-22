import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/authentications/Login";
import Register from "../pages/authentications/Register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <Home />
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
                path: 'Register',
                Component: Register
            },
        ]
    }
]);

export default router