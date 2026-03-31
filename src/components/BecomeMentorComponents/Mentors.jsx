import React from 'react'
import Heading from '../Heading'
import { pages } from '../../constants/pages'


const Mentors = () => {
    return (
        <div>
            <div className='py-[80px] md:py-[160px] px-3 sm:px-14 lg:px-20'>
                <Heading head={pages.become_mentors.wall_of_mentors.title} highlights={pages.become_mentors.wall_of_mentors.highlights} p1={pages.become_mentors.wall_of_mentors.p1} p2={pages.become_mentors.wall_of_mentors.p2} />


                <div className='mt-[32px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-4 lg:gap-5'>
                    {pages.become_mentors.wall_of_mentors.mentors.map((data, i) => (
                        <div
                            key={i}
                            className='relative border  border-[#323232] rounded-lg bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)] bg-black bg-blend-screen overflow-hidden group'
                        >

                            {/* <div className='flex justify-center '>
                                <img src={data.img} alt={data.name} className='' />
                            </div> */}

                            {/* <div className="w-full aspect-[4/5] overflow-hidden">
  <img
    src={data.img}
    alt={data.name}
    className="w-full h-full object-cover"
  />
</div> */}


                            <div className="w-full aspect-[5/6] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                                <img
                                    src={data.img}
                                    alt={data.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="absolute bottom-7 w-full text-center font-clash font-semibold text-[25px]  md:text-[28px] lg:text-[31px] leading-[100%] tracking-normal uppercase">
                                {data.name}
                            </p>


                            {/* hover content */}
                            <div className="absolute inset-0  text-white p-4 flex flex-col  justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-blend-screen bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)]">
                                <div className="w-24 min-h-34 rounded-lg overflow-hidden mb-3">
                                    <img src={data.img} alt={data.name} className="w-full h-full bg-[#473901] object-contain" />
                                </div>

                                <div>
                                    <h2 className="text-yellow font-inter font-semibold text-[18px]">{data.name}</h2>
                                    <p className="text-gray-400 font-inter font-normal text-[12px] md:text-[14px] mb-4">
                                        ({data.role || "Instructor"})
                                    </p>
                                </div>

                                <div className="space-y-2 mb-4 w-full font-inter font-normal text-[14px]">
                                    {
                                        data?.rating?.map((value, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <img src={value.img} alt="" />
                                                <span>{value.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="grid grid-cols-2 gap-2 w-full font-inter font-medium text-[14px]">

                                    {
                                        data?.social_media?.map((value, i) => (
                                            <a key={i} target="_blank" href={value.link} className="flex items-center justify-center gap-2 bg-[#2c2c2c] rounded-lg py-2">
                                                <img src={value.sm_i} alt="" />
                                                <p>{value.followers}</p>
                                                <img src={value.link_i} alt="" />

                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))}



                </div>

            </div>
        </div>
    )
}

export default Mentors