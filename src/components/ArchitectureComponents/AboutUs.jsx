import React, { memo, useMemo, useState } from 'react'
import ImgRun from '../HomeComponents/ImgRun';
import Marquee from 'react-fast-marquee';
import { assets } from '../../assets/assets'

const AboutUs = () => {
    const [playing, setPlaying] = useState(0);

    const slide1 = useMemo(() => [
        assets.a,
        assets.b,
        assets.c,
        assets.d,
        assets.e,
        assets.f,
        assets.g,
        assets.h,
        assets.i,
        assets.j,
    ], [])

    const videos = {
        thumbnail: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/5Dx9gHA80S.png" // Using the image from the previous AboutUs as a placeholder or finding a better one
    }

    return (
        <>
            <div className='bg-black px-5 sm:px-14 lg:px-20 pt-20 md:pt-24 lg:pt-28 pb-20 overflow-hidden'>
                <div>
                    {/* title and para */}
                    <div className='text-center mb-12'>
                        <h1 className='text-[#ffffff] font-clash font-semibold text-[28px] md:text-[44px] leading-[100%] tracking-[0%] align-middle uppercase'>ABOUT <span className='text-yellow'>US</span></h1>
                        <p className='mt-3 text-[#ffffff] font-inter font-normal text-[14px] md:text-[18px] leading-[24px] tracking-[0%] text-center align-middle'>From college dreamers to builders of futures ,making quality education accessible for everyone.</p>
                    </div>

                    {/* video and about us */}
                    <div className='mt-9 md:mt-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-7 sm:gap-12'>

                        <div className=''>
                            <div className="relative ">
                                <div className="relative w-full pt-[56.25%]">
                                    {playing !== 1 ? (
                                        <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(1)}>
                                            <div className="w-full h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/rFPiefm4tP.png)] bg-cover bg-no-repeat rounded-[10px]" />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-yellow w-[47px] h-[47px] sm:w-[86px] sm:h-[86px] rounded-full flex justify-center items-center hover:scale-110 transition-transform">
                                                    <img src={assets.pause} alt="" className='w-[33px] h-[33px] sm:w-[60px] sm:h-[60px]' />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe className="absolute top-0 left-0 w-full h-full rounded-3xl" src="https://www.youtube.com/embed/wO0cNJOXqCs?autoplay=1&modestbranding=1&showinfo=0&controls=1&rel=0&disablekb=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='text-center lg:text-left'>
                                <div className='flex justify-center lg:justify-start mb-6'>
                                    <div className='flex gap-[21px] justify-center items-center self-stretch shrink-0 flex-nowrap relative'>
                                        <div className="w-[96.149px] h-[96.149px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/K02mjZB2uj.png)] bg-cover bg-no-repeat relative" />
                                        <div className="w-[102.398px] h-[102.398px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/5LiR0FFqNJ.png)] bg-cover bg-no-repeat relative" />
                                    </div>
                                </div>

                                <h4 className='text-[#ffffff] font-clash font-normal text-[20px] sm:text-[24px] leading-[34px] tracking-[0%] mb-6'>
                                    Two college-broken minds, <span className='text-yellow font-semibold'>One big vision.</span>
                                </h4>

                                <div className="space-y-4 text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[24px]">
                                    <p>We saw the gap, education teaches but reality demands more. True mastery comes from learning directly from those who have done it, implemented it, and created real impact.</p>

                                    <p>That is why we built Expertisor Academy, a platform where impact driven creators become mentors.</p>

                                    <p>From a small idea to thousands of students impacted, we are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real world education.</p>

                                    <p>We believe top quality education should be affordable and driven by value. Money is only a by product of creating real impact.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-11 bg-black '>
                <div className="relative w-full overflow-hidden">
                    <Marquee gradient={false} speed={40} className="overflow-y-hidden">
                        <div className="flex gap-[20px] items-center self-stretch shrink-0 flex-nowrap">
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/NWcHGEviaJ.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/Xvg03N47yL.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/E1uQHqZFxP.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/kMdDvbPbEU.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            {/* Duplicate for seamless loop */}
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/NWcHGEviaJ.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/Xvg03N47yL.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/E1uQHqZFxP.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                            <div className="w-[413px] h-[240px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-04/kMdDvbPbEU.png)] bg-cover bg-no-repeat rounded-[8px] relative" />
                        </div>
                    </Marquee>
                </div>
            </div>
        </>
    )
}

export default memo(AboutUs)
