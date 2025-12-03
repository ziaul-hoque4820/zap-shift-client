import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import warehouses from "../../data/warehouses.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function RiderForm() {
    const { user } = useAuth();
    console.log(user);
    
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || ""
        }
    });

    const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [coveredAreas, setCoveredAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const vehicleType = watch("vehicleType");

    // Pre-fill form with user data on component mount
    useEffect(() => {
        if (user) {
            setValue("name", user.displayName || "");
            setValue("email", user.email || "");
        }
    }, [user, setValue]);

    // Filter warehouses based on selected district
    useEffect(() => {
        if (selectedDistrict) {
            const filtered = warehouses.filter(warehouse =>
                warehouse.district === selectedDistrict
            );
            setFilteredWarehouses(filtered);
            // Reset warehouse selection if it's not in the filtered list
            if (selectedWarehouse && !filtered.find(w => w.city === selectedWarehouse)) {
                setValue("warehouse", "");
                setSelectedWarehouse("");
            }
        } else {
            setFilteredWarehouses(warehouses);
        }
    }, [selectedDistrict, selectedWarehouse, setValue]);

    // Update covered areas when warehouse is selected
    useEffect(() => {
        if (selectedWarehouse) {
            const warehouse = warehouses.find(w => w.city === selectedWarehouse);
            if (warehouse) {
                setCoveredAreas(warehouse.covered_area || []);
            }
        } else {
            setCoveredAreas([]);
        }
    }, [selectedWarehouse]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log("Rider Form Submitted:", data);

            // Prepare the data for submission
            const riderData = {
                ...data,
                userId: user?.uid, 
                userEmail: user?.email,
                userPhoto: user?.photoURL || null,
                status: "pending", 
                appliedAt: Date.now(),
                // Convert areasToRide to array if it's not already
                areasToRide: Array.isArray(data.areasToRide) ? data.areasToRide : [data.areasToRide].filter(Boolean)
            };

            // Send to backend
            const response = await axiosSecure.post("/riders", riderData);

            if (response.data.insertedId) {
                setSubmitSuccess(true);
                // Reset form after successful submission
                reset({
                    name: user?.displayName || "",
                    email: user?.email || ""
                });
                setSelectedDistrict("");
                setSelectedWarehouse("");
                setCoveredAreas([]);

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted',
                    text: 'Thank you for applying to be a rider. We will review your application and get back to you soon.',
                    confirmButtonColor: '#0A3D3F',
                });
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const calculateAge = (dob) => {
        if (!dob) return 0;
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const validateAge = (dob) => {
        const age = calculateAge(dob);
        return age >= 18 && age <= 60;
    };

    const validateNID = (nid) => {
        // NID validation for Bangladesh (10 or 17 digits)
        const nidRegex = /^(\d{10}|\d{17})$/;
        return nidRegex.test(nid);
    };

    const validatePhone = (phone) => {
        // Bangladesh phone number validation
        const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
        return phoneRegex.test(phone);
    };

    // Get unique districts from warehouses
    const uniqueDistricts = [...new Set(warehouses.map(w => w.district))];

    // If form submitted successfully, show success message
    if (submitSuccess) {
        return (
            <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="text-center py-12">
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <h1 className="text-3xl font-bold text-[#0A3D3F] mb-4">
                        Application Submitted Successfully!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for your interest in becoming a rider. We have received your application
                        and will review it shortly. We'll contact you at {user?.email} within 3-5 business days.
                    </p>
                    <Link 
                        to="/dashboard"
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all"
                    >
                        Go to your Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full md:w-1/2 p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl font-bold text-[#0A3D3F] mb-4">Be a Rider</h1>
            <p className="text-gray-600 leading-relaxed mb-10">
                Join our rider team and enjoy flexible working hours, competitive pay,
                and the freedom to work on your own schedule. Deliver happiness across the city!
            </p>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Your account information (name and email) is pre-filled
                    and cannot be changed here. If you need to update your account details,
                    please visit your profile settings.
                </p>
            </div>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold text-[#0A3D3F] mb-6">
                Personal Information
            </h2>

            {/* FORM START */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name - Read Only */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                            <span className="text-xs text-gray-500 ml-2">(from your account)</span>
                        </label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                minLength: { value: 3, message: "Name must be at least 3 characters" }
                            })}
                            type="text"
                            readOnly
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                            value={user?.displayName || ""}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This field is pre-filled from your account
                        </p>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("dob", {
                                required: "Date of Birth is required",
                                validate: {
                                    validAge: (value) => validateAge(value) || "Must be between 18 and 60 years old",
                                    isDate: (value) => !isNaN(Date.parse(value)) || "Invalid date format"
                                }
                            })}
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.dob ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        />
                        {errors.dob && (
                            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                        )}
                    </div>

                    {/* Email - Read Only */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                            <span className="text-xs text-gray-500 ml-2">(from your account)</span>
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            readOnly
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                            value={user?.email || ""}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This field is pre-filled from your account
                        </p>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            District <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("district", {
                                required: "District is required",
                                onChange: (e) => setSelectedDistrict(e.target.value)
                            })}
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.district ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                            value={selectedDistrict}
                        >
                            <option value="">Select your District</option>
                            {uniqueDistricts.map((district, index) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        {errors.district && (
                            <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
                        )}
                    </div>

                    {/* NID */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            NID Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("nid", {
                                required: "NID is required",
                                validate: {
                                    validNID: (value) => validateNID(value) || "Invalid NID (10 or 17 digits)"
                                }
                            })}
                            type="text"
                            placeholder="Enter 10 or 17 digit NID"
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.nid ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        />
                        {errors.nid && (
                            <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
                        )}
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("contact", {
                                required: "Contact number is required",
                                validate: {
                                    validPhone: (value) => validatePhone(value) || "Invalid Bangladeshi phone number"
                                }
                            })}
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.contact ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        />
                        {errors.contact && (
                            <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                        )}
                    </div>

                    {/* Parent's Contact Number */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Parent's Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("parentContact", {
                                required: "Parent's contact number is required",
                                validate: {
                                    validPhone: (value) => validatePhone(value) || "Invalid Bangladeshi phone number",
                                    differentFromContact: (value) =>
                                        value !== watch("contact") || "Must be different from your contact number"
                                }
                            })}
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.parentContact ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        />
                        {errors.parentContact && (
                            <p className="text-red-500 text-sm mt-1">{errors.parentContact.message}</p>
                        )}
                    </div>

                    {/* Vehicle Type */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Vehicle Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("vehicleType", { required: "Vehicle type is required" })}
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.vehicleType ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="bicycle">Bicycle</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="scooter">Scooter</option>
                            <option value="walking">Walking</option>
                        </select>
                        {errors.vehicleType && (
                            <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
                        )}
                    </div>
                </div>

                {/* Conditional Vehicle Registration Field */}
                {vehicleType && vehicleType !== "bicycle" && vehicleType !== "walking" && (
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Vehicle Registration Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("vehicleRegNo", {
                                required: "Vehicle registration number is required",
                                pattern: {
                                    value: /^[A-Z]{2,3}\s?\d{1,4}[A-Z]{0,2}$/i,
                                    message: "Invalid registration number format"
                                }
                            })}
                            type="text"
                            placeholder="e.g., DHAKA METRO KA-1234"
                            className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.vehicleRegNo ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                        />
                        {errors.vehicleRegNo && (
                            <p className="text-red-500 text-sm mt-1">{errors.vehicleRegNo.message}</p>
                        )}
                    </div>
                )}

                {/* Warehouse Selection */}
                <div>
                    <label className="block text-gray-700 mb-1">
                        Preferred Warehouse <span className="text-red-500">*</span>
                    </label>
                    <select
                        {...register("warehouse", {
                            required: "Warehouse selection is required",
                            onChange: (e) => setSelectedWarehouse(e.target.value)
                        })}
                        className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${errors.warehouse ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                            }`}
                        value={selectedWarehouse}
                    >
                        <option value="">Select warehouse</option>
                        {filteredWarehouses.map((warehouse, index) => (
                            <option key={index} value={warehouse.city}>
                                {warehouse.city} - {warehouse.district}
                            </option>
                        ))}
                    </select>
                    {errors.warehouse && (
                        <p className="text-red-500 text-sm mt-1">{errors.warehouse.message}</p>
                    )}
                </div>

                {/* Areas to Ride */}
                {selectedWarehouse && (
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Preferred Areas to Ride <span className="text-red-500">*</span>
                            <span className="text-sm text-gray-500 ml-2">(Select at least one area)</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {coveredAreas.map((area, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        {...register("areasToRide", {
                                            required: "Please select at least one area"
                                        })}
                                        type="checkbox"
                                        value={area}
                                        id={`area-${index}`}
                                        className="mr-2 h-5 w-5"
                                    />
                                    <label htmlFor={`area-${index}`} className="text-gray-700 cursor-pointer">
                                        {area}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.areasToRide && (
                            <p className="text-red-500 text-sm mt-1">{errors.areasToRide.message}</p>
                        )}
                    </div>
                )}

                {/* Terms and Conditions */}
                <div className="mt-6">
                    <div className="flex items-start">
                        <input
                            {...register("terms", {
                                required: "You must accept the terms and conditions"
                            })}
                            type="checkbox"
                            id="terms"
                            className="mt-1 mr-2 h-5 w-5"
                        />
                        <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                            I hereby declare that all information provided is true and accurate.
                            I agree to follow all company policies and procedures, and understand
                            that any false information may result in termination of my application
                            or employment.
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        "Submit Application"
                    )}
                </button>
            </form>
        </div>
    );
}

export default RiderForm;