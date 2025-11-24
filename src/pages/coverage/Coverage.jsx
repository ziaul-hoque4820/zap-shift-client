import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import warehouse from "../../data/warehouses.json";

// Green marker (active)
const greenIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Red marker (inactive)
const redIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Fly animation
function FlyTo({ position }) {
    const map = useMap();
    if (position) {
        map.flyTo(position, 10, { duration: 1.5 });
    }
    return null;
}

const Coverage = () => {
    const [search, setSearch] = useState("");
    const [flyPos, setFlyPos] = useState(null);

    const handleSearch = () => {
        const match = warehouse.find(
            (item) => item.district.toLowerCase() === search.toLowerCase()
        );

        if (match) {
            setFlyPos([match.latitude, match.longitude]);
        } else {
            alert("District not found");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">

            {/* Title */}
            <h1 className="text-4xl font-bold text-[#053642] mb-8">
                We are available in 64 districts
            </h1>

            {/* Search */}
            <div className="flex items-center gap-3 bg-gray-200 shadow-md rounded-full px-5 py-3 w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Search district..."
                    className="flex-1 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    className="bg-[#C9E265] px-5 py-2 rounded-full font-medium hover:bg-[#b4d44f]"
                >
                    Search
                </button>
            </div>

            <hr className="my-10" />

            <h2 className="text-2xl font-semibold mb-6 text-[#053642]">
                We deliver almost all over Bangladesh
            </h2>

            {/* Map (bigger size) */}
            <div className="w-full h-[650px] rounded-xl overflow-hidden shadow-xl">
                <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <FlyTo position={flyPos} />

                    {warehouse.map((item, i) => (
                        <Marker
                            key={i}
                            position={[item.latitude, item.longitude]}
                            icon={item.status === "active" ? greenIcon : redIcon}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold">{item.district}</h3>
                                    <p>
                                        <b>City:</b> {item.city}
                                    </p>

                                    <p className="mt-2"><b>Covered Area:</b></p>
                                    <ul className="list-disc ml-4 text-sm">
                                        {item.covered_area.map((area, idx) => (
                                            <li key={idx}>{area}</li>
                                        ))}
                                    </ul>

                                    <p className="mt-2 text-green-600 font-semibold">
                                        {item.status === "active"
                                            ? "We are available here"
                                            : "Currently unavailable"}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
