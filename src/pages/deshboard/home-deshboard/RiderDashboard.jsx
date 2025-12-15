import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    TrendingUp,
    Calendar,
    Wallet,
    Target,
    AlertCircle,
    UserCheck,
    BarChart3
} from "lucide-react";

function RiderDashboard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch assigned parcels for the rider
    const { data: assignedParcels = [], isLoading } = useQuery({
        queryKey: ["rider-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels?riderEmail=${user.email}`);
            return res.data;
        },
    });

    // Fetch rider earnings
    const { data: earningsData = {} } = useQuery({
        queryKey: ["rider-earnings", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/earnings?riderEmail=${user.email}`);
            return res.data;
        },
    });

    // Calculate statistics
    const stats = {
        totalAssigned: assignedParcels.length,
        pending: assignedParcels.filter(p => p.delivery_status === "assigned" || p.delivery_status === "in_transit").length,
        completed: assignedParcels.filter(p => p.delivery_status === "delivered").length,
        todayDeliveries: assignedParcels.filter(p => {
            const today = new Date().toDateString();
            const deliveryDate = new Date(p.updatedAt).toDateString();
            return p.delivery_status === "delivered" && deliveryDate === today;
        }).length,
        totalEarnings: earningsData.totalEarnings || 0,
        pendingEarnings: earningsData.pendingEarnings || 0,
        rating: earningsData.rating || "4.5",
        onTimeDelivery: earningsData.onTimeDeliveryRate || "92%"
    };

    // Recent assigned parcels (last 5)
    const recentParcels = assignedParcels.slice(0, 5);

    // Today's deliveries
    const todayDeliveries = assignedParcels.filter(p => {
        const today = new Date().toDateString();
        const assignedDate = new Date(p.assignedDate || p.createdAt).toDateString();
        return assignedDate === today && p.delivery_status !== "delivered";
    });

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
                    Welcome, {user?.displayName || 'Rider'}!
                </h1>
                <p className="text-gray-600">
                    Manage your deliveries and track your earnings.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Assigned */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalAssigned}</h3>
                    <p className="text-gray-600 text-sm">Total Assigned</p>
                </div>

                {/* Pending Deliveries */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</h3>
                    <p className="text-gray-600 text-sm">Pending Deliveries</p>
                </div>

                {/* Completed */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completed}</h3>
                    <p className="text-gray-600 text-sm">Completed</p>
                </div>

                {/* Today's Delivery */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.todayDeliveries}</h3>
                    <p className="text-gray-600 text-sm">Today's Delivery</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Assigned Parcels */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Recent Assigned Parcels</h2>
                                <Link
                                    to="/dashboard/pendingDeliveries"
                                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                >
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentParcels.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No parcels assigned yet</p>
                                    <p className="text-sm text-gray-400 mt-2">You'll see assigned parcels here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentParcels.map((parcel) => (
                                        <div key={parcel._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2 rounded-lg ${parcel.delivery_status === "delivered" ? "bg-green-100 text-green-600" :
                                                    parcel.delivery_status === "in_transit" ? "bg-orange-100 text-orange-600" :
                                                        "bg-blue-100 text-blue-600"
                                                    }`}>
                                                    {parcel.delivery_status === "delivered" ? <CheckCircle className="w-4 h-4" /> :
                                                        parcel.delivery_status === "in_transit" ? <Truck className="w-4 h-4" /> :
                                                            <Package className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{parcel.parcelName}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {parcel.receiverDistrict}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        ID: {parcel.parcelId || parcel._id.substring(0, 8)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">৳ {parcel.deliveryFee || 50}</p>
                                                <Link
                                                    to={`/dashboard/delivery-details/${parcel._id}`}
                                                    className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Earnings Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Earnings</span>
                                <span className="font-semibold text-gray-900">৳ {stats.totalEarnings}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Pending Earnings</span>
                                <span className="font-semibold text-orange-600">৳ {stats.pendingEarnings}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Available Balance</span>
                                <span className="font-semibold text-teal-600">৳ {stats.totalEarnings - stats.pendingEarnings}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <Link
                                    to="/dashboard/myEarnings"
                                    className="flex items-center justify-center space-x-2 w-full p-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                                >
                                    <Wallet className="w-4 h-4" />
                                    <span className="font-medium text-sm">View Earnings Details</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                to="/dashboard/pendingDeliveries"
                                className="flex items-center space-x-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                            >
                                <Truck className="w-5 h-5" />
                                <span className="font-medium">View Pending Deliveries</span>
                            </Link>
                            <Link
                                to="/dashboard/completedDeliveries"
                                className="flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Completed Deliveries</span>
                            </Link>
                            <Link
                                to="/dashboard/myEarnings"
                                className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <DollarSign className="w-5 h-5" />
                                <span className="font-medium">Withdraw Earnings</span>
                            </Link>
                        </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <BarChart3 className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">On-time Delivery</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.onTimeDelivery}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-yellow-50 rounded-lg">
                                        <UserCheck className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Customer Rating</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.rating}/5</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <Target className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">Today's Target</span>
                                </div>
                                <span className="font-semibold text-gray-900">{stats.todayDeliveries}/10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Deliveries Section (if any) */}
            {todayDeliveries.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">Today's Deliveries</h2>
                        <p className="text-sm text-gray-500 mt-1">Parcels scheduled for delivery today</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {todayDeliveries.map((parcel) => (
                                <div key={parcel._id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium text-gray-900">{parcel.parcelName}</h3>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                            {parcel.delivery_status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        To: {parcel.receiverName}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        {parcel.receiverAddress}, {parcel.receiverDistrict}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            Fee: ৳{parcel.deliveryFee || 50}
                                        </span>
                                        <Link
                                            to={`/dashboard/delivery-details/${parcel._id}`}
                                            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                                        >
                                            Start Delivery →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RiderDashboard;