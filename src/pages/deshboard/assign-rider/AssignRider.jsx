import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function AssignRider() {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRider, setSelectedRider] = useState(null);

    // Load parcels: paid + not collected
    const { data: parcels = [], isLoading: parcelLoading } = useQuery({
        queryKey: ["admin-parcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/admin/parcels?payment_status=paid&delivery_status=not_collected"
            );
            return res.data;
        },
    });

    // Fetch riders dynamically based on selected parcel area
    const {
        data: riderData,
        isLoading: ridersLoading,
        refetch: loadRiders,
    } = useQuery({
        queryKey: ["available-riders", selectedParcel?.senderAreaOrCity],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/available?area=${selectedParcel.senderAreaOrCity}`
            );
            return res.data;
        },
        enabled: !!selectedParcel, // Only fetch when modal opens
    });

    const riders = riderData?.riders || [];

    // Assign Rider Mutation
    const assignMutation = useMutation({
        mutationFn: async () => {
            return await axiosSecure.patch(
                `/parcels/${selectedParcel._id}/assign-rider`,
                { riderId: selectedRider }
            );
        },
        onSuccess: () => {
            toast.success("Rider assigned successfully!");

            setSelectedParcel(null);
            setSelectedRider(null);

            // Refresh parcel list
            queryClient.invalidateQueries(["admin-parcels"]);
        },
        onError: () => {
            toast.error("Failed to assign rider.");
        },
    });


    // Open Modal
    const openModal = (parcel) => {
        setSelectedParcel(parcel);
        setSelectedRider(null);
        loadRiders();
    };

    // Close Modal
    const closeModal = () => {
        setSelectedParcel(null);
        setSelectedRider(null);
    };


    // UI Rendering
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Assign Rider
            </h1>
            <p className="text-gray-600 mb-6">
                Manage all paid and not-collected parcels and assign riders.
            </p>

            {/* Loading */}
            {parcelLoading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-700" />
                </div>
            )}

            {/* Parcel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parcels.map((parcel) => (
                    <div
                        key={parcel._id}
                        className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-1 text-gray-800">
                            {parcel.parcelName}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Tracking: {parcel.tracking_id}
                        </p>
                        <p className="text-sm text-gray-500">
                            Type: {parcel.parcelType}
                        </p>

                        <div className="mt-4 space-y-2 text-sm">
                            <p>
                                <span className="font-medium">Sender:</span>{" "}
                                {parcel.senderName}
                            </p>
                            <p>
                                <span className="font-medium">Receiver:</span>{" "}
                                {parcel.receiverName}
                            </p>
                            <p>
                                <span className="font-medium">From:</span>{" "}
                                {parcel.senderAreaOrCity}
                            </p>
                            <p>
                                <span className="font-medium">To:</span>{" "}
                                {parcel.receiverAreaOrCity}
                            </p>
                        </div>

                        <button
                            onClick={() => openModal(parcel)}
                            className="w-full mt-5 bg-[#0A3D3F] text-white py-2 rounded-lg hover:bg-[#062f30] transition"
                        >
                            Assign Rider
                        </button>
                    </div>
                ))}
            </div>


                {/* ASSIGN RIDER MODAL  */}
            {selectedParcel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

                        <h2 className="text-xl font-bold mb-4">
                            Assign Rider to: {selectedParcel.parcelName}
                        </h2>

                        {/* Riders Loading */}
                        {ridersLoading && (
                            <div className="flex justify-center py-10">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
                            </div>
                        )}

                        {/* Riders List */}
                        {!ridersLoading && (
                            <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                                {riders.length === 0 && (
                                    <p className="text-gray-500 text-sm text-center">
                                        No riders available in this area.
                                    </p>
                                )}

                                {riders.map((rider) => (
                                    <div
                                        key={rider._id}
                                        onClick={() =>
                                            setSelectedRider(rider._id)
                                        }
                                        className={`border rounded-lg p-3 cursor-pointer transition 
                                            ${selectedRider === rider._id
                                                ? "bg-[#0A3D3F] text-white"
                                                : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <p className="font-semibold">
                                            {rider.name}
                                        </p>
                                        <p className="text-sm">
                                            Phone: {rider.phone}
                                        </p>
                                        <p className="text-sm">
                                            Areas: {rider.areas.join(", ")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={!selectedRider || assignMutation.isLoading}
                                onClick={() => assignMutation.mutate()}
                                className="px-4 py-2 bg-[#0A3D3F] text-white rounded-lg disabled:opacity-50 hover:bg-[#062f30]"
                            >
                                {assignMutation.isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    "Assign Rider"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignRider;
