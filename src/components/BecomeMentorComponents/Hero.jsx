import React from 'react'
import { pages } from '../../constants/pages'
import B_MentorButton from '../B_MentorButton'
import Marquee from 'react-fast-marquee'
import StartButton from '../StartButton'

const Hero = () => {
    return (
        <div>
            <div className='pt-[60px] lg:pt-36 px-3'>
                <h1 className='font-clash font-semibold text-[32px] sm:text-[43px]  md:text-[50px] lg:text-[64px] xl:text-[84px] leading-tight xl:leading-[84px] tracking-[0] text-center '>
                    Turn Your <span className='inline-flex  -space-x-1 '>
                        {pages.become_mentors.hero_section.head_icons.map((data, i) => (
                            <div key={i} className="group relative flex justify-center">
                                <img
                                    src={data.img}
                                    className="relative p-[10px] md:p-[17px] bg-yellow border-2 border-[#0E0C05] -rotate-6 rounded-[3px] transition-all duration-200 group-hover:-top-[12px]"
                                />

                                {/* Tooltip */}
                                <div className="hidden group-hover:flex absolute -top-14 left-1/2 -translate-x-1/2 
                  bg-black text-white px-4 py-2 rounded-lg border  border-[#8A8A8A]
                  text-[14px] font-clash font-medium leading-[100%] tracking-[0] 
                  text-center items-center justify-center">
                                    {data.det}

                                    {/* Triangle pointer */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
                    border-l-[8px] border-r-[8px] border-t-[8px]
                    border-l-transparent border-r-transparent border-t-[#8A8A8A]"></div>
                                </div>
                            </div>
                        ))}
                    </span> Expertise <span className='sm:block'>Into Impact</span>
                </h1>

                <p className='text-[#DBDBDB] font-inter font-normal text-[20px] leading-tight tracking-[0] text-center my-4'>{pages.become_mentors.hero_section.para}</p>

                <div className='flex justify-center pt-4'>
                    <StartButton data={pages.become_mentors.start_button}/>
                </div>

                <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
                    {pages.become_mentors.hero_section.features.map((data, i) => (
                        <div key={i} className="flex items-center gap-2 p-2">
                            <img src={data.i} alt="" />
                            <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] whitespace-nowrap">
                                {data.para}
                            </p>
                        </div>
                    ))}
                </div>



            </div>
            <div>
                <div className='my-14'>

                    <Marquee speed={50}>
                        {pages?.become_mentors?.wall_of_mentors?.mentors?.map((mentor, i) => (
                            <div
                                key={i}
                                className="relative mx-3 bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)] bg-black rounded-lg overflow-hidden"
                            >
                                {/* Aspect ratio container */}
                                <div className="w-full aspect-[16/18]">
                                    <img
                                        src={mentor?.img}
                                        alt={mentor?.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                {/* Name */}
                                <div className='absolute bottom-1 left-1/2 -translate-x-1/2 w-full cursor-pointer'>
                                    <p className="font-clash font-semibold text-[24px] text-center text-white">
                                        {mentor?.name}
                                    </p>


                                    <div className="p-2 rounded-lg flex flex-wrap gap-2 justify-center ">
                                        {mentor?.social_media?.map((data, i) => (
                                            <a
                                                href={data.link}
                                                key={i}
                                                className="flex items-center gap-1 px-2 py-1 rounded-md bg-[linear-gradient(180deg,#2B1900_0%,#1A0F00_100%)]"
                                            >
                                                <img src={data.sm_i} alt="" className="w-5 h-5 object-contain" />
                                                <p className="text-white text-sm">{data.followers}</p>
                                            </a>
                                        ))}
                                    </div>


                                </div>

                            </div>
                        ))}
                    </Marquee>

                </div>
            </div>
        </div>
    )
}

export default Hero