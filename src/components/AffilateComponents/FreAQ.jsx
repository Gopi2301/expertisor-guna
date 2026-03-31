import React, { useState } from 'react'
import { pages } from '../../constants/pages';
import { assets } from '../../assets/assets';


const FreAQ = ({data}) => {

    const [visibleIndex, setVisibleIndex] = useState(null);

    const toggleParagraph = (index) => {
        setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
        setImages((prev) => (!prev))
    };




    return (
        <div className='px-3 sm:px-14 lg:px-20 py-12 md:py-24 bg-black'>
            <div>
                <div>
                    <h2 className='font-clash font-semibold not-italic text-[28px] md:text-[40px] leading-[100%] tracking-[2%] text-center align-middle uppercase'>Frequently Asked Questions <span className='text-yellow'>(FAQ)</span></h2>
                </div>

                <div>

                    <div className="flex flex-col gap-5 mt-14 lg:px-16">
                        {data.map((faq, index) => (
                            <div
                                onClick={() => toggleParagraph(index)}
                                key={index}
                                className="flex justify-between border border-[#2D2D2D] rounded-2xl p-5 cursor-pointer"
                            >
                                <div>
                                    <h4 className="font-inter font-medium text-[16px] leading-[24px] tracking-[0]">
                                        {faq.question}
                                    </h4>

                                    {/* Always rendered, only height/opacity changes */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${visibleIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="font-inter font-normal text-[16px] leading-[24px] tracking-[0] text-[#A7A7A7]">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>

                                <img
                                    src={assets.down_arrow}
                                    alt="Toggle"
                                    className="cursor-pointer w-6 h-6 transition-transform duration-300"
                                    style={{
                                        transform: visibleIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FreAQ