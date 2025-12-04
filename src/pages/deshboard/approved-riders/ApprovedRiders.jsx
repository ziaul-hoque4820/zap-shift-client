import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function ApprovedRiders() {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [vehicleFilter, setVehicleFilter] = useState("");
    const [areaFilter, setAreaFilter] = useState("");
    const queryClient = useQueryClient();

    const { data: riders = [], isLoading } = useQuery({
        queryKey: ["approvedRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/approved");
            return res.data;
        },
    });

    const filteredRiders = useMemo(() => {
        return riders.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
            const matchesVehicle = vehicleFilter ? r.vehicleType === vehicleFilter : true;
            const matchesArea = areaFilter
                ? Array.isArray(r.areasToRide) && r.areasToRide.includes(areaFilter)
                : true;
            return matchesSearch && matchesVehicle && matchesArea;
        });
    }, [search, vehicleFilter, areaFilter, riders]);


    const handleDeactivate = async (riderId) => {
        console.log(riderId);
        
        const confirm = await Swal.fire({
            title: "Deactivate Rider?",
            text: "Are you sure you want to deactivate this rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, deactivate",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${riderId}/deactivate`);

            await Swal.fire({
                title: "Deactivated!",
                text: "The rider has been deactivated successfully.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false
            });

            // Refresh approved rider list
            queryClient.invalidateQueries({ queryKey: ["approvedRiders"] });

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to deactivate rider. Try again.",
                icon: "error",
            });
        }
    };


    if (isLoading)
        return <p className="text-center py-10 text-gray-500">Loading approved riders...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Approved Riders</h2>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full shadow-sm"
                />

                <select
                    value={vehicleFilter}
                    onChange={(e) => setVehicleFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 shadow-sm"
                >
                    <option value="">Filter by vehicle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                </select>

                <select
                    value={areaFilter}
                    onChange={(e) => setAreaFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 shadow-sm"
                >
                    <option value="">Filter by area</option>
                    {Array.from(new Set(riders.flatMap((r) => r.areasToRide || []))).map(
                        (area, idx) => (
                            <option key={idx} value={area}>
                                {area}
                            </option>
                        )
                    )}
                </select>
            </div>

            {/* Count */}
            <p className="text-xl font-semibold text-gray-600 mb-4">
                Total Approved Riders: <span className="font-semibold">{filteredRiders.length}</span>
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRiders.map((rider) => (
                    <div
                        key={rider._id}
                        className="bg-white border rounded-xl p-5 shadow-sm animate-fadeIn"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={rider.userPhoto}
                                alt={rider.name}
                                className="w-16 h-16 rounded-full object-cover border"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">{rider.name}</h2>
                                <p className="text-sm text-gray-500">{rider.email}</p>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-900 mb-3">Additional Information</h4>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">NID</p>
                                    <p className="font-medium text-gray-900">{rider.nid}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Parent's Contact</p>
                                    <p className="font-medium text-gray-900">{rider.parentContact}</p>
                                </div>

                                {rider.vehicleType && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Vehicle Type</p>
                                        <p className="font-medium text-gray-900">{rider.vehicleType}</p>
                                    </div>
                                )}

                                {rider.vehicleRegNo && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Vehicle Registration</p>
                                        <p className="font-medium text-gray-900">{rider.vehicleRegNo}</p>
                                    </div>
                                )}

                                {Array.isArray(rider.areasToRide) && rider.areasToRide.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Preferred Areas</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {rider.areasToRide.map((area, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button onClick={() => handleDeactivate(rider._id)} className="w-full py-3 bg-[#CAEB66] mt-5 rounded-xl hover:bg-[#b7da4e] font-semibold cursor-pointer">Rider Deactivate</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApprovedRiders