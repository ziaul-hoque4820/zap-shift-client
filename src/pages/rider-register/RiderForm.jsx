import React from "react";
import { useForm } from "react-hook-form";

function RiderForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log("Rider Form Submitted:", data);
    };

    return (
        <div className="w-full md:w-1/2 p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl font-bold text-[#0A3D3F] mb-4">Be a Rider</h1>
            <p className="text-gray-600 leading-relaxed mb-10">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
            </p>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold text-[#0A3D3F] mb-6">
                Tell us about yourself
            </h2>

            {/* FORM START */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your age</label>
                        <input
                            {...register("age")}
                            type="number"
                            placeholder="Your age"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your District</label>
                        <select
                            {...register("district")}
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        >
                            <option>Select your District</option>
                            <option>Dhaka</option>
                            <option>Chattogram</option>
                            <option>Khulna</option>
                            <option>Rajshahi</option>
                        </select>
                    </div>

                    {/* NID */}
                    <div>
                        <label className="block text-gray-700 mb-1">NID No</label>
                        <input
                            {...register("nid")}
                            type="text"
                            placeholder="NID"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-gray-700 mb-1">Contact</label>
                        <input
                            {...register("contact")}
                            type="text"
                            placeholder="Contact"
                            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                        />
                    </div>

                </div>

                {/* Wirehouse Dropdown */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        Which wire-house you want to work?
                    </label>
                    <select
                        {...register("wirehouse")}
                        className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
                    >
                        <option>Select wire-house</option>
                        <option>Warehouse 1</option>
                        <option>Warehouse 2</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default RiderForm;
