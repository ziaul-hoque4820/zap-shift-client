import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'

function CheckoutFrom() {
    const stripe = useStripe();
    const element = useElements();


    const cardStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                    color: "#a0aec0",
                },
                fontFamily: "Montserrat, sans-serif",
                padding: "10px",
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <div className="w-full max-w-lg mx-auto mt-10">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 p-8">

                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Complete Your Payment
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Card Information
                        </label>

                        <div className="border border-gray-300 rounded-lg p-3 focus-within:border-blue-500 transition">
                            <CardElement options={cardStyle} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe}
                        className="w-full py-3 bg-[#CAEB66] hover:bg-[#b2d15d] hover:text-white text-heading font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-800 cursor-pointer"
                    >
                        Pay Now
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CheckoutFrom