import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../../assets/delivery_man-1.png";
import banner2 from "../../assets/delivery_man-2.png";
import banner3 from "../../assets/delivery_man-3.png";
import bgImage from "../../assets/banner-bg.jpg";

const banners = [
    {
        title: "We Make Sure Your Parcel Arrives On Time – No Fuss.",
        description:
            "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
        image: banner1,
    },
    {
        title: "Fastest Delivery & Easy Pickup",
        description:
            "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
        image: banner2,
    },
    {
        title: "Delivery in 30 Minutes at your doorstep",
        description:
            "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
        image: banner3,
    },
];

export default function Banner() {
    return (
        <section
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000 }}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="container mx-auto"
                >
                    {banners.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-20 gap-10 text-white">

                                {/* Left Content */}
                                <div className="md:w-1/2 space-y-5">
                                    <div className="w-96">
                                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                        {item.title}
                                    </h1>
                                    <p className="text-gray-500 text-lg mt-3">
                                        {item.description}
                                    </p>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="md:w-1/2 flex justify-center">
                                    <img
                                        src={item.image}
                                        alt="Banner"
                                        className="max-w-[500px] w-full"
                                    />
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
