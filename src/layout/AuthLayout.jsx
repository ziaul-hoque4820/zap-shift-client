import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../assets/logo.png'
import lideLogo from '../assets/authImage.png'

function AuthLayout() {
    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row'>

                {/* Left Side - Form */}
                <div className='md:w-1/2 p-8 md:p-12'>
                    <Link to={'/'} className="flex items-center gap-2 py-3">
                        <img className="w-6 h-6 bg-lime-600 rounded-sm rotate-45" src={Logo} alt="logo" />
                        <span className="text-2xl font-semibold text-gray-800 font-heading">ZapShift</span>
                    </Link>
                    <Outlet />
                </div>

                {/*  Right Side - Image   */}
                <div className='md:w-1/2 flex items-center bg-[#FAFDF0] justify-center p-12 '>
                    <div className='text-center'>
                        <img
                            src={lideLogo}
                            alt="Login Illustration"
                            className='w-full object-cover rounded-lg'
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthLayout