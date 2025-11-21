import React, { useState } from 'react'

const faqs = [
    {
        id: 1,
        question: "How does this posture corrector work?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    },
    {
        id: 2,
        question: "Is it suitable for all ages and body types?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    },
    {
        id: 3,
        question: "Does it really help with back pain and posture improvement?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    },
    {
        id: 4,
        question: "Does it have smart features like vibration alerts?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    },
    {
        id: 5,
        question: "How will I be notified when the product is back in stock?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
    }
];

function FAQs() {
    const [expandedFAQ, setExpandedFAQ] = useState(null)

    // toogle btn to visible the answer
    const toggleFAQ = (id) => {
        if (expandedFAQ === id) {
            setExpandedFAQ(null)
        } else {
            setExpandedFAQ(id)
        }
    }

    return (
        <div className='bg-colorBg py-8'>
            <div className='section-container'>

                <h2 className='text-center my-5 text-3xl font-semibold'>Question & Answer Section</h2>

                {/* faqs accordion section */}
                <div className='w-full max-w-4xl mx-auto px-2'>
                    {faqs.map((faq) => (
                        <div key={faq.id} className='border border-gray-300 mb-4'>

                            {/* questions */}
                            <div className='cursor-pointer flex justify-between items-center p-4 bg-[#d2e6e7] hover:bg-[#bcd9db] transition duration-200' onClick={() => toggleFAQ(faq.id)}>
                                <h3 className='text-lg text-heading'>{faq.question}</h3>
                                <span className={`transform transition duration-200 text-lg font-bold ${expandedFAQ === faq.id ? "rotate-180" : ""}`}>
                                    {expandedFAQ === faq.id ? "-" : "+"}
                                </span>
                            </div>

                            {/* answers */}
                            {
                                expandedFAQ === faq.id && (<div className='p-4 bg-[#E6F2F3]'>
                                    <p className='text-[#708d91]'>{faq.answer}</p>
                                </div>)
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQs