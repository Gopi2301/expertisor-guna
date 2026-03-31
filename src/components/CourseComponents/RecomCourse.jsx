import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../../assets/assets'
import { CourseContext } from '../../context/CourseContextProvider'
import CoursesCard from './CoursesCard'
import { useNavigate } from 'react-router-dom'




const RecomCourse = () => {
    const navigate=useNavigate()

    const { courses } = useContext(CourseContext)

    const [recCourse, setRecCourse] = useState([])

    const scrollRef = useRef(null);
    const scrollLeft = () => {
        console.log(scrollRef.current)
        scrollRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    };
    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    };


    useEffect(() => {
        let data = courses.slice()

        // data = data.filter((value, i) =>
        //     value.category.toLowerCase().includes(courseCategory.toLowerCase())
        // )

        setRecCourse(data)


    }, [])


    return (
        <div>
            <div>
                <div className='py-4 pl-4 bg-[#0C0C0C] text-[#ffff] my-6 sm:my-10 rounded-lg'>

                    <div className='flex justify-between items-center pr-4'>
                        <h4 className='font-inter font-semibold text-[20px] leading-[28px] tracking-[0] align-middle'>Recommended courses</h4>
                        <div className='flex gap-3 items-center cursor-pointer' onClick={()=>( navigate('/courses'))}>
                            <p className='font-inter font-semibold text-[14px] leading-[20px] '>View all</p>
                            <img src={assets.r_arrow} alt="" />
                        </div>
                    </div>

                    <div className='relative'>
                        <div ref={scrollRef} className='flex overflow-x-auto space-x-6  scrollbar-hidden mt-5'>
                            {
                                (recCourse.slice(0, 5)).map((data, i) => (
                                    <CoursesCard key={i} course={data} width='305px'  />
                                ))
                            }
                        </div>

                        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#121212] to-transparent"></div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default RecomCourse