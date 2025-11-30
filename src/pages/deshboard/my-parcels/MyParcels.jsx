import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Loader2, MapPin, Package, Trash2, Edit3, Truck } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function MyParcels() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["my-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            text: "This Parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
        });

        // Important: confirm.isConfirmed
        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                    });

                    // React Query Cache Refresh
                    queryClient.invalidateQueries(["my-parcels", user.email]);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong!",
                    icon: "error",
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                    <div
                        key={n}
                        className="animate-pulse p-6 rounded-xl bg-white shadow-md border"
                    >
                        <div className="h-6 bg-gray-200 mb-4 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-5 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#0A3D3F] mb-8">
                My Parcels ({parcels.length})
            </h1>

            {parcels.length === 0 ? (
                <p className="text-gray-600">No parcels found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {parcels.map((parcel) => (
                        <div
                            key={parcel._id}
                            className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-all"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-teal-600" />
                                    {parcel.parcelName}
                                </h2>
                                <span className={`text-sm px-3 py-1 rounded-full font-medium ${parcel.delivery_status === "not_collected" ? "bg-red-50 text-red-700 border border-red-200" :
                                    "bg-teal-50 text-teal-700 border border-teal-200"
                                    }`}>
                                    {parcel.delivery_status}
                                </span>

                            </div>

                            {/* Info Section */}
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Type:</strong> {parcel.parcelType}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Weight:</strong> {parcel.parcelWeight} kg
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <strong>Receiver:</strong> {parcel.receiverDistrict},{" "}
                                {parcel.receiverAreaOrCity}
                            </p>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                <strong>Payment Status:</strong>
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${parcel.payment_status === "unpaid" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                    {parcel.payment_status}
                                </span>
                            </p>


                            {/* Price */}
                            <p className="text-lg font-bold text-teal-600 mt-2 mb-4">
                                ৳ {parcel.cost}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between mt-4">
                                {parcel.payment_status === 'unpaid' && (
                                    <Link to={`/dashboard/payment/${parcel._id}`} className="p-2 rounded-lg bg-lime-200 text-black hover:bg-lime-300 transition cursor-pointer">
                                        payment
                                    </Link>
                                )}

                                <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer">
                                    <Truck className="w-5 h-5 " />
                                </button>

                                {/* <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition cursor-pointer">
                                    <Edit3 className="w-5 h-5" />
                                </button> */}

                                <button onClick={() => handleDelete(parcel._id)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyParcels;
