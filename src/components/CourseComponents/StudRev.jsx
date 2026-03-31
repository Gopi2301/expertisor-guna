import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Rating from './Rating'


const StudRev = () => {
  const [seemore, setSeemore] = useState(true)

  const rev = [
    {
      profile: assets.rev_img,
      name: 'Nolan Siphron',
      days: '5 days ago',
      rating: 3.5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 4.5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 4,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 3.5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 4.5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 4,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
    {
      profile: assets.rev_img,
      name: 'Jaylon Passaquindici Arcand',
      days: '5 days ago',
      rating: 5,
      para: 'Mastering Data Science is an exceptional course that delves deep into the world of machine learning. It covers a wide array of techniques, tools, and best practices tailored for aspiring data scientists. The curriculum is designed to provide both theoretical knowledge and practical skills,',
    },
  ]


  return (
    <div className='text-white'>
      <div>
        {
          (seemore ? rev.slice(0, 4) : rev).map((Review, i) => (
            <div className='mb-6'>
              <div className='flex justify-between'>
                <div className='flex gap-4 items-center'>
                  <img src={Review.profile} alt="" className='w-11 h-11 rounded-full' />
                  <div>
                    <h5 className='mb-1 font-inter text-[16px] leading-[1] font-normal truncate max-w-[160px]'>{Review.name}</h5>
                    <Rating value={Review.rating}/>
                  </div>
                </div>
                <p className='text-[#A7A7A7] font-inter text-[14px] leading-[1] font-normal'>{Review.days}</p>
              </div>

              <div className='mt-3'>
                <p className='font-inter text-[#A7A7A7] text-[16px] leading-[20px] font-normal'>{Review.para}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className='bg-[#242424] rounded-lg mt-4 relative' >
        {seemore && <div className="absolute top-[-81px] left-0 w-full h-20 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none" />}

        <div className='flex gap-2 items-center justify-center py-2 text-white' onClick={() => setSeemore((prev) => !prev)}>
          <p>{seemore ? 'See More' : 'See Less'}</p>
          <img src={assets.down_arrow} alt="" />
        </div>
      </div>


    </div>
  )
}

export default StudRev