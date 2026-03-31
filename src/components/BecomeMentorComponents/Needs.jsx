import React from 'react'
import { pages } from '../../constants/pages';
import Heading from '../Heading';
import StartButton from '../StartButton';


const Needs = () => {



    return (
        <div>
            <div className='px-3 sm:px-14 lg:px-20 pt-20'>
                <div className=''>
                    <Heading head={pages.become_mentors.needs.title} highlights={pages.become_mentors.needs.highlights} p1={pages.become_mentors.needs.p1} p2={pages.become_mentors.needs.p2}/>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-[30px] xl:gap-[50px] sm:p-6 sm:bg-[#070707] items-center rounded-2xl mt-14'>
                    <div className='flex justify-center lg:justify-end lg:order-1 order-2'>
                        <div className=''>
                            <div className='flex flex-col gap-6 lg:gap-4 xl:gap-10'>
                                {pages.become_mentors.needs.benefits.map((data, i) => (
                                    <div key={i} className='flex gap-4'>
                                         <div>
                                                                                    <img src={data.icon} alt="" className='p-2 rounded-sm' style={{
                                            background:
                                                "radial-gradient(108.48% 86.25% at 50.12% 100%, #705900 0%, rgba(0, 0, 0, 0.3) 66.08%), linear-gradient(180deg, #372A00 0%, #000000 100%)",
                                            backgroundBlendMode: "screen",
                                        }} />
                                         </div>
                                        <div>
                                            <h6 className='font-inter font-semibold text-[17.61px] leading-[23.48px]'>{data.title}</h6>
                                            <p className='text-[#B8B8B8] font-inter font-normal text-[15.65px] leading-[23.48px]'>{data.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-[50px] mb-[16px]'>
                    <StartButton data={pages.become_mentors.start_button}/>
                            </div>
                            <p className='text-[#B8B8B8] font-inter font-normal text-[15.65px] leading-[23.48px] sm:text-start text-center'>{pages.become_mentors.needs.para}</p>
                        </div>
                    </div>

                    <div className='flex justify-center lg:justify-end lg:order-2 order-1'>
                        <img src={pages.become_mentors.needs.mentors} alt="" className=' sm:block hidden' />
                        <img src={pages.become_mentors.needs.b_mentors} alt=""  className='sm:hidden block'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Needs