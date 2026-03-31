import React from 'react'
import { assets } from '../../assets/assets'

const Reviews = () => {
  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:mx-[30px] lg:mx-[90px] my-5 md:my-8 lg:my-10'>

            <div className='flex justify-center items-center gap-3 py-[14px] bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] rounded px-3'>
                <img src={assets.star_img} alt="" />
                <div>
                    <h3 className='text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFA98] font-clash font-semibold text-[24px] leading-[100%] tracking-[0] text-center align-middle uppercase mb-2'>4.5/5</h3>
                    <p className='text-[#B2B2B2] font-inter font-normal text-[10px] leading-[100%] tracking-[0] uppercase'>Ratings</p>
                </div>
            </div>

            <div className='flex justify-center items-center gap-3 py-[14px] bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] rounded'>
                <img src={assets.stud} alt="" />
                <div>
                    <h3 className='text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFA98] font-clash font-semibold text-[24px] leading-[100%] tracking-[0] text-center align-middle uppercase mb-2'>120 +</h3>
                    <p className='text-[#B2B2B2] font-inter font-normal text-[10px] leading-[100%] tracking-[0] uppercase'>students</p>
                </div>
            </div>

            <div className='flex justify-center items-center gap-3 py-[14px] bg-gradient-to-b from-[#000000] to-[#1C1800] border border-[#272727] rounded col-span-2 md:col-span-1'>
                <img src={assets.pro} alt="" />
                <div>
                    <h3 className='text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFA98] font-clash font-semibold text-[24px] leading-[100%] tracking-[0] text-center align-middle uppercase mb-2'>Pro</h3>
                    <p className='text-[#B2B2B2] font-inter font-normal text-[10px] leading-[100%] tracking-[0] uppercase'>level</p>
                </div>
            </div>


        </div>

    </div>
  )
}

export default Reviews