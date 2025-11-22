import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

function ResetPassword() {
    const [error, setError] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (data.confirm_password !== data.new_password) {
            setError("Passwords do not match!");
            return;
        }
        setError("")
        console.log(data);
        
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }


    return (
        <div className="w-full max-w-md mx-auto py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Reset Password
            </h2>
            <p className="text-center text-gray-600 mb-8">Reset your password</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* New Password */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        {...register("new_password", {
                            required: "New Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        type={showNewPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.new_password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your New password"
                    />

                    {/* Eye icon fixed alignment */}
                    <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute right-3 top-13 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showNewPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>

                    {errors.new_password && (
                        <p className="text-sm italic mt-1 text-red-500">
                            {errors.new_password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        {...register("confirm_password", {
                            required: "Confirm Password is required",
                            minLength: {
                                value: 6,
                                message: "Confirm Password must be match with New Password",
                            },
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.confirm_password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter Confirm password"
                    />

                    {/* Eye icon fixed alignment */}
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-13 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>

                    {errors.confirm_password && (
                        <p className="text-sm italic mt-1 text-red-500">
                            {errors.confirm_password.message}
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
                    Login
                </button>
            </form>
        </div>
    )
}

export default ResetPassword