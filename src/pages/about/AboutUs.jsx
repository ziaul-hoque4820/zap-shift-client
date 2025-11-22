import React, { useState } from "react";

const TABS = [
    {
        id: "story",
        label: "Story",
        content: `
We started with a simple promise — to make parcel delivery fast, reliable, and stress-free.
Over the years, our dedication to real-time tracking, efficient logistics, and customer-first
service has made us a trusted partner for thousands. Whether it's a personal gift or a
time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
`.trim(),
    },
    {
        id: "mission",
        label: "Mission",
        content: `
Our mission is to simplify logistics so people and businesses can focus on what matters most.
We continuously invest in smarter routes, better tracking, and friendly support to make delivery
hassle-free for customers across regions.
`.trim(),
    },
    {
        id: "success",
        label: "Success",
        content: `
Years of steady growth and thousands of delivered parcels are a testament to our approach:
clear communication, rapid response, and reliable fulfillment. We celebrate every successful
delivery and every lesson that helped us improve.
`.trim(),
    },
    {
        id: "others",
        label: "Others",
        content: `
Our team is made up of logistics experts, engineers, and customer champions — all working
together to make delivery simpler. We also partner with local hubs and couriers to reach
more places, faster.
`.trim(),
    },
];

export default function AboutUs() {
    const [active, setActive] = useState("story");
    const activeTab = TABS.find((t) => t.id === active) || TABS[0];

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-[#0A3D3F]">
                        About Us
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                    <div className="mt-6 border-t border-gray-200" />
                </div>

                {/* Tabs + Content Layout */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Tabs */}
                    <nav className="md:col-span-1">
                        <ul className="flex md:flex-col gap-3 overflow-x-auto pb-2">
                            {TABS.map((tab) => {
                                const isActive = tab.id === active;

                                return (
                                    <li key={tab.id} className="flex-1 md:flex-none">
                                        <button
                                            onClick={() => setActive(tab.id)}
                                            className={`w-full px-4 py-3 rounded-lg transition text-left whitespace-nowrap
                                            ${isActive
                                                    ? "bg-[#F4FBEB] border border-[#8FA748] text-[#0A3D3F] font-semibold"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Content */}
                    <div className="md:col-span-3">
                        <div className="bg-white p-2 sm:p-4 md:p-0">
                            <h3 className="text-xl font-semibold text-[#0A3D3F]">
                                {activeTab.label}
                            </h3>

                            {activeTab.content
                                .split("\n\n")
                                .map((para, idx) => (
                                    <p key={idx} className="mt-4 text-gray-700 leading-relaxed">
                                        {para}
                                    </p>
                                ))}

                            {/* Extra repeated story text (as screenshot reference) */}
                            {activeTab.id === "story" && (
                                <>
                                    <p className="mt-4 text-gray-700 leading-relaxed">
                                        We started with a simple promise — to make parcel delivery fast, reliable,
                                        and stress-free. Over the years, our commitment to real-time tracking and
                                        efficient logistics has made us a trusted partner for thousands.
                                    </p>

                                    <p className="mt-4 text-gray-700 leading-relaxed">
                                        We started with a simple promise — to make parcel delivery fast, reliable,
                                        and stress-free. Over the years, our continuous improvement has helped us
                                        deliver on time, every time.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
