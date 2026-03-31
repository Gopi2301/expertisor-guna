// import React from 'react'
// import { pages } from '../../constants/pages'
// import StartButton from '../StartButton'
// import Download from '../Download'
// import { assets } from '../../assets/assets'

// const Hero = () => {
//   return (
//     <>
//       <div className='  relative w-full h-screen'>
//         <video src={assets.videoBg} autoPlay loop muted className='w-full h-full object-cover'/>
//         <div className='px-3 sm:px-14 lg:px-20 absolute top-0 flex flex-col justify-center items-center h-full w-full'>
//           <div className='flex justify-center'>
//             <div className='flex gap-2 p-2 bg-[#02020299] border border-[#FFFFFF] rounded-lg'>
//               <img src={pages.ThreeDMax.hero_section.icon.threed_icon} alt="" />
//               <p>{pages.ThreeDMax.hero_section.icon.para}</p>
//             </div>
//           </div>

//           <div className='my-5 md:my-10'>
//             <h2 className='font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight tracking-[0%] text-center'><span className='lg:block'>Confused by <span className='text-yellow'>complex 3D software</span></span> and don't know where to start?</h2>
//             <p className='mt-3 lg:max-w-6xl md:mt-5 font-inter font-normal text-[14px] sm:text-[20px] leading-tight tracking-[0%] text-center text-[#DBDBDB]'>{pages.ThreeDMax.hero_section.para}</p>
//           </div>

//           <div className='sm:flex-row flex flex-col   justify-center gap-3 w-full'>
//             <StartButton data={pages.ThreeDMax.start_button}/>

//             <Download data={pages.ThreeDMax.download}/>
//           </div>

//           <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
//             {pages.ThreeDMax.hero_section.features.map((data, i) => (
//               <div key={i} className="flex items-center gap-2 p-2">
//                 <img src={data.i} alt="" />
//                 <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] whitespace-nowrap">
//                   {data.para}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default Hero

import React, { useState } from "react";
import StartButton from "../StartButton";
import Download from "../Download";
import { assets } from "../../assets/assets";
import ApplyModal from "../Simple_elite_temp_Components.jsx/ApplyModal";

const Hero = ({ data }) => {
  const { icon, head, highlights, para, features, start_button, download } =
    data;
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // ✅ Highlight selected words inside heading
  const renderHeading = () => {
    if (!head) return null;
    let result = [];
    let remaining = head;

    highlights?.forEach((word, index) => {
      const parts = remaining.split(word);
      result.push(parts[0]); // normal text before highlight
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

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        src={assets.videoBg}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      <div className="px-3 sm:px-14 lg:px-20 absolute top-0 flex flex-col justify-center items-center h-full w-full">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="flex gap-2 p-2 bg-[#02020299] border border-[#FFFFFF] rounded-lg items-center">
            <img
              src={icon?.threed_icon}
              alt=""
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <p className="text-white">{icon?.para}</p>
          </div>
        </div>

        {/* Heading + Paragraph */}
        <div className="my-5 md:my-10 max-w-5xl mx-auto">
          <h2 className="font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight text-center text-white">
            {renderHeading()}
          </h2>

          <p className="mt-3 md:mt-5 font-inter text-[14px] sm:text-[20px] text-center text-[#DBDBDB]">
            {para}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <StartButton
            data={start_button}
            onClick={() => setIsApplyOpen(true)}
          />
          <Download data={download} />
        </div>

        {/* Features */}
        <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
          {features?.map((item, i) => (
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
              <p className="font-inter text-[14px] sm:text-[16px] whitespace-nowrap text-white">
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
