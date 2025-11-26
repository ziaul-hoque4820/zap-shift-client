import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import warehouse from "../../data/warehouses.json";

const getDistrictList = () => {
    return [...new Set(warehouse.map(w => w.district))];
};

// Utility: Get areas by district
const getAreasByDistrict = (district) => {
    if (!district) return [];
    const entries = warehouse.filter(w => w.district === district);

    return [...new Set(entries.flatMap(w => [w.city, ...(w.covered_area || [])]))];
};

// Calculate delivery cost
const calculateCost = (data) => {
    const weight = Number(data.weight || 0);
    const sameDistrict = data.senderDistrict === data.receiverDistrict;

    let baseCost = 0;

    if (data.parcelType === "Document") {
        baseCost = sameDistrict ? 80 : 120;
    } else {
        baseCost = sameDistrict ? 150 : 200;
    }

    // Base weight limit = 3 KG
    const baseWeightLimit = 3;
    const extraPerKg = 40;

    let extraWeightKg = 0;
    let extraCost = 0;

    if (weight > baseWeightLimit) {
        extraWeightKg = weight - baseWeightLimit;
        extraCost = extraWeightKg * extraPerKg;
    }

    const totalCost = baseCost + extraCost;

    return {
        sameDistrict,
        baseCost,
        extraCost,
        totalCost,
        weight,

        //👇 newly added details
        baseWeightLimit,
        extraWeightStart: baseWeightLimit,
        extraWeightKg,
        extraPerKg,

        // Existing placeholders
        petExtraCost: 0,
        deliverySpeed: null,
        codCharge: 0,
        vat: 0
    };
};


// ✔ ADD THIS — reusable display row component
const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center gap-3 
                    text-sm sm:text-base md:text-lg 
                    flex-wrap sm:flex-nowrap">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{value}</span>
    </div>
);


function PriceCalculator() {
    const { register, watch, handleSubmit, reset } = useForm();
    const [costData, setCostData] = useState(null);

    const senderDistrict = watch("senderDistrict");
    const receiverDistrict = watch("receiverDistrict");

    const senderAreas = useMemo(() => getAreasByDistrict(senderDistrict), [senderDistrict]);
    const receiverAreas = useMemo(() => getAreasByDistrict(receiverDistrict), [receiverDistrict]);

    const districts = useMemo(() => getDistrictList(), []);

    const onSubmit = (data) => {
        const cost = calculateCost(data);
        setCostData(cost);
    };

    return (
        <div className="mt-14">

            <h3 className="text-3xl font-bold text-center text-[#0A3D3F] mb-10">
                Delivery Cost Estimator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT: FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow">

                    {/* Parcel Type */}
                    <div>
                        <label className="font-semibold text-gray-700">Parcel Type</label>
                        <select
                            {...register("parcelType", { required: true })}
                            className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                        >
                            <option value="">Select Parcel Type</option>
                            <option value="Document">Document</option>
                            <option value="Non-document">Non-document</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="font-semibold text-gray-700">Weight (KG)</label>
                        <input
                            type="number"
                            step="0.1"
                            {...register("weight", { required: true })}
                            className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                            placeholder="Enter weight"
                        />
                    </div>

                    {/* Sender District */}
                    <div>
                        <label className="font-semibold text-gray-700">Sender District</label>
                        <select
                            {...register("senderDistrict", { required: true })}
                            className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                        >
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>

                    {/* Sender Area */}
                    {senderDistrict && (
                        <div>
                            <label className="font-semibold text-gray-700">Sender Area</label>
                            {senderAreas.length > 0 ? (
                                <select
                                    {...register("senderArea", { required: true })}
                                    className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                                >
                                    <option value="">Select Area</option>
                                    {senderAreas.map(a => <option key={a}>{a}</option>)}
                                </select>
                            ) : (
                                <p className="text-yellow-600 mt-1 text-sm">
                                    No service coverage for this district.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Receiver District */}
                    <div>
                        <label className="font-semibold text-gray-700">Receiver District</label>
                        <select
                            {...register("receiverDistrict", { required: true })}
                            className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                        >
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>

                    {/* Receiver Area */}
                    {receiverDistrict && (
                        <div>
                            <label className="font-semibold text-gray-700">Receiver Area</label>
                            {receiverAreas.length > 0 ? (
                                <select
                                    {...register("receiverArea", { required: true })}
                                    className="w-full border p-3 rounded-md mt-1 bg-gray-50"
                                >
                                    <option value="">Select Area</option>
                                    {receiverAreas.map(a => <option key={a}>{a}</option>)}
                                </select>
                            ) : (
                                <p className="text-yellow-600 mt-1 text-sm">
                                    No service coverage for this district.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => { reset(); setCostData(null); }}
                            className="px-6 py-3 border bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#CAEB66] hover:bg-[#b0cf52] rounded-md font-semibold text-gray-900"
                        >
                            Calculate Cost
                        </button>
                    </div>
                </form>

                {/* RIGHT — COST DISPLAY */}
                <div className="bg-[#FAFDF0] md:px-2 lg:p-8 rounded-xl shadow flex flex-col justify-center">

                    {!costData ? (
                        <p className="text-center text-gray-500 text-lg">
                            Fill the form to see estimated cost
                        </p>
                    ) : (
                        <div className="space-y-5 bg-white lg:p-6 px-4 py-5 rounded-md shadow-lg border border-gray-100">

                            {/* Total Cost */}
                            <div className="text-center">
                                <p className="text-5xl font-extrabold text-[#0A3D3F]">
                                    ৳ {costData.totalCost}
                                </p>
                                <p className="text-gray-500 mt-1 text-sm">Estimated Delivery Cost</p>
                            </div>

                            <div className="space-y-3 text-gray-700 
                text-base sm:text-lg md:text-xl 
                leading-relaxed">

                                <DetailRow label="Parcel Weight" value={`${costData.weight} kg`} />

                                <DetailRow
                                    label="Delivery Zone"
                                    value={costData.sameDistrict ? "Same District" : "Outside District"}
                                />

                                {/* Base Cost */}
                                <DetailRow
                                    label={`Base Cost (Up to ${costData.baseWeightLimit} KG)`}
                                    value={`৳${costData.baseCost}`}
                                />

                                {/* Extra Weight Info */}
                                {costData.extraWeightKg > 0 && (
                                    <>
                                        <DetailRow
                                            label="Extra Weight Starts From"
                                            value={`${costData.extraWeightStart} KG`}
                                        />

                                        <DetailRow
                                            label="Extra Weight"
                                            value={`${costData.extraWeightKg} KG`}
                                        />

                                        <DetailRow
                                            label="Extra Cost Per KG"
                                            value={`৳${costData.extraPerKg}`}
                                        />

                                        <DetailRow
                                            label="Extra Weight Cost"
                                            value={`৳${costData.extraCost}`}
                                        />
                                    </>
                                )}

                                <hr className="my-4" />

                                <p className="text-xl sm:text-2xl font-bold text-green-700 text-center">
                                    Total Payable: ৳{costData.totalCost}
                                </p>
                            </div>


                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default PriceCalculator;
