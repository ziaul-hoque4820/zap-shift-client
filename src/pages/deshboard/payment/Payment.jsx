import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutFrom from './CheckoutFrom'
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

function Payment() {

    const { id } = useParams();
    console.log(id);
    

    return (
        <Elements stripe={stripePromise}>
            <CheckoutFrom parcelId={id} />
        </Elements>
    )
}

export default Payment