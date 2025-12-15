import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Package, Truck, CheckCircle, Clock, AlertCircle, DollarSign, MapPin, TrendingUp, Calendar } from "lucide-react";

function UserDashBoard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    // Calculate statistics
    const stats = {
        total: parcels.length,
        delivered: parcels.filter(p => p.delivery_status === "delivered").length,
        inTransit: parcels.filter(p => p.delivery_status === "in_transit").length,
        pending: parcels.filter(p => p.delivery_status === "not_collected").length,
        unpaid: parcels.filter(p => p.payment_status === "unpaid").length,
        totalCost: parcels.reduce((sum, parcel) => sum + (parcel.cost || 0), 0)
    };

    // Recent parcels (last 5)
    const recentParcels = parcels.slice(0, 5);

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
                    Welcome back, {user?.displayName || 'User'}!
                </h1>
                <p className="text-gray-600">
                    Here's your parcel delivery overview and recent activities.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Parcels */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</h3>
                    <p className="text-gray-600 text-sm">Total Parcels</p>
                </div>

                {/* Delivered */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.delivered}</h3>
                    <p className="text-gray-600 text-sm">Delivered</p>
                </div>

                {/* In Transit */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <Truck className="w-6 h-6 text-orange-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.inTransit}</h3>
                    <p className="text-gray-600 text-sm">In Transit</p>
                </div>

                {/* Pending */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <Clock className="w-6 h-6 text-red-600" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pending}</h3>
                    <p className="text-gray-600 text-sm">Pending</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Parcels */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Recent Parcels</h2>
                                <Link
                                    to="/dashboard/myParcels"
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
                                    <p className="text-gray-500">No parcels found</p>
                                    <Link
                                        to="/dashboard/myParcels"
                                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                    >
                                        Send your first parcel
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentParcels.map((parcel) => (
                                        <div key={parcel._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2 rounded-lg ${parcel.delivery_status === "delivered" ? "bg-green-100 text-green-600" :
                                                    parcel.delivery_status === "in_transit" ? "bg-orange-100 text-orange-600" :
                                                        "bg-red-100 text-red-600"
                                                    }`}>
                                                    {parcel.delivery_status === "delivered" ? <CheckCircle className="w-4 h-4" /> :
                                                        parcel.delivery_status === "in_transit" ? <Truck className="w-4 h-4" /> :
                                                            <Clock className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{parcel.parcelName}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {parcel.receiverDistrict}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">৳ {parcel.cost}</p>
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
                </div>

                {/* Quick Stats & Actions */}
                <div className="space-y-6">
                    {/* Financial Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Spent</span>
                                <span className="font-semibold text-gray-900">৳ {stats.totalCost}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Unpaid Parcels</span>
                                <span className="font-semibold text-red-600">{stats.unpaid}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="text-gray-900 font-medium">Balance</span>
                                <span className="font-bold text-teal-600">৳ {stats.totalCost - (stats.unpaid * 100)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                to="/parcelBookingForm"
                                className="flex items-center space-x-3 p-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                            >
                                <Package className="w-5 h-5" />
                                <span className="font-medium">Send New Parcel</span>
                            </Link>
                            <Link
                                to="/dashboard/paymentHistory"
                                className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <DollarSign className="w-5 h-5" />
                                <span className="font-medium">Payment History</span>
                            </Link>
                            <Link
                                to="/dashboard/myParcels"
                                className="flex items-center space-x-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                            >
                                <Truck className="w-5 h-5" />
                                <span className="font-medium">Track Package</span>
                            </Link>
                        </div>
                    </div>

                    {/* Status Legend */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Delivered</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">In Transit</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard;