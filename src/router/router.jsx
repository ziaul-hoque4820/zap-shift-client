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
import TrackParcel from "../pages/deshboard/track-parcel/TrackParcel";
import PendingRiders from "../pages/deshboard/pending-riders/PendingRiders";
import ApprovedRiders from "../pages/deshboard/approved-riders/ApprovedRiders";
import DeactivatedRiders from "../pages/deshboard/deactive-riders/DeactivatedRiders";
import MakeAdmin from "../pages/deshboard/make-admin/MakeAdmin";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/deshboard/assign-rider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliverys from "../pages/deshboard/pending-delivery/PendingDeliverys";

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
                element: <PrivateRoute><RiderRegister></RiderRegister></PrivateRoute>
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
            },
            {
                path: 'track',
                Component: TrackParcel
            },
            // Rider Routes
            {
                path: 'pendingDeliveries',
                element: <RiderRoute><PendingDeliverys></PendingDeliverys></RiderRoute>
            },
            // Admin Routes
            {
                path: 'assignRider',
                element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
            },
            {
                path: 'pendingRiders',
                element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
            },
            {
                path: 'approveRider',
                element: <AdminRoute><ApprovedRiders></ApprovedRiders></AdminRoute>
            },
            {
                path: 'deactiveRiders',
                element: <AdminRoute><DeactivatedRiders></DeactivatedRiders></AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
            }
        ]
    }
]);

export default router