import React from 'react';

const TagCloud = () => {
    const row1Tags = [
        'Vendor Management',
        'Smart Negotiation', 
        'Cashflow Stability',
        'Client Experience Boost',
        'Fast Project Delivery',
        'Portfolio Power',
        'Team-Ready Workflows'
    ];

    const row2Tags = [
        'Smooth Execution',
        'Brand Authority',
        'Financial Control',
        'Vendor Management',
        'Smart Negotiation',
        'Cashflow Stability',
        'Client Experience Boost',
        'Fast Project Delivery'
    ];

    return (
        <div className="flex flex-col items-center gap-3 md:gap-4 pt-0 mt-0 -mt-16 pb-8 md:pb-10 w-full bg-black overflow-hidden">
            {/* First Row */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full px-2 md:px-4">
                {row1Tags.map((tag, index) => (
                    <div key={`row1-${index}`} className="flex px-3 md:px-4 py-1.5 md:py-2 justify-center items-center gap-2 shrink-0 rounded-[29px] border border-[#333] bg-[#1a1a1a] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.04)_inset,_0px_-1px_0px_0px_rgba(0,0,0,0.10)_inset,_0px_2px_3px_0px_rgba(0,0,0,0.10)]">
                        <span className="text-[#f5f5f5] text-center font-inter text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[20px]">
                            {tag}
                        </span>
                    </div>
                ))}
            </div>
            
            {/* Second Row */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full px-2 md:px-4">
                {row2Tags.map((tag, index) => (
                    <div key={`row2-${index}`} className="flex px-3 md:px-4 py-1.5 md:py-2 justify-center items-center gap-2 shrink-0 rounded-[29px] border border-[#333] bg-[#1a1a1a] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.04)_inset,_0px_-1px_0px_0px_rgba(0,0,0,0.10)_inset,_0px_2px_3px_0px_rgba(0,0,0,0.10)]">
                        <span className="text-[#f5f5f5] text-center font-inter text-[12px] md:text-[14px] font-medium leading-[18px] md:leading-[20px]">
                            {tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagCloud;
