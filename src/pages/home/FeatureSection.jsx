import React from 'react';
import Icon1 from '../../assets/live-tracking.png'
import Icon2 from '../../assets/tiny-deliveryman.png'
import Icon3 from '../../assets/safe-delivery.png'

const FeatureSection = () => {
    const features = [
        {
            icon: Icon1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipments journey and get instant status updates for complete peace of mind.",
        },
        {
            icon: Icon2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        },
        {
            icon: Icon3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        }
    ];

    return (
        <section className="w-full bg-[#f3f6f8] py-10 md:py-15 px-4 md:px-8 lg:px-20">
            <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
                <div className="border-t-[2px] border-dashed border-[#03373D] mb-5 md:mb-12"></div>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100"
                    >
                        {/* Icon */}
                        <div className="min-w-[120px] flex justify-center md:justify-start">
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-32 h-32 object-contain"
                            />
                        </div>

                        {/* middle border  */}
                        {/* Vertical line */}
                        <div className="hidden md:block border-l-2 border-dashed border-[#03373D] h-32 mx-5"></div>

                        {/* Horizontal line */}
                        <div className="block md:hidden border-t-[2px] border-dashed border-[#03373D] w-full my-2"></div>


                        {/* Text */}
                        <div className="flex-1 space-y-2 md:space-y-3">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="border-t-[2px] border-dashed border-[#03373D] mt-5 mt:mb-12"></div>
            </div>
        </section>
    );
};

export default FeatureSection;