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
import Price from "../pages/price/Price";
import AboutUs from "../pages/about/AboutUs";
import Error from "../pages/error/Error";
import TrackConsignment from "../pages/track-consignment/TrackConsignment";
import ParcelBookingForm from "../pages/parcel-booking/ParcelBookingForm";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../pages/deshboard/my-parcels/MyParcels";
import DashBoard from "../pages/deshboard/DashBoard";
import Payment from "../pages/deshboard/payment/Payment";
import PaymentHistory from "../pages/deshboard/payment-history/PaymentHistory";

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
            {
                path: 'pricing',
                Component: Price
            },
            {
                path: 'about',
                Component: AboutUs
            },
            {
                path: 'trackConsignment',
                Component: TrackConsignment
            },
            {
                path: 'parcelBookingForm',
                element: <PrivateRoute><ParcelBookingForm></ParcelBookingForm></PrivateRoute>
            },
            {
                path: 'coverage',
                Component: Coverage,
            },
            {
                path: '*',
                Component: Error
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
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashBoard
            },
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:id',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            }
        ]
    }
]);

export default router