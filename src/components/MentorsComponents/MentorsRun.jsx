import React from 'react'
import { assets } from '../../assets/assets'
import Marquee from 'react-fast-marquee'


const MentorsRun = () => {
    const datas=[
        assets.m1,
        assets.m2,
        assets.m3,
        assets.m4,
        assets.m1,
        assets.m2,
        assets.m3,
        assets.m4,
        assets.m1,
        assets.m2,
        assets.m3,
        assets.m4,
    ]

    return (
        <>
            <div className='pb-10 sm:pb-14 lg:pb-20'>
                <Marquee speed={80}  >
                    {datas.map((value, index) => (
                        <div key={index} className='mr-4 sm:mr-10'>
                              <img src={value} alt="" className='rounded-lg w-[160px] h-[160px] sm:w-[280px] sm:h-[280px]'/>
                        </div>
                    ))}
                </Marquee>
            </div>
        </>
    )
}

export default MentorsRun