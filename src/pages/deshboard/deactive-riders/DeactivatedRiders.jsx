import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function DeactivatedRiders() {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: riders = [], isLoading } = useQuery({
        queryKey: ["deactivatedRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/deactivated");
            return res.data;
        }
    });

    const handleActivate = async (id) => {
        const confirm = await Swal.fire({
            title: "Activate Rider?",
            text: "This will make the rider active again.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, activate"
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.patch(`/riders/${id}/activate`);

        Swal.fire("Activated!", "Rider is active again.", "success");

        queryClient.invalidateQueries({ queryKey: ["deactivatedRiders"] });
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete Rider?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete"
        });

        if (!confirm.isConfirmed) return;

        await axiosSecure.delete(`/riders/${id}`);

        Swal.fire("Deleted!", "Rider removed permanently.", "success");

        queryClient.invalidateQueries({ queryKey: ["deactivatedRiders"] });
    };

    if (isLoading) return <p className="text-center py-6 text-gray-600">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Deactivated Riders</h1>

            {riders.length === 0 ? (
                <p className="text-gray-500">No deactivated riders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {riders.map((rider) => (
                        <div key={rider._id} className="border p-5 rounded-xl shadow-sm bg-white">
                            <div className="flex items-center gap-4">
                                <img
                                    src={rider.userPhoto}
                                    alt={rider.name}
                                    className="w-16 h-16 rounded-full border object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{rider.name}</h2>
                                    <p className="text-sm text-gray-600">{rider.email}</p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-700">
                                <p><strong>NID:</strong> {rider.nid}</p>
                                <p><strong>Parent Contact:</strong> {rider.parentContact}</p>
                                <p><strong>Vehicle:</strong> {rider.vehicleType || "N/A"}</p>
                                <p><strong>Registration:</strong> {rider.vehicleRegNo || "N/A"}</p>

                                {Array.isArray(rider.areasToRide) && rider.areasToRide.length > 0 && (
                                    <div>
                                        <strong>Areas:</strong>
                                        <div className="flex gap-2 flex-wrap mt-1">
                                            {rider.areasToRide.map((area, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => handleActivate(rider._id)}
                                    className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Activate Again
                                </button>

                                <button
                                    onClick={() => handleDelete(rider._id)}
                                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DeactivatedRiders;
