import React from 'react'
import riderLogo from '../../assets/agent-pending.png';
import RiderForm from './RiderForm';

function RiderRegister() {

    return (
        <div className='bg-gray-200 flex items-center justify-center lg:py-8'>
            <div className='max-w-6xl w-full bg-white rounded-sm shadow-xl overflow-hidden flex flex-col md:flex-row'>

                {/* Left Side - Form */}
                <RiderForm />

                {/*  Right Side - Image   */}
                <div className='hidden md:flex md:w-1/2 items-center bg-[#FAFDF0] justify-center p-12'>
                    <div className='text-center'>
                        <img
                            src={riderLogo}
                            alt="Login Illustration"
                            className='w-full object-cover rounded-lg'
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RiderRegister