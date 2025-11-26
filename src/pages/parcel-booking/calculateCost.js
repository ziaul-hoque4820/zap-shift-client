export default function calculateCost(data) {

    const weight = Number(data.parcelWeight) || 0;
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let baseCost = 0;
    let extraCost = 0;

    // Base cost based on parcel type & district
    if (data.parcelType === "Document") {
        baseCost = isSameDistrict ? 80 : 120;
    } else {
        baseCost = isSameDistrict ? 150 : 200;
    }

    // Extra weight cost (applies to BOTH document & non-document)
    if (weight > 3) {
        const extraKg = weight - 3;
        extraCost = extraKg * 40;
    }

    const totalCost = baseCost + extraCost;

    const breakdown =
        `
        Parcel Type: ${data.parcelType}<br/>
        Weight: ${weight} kg<br/>
        Base Cost: ৳${baseCost}<br/>
        ${extraCost > 0 ? `Extra Weight Cost (৳40 per kg): ৳${extraCost}<br/>` : ""}
        Total Cost: ৳${totalCost}
    `;

    return { weight, baseCost, extraCost, totalCost, breakdown, isSameDistrict };
}
