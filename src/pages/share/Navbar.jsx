// src/components/layouts/Navbar.jsx
import React, { useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';
import useAuth from "../../hooks/useAuth";
import userAvater from '../../assets/user-avater.jpg'

function Navbar() {
    const [open, setOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const mobileRef = useRef(null);
    const burgerRef = useRef(null);
    const avatarRef = useRef(null);

    const { user, signOutUser } = useAuth();
    const isLoggedIn = !!user;

    const userPhoto = user?.photoURL || userAvater;
    const userName = user?.displayName || "User";
    const userEmail = user?.email || "";

    // Close mobile dropdown and avatar dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (open && mobileRef.current && !mobileRef.current.contains(e.target) && burgerRef.current && !burgerRef.current.contains(e.target)) {
                setOpen(false);
            }
            if (avatarMenuOpen && avatarRef.current && !avatarRef.current.contains(e.target)) {
                setAvatarMenuOpen(false);
            }
        }

        function handleEsc(e) {
            if (e.key === "Escape") {
                setOpen(false);
                setAvatarMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open, avatarMenuOpen]);

    // Ensure menu closes when navigating via links (mobile)
    const handleMobileLinkClick = () => {
        setOpen(false);
    };

    const handleSignOut = async () => {
        // close UI
        setOpen(false);
        setAvatarMenuOpen(false);
        try {
            if (signOutUser) {
                await signOutUser();
                console.log("signed out user");
            } else {
                console.warn("signOutUser not provided by AuthContext");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="w-full py-2 bg-white shadow-sm px-4 lg:px-10 flex items-center justify-between relative z-50">
            {/* Logo */}
            <Link to={'/'} className="flex items-center gap-2 py-3">
                <img className="w-6 h-6 bg-lime-600 rounded-sm rotate-45" src={Logo} alt="logo" />
                <span className="text-2xl font-semibold text-gray-800 font-heading">ZapShift</span>
            </Link>

            {/* Menu for Desktop */}
            <ul className="hidden lg:flex items-center gap-8 text-gray-600 text-sm">
                <li><Link to="/services" className="hover:text-lime-500 text-[16px] font-medium">Services</Link></li>
                <li><Link to="/coverage" className="hover:text-lime-500 text-[16px] font-medium">Coverage</Link></li>
                <li><Link to="/about" className="hover:text-lime-500 text-[16px] font-medium">About Us</Link></li>
                <li><Link to="/pricing" className="hover:text-lime-500 text-[16px] font-medium">Pricing</Link></li>
                <li><Link to="/riderRegister" className="hover:text-lime-500 text-[16px] font-medium">Be a Rider</Link></li>
                <li><Link to="/contact" className="hover:text-lime-500 text-[16px] font-medium">Contact</Link></li>
            </ul>

            {/* Buttons / Avatar */}
            <div className="hidden lg:flex items-center gap-3">
                {!isLoggedIn && (
                    <>
                        <Link to={'/login'} className="btn btn-outline btn-md rounded-sm text-[16px]">Log In</Link>
                        <Link to={'/register'} className="btn bg-[#CAEB66] hover:bg-lime-400 text-[16px] text-gray-900 btn-md rounded-sm">Register</Link>
                        <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-black/70">
                            <span className="text-white text-lg">↗</span>
                        </div>
                    </>
                )}

                {isLoggedIn && (
                    <div className="relative" ref={avatarRef}>
                        <button
                            onClick={() => setAvatarMenuOpen(v => !v)}
                            aria-label="Open profile menu"
                            className="btn btn-ghost btn-circle avatar"
                            title={userName}
                        >
                            <div className="w-10 rounded-full overflow-hidden">
                                <img src={userPhoto} alt={userName} className="object-cover w-full h-full" />
                            </div>
                        </button>

                        {avatarMenuOpen && (
                            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 mt-2 p-2 shadow z-50 absolute right-0">
                                <li><Link to={'/my-posted-jobs'} onClick={() => setAvatarMenuOpen(false)}>Dashboard</Link></li>
                                <li><Link to={'/addjob'} onClick={() => setAvatarMenuOpen(false)}>Add New Job</Link></li>
                                <li><button onClick={handleSignOut} className="w-full text-left text-red-600">Logout</button></li>
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Button (animated burger) */}
            <button
                ref={burgerRef}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none"
                onClick={() => setOpen(v => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {/* Animated hamburger using spans */}
                <div className="relative w-6 h-6">
                    <span className={`block absolute left-0 top-0 w-6 h-0.5 bg-current transform transition duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
                    <span className={`block absolute left-0 top-2.5 w-6 h-0.5 bg-current transform transition duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
                    <span className={`block absolute left-0 top-5 w-6 h-0.5 bg-current transform transition duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
                </div>
            </button>

            {/* Mobile Dropdown */}
            {open && (
                <>
                    {/* Backdrop to close on outside click */}
                    <div className="fixed inset-0 z-40 lg:hidden" aria-hidden onClick={() => setOpen(false)} />
                    <div ref={mobileRef} className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 lg:hidden z-50">
                        <ul className="flex flex-col gap-4 text-gray-700">
                            <li><Link to="/services" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">Services</Link></li>
                            <li><Link to="/coverage" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">Coverage</Link></li>
                            <li><Link to="/about" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">About Us</Link></li>
                            <li><Link to="/pricing" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">Pricing</Link></li>
                            <li><Link to="/riderRegister" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">Be a Rider</Link></li>
                            <li><Link to="/contact" onClick={handleMobileLinkClick} className="hover:text-lime-500 text-[16px] font-medium">Contact</Link></li>
                        </ul>

                        <div className="mt-6 flex flex-col gap-3">
                            {!isLoggedIn && (
                                <>
                                    <Link to={'/login'} onClick={handleMobileLinkClick} className="btn btn-outline btn-md text-[16px] w-full rounded-sm">Log In</Link>
                                    <Link to={'/register'} onClick={handleMobileLinkClick} className="btn bg-[#CAEB66] text-gray-900 text-[16px] btn-md w-full rounded-sm">Register</Link>
                                </>
                            )}

                            {isLoggedIn && (
                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{userName}</p>
                                            <p className="text-sm text-gray-600">{userEmail}</p>
                                        </div>
                                    </div>

                                    <Link to={'/my-posted-jobs'} onClick={handleMobileLinkClick} className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">Dashboard</Link>
                                    <Link to={'/addjob'} onClick={handleMobileLinkClick} className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">Add New Job</Link>
                                    <button
                                        className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
                                        onClick={handleSignOut}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
