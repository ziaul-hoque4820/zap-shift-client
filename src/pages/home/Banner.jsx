import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from "../../assets/banner/banner1.png";
import bannerImg2 from "../../assets/banner/banner2.png";
import bannerImg3 from "../../assets/banner/banner3.png";

function Banner() {
    const slides = [
        {
            image: bannerImg1,
            alt: "First banner image",
            title: "Welcome to ZapShift",
            subtitle: "Fast, Reliable, and Secure",
            ctaText: "Get Started",
            ctaLink: "/signup",
        },
        {
            image: bannerImg2,
            alt: "Second banner image",
            title: "Our Coverage Area",
            subtitle: "Serving you wherever you are",
            ctaText: "See Coverage",
            ctaLink: "/coverage",
        },
        {
            image: bannerImg3,
            alt: "Third banner image",
            title: "Affordable Pricing",
            subtitle: "Plans for every need",
            ctaText: "View Plans",
            ctaLink: "/pricing",
        },
    ];

    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={5000}
            transitionTime={800}
            stopOnHover={true}
            useKeyboardArrows={true}
            dynamicHeight={false}
            ariaLabel="Homepage Banner Carousel"
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px] bg-no-repeat bg-cover bg-left"
                    style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
            ))}
        </Carousel>
    );
}

export default Banner;
