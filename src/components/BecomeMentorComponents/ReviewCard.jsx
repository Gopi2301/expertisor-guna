import React from 'react'

const ReviewCard = ({data}) => {
  return (
    <div>
        <div className='flex flex-col justify-between w-[298px] h-[284px] bg-[#161616] p-4 mr-4 rounded-lg'> 
            <div>
                <img src={data.i_comma} alt="" />
                <h5 className='mt-4 font-inter font-semibold text-[16px] leading-5 tracking-normal'>{data.title}</h5>
                <p className='mt-2 text-[#B8B8B8] font-inter font-normal text-[14px] leading-5 tracking-normal line-clamp-5'>{data.desc}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <img src={data.mentor_img} alt="" />
                <div>
                    <h6 className='font-inter font-semibold text-[16px] leading-none tracking-[-0.02em]'>{data.name}</h6>
                    <p className='mt-[4px] text-[#DEDEDE] font-inter font-normal text-[14px] leading-none tracking-[-0.02em]'>{data.domain}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard