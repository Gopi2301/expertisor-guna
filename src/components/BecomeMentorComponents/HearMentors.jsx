import React from 'react'
import Heading from '../Heading'
import { pages } from '../../constants/pages'
import Review from './Review'
import ReviewCard from './ReviewCard'
import ReviewOnly from '../ReviewOnly'


const HearMentors = () => {
    return (
        <div>
            <div className='pb-[80px] md:pb-[120px] '>
                <div className='px-3 sm:px-14 lg:px-20 mb-10 md:mb-14'>
                    <Heading head={pages.become_mentors.hear_from_mentors.title} highlights={pages.become_mentors.hear_from_mentors.highlights} p1={pages.become_mentors.hear_from_mentors.p1} />
                </div>
                {/* <Review direction={"right"}>
                    {
                        pages.become_mentors.hear_from_mentors.review.map((data, i) => (
                            <ReviewCard data={data} key={i} />
                        ))
                    }
                </Review> */}

                <ReviewOnly review={pages.become_mentors.hear_from_mentors.review}/>

            </div>
        </div>)
}

export default HearMentors