import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function PriceCalculator() {
    const [count, setCount] = useState(0);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const cost = Number(data.weight || 0) * 50;
        setCount(cost);
    };

    return (
        <div className="mt-14">

            {/* Section Title */}
            <h3 className="text-2xl font-semibold text-[#0A3D3F] text-center mb-10">
                Calculate Your Cost
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* LEFT — FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Parcel Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Parcel type
                        </label>
                        <select
                            {...register("parcelType")}
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        >
                            <option>Select Parcel type</option>
                            <option>Document</option>
                            <option>Package</option>
                            <option>Fragile Item</option>
                            <option>Heavy Parcel</option>
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Delivery Destination
                        </label>
                        <select
                            {...register("destination")}
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        >
                            <option>Select Delivery Destination</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                            <option>Khulna</option>
                            <option>Rajshahi</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Weight (KG)
                        </label>
                        <input
                            {...register("weight")}
                            type="number"
                            placeholder="Contact"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">

                        <button
                            type="button"
                            onClick={() => { reset(); setCount(0); }}
                            className="px-6 py-3 rounded-lg border border-[#8FA748] bg-[#FAFDF0] text-gray-800 hover:bg-[#eef6d7] transition-all transform hover:scale-[1.03] font-medium"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-gray-900 font-semibold rounded-lg shadow-md transition-all transform hover:scale-[1.03]"
                        >
                            Calculate
                        </button>

                    </div>
                </form>

                {/* RIGHT — COST DISPLAY */}
                <div className="flex flex-col justify-center items-center my-auto">
                    <span className="text-6xl font-black text-[#0A3D3F] tracking-wide">
                        {count} Tk
                    </span>
                    <p className="text-gray-500 mt-2 text-lg">
                        Estimated delivery cost
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PriceCalculator;
