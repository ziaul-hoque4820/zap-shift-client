import React from 'react';
import PriceCalculator from './PriceCalculator';
import { useNavigate } from 'react-router-dom';

function Price() {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 flex items-center justify-center px-4 py-5">
            <div className="max-w-6xl w-full bg-white rounded-sm shadow-lg lg:p-10 md:p-5">

                {/* Header */}
                <h1 className="text-4xl font-bold text-[#0A3D3F] mb-3 text-center mt-3 px-5">
                    Pricing Calculator
                </h1>

                <p className="text-gray-600 leading-relaxed mb-10 px-5 text-center max-w-3xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <hr className="my-8" />

                <PriceCalculator />

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-[#0A3D3F] hover:bg-[#084345] text-white
                                   rounded-md shadow-md transition-all duration-300 cursor-pointer"
                    >
                        ⬅ Go Back
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Price;
