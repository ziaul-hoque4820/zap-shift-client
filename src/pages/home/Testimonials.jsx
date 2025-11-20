import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import image1 from '../../assets/image-upload-icon.png';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function Testimonials() {
    const testimonials = [
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Awlad Hossin",
            role: "Senior Product Designer",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Rasel Ahamed",
            role: "CTO",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Nasir Uddin",
            role: "CEO",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Nasir Uddin",
            role: "CEO",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Nasir Uddin",
            role: "CEO",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Nasir Uddin",
            role: "CEO",
        },
        {
            image: image1,
            quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
            name: "Nasir Uddin",
            role: "CEO",
        },
    ];
    return (
        <div className="bg-gray-200 py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-[#03382E]">
                    What our customers are sayings
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <Swiper
                    modules={[Navigation, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    centeredSlides={true}
                    grabCursor={true}
                    slidesPerView={"auto"}
                    initialSlide={3} // Start from 4th item (index 3)
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        scale: 0.85,
                        modifier: 2,
                        slideShadows: false,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination'
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 50,
                                scale: 0.8,
                                modifier: 1,
                            }
                        },
                        768: {
                            slidesPerView: 3,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 80,
                                scale: 0.85,
                                modifier: 1.5,
                            }
                        },
                        1024: {
                            slidesPerView: 4,
                            coverflowEffect: {
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                scale: 0.85,
                                modifier: 2,
                            }
                        },
                    }}
                    spaceBetween={20}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index} className="max-w-[300px]">
                            <div className="bg-white shadow-xl rounded-xl p-6 transition-transform duration-500">
                                <p className="text-4xl font-bold text-[#a3c736] mb-4">❝</p>
                                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                                    {item.quote}
                                </p>
                                <div className="border-t-[2px] border-dashed border-[#03373D] mb-4"></div>
                                <div className="flex items-center gap-3">
                                    <img src={item.image} className='w-10 h-10 bg-gray-200 rounded-full' alt="icon" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Testimonials