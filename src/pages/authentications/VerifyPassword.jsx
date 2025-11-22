import React, { useState } from "react";

function VerifyPassword() {
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto move to next box
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto py-8 mt-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-center mb-2">Enter Code</h2>

            {/* Short paragraph */}
            <p className="text-gray-600 text-center mb-6">
                Enter 6 digit code that we sent in your email address
            </p>

            {/* OTP Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        maxLength={1}
                        className="flex-shrink-0 text-center font-semibold border border-gray-300 rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-9 h-12 text-base sm:w-9 sm:h-12 sm:text-lg md:w-9 md:h-12 md:text-lg lg:w-12 lg:h-14 lg:text-xl"
                    />
                ))}
            </div>

            {/* Submit button */}
            <button
                className="w-full py-3 bg-[#CAEB66] hover:bg-[#b0cf52] text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                Verify
            </button>

            {/* helper row: resend + small note */}
            <div className="mt-4 text-center text-sm text-gray-500">
                Didn't receive code?{" "}
                <button className="text-[#b0cf52] hover:text-[#86a039] font-medium">
                    Resend
                </button>
            </div>
        </div>
    );
}

export default VerifyPassword;
