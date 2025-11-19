import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png'

function Navbar() {
    const [open, setOpen] = useState(false);


    return (
        <nav className="w-full py-2 bg-white shadow-sm px-4 lg:px-10 flex items-center justify-between relative">
            {/* Logo */}
            <Link to={'/'} className="flex items-center gap-2 py-3">
                <img className="w-6 h-6 bg-lime-400 rounded-sm rotate-45" src={Logo} alt="logo" />
                <span className="text-2xl font-semibold text-gray-800 font-heading">ZapShift</span>
            </Link>


            {/* Menu for Desktop */}
            <ul className="hidden lg:flex items-center gap-8 text-gray-600 text-sm">
                <li><Link to="/services" className="hover:text-lime-500 text-[16px] font-medium">Services</Link></li>
                <li><Link to="/coverage" className="hover:text-lime-500 text-[16px] font-medium">Coverage</Link></li>
                <li><Link to="/about" className="hover:text-lime-500 text-[16px] font-medium">About Us</Link></li>
                <li><Link to="/pricing" className="hover:text-lime-500 text-[16px] font-medium">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-lime-500 text-[16px] font-medium">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-lime-500 text-[16px] font-medium">Contact</Link></li>
            </ul>


            {/* Buttons */}
            <div className="hidden lg:flex items-center gap-3">
                <button className="btn btn-outline btn-md rounded-sm text-[16px]">Sign In</button>
                <button className="btn bg-[#CAEB66] hover:bg-lime-400 text-[16px] text-gray-900 btn-md rounded-sm">Sign Up</button>
                <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-black/70">
                    <span className="text-white text-lg">↗</span>
                </div>
            </div>


            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
            </button>


            {/* Mobile Dropdown */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 lg:hidden z-50">
                    <ul className="flex flex-col gap-4 text-gray-700">
                        <li><Link to="/services" className="hover:text-lime-500 text-[16px] font-medium">Services</Link></li>
                        <li><Link to="/coverage" className="hover:text-lime-500 text-[16px] font-medium">Coverage</Link></li>
                        <li><Link to="/about" className="hover:text-lime-500 text-[16px] font-medium">About Us</Link></li>
                        <li><Link to="/pricing" className="hover:text-lime-500 text-[16px] font-medium">Pricing</Link></li>
                        <li><Link to="/blog" className="hover:text-lime-500 text-[16px] font-medium">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-lime-500 text-[16px] font-medium">Contact</Link></li>
                    </ul>


                    <div className="mt-6 flex flex-col gap-3">
                        <button className="btn btn-outline btn-md text-[16px] w-full rounded-sm">Sign In</button>
                        <button className="btn bg-[#CAEB66] text-gray-900 text-[16px] btn-md w-full rounded-sm">Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar