import React from "react";
import { useForm } from "react-hook-form";

const districts = [
    "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barisal", "Rangpur", "Mymensingh",
];

const ParcelBookingForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert("Form Submitted Successfully!");
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900">Send A Parcel</h1>
            <p className="mt-1 text-gray-600">Enter your parcel details</p>

            {/* Parcel Type */}
            <div className="flex gap-6 mt-6">
                <label className="flex items-center gap-2">
                    <input type="radio" value="Document" defaultChecked {...register("parcelType")} />
                    <span className="text-sm font-semibold">Document</span>
                </label>

                <label className="flex items-center gap-2">
                    <input type="radio" value="Not-Document" {...register("parcelType")} />
                    <span className="text-sm font-semibold">Not-Document</span>
                </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-8">
                {/* PARCEL NAME / WEIGHT */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium">Parcel Name</label>
                        <input
                            className="w-full border rounded-md px-3 py-2"
                            {...register("parcelName", { required: "Parcel Name Required" })}
                        />
                        {errors.parcelName && <p className="text-red-500 text-sm">{errors.parcelName.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Parcel Weight (KG)</label>
                        <input
                            type="number"
                            className="w-full border rounded-md px-3 py-2"
                            {...register("parcelWeight", { required: "Weight Required" })}
                        />
                        {errors.parcelWeight && <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>}
                    </div>
                </div>

                {/* SENDER & RECEIVER */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Sender */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Sender Details</h2>
                        <div className="flex flex-col gap-4">
                            <input placeholder="Sender Name" className="border p-2 rounded-md"
                                {...register("senderName", { required: true })} />
                            <input placeholder="Address" className="border p-2 rounded-md"
                                {...register("senderAddress", { required: true })} />
                            <input placeholder="Sender Phone No" className="border p-2 rounded-md"
                                {...register("senderPhone", { required: true })} />

                            <select className="border p-2 rounded-md" {...register("senderDistrict", { required: true })}>
                                <option value="">Select your District</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <textarea placeholder="Pickup Instruction"
                                className="border p-2 rounded-md h-24 resize-none"
                                {...register("pickupInstruction")}
                            ></textarea>
                        </div>
                    </div>

                    {/* Receiver */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>
                        <div className="flex flex-col gap-4">
                            <input placeholder="Receiver Name" className="border p-2 rounded-md"
                                {...register("receiverName", { required: true })} />
                            <input placeholder="Receiver Address" className="border p-2 rounded-md"
                                {...register("receiverAddress", { required: true })} />
                            <input placeholder="Receiver Contact No" className="border p-2 rounded-md"
                                {...register("receiverPhone", { required: true })} />

                            <select className="border p-2 rounded-md" {...register("receiverDistrict", { required: true })}>
                                <option value="">Select your District</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <textarea placeholder="Delivery Instruction"
                                className="border p-2 rounded-md h-24 resize-none"
                                {...register("deliveryInstruction")}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-600">* Pickup Time 4pm-7pm Approx.</p>

                <button
                    type="submit"
                    className="bg-[#CAEB66] hover:bg-[#b0cf52] text-white px-6 py-3 rounded-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
                >
                    Proceed to Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default ParcelBookingForm;
