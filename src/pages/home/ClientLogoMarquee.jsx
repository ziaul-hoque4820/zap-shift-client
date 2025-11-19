import React from 'react';
import Marquee from "react-fast-marquee";
import casio from '../../assets/brands/casio.png';
import amazon from '../../assets/brands/amazon.png';
import moonstar from '../../assets/brands/moonstar.png';
import star from '../../assets/brands/star.png';
import randstad from '../../assets/brands/randstad.png';
import coca_cola from '../../assets/brands/coca-cola-logo.png';
import google_logo from '../../assets/brands/google_logo.png';
import start_people from '../../assets/brands/start_people.png';

function ClientLogoMarquee() {

    const logos = [casio, amazon, moonstar, star, randstad, coca_cola, google_logo, start_people];

    return (
        <section className="w-full py-4">
            {/* Heading */}
            <div className="max-w-5xl mx-auto text-center mb-5 px-4">
                <h2 className="text-3xl font-bold text-heading mb-2">
                    We've helped thousands of sales teams
                </h2>
                <p className="text-[#03373D] text-lg">
                    Trusted by global brands, startups, and enterprises worldwide.
                </p>
            </div>

            {/* Marquee */}
            <Marquee pauseOnHover={true} speed={50} gradient={false}>
                <div className="flex items-center gap-20 px-15">

                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-40 h-20 bg-white transition-all duration-300">
                            <img
                                src={logo}
                                alt="company-logo"
                                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                            />
                        </div>
                    ))}

                </div>
            </Marquee>
        </section>
    );
}

export default ClientLogoMarquee;
