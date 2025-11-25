import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import wereHouse from "../../data/warehouses.json";

const ParcelBookingForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            parcelType: "Document",
        },
    });

    // watch selected districts to show dependent options
    const senderDistrict = watch("senderDistrict");
    const receiverDistrict = watch("receiverDistrict");

    // derive unique districts from wereHouse data
    const districts = useMemo(() => {
        const set = new Set(wereHouse.map((w) => w.district));
        return Array.from(set);
    }, []);

    // helper to get options (city + covered_area) for a district
    const getOptionsForDistrict = (district) => {
        if (!district) return [];
        const entry = wereHouse.find((w) => w.district === district);
        if (!entry) return [];
        // include city first, then covered areas (avoid duplicates)
        const opts = [entry.city, ...(entry.covered_area || [])].filter(Boolean);
        // unique
        return Array.from(new Set(opts));
    };

    const senderOptions = getOptionsForDistrict(senderDistrict);
    const receiverOptions = getOptionsForDistrict(receiverDistrict);

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900">Send A Parcel</h1>
            <p className="mt-1 text-gray-600">Enter your parcel details</p>

            {/* Parcel Type */}
            <div className="flex gap-6 mt-6">
                <label className="flex items-center gap-2">
                    <input type="radio" value="Document" defaultChecked {...register("parcelType", { required: true })} />
                    <span className="text-sm font-semibold">Document</span>
                </label>

                <label className="flex items-center gap-2">
                    <input type="radio" value="Not-Document" {...register("parcelType", { required: true })} />
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
                            {...register("parcelName", {
                                required: "Parcel Name Required",
                                minLength: { value: 2, message: "At least 2 characters" },
                                maxLength: { value: 120, message: "Too long" },
                                setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                            })}
                        />
                        {errors.parcelName && <p className="text-red-500 text-sm">{errors.parcelName.message}</p>}
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
                        {errors.parcelWeight && <p className="text-red-500 text-sm">{errors.parcelWeight.message}</p>}
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
                                    required: "Sender Address (House/Road/Area) must be Required",
                                    minLength: { value: 5, message: "Provide a more specific address" },
                                })}
                            />
                            {errors.senderAddress && <p className="text-red-500 text-sm">{errors.senderAddress.message}</p>}

                            <input
                                placeholder="Sender Phone No"
                                className="border p-2 rounded-md"
                                {...register("senderPhone", {
                                    required: "Sender Phone Number is Required",
                                    pattern: {
                                        value: /^01[3-9]\d{8}$/,
                                        message: "Enter a valid Bangladeshi mobile number",
                                    },
                                })}
                            />
                            {errors.senderPhone && <p className="text-red-500 text-sm">{errors.senderPhone.message}</p>}

                            {/* District select derived from wereHouse */}
                            <select
                                className="border p-2 rounded-md"
                                {...register("senderDistrict", { required: "Sender District is Required" })}
                            >
                                <option value="">Select your District</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                            {errors.senderDistrict && <p className="text-red-500 text-sm">{errors.senderDistrict.message}</p>}

                            {/* Dependent select: shows city + covered_areas for chosen district */}
                            {senderDistrict ? (
                                senderOptions.length > 0 ? (
                                    <select
                                        className="border p-2 rounded-md"
                                        {...register("senderAreaOrCity", { required: "Select city / area for sender" })}
                                    >
                                        <option value="">Select city or area</option>
                                        {senderOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-sm text-yellow-600">No warehouse coverage found for this district.</p>
                                )
                            ) : null}
                            {errors.senderAreaOrCity && <p className="text-red-500 text-sm">{errors.senderAreaOrCity.message}</p>}

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
                                {...register("receiverName", { required: "Receiver Name is Required", minLength: { value: 2, message: "At least 2 characters" } })}
                            />
                            {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}

                            <input
                                placeholder="Receiver Address"
                                className="border p-2 rounded-md"
                                {...register("receiverAddress", {
                                    required: "Receiver Address (House/Road/Area) must be Required",
                                    minLength: { value: 5, message: "Provide a more specific address" },
                                })}
                            />
                            {errors.receiverAddress && <p className="text-red-500 text-sm">{errors.receiverAddress.message}</p>}

                            <input
                                placeholder="Receiver Contact No"
                                className="border p-2 rounded-md"
                                {...register("receiverPhone", {
                                    required: "Receiver Contact No is Required",
                                    pattern: { value: /^01[3-9]\d{8}$/, message: "Enter a valid Bangladeshi mobile number" },
                                })}
                            />
                            {errors.receiverPhone && <p className="text-red-500 text-sm">{errors.receiverPhone.message}</p>}

                            <select className="border p-2 rounded-md" {...register("receiverDistrict", { required: "Receiver District is Required" })}>
                                <option value="">Select your District</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                            {errors.receiverDistrict && <p className="text-red-500 text-sm">{errors.receiverDistrict.message}</p>}

                            {/* Dependent select for receiver */}
                            {receiverDistrict ? (
                                receiverOptions.length > 0 ? (
                                    <select
                                        className="border p-2 rounded-md"
                                        {...register("receiverAreaOrCity", { required: "Select city / area for receiver" })}
                                    >
                                        <option value="">Select city or area</option>
                                        {receiverOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-sm text-yellow-600">No warehouse coverage found for this district.</p>
                                )
                            ) : null}
                            {errors.receiverAreaOrCity && <p className="text-red-500 text-sm">{errors.receiverAreaOrCity.message}</p>}

                            <textarea
                                placeholder="Delivery Instruction"
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
