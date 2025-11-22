import React from 'react';
import PriceCalculator from './PriceCalculator';

function Price() {
    return (
        <div className="bg-gray-100 flex items-center justify-center px-4 lg:py-10">
            <div className="max-w-6xl w-full bg-white rounded-sm shadow-lg p-10">

                {/* Header */}
                <h1 className="text-4xl font-bold text-[#0A3D3F] mb-3 text-center">
                    Pricing Calculator
                </h1>

                <p className="text-gray-600 leading-relaxed mb-10 text-center max-w-3xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <hr className="my-8" />

                <PriceCalculator />
            </div>
        </div>
    );
}

export default Price;
