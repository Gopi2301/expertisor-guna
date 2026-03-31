import React from 'react'
import Marquee from 'react-fast-marquee'

const Review = ({children,direction}) => {
  return (
    <div className=''>
      <Marquee speed={"50"} pauseOnHover direction={direction}>
         {children}
      </Marquee>
    </div>  )
}

export default Review