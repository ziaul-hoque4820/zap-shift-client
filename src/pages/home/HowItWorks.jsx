import React from 'react';
import bookImage from '../../assets/booking.png';
import cashImage from '../../assets/cash-on-delivery.png';
import deliveryImage from '../../assets/freight-delivery.png';
import bookingSMEImage from '../../assets/hub.png';

const HowItWorks = () => {
    const features = [
        {
            image: bookImage,
            title: "Booking Pick & Drop",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: cashImage,
            title: "Cash On Delivery",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: deliveryImage,
            title: "Delivery Hub",
            description: "From personal packages to business shipments — we deliver on time, every time."
        },
        {
            image: bookingSMEImage,
            title: "Booking SME & Corporate",
            description: "From personal packages to business shipments — we deliver on time, every time."
        }
    ];

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it Works</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <img src={feature.image} className="w-12 h-12" alt="icons" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;