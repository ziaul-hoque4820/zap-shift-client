import React from 'react'
import Banner from './Banner'
import Services from './Services'
import ClientLogoMarquee from './ClientLogoMarquee'
import HowItWorks from './HowItWorks'
import FeatureSection from './FeatureSection'

function Home() {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <Services />
            <ClientLogoMarquee />
            <FeatureSection />
        </div>
    )
}

export default Home