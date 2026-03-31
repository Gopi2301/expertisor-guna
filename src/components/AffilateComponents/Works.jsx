import React from 'react'
import { pages } from '../../constants/pages'
import WorkSteps from '../WorkSteps'
import Heading from '../Heading'

const Works = ({works}) => {
    return (
        <div>
            <div className=" px-3 sm:px-14 lg:px-20 py-20 md:py-24 lg:py-28 bg-black">
                <Heading head={works.work_desc.head} highlights={works.work_desc.highlights} p1={works.work_desc.p1} p2={works.work_desc.p2}/>
                <WorkSteps work_steps={works.work_steps}/>
            </div>
        </div>
    )
}

export default Works