import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [error, setError] = useState("");
    
        const { register, handleSubmit, formState: { errors } } = useForm();
    
        const onSubmit = (data) => {
            console.log(data);
        }
    
    return (
        <div className="w-full max-w-md mx-auto py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Forgot Password
            </h2>
            <p className="text-center text-gray-600 mb-8">Enter your email address and we’ll send you a reset link.</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-sm italic mt-1 text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Global form error */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send
                </button>
            </form>


            {/* Register */}
            <p className="text-center text-gray-600 mt-8">
                Remember your password?{" "}
                <Link
                    to="/login"
                    className="text-[#b0cf52] hover:text-[#86a039] font-semibold hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    )
}

export default ForgotPassword