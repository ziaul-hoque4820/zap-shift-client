import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

function CheckoutFrom({ parcelId }) {
    const stripe = useStripe();
    const element = useElements();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    const amount = parcelInfo?.cost || 0;

    const cardStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                    color: "#a0aec0",
                },
                fontFamily: "Montserrat, sans-serif",
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !element) return;
        if (!amount) {
            setError("Invalid amount");
            return;
        }

        setProcessing(true);
        setError("");

        const card = element.getElement(CardElement);
        if (!card) return;

        try {
            // 1️⃣ Step: Create Payment Method
            const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (methodError) {
                setError(methodError.message);
                setProcessing(false);
                return;
            }

            // 2️⃣ Step: Get Client Secret From Backend
            const res = await axiosSecure.post('/create-payment-intent', {
                amount,
                parcelId
            });

            const clientSecret = res.data.clientSecret;

            // 3️⃣ Step: Confirm Payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element.getElement(CardElement),
                },
            });

            if (confirmError) {
                setError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                Swal.fire({
                    title: "Payment Successful!",
                    text: `Your payment of ${amount} Tk is complete.`,
                    icon: "success",
                    confirmButtonColor: "#84cc16",
                });
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setProcessing(false);
        }
    };

    if (isPending) {
        return (
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                    <div
                        key={n}
                        className="animate-pulse p-6 rounded-xl bg-white shadow-md border"
                    >
                        <div className="h-6 bg-gray-200 mb-4 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-2 rounded"></div>
                        <div className="h-4 bg-gray-200 mb-5 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        )
    }

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

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className="w-full py-3 bg-[#CAEB66] hover:bg-[#b2d15d] hover:text-white text-heading 
                        font-semibold rounded-lg shadow-md transition-all transform hover:scale-105"
                    >
                        {processing ? "Processing…" : `Pay ${amount} Tk`}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CheckoutFrom;
