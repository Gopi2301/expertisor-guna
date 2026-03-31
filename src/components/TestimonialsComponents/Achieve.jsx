import React, { memo, useMemo } from 'react'
import { assets } from '../../assets/assets'
import Marquee from 'react-fast-marquee'

const Achieve = () => {
    const datas = useMemo(() => (['REAL SKILLS', 'REAL GROWTH', 'JOIN THE MOVEMENT', 'REAL SKILLS', 'REAL GROWTH', 'JOIN THE MOVEMENT']), [])
    return (
        <div className='bg-black '>
            <div className='  px-3 sm:px-14 lg:px-20 pt-14 sm:pt-24'>
                <div className='text-center '>
                    <h2 className='text-[#FFFFFF]  font-clash font-semibold text-[28px] sm:text-[40px] leading-[100%] tracking-[0] text-center align-middle uppercase'>What our students <span className='text-yellow '>achieve</span>?</h2>
                    <p className='text-[#B8B8B8] font-inter font-normal text-[14px] sm:text-[16px] leading-[24px] tracking-[0] text-center align-middle mt-3 mb-10 sm:mb-14'>Our students achieve remarkable growth, mastering new skills and gaining <span className='md:block'>confidence to excel in their careers.</span></p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                    <div className='bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] pt-6 px-6 rounded-lg'>
                        <div className='text-center mb-[44px]'>
                            <h3 className='font-clash font-semibold text-[50px] md:text-[40px] lg:text-[50px] leading-[100%] tracking-[0%] text-center align-middle uppercase'><span className="bg-gradient-to-r from-white to-[#FFFA98] bg-clip-text text-transparent">100 +</span></h3>
                            <p className='text-[#B2B2B2] font-inter font-normal text-[16px] leading-[100%] tracking-[0%] uppercase mt-2'>Students hired</p>
                        </div>

                        <div className='flex justify-center'>
                            <img src={assets.a1} alt="Hired students collage" loading="lazy" decoding="async" width={196} height={140} />
                        </div>
                    </div>

                    <div className='bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] pt-6 px-6 rounded-lg'>
                        <div className='text-center mb-[44px]'>
                            <h3 className='font-clash font-semibold text-[50px] md:text-[40px] lg:text-[50px] leading-[100%] tracking-[0%] text-center align-middle uppercase'><span className="bg-gradient-to-r from-white to-[#FFFA98] bg-clip-text text-transparent">10 LPA</span></h3>
                            <p className='text-[#B2B2B2] font-inter font-normal text-[16px] leading-[100%] tracking-[0%] uppercase mt-2'>Highest salary</p>
                        </div>

                        <div className='flex justify-center'>
                            <img src={assets.a2} alt="Highest salary graphic" loading="lazy" decoding="async" width={196} height={140} />
                        </div>
                    </div>

                    <div className='bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] pt-6 px-6 rounded-lg'>
                        <div className='text-center mb-[44px]'>
                            <h3 className='font-clash font-semibold text-[50px] md:text-[40px] lg:text-[50px] leading-[100%] tracking-[0%] text-center align-middle uppercase'><span className="bg-gradient-to-r from-white to-[#FFFA98] bg-clip-text text-transparent">225%</span></h3>
                            <p className='text-[#B2B2B2] font-inter font-normal text-[16px] leading-[100%] tracking-[0%] uppercase mt-2'>Highest Hike</p>
                        </div>

                        <div className='flex justify-center '>
                            <img src={assets.a3} alt="Highest hike graphic" loading="lazy" decoding="async" width={196} height={140} />
                        </div>
                    </div>

                </div>

            </div>

            <div className='bg-[#121212] mt-12 md:mt-16 py-2 md:py-4'>
                <Marquee speed={80}  >
                    {datas.map((value, index) => (
                        <div key={index} className='mr-10'>
                            <div className='flex gap-10'>
                                <h2 className='text-yellow font-clash font-semibold text-[30px] md:text-[50.4px] leading-[55.2px] tracking-[0%] text-center'>{value}</h2>
                                <img src={ index % 2 == 0 ? assets.star_des_1 : assets.star_des } alt="Decorative star" loading="lazy" decoding="async" width={48} height={48}/>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>

        </div>
    )
}

export default memo(Achieve)