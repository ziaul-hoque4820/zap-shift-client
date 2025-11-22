import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

function Login() {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className="w-full max-w-md mx-auto py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">Login with ZapShift</p>

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

                {/* Password */}
                <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        type={showPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your password"
                    />

                    {/* Eye icon fixed alignment */}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-13 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>

                    {errors.password && (
                        <p className="text-sm italic mt-1 text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Global form error */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    </div>
                )}

                {/* Forgot password */}
                <div className="flex justify-start text-sm">
                    <Link
                        to="/forgot-password"
                        className="text-[#b0cf52] hover:text-[#86a039] hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>

            {/* Divider */}
            <div className="mt-10">
                <div className="flex items-center gap-3">
                    <div className="flex-1 border-t"></div>
                    <span className="text-sm text-gray-500">Or continue with</span>
                    <div className="flex-1 border-t"></div>
                </div>

                {/* Social Button */}
                <button className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-[#f8faef] transition-all hover:scale-105">
                    <FcGoogle className="text-2xl" />
                    <span className="text-sm font-medium">Login with Google</span>
                </button>
            </div>

            {/* Register */}
            <p className="text-center text-gray-600 mt-8">
                Don’t have any account?{" "}
                <Link
                    to="/register"
                    className="text-[#b0cf52] hover:text-[#86a039] font-semibold hover:underline"
                >
                    Register
                </Link>
            </p>
        </div>

    )
}

export default Login