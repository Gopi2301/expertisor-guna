// import React, { useState } from 'react'
// import { NavLink, Route, Routes } from 'react-router-dom'
// import { FaCheck, FaSearch, } from 'react-icons/fa';
// import Videos from './Videos';
// import StudRev from './StudRev';


// const VidReview = () => {
//         const [showDropdown, setShowDropdown] = useState(false);
//         const [selected, setSelected] = useState("Best Match");
//         const options = ["Best Match", "Newest", "Most Popular"];


//         const activeClass="text-white font-inter font-semibold text-[20px] leading-[28px] tracking-[0] align-middle px-3 pb-1 border-b-2 border-b-yellow"
//         const inActiveClass="text-gray-200 font-inter font-normal text-[20px] leading-[28px] tracking-[0] align-middle px-3 pb-1"


//     return (
//         <div>
//             <div className='flex justify-between my-8 '>
//                 <ul className='flex '>
//                     <li><NavLink to='/' className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Videos</NavLink></li>
//                     <li><NavLink to='/course/review' className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Reviews</NavLink></li>
//                 </ul>

//                 <div className=' flex justify-end'>
//                     <div className="relative inline-flex text-left text-white  items-center gap-3 ">
//                         <label className="text-sm mr-2 md:block hidden">Sort by:</label>

//                         <div
//                             className="bg-[#1a1a1a] px-2 py-2 rounded-md border border-[#2c2c2c] cursor-pointer flex items-center justify-between min-w-[140px]"
//                             onClick={() => setShowDropdown((prev) => !prev)}
//                             onMouseEnter={() => setShowDropdown(true)}
//                         >
//                             <div>{selected}</div>
//                             <div className=" text-gray-400">&#9662;</div>

//                             {showDropdown && (
//                                 <div
//                                     className="absolute top-12 mt-2 left-0 w-full bg-black border border-[#2c2c2c] rounded-md shadow-md z-10"
//                                     onMouseEnter={() => setShowDropdown(true)}
//                                     onMouseLeave={() => setShowDropdown(false)}
//                                 >
//                                     {options.map((option) => (
//                                         <div
//                                             key={option}
//                                             onClick={() => {
//                                                 setSelected(option);
//                                                 setShowDropdown(true);
//                                             }}
//                                             className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-[#333] ${selected === option ? "text-white" : "text-gray-400"
//                                                 }`}
//                                         >
//                                             <span>{option}</span>
//                                             {selected === option && <FaCheck className="text-white text-xs" />}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <Routes>
//                     <Route path='/' element={<Videos/>}/>
//                     <Route path='/course/review' element={<StudRev/>}/>
//                 </Routes>
//             </div>
//         </div>
//     )
// }


// export default VidReview











import { NavLink, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import React, { useState } from 'react';

const VidReview = () => {
  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("Best Match");
  const options = ["Best Match", "Newest", "Most Popular"];

  const activeClass = "text-white font-inter font-semibold text-[16px] sm:text-[20px] leading-[28px] px-3 pb-1 border-b-2 border-b-yellow";
  const inActiveClass = "text-gray-200 font-inter font-normal text-[16px] sm:text-[20px] leading-[28px] px-3 pb-1";

  return (
    <div>
      <div className='flex justify-between my-8 items-center'>
        <ul className='flex'>
          <li>
            <NavLink to={`/course/${id}`} end className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink to={`/course/${id}/review`} className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <div className='flex justify-end'>
          <div className="relative inline-flex text-left text-white items-center gap-3">
            <label className="text-sm mr-2 md:block hidden">Sort by:</label>

            <div
              className="bg-[#1a1a1a] px-2 py-2 rounded-md border border-[#2c2c2c] cursor-pointer flex items-center justify-between min-w-[140px]"
              onClick={() => setShowDropdown((prev) => !prev)}
              onMouseEnter={() => setShowDropdown(true)}
            >
              <div>{selected}</div>
              <div className="text-gray-400">&#9662;</div>

              {showDropdown && (
                <div
                  className="absolute top-12 mt-2 left-0 w-full bg-black border border-[#2c2c2c] rounded-md shadow-md z-10"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {options.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSelected(option);
                        setShowDropdown(true);
                      }}
                      className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-[#333] ${selected === option ? "text-white" : "text-gray-400"}`}
                    >
                      <span>{option}</span>
                      {selected === option && <FaCheck className="text-white text-xs" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidReview;
