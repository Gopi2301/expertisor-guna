// import React from 'react';

// const ProfileCard = ({ imgSrc }) => {
//   return (
//     <div className="relative group w-full h-full rounded-lg overflow-hidden">
//       {/* Static Image */}
//       <img
//         src={imgSrc}
//         alt="Creator Mentor"
//         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//       />

//       {/* Hover Overlay */}
//       <div className="absolute inset-0 bg-black  flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <h3 className="font-clash font-semibold text-[24px] text-white uppercase mb-2">
//           Creator Mentor
//         </h3>
//         <p className="font-inter text-white text-sm mb-4">
//           Learn from top creators with real-world projects and guided mentorship.
//         </p>
//         <button className="bg-yellow text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition">
//           View Details
//         </button>
//       </div>
//     </div>

//   );
// };

// export default ProfileCard;





// import React from 'react';
// import { assets } from '../../assets/assets';


// const ProfileCard = ({ imgSrc }) => {
//   return (
//     <div className="relative group w-full  overflow-hidden rounded-lg cursor-pointer">
//       {/* Image that slides up fully */}
//       <img
//         src={imgSrc}
//         alt="Creator Mentor"
//         className="
//           w-full h-full object-cover
//           transition-transform duration-500 ease-in-out 
//           group-hover:-translate-y-full 
//         "
//       />


//       {/* Details overlay on bottom without fully blocking image */}
//       <div className="
//         absolute top-0 left-0 w-full
//         p-4
//         opacity-0 group-hover:opacity-100
//         transition-opacity duration-500 ease-in-out
//       ">
//         <div className=''>
//           <div className='flex flex-col '>
//             {/* name */}
//             <div className='flex justify-between'>
//               <div>
//                 <h3 className='font-inter font-semibold xl:text-[36px]'>Sathish PC</h3>
//                 <p className='font-inter font-normal text-[14px] leading-[17.5px]'>Instructor, Java Specialist, YouTuber</p>
//               </div>
//               <img src={assets.settings} alt="" />
//             </div>

//             {/* reviews */}
//             <div className='flex flex-col gap-2 pl-2 py-3'>
//               <div className='flex gap-3 items-center'>
//                 <img src={assets.star_outline} alt="" className='w-5 h-5' />
//                 <p className='font-inter font-normal text-[14px] leading-[17.5px]'>4.7 Ratings</p>
//               </div>
//               <div className='flex gap-3 items-center'>
//                 <img src={assets.star_outline} alt="" className='w-5 h-5' />
//                 <p className='font-inter font-normal text-[14px] leading-[17.5px]'>4.7 Ratings</p>
//               </div>
//               <div className='flex gap-3 items-center'>
//                 <img src={assets.star_outline} alt="" className='w-5 h-5' />
//                 <p className='font-inter font-normal text-[14px] leading-[17.5px]'>4.7 Ratings</p>
//               </div>
//             </div>

//             {/* para */}
//             <p className='line-clamp-3'>A college broken kid with unstable internet and a passion for tech education at the age of 21, I founded Expertisor Academy to transform traditional education making it core, accessible, and fun to learn directly from top tech creator mentors.</p>

//             <div className="flex gap-2 pt-5">
//               <a className="flex items-center gap-1 bg-neutral-800 rounded-md px-1 py-1 text-xs cursor-pointer">
//                 <img src={assets.insta} alt="" />
//                 <span>50.1K</span>
//               </a>
//               <a className="flex items-center gap-1 bg-neutral-800 rounded-md px-1 py-1 text-xs cursor-pointer">
//                 <img src={assets.x} alt="" />
//                 <span>50.1K</span>
//               </a>
//               <a className="flex items-center gap-1 bg-neutral-800 rounded-md px-1 py-1 text-xs cursor-pointer">
//                 <img src={assets.youtube} alt="" />
//                 <span>50.1K</span>
//               </a>
//               <a className="flex items-center gap-1 bg-neutral-800 rounded-md px-1 py-1 text-xs cursor-pointer">
//                 <img src={assets.linkedin} alt="" />
//                 <span>50.1K</span>
//               </a>
//             </div>



//           </div>
//         </div>








//       </div>
//     </div>
//   );
// };

// export default ProfileCard;





import React from 'react';
import { assets } from '../../assets/assets';

const ProfileCard = ({ imgSrc }) => {
  return (
    <div className='flex justify-center '>
      {/* sm:max-h-[400px] sm:max-w-[400px] w-[450px] */}
      {/* group */}
    <div className="relative   sm:max-h-[400px] w-[450px] sm:w-full sm:max-w-[400px]   xl:max-h-none    xl:max-w-none overflow-hidden rounded-lg cursor-pointer ">
      {/* Image slides up on hover */}
      <img
        src={imgSrc}
        alt="Creator Mentor"
        className="
          w-full h-full object-cover
          transition-transform duration-500 ease-in-out
          group-hover:-translate-y-full
        "
      />

      {/* Overlay Content */}
      <div
        className="
          absolute inset-0 flex flex-col justify-between p-4 sm:p-2 md:p-3 lg:p-4 xl:p-7
          bg-black/60 backdrop-blur-sm
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 ease-in-out
          overflow-y-auto rounded-lg border border-[#ADA400] bg-[linear-gradient(180deg,#000000_0%,#1C1800_100%)] 
        "
      >
        <div className='flex flex-col gap-3 '>
          {/* Name + Icon */}
          <div className="flex justify-between items-start ">
            <div>
              <h3 className="font-inter text-yellow font-semibold text-xl sm:text-lg md:text-xl lg:text-[24px] xl:text-[30px] xl:mb-1">
                Sathish PC
              </h3>
              <p className="font-inter font-normal text-[12px] sm:text-[13px] 2xl:text-[16px] text-[#A7A7A7]">
                Instructor, Java Specialist
              </p>
            </div>
            <img src={assets.settings} alt="settings" className="w-9 h-9" />
          </div>

          {/* Ratings */}
          <div className="flex flex-col gap-1 ">
            {['4.7 Ratings', '4.7 Ratings', '4.7 Ratings'].map((text, idx) => (
              <div key={idx} className="flex gap-1 items-center">
                <img src={assets.star_outline} alt="star" className="w-4 h-4" />
                <p className="text-[15px]">{text}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className=" font-inter text-[#A7A7A7] text-[18px] sm:text-[14px] sm:line-clamp-3 mb-2 line-clamp-5    md:line-clamp-5   md:text-[15px] lg:line-clamp-3 xl:line-clamp-5 xl:text-[16px] 2xl:text-[20px] 2xl:line-clamp-5">
A college broken kid with unstable internet and a passion for tech education at the age of 21, I founded Expertisor Academy to transform traditional education making it core, accessible, and fun to learn directly from top tech creator mentors.I founded Expertisor Academy to transform traditional education making it core, accessible, and fun to learn directly from top tech creator mentors.          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-1">
          {[
            { icon: assets.insta, label: '50.1K' },
            { icon: assets.x, label: '50.1K' },
            { icon: assets.youtube, label: '50.1K' },
            { icon: assets.linkedin, label: '50.1K' },
          ].map((item, idx) => (
            <a
              key={idx}
              className="flex items-center gap-1 bg-neutral-800 rounded px-1 py-0.5 text-[11px] cursor-pointer"
            >
              <img src={item.icon} alt="" className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
    </div> 
  );
};

export default ProfileCard;
