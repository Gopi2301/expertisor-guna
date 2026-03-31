import React from 'react'
import Marquee from 'react-fast-marquee'
import { pages } from '../../constants/pages'

const SoftwareScroll = () => {
  return (
    <div className='bg-[linear-gradient(180deg,#161616_0%,#1F1F1F_100%)] py-10'>
        <p className='mb-9 font-inter font-normal text-[18px] leading-[20px] tracking-[0%] text-center text-[#FFFFFF]'>{pages.ThreeDMax.motion_section.para}</p>
        <Marquee direction='left' className='flex items-center'>
            {
                pages.ThreeDMax.motion_section.software_motion.map((data,i)=>(
                    <div key={i} className='mr-8'>
                        <img src={data} alt="" />
                    </div>
                ))
            }
        </Marquee>
    </div>
  )
}

export default SoftwareScroll