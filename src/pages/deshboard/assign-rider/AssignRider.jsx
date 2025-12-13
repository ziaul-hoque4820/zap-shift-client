import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useTrackingLogger from "../../../hooks/useTrackingLogger";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

function AssignRider() {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { logTracking } = useTrackingLogger();
    const { user } = useAuth();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRider, setSelectedRider] = useState(null);

    /* ------------------ Load Parcels ------------------ */
    const { data: parcels = [], isLoading: parcelLoading } = useQuery({
        queryKey: ["admin-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/admin/parcels?payment_status=paid&delivery_status=not_collected"
            );
            return res.data;
        },
    });

    /* ------------------ Load Riders ------------------ */
    const { data: riderData, isLoading: ridersLoading } = useQuery({
        queryKey: ["available-riders", selectedParcel?.senderAreaOrCity],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/available?area=${selectedParcel.senderAreaOrCity}`
            );
            return res.data;
        },
        enabled: !!selectedParcel,
    });

    const riders = riderData?.riders || [];

    /* ------------------ Selected Rider Object ------------------ */
    const selectedRiderData = riders.find(
        (rider) => rider._id === selectedRider
    );


    /* ------------------ Assign Rider Mutation ------------------ */
    const assignMutation = useMutation({
        mutationFn: async () => {
            return axiosSecure.patch(
                `/parcels/${selectedParcel._id}/assign-rider`,
                { riderId: selectedRider }
            );
        },
        onSuccess: async () => {
            // ✅ rider info safe copy
            const rider = selectedRiderData;
            console.log(rider);
            

            // ✅ log tracking FIRST
            await logTracking({
                tracking_id: selectedParcel.tracking_id,
                status: "Rider Assigned",
                details: `Assigned to ${rider.name}`,
                location: selectedParcel.receiverDistrict,
                rider_contact: rider.phone,
                updated_by: user.email,
            });

            toast.success("Rider assigned successfully!");

            // ✅ reset state AFTER all async work
            setSelectedParcel(null);
            setSelectedRider(null);

            queryClient.invalidateQueries(["admin-parcels"]);
        },
        onError: () => {
            toast.error("Failed to assign rider.");
        },
    });

    /* ------------------ Confirm Assign ------------------ */
    const handleAssignConfirm = async () => {
        if (!selectedRiderData) return;

        const result = await Swal.fire({
            title: "Assign Rider?",
            html: `
                <p><strong>Rider:</strong> ${selectedRiderData.name}</p>
                <p><strong>Phone:</strong> ${selectedRiderData.phone}</p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0A3D3F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Assign",
        });

        if (result.isConfirmed) {
            assignMutation.mutate();
        }
    };

    /* ------------------ UI ------------------ */
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Assign Rider
            </h1>
            <p className="text-gray-600 mb-6">
                Manage all paid and not-collected parcels and assign riders.
            </p>

            {parcelLoading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-700" />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parcels.map((parcel) => (
                    <div
                        key={parcel._id}
                        className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            {parcel.parcelName}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Tracking: {parcel.tracking_id}
                        </p>

                        <div className="mt-4 space-y-2 text-sm">
                            <p><b>Sender:</b> {parcel.senderName}</p>
                            <p><b>Receiver:</b> {parcel.receiverName}</p>
                            <p><b>From:</b> {parcel.senderAreaOrCity}</p>
                            <p><b>To:</b> {parcel.receiverAreaOrCity}</p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedParcel(parcel);
                                setSelectedRider(null);
                            }}
                            className="w-full mt-5 bg-[#0A3D3F] text-white py-2 rounded-lg hover:bg-[#062f30]"
                        >
                            Assign Rider
                        </button>
                    </div>
                ))}
            </div>

            {/* ------------------ MODAL ------------------ */}
            {selectedParcel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-md rounded-xl p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Assign Rider to: {selectedParcel.parcelName}
                        </h2>

                        {!ridersLoading && (
                            <div className="max-h-72 overflow-y-auto space-y-3">
                                {riders.length === 0 && (
                                    <p className="text-gray-500 text-sm text-center">
                                        No riders available in this area.
                                    </p>
                                )}

                                {riders.map((rider) => (
                                    <div
                                        key={rider._id}
                                        onClick={() => setSelectedRider(rider._id)}
                                        className={`border rounded-lg p-3 cursor-pointer
                                            ${selectedRider === rider._id
                                                ? "bg-[#0A3D3F] text-white"
                                                : "hover:bg-gray-100"}`}
                                    >
                                        <p className="font-semibold">{rider.name}</p>
                                        <p className="text-sm">Phone: {rider.phone}</p>
                                        <p className="text-sm">
                                            Areas: {rider.areas.join(", ")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={!selectedRider || assignMutation.isLoading}
                                onClick={handleAssignConfirm}
                                className="px-4 py-2 bg-[#0A3D3F] text-white rounded-lg disabled:opacity-50"
                            >
                                Assign Rider
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignRider;
