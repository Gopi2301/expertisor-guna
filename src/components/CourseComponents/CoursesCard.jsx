

import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const CoursesCard = ({ course, width }) => {
    return (
        <Link to={`/course/1`}>
            <div className='h-full'>
                <div
                    className='h-full flex flex-col text-white bg-[#1D1D1D] p-3 text-start rounded-lg'
                    style={{ width }}
                >
                    <div>
                        <img src={assets.awscard} alt="" className='rounded-lg w-full' />
                    </div>
                    <div className='flex flex-col justify-between gap-[6px] mt-2 h-full'>
                        <div className='flex justify-between items-center'>
                            <p className='py-[6.5px] px-[8px] bg-[#00DC281A] text-[#00DC28] rounded-[4px] font-inter font-medium text-[12px] leading-[100%] tracking-[0] align-middle'>All levels</p>
                            <div className='flex gap-1 items-center'>
                                <img src={assets.star_i} alt="" />
                                <span className='text-white'>4.9</span>
                                <span>(1742)</span>
                            </div>
                        </div>
                        <h3 className='font-inter font-medium text-[16px] leading-5'>
                            {course.domain}
                        </h3>
                        <p className='text-[#C0C0C0] font-inter text-[14px] leading-[18px]'>
                            {course.mentors}
                        </p>
                        <Rating value={course.rating} />
                        <div className="flex items-center gap-2 text-[16px] ">
                            <span className="line-through text-gray-400">₹ {course.actual_price}</span>
                            <span className="font-bold text-[18px]">₹ {course.discount_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CoursesCard

