import React from 'react'
import { pages } from '../../constants/pages'
import Marquee from 'react-fast-marquee'


const Review = ({ data,height }) => {
  return (
    <div style={{ height }} className={`w-[298px] md:w-[413px]  p-6 rounded-2xl bg-[linear-gradient(180deg,#0A0A0A_0%,#111010_100%)] mr-4   h-full flex flex-col justify-between`}>
        {data.price &&
        <div className="flex justify-between items-center">
          <div>
            <h3 className='font-inter font-bold text-[28px] md:text-[36px] leading-[100%] tracking-[0] text-yellow'>{data.price}</h3>
            <p className="mt-1 font-inter font-normal text-[14px] md:text-[16px] leading-[20px] tracking-[0] text-[#A7A7A7] ">{data.duration}</p>
          </div>
          <img src={data.money_sym} alt="" />
        </div>}

      <p className="mt-3 text-[#FFFFFF] font-inter font-normal text-[14px] md:text-[16px] leading-[24px] tracking-[0] line-clamp-6 ">{data.review}</p>

      <div className="flex justify-between items-center mt-5">
        <p className='font-inter font-semibold text-[16px] md:text-[18px] leading-[20px] tracking-[0] text-yellow'>{data.name}</p>
        <img src={data.box_ex} alt="" />
      </div>
    </div>
  )
}

export default Review




