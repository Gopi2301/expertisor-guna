import React from 'react'

const CourseFor = ({data}) => {
    
    return (
        <div className='px-3 sm:px-14 lg:px-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                <div>
                    <h3>Who is This <span className='text-yellow'>course</span> For?</h3>
                    <p>{data.para}</p>
                    <div className='flex flex-wrap gap-3'>
                        { 
                           data.audience.map((data,i)=>(
                            <div key={i} className='flex p-1 bg-red-800'>
                                <img src="" alt="" />
                                <p>{data}</p>
                            </div>
                           )) 
                        }
                    </div>
                </div>

                <div className='flex justify-end'>
                    <img src={data.stud_image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default CourseFor