// import React from 'react'
// import { pages } from '../../constants/pages'
// import StartButton from '../StartButton'
// import Download from '../Download'
// import { assets } from '../../assets/assets'

// const Hero = ({ data }) => {
//     return (
//         <div className=' relative w-full h-screen '>
//             <video src={assets.Blockchain} autoPlay loop muted className='w-full h-full object-cover ' />

//             <div className='px-3 sm:px-14 lg:px-20 mt-10 sm:mt-14 absolute top-0 flex flex-col  items-center h-full w-full'>
//                 <div className='flex w-full justify-center items-center'>
//                     <div className='flex gap-2 p-2 sm:bg-[#1B1B1B99] sm:border border-gray-600 rounded-lg items-center'>
//                         <img src={data.icon.threed_icon} alt="" />
//                         <p className='font-inter font-normal text-[12px] sm:text-[16px] inline'>{data.icon.para}</p>
//                     </div>
//                 </div>

//                 <div className='my-5 md:my-10 '>
//                     <h2 className='font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight tracking-[0%] text-center'><span className='lg:block'>Tired of Chasing Competitive Tech Jobs?</span> <span className='lg:block'><span className='text-yellow'>Learn Blockchain</span> and Step Into the Future of</span> <span className='lg:block'><span className='text-yellow'>High Paying</span> Digital Careers.</span></h2>
//                     <p className='mt-3 md:mt-5 font-inter font-normal text-[14px] sm:text-[20px] leading-tight tracking-[0%] text-center text-[#DBDBDB]'>{data.para}</p>
//                 </div>

//                 <div className='sm:flex-row flex flex-col   justify-center gap-3 w-full'>
//                     <StartButton data={pages?.blockchain?.start_button} />

//                     <Download data={pages?.blockchain?.download} />
//                 </div>

//                 <div className="flex justify-center sm:gap-2 flex-wrap mt-4 ">
//                     {data.features.map((data, i) => (
//                         <div key={i} className="flex items-center gap-2 p-2">
//                             <img src={data.i} alt="" />
//                             <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] whitespace-nowrap">
//                                 {data.para}
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//             </div>

//         </div>)
// }

// export default Hero

import React, { useState } from "react";
import StartButton from "../StartButton";
import Download from "../Download";
import { assets } from "../../assets/assets";
import ApplyModal from "../Simple_elite_temp_Components.jsx/ApplyModal";

const Hero = ({ data }) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  // highlight renderer
  const renderHeading = (head, highlights) => {
    if (!highlights || highlights.length === 0) return head;

    let result = [];
    let remaining = head;

    highlights.forEach((word, index) => {
      const parts = remaining.split(word);

      result.push(parts[0]); // normal text
      result.push(
        <span key={index} className="text-yellow">
          {word}
        </span>,
      );

      remaining = parts[1]; // continue after highlight
    });

    result.push(remaining); // leftover text
    return result;
  };

  const { icon, heading, highlights, para, features } = data;

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        src={assets.Blockchain}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      {/* Content */}
      <div className="px-3 sm:px-14 lg:px-20 mt-10 sm:mt-14 absolute top-0 flex flex-col items-center h-full w-full">
        {/* Tag Box */}
        <div className="flex w-full justify-center items-center">
          <div className="flex gap-2 p-2 sm:bg-[#1B1B1B99] sm:border border-gray-600 rounded-lg items-center">
            <img src={icon.threed_icon} alt="tag" />
            <p className="font-inter text-[12px] sm:text-[16px]">{icon.para}</p>
          </div>
        </div>

        {/* Heading + Description */}
        <div className="my-5 md:my-10 text-center">
          <h2 className="font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight xl:mx-48">
            {renderHeading(heading, highlights)}
          </h2>

          <p className="mt-3 md:mt-5  font-inter text-[14px] sm:text-[20px] text-[#DBDBDB]">
            {para}
          </p>
        </div>

        {/* Buttons */}
        <div className="sm:flex-row flex flex-col justify-center gap-3 w-full">
          <StartButton
            data={data.start_button}
            onClick={() => setIsApplyOpen(true)}
          />
          {/* <Download data={data.download} /> */}
        </div>

        {/* Features */}
        <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
          {features.map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              {Array.isArray(item.i) ? (
                <div className="flex -space-x-4">
                  {item.i.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-black object-cover shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={item.i}
                  alt=""
                  className="w-8 h-8 object-contain shrink-0"
                />
              )}
              <p className="font-inter text-[14px] sm:text-[16px] whitespace-nowrap">
                {item.para}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal open={isApplyOpen} onClose={() => setIsApplyOpen(false)} courseId={data.courseId || data.deal_course_id} />
    </div>
  );
};

export default Hero;
