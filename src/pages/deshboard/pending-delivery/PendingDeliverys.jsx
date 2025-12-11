import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoaderSpin from '../../share/LoaderSpin';
import Swal from 'sweetalert2';

function PendingDeliverys() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Get parcels assigned to rider
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['riderParcels'],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
            return res.data;
        }
    });

    // --- Pick Up Mutation ---
    const { mutateAsync: markPickedUp } = useMutation({
        mutationFn: async ({ parcelId }) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/pickup`, {
                riderEmail: user.email,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"]);
        },
    });

    // --- Deliver Mutation (NEW) ---
    const { mutateAsync: markDelivered } = useMutation({
        mutationFn: async ({ parcelId }) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/deliver`, {
                riderEmail: user.email,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"]);
        },
    });

    // Handle Button Clicks
    const handlePickup = (parcelId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Mark this parcel as Picked Up?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                markPickedUp({ parcelId })
                    .then(() => Swal.fire("Success", "Parcel Picked Up!", "success"))
                    .catch(() => Swal.fire("Error", "Failed to update.", "error"));
            }
        });
    };

    const handleDelivered = (parcelId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Mark this parcel as Delivered?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                markDelivered({ parcelId })
                    .then(() => Swal.fire("Success", "Parcel Delivered!", "success"))
                    .catch(() => Swal.fire("Error", "Failed to update.", "error"));
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>

            {isLoading ? (
                <LoaderSpin />
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No assigned deliveries.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Receiver</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.receiverAreaOrCity} + {parcel.receiverAddress}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td className="capitalize">
                                        {parcel.delivery_status.replace("_", " ")}
                                    </td>

                                    <td>
                                        {parcel.delivery_status === "rider_assigned" && (
                                            <button
                                                className="px-4 py-3 bg-lime-300 rounded-xl text-black cursor-pointer"
                                                onClick={() => handlePickup(parcel._id)}
                                            >
                                                Mark Picked Up
                                            </button>
                                        )}

                                        {parcel.delivery_status === "in_transit" && (
                                            <button
                                                className="px-4 py-3 rounded-xl bg-green-300 text-black cursor-pointer"
                                                onClick={() => handleDelivered(parcel._id)}
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default PendingDeliverys;
