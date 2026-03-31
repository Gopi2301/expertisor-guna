import React, { memo, useMemo } from 'react'
import ImgRun from './ImgRun';
import OptimizedImage from '../OptimizedImage';

import { assets } from '../../assets/assets'

const AboutUs = () => {

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


    return (
        <>
            <div className=' bg-black px-5 sm:px-14 lg:px-20 pt-20 md:pt-24 lg:pt-28'>
                <div>

                    {/* title and para */}
                    <div className='text-center'>
                        <h1 className='text-[#ffffff] font-clash font-semibold text-[28px] md:text-[44px] leading-[100%] tracking-[0%] align-middle uppercase'>ABOUT <span className='text-yellow'>US</span></h1>
                        <p className='mt-3 text-[#ffffff] font-inter font-normal text-[14px] md:text-[18px] leading-[24px] tracking-[0%] text-center align-middle'>From college dreamers to builders of futures ,making quality education accessible for everyone.</p>
                    </div>

                    {/* video and about us */}
                    <div className='mt-9 md:mt-12 grid grid-cols-1  items-center gap-7 sm:gap-12'>

                        {/* <div className=''>
                            <div className="relative ">
                                <div className="relative w-full pt-[56.25%]">

                                    {playing !== 1 ? (
                                        <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(1)}>
                                            <img src={videos.thumbnail} width={"100%"} alt="Video Thumbnail" className="max-w-full h-full object-cover rounded-3xl" />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-yellow w-[47px] h-[47px] sm:w-[86px] sm:h-[86px] rounded-full flex justify-center items-center">
                                                    <img src={assets.pause} alt="" className='w-[33px] h-[33px] sm:w-[60px] sm:h-[60px]' />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe className="absolute top-0 left-0 w-full h-full rounded-3xl" src="https://www.youtube.com/embed/wO0cNJOXqCs?autoplay=1&modestbranding=1&showinfo=0&controls=1&rel=0&disablekb=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                                    )}
                                </div>
                            </div>
                        </div> */}

                        <div>
                            <div className='text-center '>
                                <div className='flex justify-center  sm:hidden'>
                                    <div className='flex'>
                                        <OptimizedImage src={assets.ragu} alt="Mentor Ragu" width={120} height={120} />
                                        <OptimizedImage src={assets.sathish} alt="Mentor Sathish" width={120} height={120} />
                                    </div>
                                </div>
                                <div className='flex items-center justify-around'>
                                    <OptimizedImage src={assets.ragu} alt="Mentor Ragu" className='hidden sm:block' width={160} height={160} />
                                    <h4 className='text-[#ffffff] font-clash font-normal text-[20px] sm:text-[24px] leading-[34px] tracking-[0%] text-center'>Two college-broken minds,<span className='xl:block'>One <span className='text-yellow font-semibold'>big vision</span>.</span></h4>
                                    <OptimizedImage src={assets.sathish} alt="Mentor Sathish" className='hidden sm:block' width={160} height={160} />
                                </div>

                                <p className='mt-4 text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] tracking-[0%] align-middle'>We saw the gap ,education teaches but reality demands more. True mastery comes from learning directly from those who have done it, implemented it, and created real impact.</p>

                                <p className='mt-4 text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] tracking-[0%] align-middle'>That is why we built Expertisor Academy, a platform where impact driven creators become mentors.</p>

                                <p className='mt-4 text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] tracking-[0%] align-middle'>From a small idea to thousands of students impacted, we are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real world education.</p>

                                <p className='mt-4 text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] tracking-[0%] align-middle'>We believe top quality education should be affordable and driven by value. Money is only a by product of creating real impact.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='pt-11 bg-black '>
                <ImgRun datas={slide1} dirc="left" speed="60" m="mb-0" h="h-[200px] sm:h-[247px]" />
            </div>

        </>
    )
}

export default memo(AboutUs)