import React from 'react'
import errorIcon from '../../assets/error-pages.png';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='flex flex-col items-center justify-center text-center min-h-[80vh] space-y-5'>
            <img src={errorIcon} alt="rocket icon" />
            <h1 className='text-4xl font-bold to-gray-700'>{}</h1>

            <Link to="/" className='mt-6 px-6 py-3 bg-[#CAEB66] text-white rounded-md shadow-md hover:bg-lime-400 transition'>Go Home</Link>
        </div>
    )
}

export default Error