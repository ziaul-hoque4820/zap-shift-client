import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaUserEdit, FaSearchLocation, FaMotorcycle } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">

                    {/* Logo */}
                    <NavLink to={'/'} className="flex items-center gap-2 py-3">
                        <img className="w-6 h-6 bg-lime-600 rounded-sm rotate-45" src={Logo} alt="logo" />
                        <span className="text-2xl font-semibold text-gray-800 font-heading">ZapShift</span>
                    </NavLink>
                    {/* Sidebar content here */}
                    <li>
                        <NavLink to="/dashboard">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <FaBoxOpen className="inline-block mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">
                            <FaSearchLocation className="inline-block mr-2" />
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">
                            <FaUserEdit className="inline-block mr-2" />
                            Update Profile
                        </NavLink>
                    </li>
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assignRider">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pendingRiders">
                                    <FaUserEdit className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approveRider">
                                    <FaUserEdit className="inline-block mr-2" />
                                    Approve Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/deactiveRiders">
                                    <FaUserEdit className="inline-block mr-2" />
                                    Deactivated Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaUserEdit className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;