import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    Package,
    Users,
    Truck,
    CheckCircle,
    Clock,
    DollarSign,
    TrendingUp,
    AlertCircle,
    BarChart3,
    Shield,
    UserPlus,
    UserCheck,
    UserX,
    CreditCard,
    MapPin,
    Calendar
} from "lucide-react";

function AdminDashboard() {
    const axiosSecure = useAxiosSecure();

    const dashboardStats = {};
    const isLoading = false;
    // Fetch all dashboard statistics
    // const { data, isLoading } = useQuery({
    //     queryKey: ["admin-dashboard"],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/admin/dashboard-stats");
    //         return res.data;
    //     },
    // });

    // Fetch recent activities
    const { data: recentActivities = [] } = useQuery({
        queryKey: ["admin-activities"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/approved");
            return res.data;
        },
    });

    // Fetch pending riders
    const { data: pendingRiders = [] } = useQuery({
        queryKey: ["pending-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    // Destructure stats with default values
    const stats = {
        totalUsers: dashboardStats.totalUsers || 0,
        totalRiders: dashboardStats.totalRiders || 0,
        totalParcels: dashboardStats.totalParcels || 0,
        pendingParcels: dashboardStats.pendingParcels || 0,
        deliveredParcels: dashboardStats.deliveredParcels || 0,
        totalRevenue: dashboardStats.totalRevenue || 0,
        pendingRiders: dashboardStats.pendingRiders || 0,
        todayRevenue: dashboardStats.todayRevenue || 0,
        recentParcels: dashboardStats.recentParcels || []
    };

    // Calculate growth percentages (mock data - replace with actual calculations)
    const growth = {
        users: "+12%",
        revenue: "+18%",
        parcels: "+8%",
        deliveries: "+15%"
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-white p-6 rounded-xl shadow-sm border">
                                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Overview of your delivery system and management tools.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex items-center text-green-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {growth.revenue}
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">৳ {stats.totalRevenue.toLocaleString()}</h3>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <p className="text-xs text-gray-400 mt-1">Today: ৳ {stats.todayRevenue}</p>
                </div>

                {/* Total Parcels */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex items-center text-blue-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {growth.parcels}
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalParcels}</h3>
                    <p className="text-gray-600 text-sm">Total Parcels</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-green-600">✓ {stats.deliveredParcels}</span>
                        <span className="text-xs text-orange-600">⏱ {stats.pendingParcels}</span>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex items-center text-purple-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {growth.users}
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalUsers}</h3>
                    <p className="text-gray-600 text-sm">Total Users</p>
                    <p className="text-xs text-gray-400 mt-1">{stats.totalRiders} Riders</p>
                </div>

                {/* Pending Riders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                    {stats.pendingRiders > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {stats.pendingRiders} new
                        </span>
                    )}
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingRiders}</h3>
                    <p className="text-gray-600 text-sm">Pending Riders</p>
                    <Link
                        to="/dashboard/approveRider"
                        className="text-xs text-orange-600 hover:text-orange-700 font-medium mt-1 block"
                    >
                        Review Applications →
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities & Parcels */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Recent Parcels */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Recent Parcels</h2>
                                <Link
                                    to="/dashboard/allParcels"
                                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                >
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {stats.recentParcels.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No recent parcels</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {stats.recentParcels.slice(0, 5).map((parcel) => (
                                        <div key={parcel._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2 rounded-lg ${parcel.delivery_status === "delivered" ? "bg-green-100 text-green-600" :
                                                    parcel.delivery_status === "in_transit" ? "bg-orange-100 text-orange-600" :
                                                        parcel.delivery_status === "assigned" ? "bg-blue-100 text-blue-600" :
                                                            "bg-red-100 text-red-600"
                                                    }`}>
                                                    {parcel.delivery_status === "delivered" ? <CheckCircle className="w-4 h-4" /> :
                                                        parcel.delivery_status === "in_transit" ? <Truck className="w-4 h-4" /> :
                                                            <Clock className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{parcel.parcelName}</h3>
                                                    <p className="text-sm text-gray-500">From: {parcel.senderDistrict} → To: {parcel.receiverDistrict}</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        ID: {parcel.parcelId || parcel._id.substring(0, 8)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">৳ {parcel.cost || 0}</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${parcel.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {parcel.payment_status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pending Riders List */}
                    {pendingRiders.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Pending Rider Applications</h2>
                                    <Link
                                        to="/dashboard/approveRider"
                                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                    >
                                        Manage All
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {pendingRiders.slice(0, 3).map((rider) => (
                                        <div key={rider._id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-2 bg-yellow-100 rounded-lg">
                                                    <UserPlus className="w-5 h-5 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{rider.name}</h3>
                                                    <p className="text-sm text-gray-500">{rider.email}</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Applied: {new Date(rider.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    to={`/dashboard/rider-details/${rider._id}`}
                                                    className="px-3 py-1 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                                                >
                                                    Review
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                to="/dashboard/assignRider"
                                className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <Truck className="w-5 h-5" />
                                <span className="font-medium">Assign Rider</span>
                            </Link>
                            <Link
                                to="/dashboard/approveRider"
                                className="flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                <UserCheck className="w-5 h-5" />
                                <span className="font-medium">Approve Riders</span>
                            </Link>
                            <Link
                                to="/dashboard/makeAdmin"
                                className="flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                            >
                                <Shield className="w-5 h-5" />
                                <span className="font-medium">Make Admin</span>
                            </Link>
                            <Link
                                to="/dashboard/deactiveRiders"
                                className="flex items-center space-x-3 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <UserX className="w-5 h-5" />
                                <span className="font-medium">Manage Riders</span>
                            </Link>
                        </div>
                    </div>

                    {/* System Overview */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Users className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Active Users</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.totalUsers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Truck className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Active Riders</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.totalRiders}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-orange-50 rounded-lg">
                                        <Package className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Today's Parcels</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.pendingParcels}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-teal-50 rounded-lg">
                                        <BarChart3 className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Success Rate</span>
                                </div>
                                <span className="font-semibold text-gray-900">94%</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                        <div className="space-y-3">
                            {recentActivities.length === 0 ? (
                                <p className="text-gray-500 text-sm">No recent activities</p>
                            ) : (
                                recentActivities.slice(0, 3).map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className={`p-1 rounded-full ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                            activity.type === 'rider' ? 'bg-green-100 text-green-600' :
                                                activity.type === 'parcel' ? 'bg-orange-100 text-orange-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            {activity.type === 'user' && <Users className="w-3 h-3" />}
                                            {activity.type === 'rider' && <Truck className="w-3 h-3" />}
                                            {activity.type === 'parcel' && <Package className="w-3 h-3" />}
                                            {activity.type === 'payment' && <DollarSign className="w-3 h-3" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700">{activity.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;