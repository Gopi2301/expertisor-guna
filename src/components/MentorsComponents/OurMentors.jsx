import React, { memo, useMemo, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FaCheck} from 'react-icons/fa';
import { assets } from '../../assets/assets';



const OurMentors = () => {

        const [showDropdown, setShowDropdown] = useState(false);
        const [selected, setSelected] = useState("Best Match");
    
        const options = useMemo(() => ["Best Match", "Newest", "Most Popular"], []);

    return (
        <>
            <div className=' bg-black px-3 sm:px-14 lg:px-20 pt-14 sm:pt-20 '>
                <div className='text-center mb-7 sm:mb-12'>
                    <h2 className='text-[#FFFFFF]  font-clash font-semibold text-[28px] sm:text-[40px] leading-[100%] tracking-[0] text-center align-middle uppercase'>Our <span className='text-yellow '>Mentors</span></h2>
                    <p className='text-[#B8B8B8] font-inter font-normal text-[14px] sm:text-[18px] leading-[24px] tracking-[0] text-center align-middle mt-3 '>Join experienced creators who help turn your ideas into reality in a <span className='md:block'>community where innovation meets mentorship.</span></p>
                </div>


                <div className='flex justify-between xl:justify-center gap-4 md:gap-14'>
                    <div className='w-full xl:w-[50%]'>
                        <div className="flex   pl-4 pr-1 py-1 bg-[#1a1a1a] text-white rounded-md ">
                            <input
                                type="text"
                                placeholder="Search for courses, mentors, languages etc.,"
                                className="w-full text-[14px] bg-[#1a1a1a] placeholder:text-gray-400 border-none focus:outline-none"
                            />
                            <button className="bg-yellow px-3 py-2 rounded-md">
                                <FaSearch className="text-black" />
                            </button>
                        </div>
                    </div>

                    <div className='hidden sm:block'>
                        <div className="relative inline-flex text-left text-white  items-center gap-3 ">

                            <div
                                className="bg-[#1a1a1a] px-4 py-2 rounded-md border border-[#2c2c2c] cursor-pointer flex items-center justify-between min-w-[160px]"
                                onClick={() => setShowDropdown((prev) => !prev)}
                                onMouseEnter={() => setShowDropdown(true)}
                            >
                                <div>{selected}</div>
                                <div className=" text-gray-400">&#9662;</div>

                                {showDropdown && (
                                    <div
                                        className="absolute top-12 mt-2 left-0 w-full bg-black border border-[#2c2c2c] rounded-md shadow-md z-10"
                                        onMouseEnter={() => setShowDropdown(true)}
                                        onMouseLeave={() => setShowDropdown(false)}
                                    >
                                        {options.map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setSelected(option);
                                                    setShowDropdown(true);
                                                }}
                                                className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-[#333] ${selected === option ? "text-white" : "text-gray-400"
                                                    }`}
                                            >
                                                <span>{option}</span>
                                                {selected === option && <FaCheck className="text-white text-xs" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='block sm:hidden'>
                         <img src={assets.mob_filter} alt="Filter icon" className='w-10 h-10' loading="lazy" decoding="async"/>
                    </div>
                </div>


            </div>


        </>
    )
}

export default memo(OurMentors)