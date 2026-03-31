import React from 'react';

const WhoIsThisFor = () => {
    return (
        <div className="flex flex-col gap-[64px] items-center self-stretch shrink-0 flex-nowrap relative z-[205] w-full max-w-7xl mx-auto py-16 px-4">
            <div className="w-full self-stretch shrink-0 relative z-[206]">
                <div className="flex w-full max-w-[935px] flex-col gap-[24px] items-center flex-nowrap relative z-[208] mt-[9px] mx-auto mb-12">
                    <div className="flex w-fit px-4 py-3 gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#1a1e00] rounded-[9px] border-solid border border-[#635e00] relative z-[209]">
                        <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/F0d0Hj8r6c.png)] bg-[length:100%_100%] bg-no-repeat relative z-[210]" />
                        <span className="h-[19px] shrink-0 basis-auto font-inter text-[16px] font-medium leading-[19px] text-[#fff200] relative text-left uppercase whitespace-nowrap z-[211]">
                            ABOUT US
                        </span>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[212]">
                        <span className="h-[49px] self-stretch shrink-0 basis-auto font-clash text-[32px] md:text-[40px] font-semibold leading-[49px] text-[#fff] tracking-[0.8px] relative text-center uppercase whitespace-nowrap z-[213]">
                            WHO IS THIS FOR?
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-8 justify-center items-stretch relative z-[214]">
                    {/* Left Image Section */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-[#333]">
                        <div className="absolute inset-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/bDDpzfCD0O.png)] bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105" />
                        {/* Gradient overlay for better text contrast if needed, though image seems standalone */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Right Content Section */}
                    <div className="w-full lg:w-[500px] flex flex-col p-8 bg-[#0A0A0A] border border-[#333] rounded-3xl relative shrink-0">
                        {/* Diamond Icon */}
                        <div className="w-8 h-8 mb-6">
                            <div className="w-full h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/y4KvTvVOyx.png)] bg-contain bg-no-repeat" />
                        </div>

                        <h3 className="text-[32px] font-clash font-semibold text-white mb-8 leading-tight">
                            This Blueprint is for you if:
                        </h3>

                        <div className="flex flex-col gap-4 mb-8">
                            {[
                                "You’re an architect, interior designer, or civil engineer wanting to start your own firm.",
                                "You’re running a firm but struggling to get consistent high-paying clients.",
                                "You’re tired of undercharging and want to build a premium brand.",
                                "You want a step-by-step system to handle projects, teams, and finances without burnout."
                            ].map((text, index) => (
                                <div key={index} className="flex gap-4 p-4 rounded-xl border border-[#333] bg-[#111] hover:bg-[#1a1a1a] transition-colors group">
                                    <div className="w-6 h-6 shrink-0 bg-[#fff200] rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-200 font-inter text-[15px] leading-relaxed">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col gap-4">
                            <button className="w-full py-4 bg-[#fff200] rounded-xl font-inter font-bold text-black text-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 glow-btn flex items-center justify-center gap-2">
                                <div className="w-6 h-6 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/S992cz6Eos.png)] bg-contain bg-no-repeat filter brightness-0" />
                                Join the Blueprint Now
                            </button>

                            <p className="text-center text-gray-400 italic font-cactus text-lg">
                                "Build a business, not just a building."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoIsThisFor;
