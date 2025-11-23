import React, { useState } from 'react';

const TrackConsignment = () => {
    const [trackingCode, setTrackingCode] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', trackingCode);
    };

    const trackingUpdates = [
        { date: 'Jun 02, 2025', time: '12:21 am', status: 'Assigned to rider.' },
        { date: 'Jun 02, 2025', time: '12:21 am', status: 'Assigned to rider.' },
        { date: 'Jun 02, 2025', time: '12:21 am', status: 'Assigned to rider.' },
        { date: 'Jun 02, 2025', time: '12:21 am', status: 'Assigned to rider.' },
        { date: 'Jun 02, 2025', time: '12:21 am', status: 'Assigned to rider.' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-lg shadow-sm my-5">
            {/* Header Section */}
            <div className="text-start mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Consignment</h1>
                <p className="text-gray-600">Now you can easily track your consignment</p>
            </div>

            {/* Search Section */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search tracking code here"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#CAEB66] hover:bg-[#b0cf52] text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-700"
                    >
                        Search
                    </button>
                </form>
            </div>

            <hr className="border-gray-300 mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Details Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Product details</h2>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                            <div className="text-gray-700 mb-2">
                                <span className="font-medium">May 31, 2025 Q3.41 pm</span>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Id :</span> 148976175</p>
                                <p><span className="font-medium">Invoice :</span> 24227</p>
                                <p><span className="font-medium">Tracking Code :</span> OUWJVEXWZ9823Q7HSH55YV7</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Name :</span> Zahid Hossain</p>
                            <p><span className="font-medium">Address :</span> Madrasha Road, Chandpur sadar, Chandpur, Chandpur, 3600, BD</p>
                            <p><span className="font-medium">Phone Number :</span> 01780448866</p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <p><span className="font-medium">Approved :</span> N/A</p>
                                    <p><span className="font-medium">Weight :</span> KG</p>
                                </div>
                                <div>
                                    <p><span className="font-medium">COD:</span> b 0</p>
                                    <span className="text-red-500 font-medium">Pending</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking Updates Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Tracking Updates</h2>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-4">
                            {trackingUpdates.map((update, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        {index !== trackingUpdates.length - 1 && (
                                            <div className="w-0.5 h-8 bg-green-500 mt-1"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-gray-700">{update.date}</span>
                                            <span className="text-green-500">✓</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{update.status}</p>
                                        <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackConsignment;