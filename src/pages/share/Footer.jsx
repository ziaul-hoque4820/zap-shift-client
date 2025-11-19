import React from 'react'
import { BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-12 px-6 md:px-16 mt-10">
            <div className="max-w-5xl mx-auto text-center">

                {/* Logo */}
                <div className="mb-6 flex justify-center items-center gap-2">
                    <Link to={'/'} className="flex items-center gap-2 py-3">
                        <img className="w-6 h-6 bg-lime-400 rounded-sm rotate-45" src={Logo} alt="logo" />
                        <span className="text-3xl font-semibold text-white">ZapShift</span>
                    </Link>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                <hr className="border-gray-700 mb-6" />

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base mb-6">
                    <Link to={'/services'} className="hover:text-white transition">Services</Link>
                    <Link to={'/coverage'} className="hover:text-white transition">Coverage</Link>
                    <Link to={'/about'} className="hover:text-white transition">About Us</Link>
                    <Link to={'/pricing'} className="hover:text-white transition">Pricing</Link>
                    <Link to={'/blog'} className="hover:text-white transition">Blog</Link>
                    <Link to={'/contact'} className="hover:text-white transition">Contact</Link>
                </div>

                <hr className="border-gray-700 mb-6" />

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 text-xl">
                    <Link to={'/'} className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition">
                        <BsLinkedin />
                    </Link>
                    <Link to={'/'} className="bg-white text-black p-2 rounded-full hover:scale-110 transition">
                        <BsTwitterX />
                    </Link>
                    <Link to={'/'} className="bg-white text-blue-500 p-2 rounded-full hover:scale-110 transition">
                        <FaFacebookF />
                    </Link>
                    <Link to={'/'} className="bg-white text-red-600 p-2 rounded-full hover:scale-110 transition">
                        <FaYoutube />
                    </Link>
                </div>

            </div>
        </footer>
    )
}

export default Footer