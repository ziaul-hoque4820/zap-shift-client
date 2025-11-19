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
        },
        {
            image: bannerImg2,
            alt: "Second banner image",
        },
        {
            image: bannerImg3,
            alt: "Third banner image",
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
