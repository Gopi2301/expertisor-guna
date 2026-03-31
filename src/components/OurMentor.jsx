import React from 'react'


const OurMentor = ({ mentor_det }) => {
    return (
        <div>
            <div className="xl:grid grid-cols-3 gap-8 w-full  items-center">
                {/* Mentor Image */}
                <div className="col-span-1 flex justify-center xl:justify-normal">
                    <img src={mentor_det.ment_img} alt="" />
                </div>

                {/* Content Section */}
                <div className="col-span-2 xl:mt-0 mt-4 sm:mt-10">
                    <div className="flex justify-between  w-full">
                        {/* Left Side Content */}
                        <div>
                            <h6 className="font-inter font-semibold text-[24px] sm:text-[36px] leading-[100%] tracking-[0] align-middle text-yellow">{mentor_det.ment_detail.name}</h6>
                            <p className="mt-2 font-inter font-normal text-[16px] leading-[17.5px] tracking-[0] align-middle leading-trim-none text-[#8A8A8A]">{mentor_det.ment_detail.domain}</p>

                            <div className="sm:flex-row flex flex-col gap-2 my-3">
                                {mentor_det.ment_detail.course_detail.map((data, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <img src={data.i} alt="" />
                                        <p className="font-inter font-normal text-[14px] leading-[17.5px] tracking-[0] align-middle">{data.para}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {mentor_det.ment_detail.social_media.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 justify-between bg-[#2a2a2a] hover:bg-[#333] p-1 rounded-md transition"
                                    >
                                        <img src={social.logo} alt="" />
                                        <p className="text-sm">{social.name}</p>
                                        <img src={social.link_i} alt="" />
                                    </a>
                                ))}
                            </div>


                        </div>

                        {/* Right Side Logo */}
                        <div className='md:block hidden'>
                            <img src={mentor_det.ment_detail.logo} alt="" />
                        </div>
                    </div>

                    {mentor_det.ment_detail.desc1 && (<p className="my-3 font-inter font-normal text-[16px] leading-[20px] tracking-[0] align-middle text-[#A7A7A7]">{mentor_det.ment_detail.desc1}</p>)}

                    {mentor_det.ment_detail.desc2 && <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[0] align-middle text-[#A7A7A7]">{mentor_det.ment_detail.desc2}</p>}


                    {mentor_det.ment_detail.pathway && (<div className="my-3 flex gap-2 flex-wrap">
                        {
                            mentor_det.ment_detail.pathway.map((data, i) => (
                                <div key={i} className="flex gap-2 p-[10px] bg-[#1C1C1C] rounded-full font-inter font-normal text-[16px] leading-[20px] tracking-[0]  items-center">
                                    <img src={data.icon} alt="" />
                                    <p>{data.para}</p>
                                </div>
                            ))
                        }
                    </div>)}


                    {mentor_det.ment_detail.desc3 && (<p className="font-inter font-normal text-[16px] leading-[20px] tracking-[0] align-middle text-[#A7A7A7]">{mentor_det.ment_detail.desc3}</p>)}


                    {mentor_det.ment_detail.desc4 && <p className="mt-3 font-inter font-normal text-[16px] leading-[20px] tracking-[0] align-middle text-[#A7A7A7]">{mentor_det.ment_detail.desc4}</p>}


                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 my-7 ">
                {mentor_det.ment_info.map((data, i) => (
                    <div
                        key={i}
                        className="bg-[linear-gradient(180deg,#141414_0%,#212121_100%)] rounded-lg py-[24px] flex flex-col items-center px-3 justify-center"
                    >
                        <p className="text-[#A7A7A7] font-inter font-normal text-[16px] leading-[20px] tracking-[0] text-center align-middle">
                            {data.head}
                        </p>
                        <div className="flex gap-2 mt-2 items-center">
                            {data.i && <img src={data.i} alt="" />}
                            <p className="font-inter font-bold text-[36px] leading-[100%] tracking-[0] text-center align-middle text-yellow">
                                {data.num}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default OurMentor