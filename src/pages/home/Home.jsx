import React from 'react'
import Banner from './Banner'
import Services from './Services'
import ClientLogoMarquee from './ClientLogoMarquee'
import HowItWorks from './HowItWorks'
import FeatureSection from './FeatureSection'
import Testimonials from './Testimonials'

function Home() {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <Services />
            <ClientLogoMarquee />
            <FeatureSection />
            <Testimonials />
        </div>
    )
}

export default Home