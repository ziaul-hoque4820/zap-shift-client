import React from "react";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

const Contact = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Contact <span className="text-orange-500">Zap-Shift</span>
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Need help with a delivery, emergency support, or general inquiries?
                        Our hubs are always ready to assist you.
                    </p>
                </div>

                {/* Emergency Section */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-red-600" size={28} />
                        <h2 className="text-2xl font-semibold text-red-600">
                            Emergency Contact
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Main Hub */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4">
                                Main Hub (24/7)
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <Phone size={18} /> +880 1700-000-111
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={18} /> mainhub@zapshift.com
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin size={18} /> Dhaka Central Hub
                                </p>
                            </div>
                        </div>

                        {/* Sub Hub */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-semibold mb-4">
                                Nearest Sub Hub
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex items-center gap-2">
                                    <Phone size={18} /> +880 1700-000-222
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={18} /> subhub@zapshift.com
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin size={18} /> Based on your delivery zone
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Info */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 mb-6">
                            For non-emergency issues, business inquiries, or feedback,
                            please send us a message. Our support team will respond shortly.
                        </p>

                        <div className="space-y-4 text-gray-700">
                            <p className="flex items-center gap-2">
                                <Phone size={18} /> Support: +880 1700-000-333
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail size={18} /> support@zapshift.com
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="bg-white rounded-2xl shadow-md p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Write your message..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            ></textarea>
                        </div>

                        <button
                            className="w-full bg-[#CAEB66] hover:bg-lime-400 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
