import React from "react";

const StatsSection = () => {
    const stats = [
        { value: "100+", label: "Total Mentors" },
        { value: "1,00,000+", label: "Impacted Students" },
        { value: "50+", label: "Courses" },
        { value: "65000+", label: "Watch Hours" },
        { value: "02", label: "Languages" },
    ];

    return (
        <section className="bg-[#121212] py-8">
            <div className="container mx-auto px-3">
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-center">
                    {stats.map(({ value, label }, index) => (
                        <div key={index} className="flex flex-col">


                            <h3 className="bg-[linear-gradient(180deg,#FFF200_13.64%,#FFFAA2_93.18%)] bg-clip-text text-transparent font-inter font-bold text-[28px] md:text-[40px] leading-tight text-center align-middle">
                                {value}
                            </h3>

                            <p className="text-[#BABABA] font-inter font-normal text-[14px] sm:text-[16px] leading-tight text-center align-middle mt-1">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
