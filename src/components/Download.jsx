import React from 'react'
import { pages } from '../constants/pages'
import { assets } from '../assets/assets'

const Download = ({ data }) => {
  // const { link, name } = data
  // const l = link || "no"
  // const n = name || "no"
  return (
    <div>
      <a
        href={data?.link}
        target="_blank"
        download
        className='flex justify-center gap-1 rounded-[4px] py-[12px] sm:py-[14px] px-[25px] items-center  bg-[#3E3E3E99] w-full'>
        <span className='font-inter font-normal text-[18px] leading-[100%] tracking-[0%] align-middle'>{data?.name}</span>
        <img src={assets.download} alt="" />
      </a>
    </div>
  )
}


export default Download