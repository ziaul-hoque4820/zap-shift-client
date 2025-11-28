import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutFrom from './CheckoutFrom'
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

function Payment() {

    const { id } = useParams();

    return (
        <Elements stripe={stripePromise}>
            <CheckoutFrom />
        </Elements>
    )
}

export default Payment