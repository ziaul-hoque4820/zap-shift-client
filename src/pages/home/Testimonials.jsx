import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import testimonials from "../../data/reviews.json";

const Testimonials = () => {
    return (
        <section className="w-full py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What Our Customers Say
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Real feedback from people who trust our delivery service
                    </p>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    loop={true}
                    grabCursor={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1.2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
                                {/* Review */}
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    “{item.review}”
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <img
                                        src={item.user_photoURL}
                                        alt={item.userName}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />

                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">
                                            {item.userName}
                                        </h4>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                                            <span className="font-medium text-gray-800">
                                                {item.ratings}
                                            </span>
                                            <span>/ 5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
