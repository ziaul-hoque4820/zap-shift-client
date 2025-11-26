import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import warehouse from "../../data/warehouses.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import calculateCost from "./calculateCost";
import { Link, Navigate } from "react-router-dom";

const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
};

const ParcelBookingForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { parcelType: "Document" },
    });

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const senderDistrict = watch("senderDistrict");
    const receiverDistrict = watch("receiverDistrict");

    // Unique district list
    const districts = useMemo(() => {
        return [...new Set(warehouse.map(w => w.district))];
    }, []);

    // FIXED: correct filter logic instead of find()
    const getOptionsForDistrict = (district) => {
        if (!district) return [];

        const entries = warehouse.filter(w => w.district === district);
        if (!entries.length) return [];

        const areas = entries.flatMap(w => [
            w.city,
            ...(w.covered_area || [])
        ]).filter(Boolean);

        return [...new Set(areas)];
    };

    const senderOptions = getOptionsForDistrict(senderDistrict);
    const receiverOptions = getOptionsForDistrict(receiverDistrict);

    const onSubmit = (data) => {
        const { weight, baseCost, extraCost, totalCost, isSameDistrict } = calculateCost(data);

        const extraKg = weight > 3 ? (weight - 3) : 0;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
          <div class="text-left text-base space-y-2">

            <p><strong>Your Traking Id:</strong> ${generateTrackingID()}</p>
            <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
            <p><strong>Weight:</strong> ${weight} kg</p>
            <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>

            <hr class="my-2"/>

            <p><strong>Base Cost:</strong> ৳${baseCost}</p>

            ${extraKg > 0
                    ? `<p><strong>Extra Weight:</strong> ${extraKg} kg × 40 = ৳${extraCost}</p>`
                    : ""
                }

            <hr class="my-2"/>

            <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>

            <hr class="my-3"/>

          </div>
        `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#16a34a",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const tracking_id = generateTrackingID();
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: "unpaid",
                    delivery_status: "not_collected",
                    creation_date: new Date().toISOString(),
                    tracking_id,
                };

                console.log(parcelData);


                axiosSecure.post("/parcels", parcelData).then(async (res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Redirecting...",
                            text: "Proceeding to payment gateway.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                });
            }
        });
    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900">Send A Parcel</h1>
            <p className="mt-1 text-gray-600">Enter your parcel details</p>

            {/* Parcel Type */}
            <div className="flex gap-6 mt-6">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        value="Document"
                        defaultChecked
                        {...register("parcelType", { required: true })}
                    />
                    <span className="text-sm font-semibold">Document</span>
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        value="Non-document"
                        {...register("parcelType", { required: true })}
                    />
                    <span className="text-sm font-semibold">Non-document</span>
                </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-8">

                {/* PARCEL NAME / WEIGHT */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium">Parcel Name</label>
                        <input
                            className="w-full border rounded-md px-3 py-2"
                            {...register("parcelName", {
                                required: "Parcel Name Required",
                                minLength: { value: 2, message: "At least 2 characters" },
                                maxLength: { value: 120, message: "Too long" },
                                setValueAs: (v) => v.trim(),
                            })}
                        />
                        {errors.parcelName && (
                            <p className="text-red-500 text-sm">{errors.parcelName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Parcel Weight (KG)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="w-full border rounded-md px-3 py-2"
                            {...register("parcelWeight", {
                                required: "Weight Required",
                                valueAsNumber: true,
                                min: { value: 0.1, message: "Weight must be at least 0.1 kg" },
                                max: { value: 500, message: "Weight seems too large" },
                            })}
                        />
                        {errors.parcelWeight && (
                            <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>
                        )}
                    </div>
                </div>

                {/* SENDER & RECEIVER */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Sender */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

                        <div className="flex flex-col gap-4">

                            <input
                                placeholder="Sender Name"
                                className="border p-2 rounded-md"
                                {...register("senderName", {
                                    required: "Sender Name is Required",
                                    minLength: { value: 2, message: "At least 2 characters" },
                                })}
                            />
                            {errors.senderName && <p className="text-red-500 text-sm">{errors.senderName.message}</p>}

                            <input
                                placeholder="Address"
                                className="border p-2 rounded-md"
                                {...register("senderAddress", {
                                    required: "Sender Address Required",
                                    minLength: { value: 5, message: "Provide a more specific address" },
                                })}
                            />
                            {errors.senderAddress && <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>}

                            <input
                                placeholder="Sender Phone No"
                                className="border p-2 rounded-md"
                                {...register("senderPhone", {
                                    required: "Sender Phone Number is Required",
                                    pattern: { value: /^01[3-9]\d{8}$/, message: "Enter a valid Bangladeshi number" },
                                })}
                            />
                            {errors.senderPhone && <p className="text-red-500 text-sm">{errors.senderPhone.message}</p>}

                            <select
                                className="border p-2 rounded-md"
                                {...register("senderDistrict", { required: "Sender District is Required" })}
                            >
                                <option value="">Select your District</option>
                                {districts.map(d => <option key={d}>{d}</option>)}
                            </select>

                            {senderDistrict && (
                                senderOptions.length > 0 ? (
                                    <select
                                        className="border p-2 rounded-md"
                                        {...register("senderAreaOrCity", { required: "Select city / area" })}
                                    >
                                        <option value="">Select city or area</option>
                                        {senderOptions.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <p className="text-sm text-yellow-600">No warehouse coverage found for this district.</p>
                                )
                            )}

                            <textarea
                                placeholder="Pickup Instruction"
                                className="border p-2 rounded-md h-24 resize-none"
                                {...register("pickupInstruction")}
                            ></textarea>
                        </div>
                    </div>

                    {/* Receiver */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

                        <div className="flex flex-col gap-4">

                            <input
                                placeholder="Receiver Name"
                                className="border p-2 rounded-md"
                                {...register("receiverName", { required: "Receiver Name is Required" })}
                            />
                            {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}
                            <input
                                placeholder="Receiver Address"
                                className="border p-2 rounded-md"
                                {...register("receiverAddress", {
                                    required: "Receiver Address Required",
                                    minLength: { value: 5, message: "Provide a more specific address" },
                                })}
                            />
                            {errors.receiverAddress && <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>}
                            <input
                                placeholder="Receiver Contact No"
                                className="border p-2 rounded-md"
                                {...register("receiverPhone", {
                                    required: "Receiver Phone Required",
                                    pattern: { value: /^01[3-9]\d{8}$/, message: "Enter valid Bangladeshi number" },
                                })}
                            />
                            {errors.receiverPhone && <p className="text-red-500 text-sm">{errors.receiverPhone.message}</p>}
                            <select
                                className="border p-2 rounded-md"
                                {...register("receiverDistrict", { required: "Receiver District Required" })}
                            >
                                <option value="">Select your District</option>
                                {districts.map(d => <option key={d}>{d}</option>)}
                            </select>

                            {receiverDistrict && (
                                receiverOptions.length > 0 ? (
                                    <select
                                        className="border p-2 rounded-md"
                                        {...register("receiverAreaOrCity", { required: "Select city / area" })}
                                    >
                                        <option value="">Select city or area</option>
                                        {receiverOptions.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <p className="text-sm text-yellow-600">No warehouse coverage found for this district.</p>
                                )
                            )}

                            <textarea
                                placeholder="Delivery Instruction"
                                className="border p-2 rounded-md h-24 resize-none"
                                {...register("deliveryInstruction")}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <p
                    className="text-md text-heading font-semibold mt-1 "
                >
                    Want to calculate estimated cost before booking? <Link to={'/pricing'} className="underline text-blue-500">Click here</Link>
                </p>

                <button
                    type="submit"
                    className="bg-[#CAEB66] hover:bg-[#b0cf52] text-white px-6 py-3 rounded-md transition-all transform hover:scale-105 w-full md:w-80"
                >
                    Proceed to Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default ParcelBookingForm;
