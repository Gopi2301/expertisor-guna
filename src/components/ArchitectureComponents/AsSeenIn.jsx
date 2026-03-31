import React from 'react';
import Marquee from 'react-fast-marquee';

const AsSeenIn = () => {
    return (
        <div className="w-full py-10 bg-black border-y border-neutral-900/50 overflow-hidden max-w-[100vw]">
            <p className="text-center text-xs md:text-sm text-zinc-500 mb-8 tracking-[0.2em] uppercase font-inter">
                As Seen In
            </p>

            <div className="relative w-full overflow-hidden">
                {/* Gradient masks for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                <Marquee gradient={false} speed={40} className="overflow-y-hidden">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="mx-8 md:mx-12 flex items-center justify-center">
                            <span className="text-3xl md:text-4xl font-serif font-bold text-white opacity-90 tracking-wide">
                                LOGO
                            </span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default AsSeenIn;
