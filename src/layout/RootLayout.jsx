import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/share/Navbar'
import Footer from '../pages/share/Footer'

function RootLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout