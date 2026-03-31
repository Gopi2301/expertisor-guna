import React from 'react'
import OurMentor from '../OurMentor'
import Mission from '../Mission'


const Mentor = ({ mentor }) => {
    return (
        <>
            <div className='px-3 sm:px-14 lg:px-20 bg-black'>
                <div className="mb-[40px] sm:mb-[71px]">
                    <h2 className='font-clash font-semibold not-italic text-[28px] md:text-[40px] leading-[100%] tracking-[2%] text-center align-middle uppercase'>Meet Your <span className='text-yellow'>Mentor</span></h2>
                </div>
                <OurMentor mentor_det={mentor} />
                <Mission mission_det={mentor.mission} />
            </div>
        </>
    )
}

export default Mentor