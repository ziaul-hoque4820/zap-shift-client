import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function PaymentHistory() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });


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
        <div className="bg-white p-6">
            <h2 className="text-3xl font-bold mb-4">Payment History</h2>

            {payments.length === 0 ? (
                <p className="text-gray-600">No payment records found.</p>
            ) : (
                <div>
                    <table className="w-full text-left border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3">Parcel ID</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Payment Method</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment._id} className="border-b">
                                    <td className="p-3">{payment.parcelId}</td>
                                    <td className="p-3">{payment.amount} Tk</td>
                                    <td className="p-3">{new Date(payment.date).toLocaleString()}</td>
                                    <td className="p-3">{payment.payment_method}</td>
                                    <td className="p-3 text-green-600 font-semibold">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PaymentHistory;
