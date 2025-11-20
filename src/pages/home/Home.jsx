import React from 'react'
import Banner from './Banner'
import Services from './Services'
import ClientLogoMarquee from './ClientLogoMarquee'
import HowItWorks from './HowItWorks'

function Home() {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <Services />
            <ClientLogoMarquee />
        </div>
    )
}

export default Home