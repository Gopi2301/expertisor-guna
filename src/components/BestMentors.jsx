import React from 'react'
import Heading from './Heading'
import { pages } from '../constants/pages'


const BestMentors = () => {
  return (
    <div className='px-3 sm:px-14 lg:px-20 py-7'>
        <Heading head={pages.best_mentors.title.head} highlights={pages.best_mentors.title.highlights} p1={pages.best_mentors.title.p1}/>

        <div>
            
        </div>
        
    </div>
  )
}

export default BestMentors