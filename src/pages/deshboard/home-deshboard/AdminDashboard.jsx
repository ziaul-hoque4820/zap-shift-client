import React, { useMemo } from "react";
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
} from "lucide-react";

function AdminDashboard() {
    const axiosSecure = useAxiosSecure();

    /* ================= Parcel Status Count ================= */
    const { data: statusData = [], isLoading } = useQuery({
        queryKey: ["admin-dashboard-status"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/delivery/status-count");
            return res.data;
        },
    });

    const stats = useMemo(() => {
        const delivered = statusData.find(s => s.status === "delivered")?.count || 0;
        const inTransit = statusData.find(s => s.status === "in_transit")?.count || 0;
        const assigned = statusData.find(s => s.status === "rider_assigned")?.count || 0;
        const notCollected = statusData.find(s => s.status === "not_collected")?.count || 0;

        return {
            totalParcels: delivered + inTransit + assigned + notCollected,
            deliveredParcels: delivered,
            pendingParcels: inTransit + assigned + notCollected,
        };
    }, [statusData]);

    /* ================= Approved Riders ================= */
    const { data: approvedRiders = [] } = useQuery({
        queryKey: ["approved-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/approved");
            return res.data;
        },
    });

    /* ================= Pending Riders ================= */
    const { data: pendingRidersRaw } = useQuery({
        queryKey: ["pending-riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    const pendingRiders = Array.isArray(pendingRidersRaw)
        ? pendingRidersRaw
        : pendingRidersRaw
            ? [pendingRidersRaw]
            : [];

    /* ================= Recent Activities ================= */
    const recentActivities = useMemo(() => {
        return approvedRiders.map(rider => ({
            type: "rider",
            message: `Rider approved: ${rider.name}`,
            timestamp: rider.appliedAt,
        }));
    }, [approvedRiders]);

    /* ================= UI Helpers ================= */
    const growth = {
        revenue: "+0%",
        parcels: "+0%",
        users: "+0%",
    };

    const extendedStats = {
        ...stats,
        totalRevenue: 0,
        todayRevenue: 0,
        totalUsers: 0,
        totalRiders: approvedRiders.length,
        pendingRiders: pendingRiders.length,
        recentParcels: [],
    };

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Overview of your delivery system.</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Parcels"
                    value={extendedStats.totalParcels}
                    icon={<Package className="w-6 h-6 text-blue-600" />}
                    growth={growth.parcels}
                />
                <StatCard
                    title="Delivered Parcels"
                    value={extendedStats.deliveredParcels}
                    icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                />
                <StatCard
                    title="Pending Parcels"
                    value={extendedStats.pendingParcels}
                    icon={<Clock className="w-6 h-6 text-orange-600" />}
                />
                <StatCard
                    title="Pending Riders"
                    value={extendedStats.pendingRiders}
                    icon={<UserPlus className="w-6 h-6 text-red-600" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Pending Riders */}
                    {pendingRiders.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm border">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold">Pending Rider Applications</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {pendingRiders.map(rider => (
                                    <div key={rider._id} className="flex justify-between bg-yellow-50 p-4 rounded-lg">
                                        <div>
                                            <p className="font-medium">{rider.name}</p>
                                            <p className="text-sm text-gray-500">{rider.email}</p>
                                        </div>
                                        <Link
                                            to={`/dashboard/pendingRiders`}
                                            className="text-sm bg-teal-600 text-white px-3 py-1 rounded"
                                        >
                                            Review
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold mb-4">Quick Actions</h3>
                        <DashboardLink to="/dashboard/assignRider" icon={<Truck />} label="Assign Rider" />
                        <DashboardLink to="/dashboard/approveRider" icon={<UserCheck />} label="Approve Riders" />
                        <DashboardLink to="/dashboard/makeAdmin" icon={<Shield />} label="Make Admin" />
                        <DashboardLink to="/dashboard/deactiveRiders" icon={<UserX />} label="Manage Riders" />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold mb-4">Recent Activities</h3>
                        {recentActivities.slice(0, 3).map((activity, i) => (
                            <p key={i} className="text-sm text-gray-600">
                                {activity.message}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ================= Reusable Components ================= */
function StatCard({ title, value, icon, growth }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
                {growth && (
                    <span className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" /> {growth}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
}

function DashboardLink({ to, icon, label }) {
    return (
        <Link to={to} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            {icon}
            <span>{label}</span>
        </Link>
    );
}

export default AdminDashboard;
