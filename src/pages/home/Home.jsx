import React from 'react'
import Banner from './Banner'
import Services from './Services'
import ClientLogoMarquee from './ClientLogoMarquee'

function Home() {
    return (
        <div>
            <Banner />
            <Services />
            <ClientLogoMarquee />
        </div>
    )
}

export default Home