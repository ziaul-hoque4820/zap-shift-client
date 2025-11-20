import React from "react";
import location from "../../assets/location-merchant.png";

function BeMerchant() {
    return (
        <div className="bg-[#03373D] bg-cover bg-no-repeat p-8 md:p-16 lg:p-20"
            style={{ backgroundImage: "url('/assets/be-a-merchant-bg.png')" }}
        >
            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center gap-10 lg:gap-20 hero-content mx-auto">

                {/* Left Content */}
                <div className="text-white max-w-xl text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>

                    <p className="py-6 text-gray-200 text-base md:text-lg">
                        We offer the lowest delivery charge with the highest value along
                        with 100% safety of your product. Pathao courier delivers your
                        parcels in every corner of Bangladesh right on time.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <button className="btn bg-white text-black font-semibold px-8 rounded-full">
                            Become A Merchant
                        </button>

                        <button className="btn border border-white text-white px-8 rounded-full btn-outline">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <img
                    src={location}
                    alt="Location"
                    className="w-full max-w-sm md:max-w-md object-contain"
                />
            </div>
        </div>
    );
}

export default BeMerchant;
