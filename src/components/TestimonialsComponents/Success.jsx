import React, { memo } from 'react'
import { assets } from '../../assets/assets'

const Success = () => {
    return (
        <div >
            <div className='pb-16 pt-9 sm:py-0 '>
                <div className=" relative mx-4 ">
                    {/* bg image */}
                    <img
                        src={assets.test_bg}
                        alt="Success banner"
                        className="hidden sm:block w-full "
                        loading="lazy"
                        decoding="async"
                    />

                    <img src={assets.test_bg_mob} alt="Success banner mobile" className='block sm:hidden w-full' loading="lazy" decoding="async" />

                    {/* content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-3">
                        <h3 className="text-white font-clash font-semibold text-[36px] sm:text-[20px] md:text-[27px]  lg:text-[35px] xl:text-[40px] leading-tight sm:leading-[100%] tracking-[0%] text-center align-middle uppercase">
                            <span className='block sm:inline'>True <span className='text-yellow'>success</span>,</span> <span className='block sm:inline'>real impact!</span>
                        </h3>
                        <p className="mt-2 lg:mt-4 text-white font-inter font-normal text-[16px] lg:text-[18px] md:leading-[24px] tracking-[0%] text-center align-middle">Discover a variety of exciting programs that you can join <span className='sm:block'>to enhance your journey today!</span></p>
                        <a href='' className="mt-8 sm:mt-4 lg:mt-10 text-yellow border border-[yellow] px-[14.5px] py-[13px] sm:px-[12px] md:px-[14.5px] sm:py-[8px] md:py-[13px]  bg-custom-gold  rounded-lg font-medium text-[13px] md:text-[16px] leading-[100%] tracking-[0%] align-middle font-inter">
                            Explore Courses
                        </a>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default memo(Success)