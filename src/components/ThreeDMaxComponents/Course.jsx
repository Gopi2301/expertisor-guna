import React from 'react'
import { pages } from '../../constants/pages'
import Heading from '../Heading'

const Course = ({course_data}) => {
    return (
        <>
            <div>
                <div className=" px-3 sm:px-14 lg:px-20 py-20 lg:py-[120px] bg-black">
                    <div>
                        <Heading head={course_data.title} highlights={course_data.highlights} p1={course_data.p1} p2={course_data.p2}/>
                    </div>

                    <div className='mt-14 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            course_data.path_way.map((data, i) => (
                                <div key={i} className='py-[39px] md:py-[71px] px-[24px] bg-[radial-gradient(108.48%_86.25%_at_50.12%_100%,#303030_0%,rgba(0,0,0,0.3)_66.08%)] bg-blend-screen text-center rounded-lg border border-[#323232]'>
                                    <div className='flex justify-center'>
                                        <img src={data.img} alt="" />
                                    </div>
                                    <div className='mt-6'>
                                        <h4>{data.title}</h4>
                                        <p className='mt-2'>{data.para}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Course