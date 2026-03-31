import React, { useState } from 'react';

const FAQ = () => {


    const faqs = [
        {
            question: "What prior experience do I need to start the Architecture business firm course?",
            answer: "No prior business experience is required. The course is designed for architects at any stage who want to start or scale their firms.",
            icon: "MQtMu7cJrz"
        },
        {
            question: "Are there any specific technical skills required for beginners in architecture?",
            answer: "Beginners in architecture should grasp fundamental design concepts. While familiarity with architectural software is beneficial, it's not essential. Begin with key skills like understanding blueprints and basic design principles, then advance to more intricate tasks like drafting and project management.",
            icon: "Rp1LxruFgA"
        },
        {
            question: "How does the course accommodate both beginners and experienced professionals in architecture?",
            answer: "The course has modules for different experience levels, from basics for beginners to advanced strategies for experienced professionals.",
            icon: "P8YAAnvYd3"
        },
        {
            question: "What software versions related to architecture will be included in the course?",
            answer: "The course focuses on business systems and processes rather than specific software. However, we provide templates compatible with common industry tools.",
            icon: "GRiss4gtLB"
        },
        {
            question: "Will I receive any certification upon completing the architecture course?",
            answer: "Yes, you will receive a certificate of completion that validates your knowledge in architecture firm management.",
            icon: "UTO8L70Y7s"
        },
        {
            question: "What support is available if I have questions during the architecture course?",
            answer: "You'll have access to monthly CEO guidance sessions, a community forum, and direct support channels.",
            icon: "kAa0JOmnPx"
        },
        {
            question: "How long will it take to finish the architecture course?",
            answer: "The course is designed to be completed in 30 days, but you'll have lifetime access to go at your own pace.",
            icon: "Uxd8xhvmYO"
        },
        {
            question: "Is there a community or forum for participants of the architecture course to connect?",
            answer: "Yes, you'll get access to an exclusive community of architecture firm owners where you can network and share experiences.",
            icon: "imprj1EO4K"
        }
    ];

    const [openIndex, setOpenIndex] = React.useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col gap-[64px] items-center self-stretch shrink-0 flex-nowrap relative z-[396] w-full max-w-7xl mx-auto py-16 px-4">
            <div className="flex w-full max-w-[768px] flex-col gap-[24px] items-center shrink-0 flex-nowrap relative z-[397]">
                <span className="h-[49px] self-stretch shrink-0 basis-auto font-clash text-[32px] md:text-[40px] font-semibold leading-[49px] text-[#fff] tracking-[0.8px] relative text-center whitespace-nowrap z-[398]">
                    Frequently Asked Questions
                </span>
                <span className="flex w-full justify-center items-center shrink-0 basis-auto font-inter text-[16px] md:text-[18px] font-normal leading-[24px] text-[#b7b7b7] relative text-center z-[399]">
                    Everything you need to know about the product and billing.
                </span>
            </div>

            <div className="flex w-full max-w-[768px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[400]">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0.05)] rounded-[16px] border-solid border border-[#2d2d2d] relative overflow-hidden z-[401]"
                    >
                        <div
                            className="flex p-[24px] justify-between items-start self-stretch shrink-0 flex-nowrap relative cursor-pointer z-[402]"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="grow shrink-0 basis-auto font-inter text-[16px] md:text-[18px] font-medium leading-[28px] text-[#fff] relative text-left z-[403] whitespace-normal">
                                {faq.question}
                            </span>
                            <div className="w-[24px] h-[24px] shrink-0 relative z-[404] mt-1">
                                {openIndex === index ? (
                                    <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/y13jO2X3yN.png)] bg-cover bg-no-repeat absolute top-0 left-0 z-[405]" />
                                ) : (
                                    <div className="w-[24px] h-[24px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/y13jO2X3yN.png)] bg-cover bg-no-repeat absolute top-0 left-0 z-[405]" />
                                )}
                            </div>
                        </div>
                        {openIndex === index && (
                            <div className="flex px-[24px] pb-[24px] items-start self-stretch w-full relative z-[406]">
                                <p className="w-full font-inter text-[16px] font-normal leading-[24px] text-[#a3a3a3] relative text-left z-[407] whitespace-normal break-words">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
