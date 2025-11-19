import React from "react";
import { FaHandHoldingUsd, FaMapMarkedAlt } from "react-icons/fa";
import { FiTruck, FiLayers, FiRepeat } from "react-icons/fi";
import { MdCorporateFare } from "react-icons/md";

function Services() {
    const servicesInfo = [
        {
            icon: <FiTruck size={38} />,
            heading: "Express & Standard Delivery",
            description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours."
        },
        {
            icon: <FaMapMarkedAlt size={38} />,
            heading: "Nationwide Delivery",
            description: "Home delivery in every district, ensuring products reach customers within 48–72 hours."
        },
        {
            icon: <FiLayers size={38} />,
            heading: "Fulfillment Solution",
            description: "Inventory management, order processing, packaging & after-sales support."
        },
        {
            icon: <FaHandHoldingUsd size={38} />,
            heading: "Cash on Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with product safety."
        },
        {
            icon: <MdCorporateFare size={38} />,
            heading: "Corporate Service",
            description: "Customized corporate logistics including warehouse and inventory management."
        },
        {
            icon: <FiRepeat size={38} />,
            heading: "Parcel Return",
            description: "Reverse logistics support allowing customers to return or exchange products."
        },
    ];

    return (
        <section className="py-16 px-4">
            {/* Container (centers the design & limits width) */}
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesInfo.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white hover:shadow-xl hover:bg-[#CAEB66] transition-all p-6 rounded-lg border border-gray-100"
                        >
                            <div className="text-lime-600 mb-4 flex justify-center">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-semibold mb-2">{item.heading}</h4>
                            <p className="text- text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
