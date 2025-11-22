import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'
import { IoMdCamera } from 'react-icons/io';
import { Link } from 'react-router-dom'

function Register() {
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
                Create an Account
            </h2>
            <p className="text-center text-gray-600 mb-8">Register with ZapShift</p>

            {/* Profile Picture Upload - responsive: stacked on small, row on sm+ */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Profile Picture
                </label>

                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4">
                    <div className="shrink-0">
                        <img
                            id="profilePreview"
                            className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                            src="data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3ePhoto%3c/text%3e%3c/svg%3e"
                            alt="Profile preview"
                        />
                    </div>

                    <div className="flex-1 max-w-xs w-ful md:mt-4 sm:mt-0">
                        <label
                            htmlFor="profilePicture"
                            className="relative cursor-pointer w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 transition block text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <IoMdCamera className="text-lg" />
                                <span>Choose photo</span>
                            </span>
                            <input
                                id="profilePicture"
                                name="profilePicture"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                            />
                        </label>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center mx-auto">
                            PNG, JPG, GIF up to 2MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        id="name"
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors?.name ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your name"
                    />
                    {errors?.name && (
                        <p className="text-sm italic mt-1 text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

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
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors?.email ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your email"
                    />
                    {errors?.email && (
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
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`w-full px-4 py-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors?.password ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Enter your password"
                    />

                    {/* Eye icon fixed alignment */}
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>

                    {errors?.password && (
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

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Register
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
                    <span className="text-sm font-medium">Register with Google</span>
                </button>
            </div>

            {/* Register / Login */}
            <p className="text-center text-gray-600 mt-8">
                Already have an account?{" "}
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

export default Register