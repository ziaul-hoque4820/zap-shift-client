import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    Target,
    Wallet,
    UserCheck,
} from "lucide-react";
import LoaderSpin from "../../share/LoaderSpin";
import {
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear,
    isAfter,
} from "date-fns";

function RiderDashboard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    /* ================= Assigned Parcels ================= */
    const { data: assignedParcels = [], isLoading } = useQuery({
        queryKey: ["rider-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
            return Array.isArray(res.data) ? res.data : [res.data];
        },
    });

    /* ================= Completed Parcels ================= */
    const { data: completedParcels = [] } = useQuery({
        queryKey: ["rider-completed", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${user.email}`);
            return res.data || [];
        },
    });

    /* ================= Earnings Logic ================= */
    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost || 0);
        return parcel.senderDistrict === parcel.receiverDistrict
            ? cost * 0.8
            : cost * 0.3;
    };

    const earnings = useMemo(() => {
        const now = new Date();
        const todayStart = startOfDay(now);
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const monthStart = startOfMonth(now);
        const yearStart = startOfYear(now);

        let total = 0,
            today = 0,
            week = 0,
            month = 0,
            year = 0;

        completedParcels.forEach((p) => {
            const earning = calculateEarning(p);
            const deliveredAt = new Date(p.deliveredAt);
            total += earning;
            if (isAfter(deliveredAt, todayStart)) today += earning;
            if (isAfter(deliveredAt, weekStart)) week += earning;
            if (isAfter(deliveredAt, monthStart)) month += earning;
            if (isAfter(deliveredAt, yearStart)) year += earning;
        });

        return { total, today, week, month, year };
    }, [completedParcels]);

    /* ================= Stats ================= */
    const stats = useMemo(() => {
        const totalAssigned = assignedParcels.length + completedParcels.length;
        const pending = assignedParcels.filter(
            (p) => p.delivery_status !== "delivered"
        ).length;
        const delivered = completedParcels.length;

        const todayDeliveries = completedParcels.filter((p) => {
            return (
                new Date(p.deliveredAt).toDateString() ===
                new Date().toDateString()
            );
        }).length;

        return {
            totalAssigned,
            pending,
            delivered,
            todayDeliveries,
            rating: 5,
        };
    }, [assignedParcels, completedParcels]);

    const recentParcels = assignedParcels.slice(0, 5);

    if (isLoading) return <LoaderSpin />;

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome, {user?.displayName || "Rider"}!
                </h1>
                <p className="text-gray-600">Manage your deliveries & earnings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Jobs" value={stats.totalAssigned} icon={<Package />} />
                <StatCard title="Pending" value={stats.pending} icon={<Clock />} />
                <StatCard title="Delivered" value={stats.delivered} icon={<CheckCircle />} />
                <StatCard title="Today's Delivery" value={stats.todayDeliveries} icon={<Target />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Parcels */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Recent Assigned Parcels</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {recentParcels.length === 0 ? (
                                <p className="text-gray-500">No parcels assigned</p>
                            ) : (
                                recentParcels.map((parcel) => (
                                    <div
                                        key={parcel._id}
                                        className="flex justify-between bg-gray-50 p-4 rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Truck className="text-teal-600" />
                                            <div>
                                                <p className="font-medium">{parcel.parcelName}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {parcel.receiverDistrict}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/dashboard/pendingDeliveries`}
                                            className="text-sm text-teal-600"
                                        >
                                            View
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Earnings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold mb-4">Earnings</h3>
                        <div className="space-y-2">
                            <EarningRow label="Total" value={earnings.total} />
                            <EarningRow label="Today" value={earnings.today} />
                            <EarningRow label="This Week" value={earnings.week} />
                            <EarningRow label="This Month" value={earnings.month} />
                        </div>
                        <Link
                            to="/dashboard/myEarnings"
                            className="mt-4 flex items-center justify-center gap-2 bg-teal-50 text-teal-700 p-2 rounded-lg"
                        >
                            <Wallet className="w-4 h-4" /> View Earnings
                        </Link>
                    </div>

                    {/* Performance */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold mb-4">Performance</h3>
                        <div className="flex justify-between">
                            <span>Rating</span>
                            <span className="font-semibold">{stats.rating}/5</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Today's Target</span>
                            <span className="font-semibold">{stats.todayDeliveries}/10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= Reusable ================= */
function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}

function EarningRow({ label, value }) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold">৳ {value.toFixed(0)}</span>
        </div>
    );
}

export default RiderDashboard;
