




// import React, { useContext } from 'react'
// import { useNavigate,Link } from 'react-router-dom';
// import { CourseContext } from '../../context/CourseContextProvider'
// import BundleCourse from '../CourseComponents/BundleCourse'

// const Courses = ({ name }) => {
//     const { courses, scrollRef } = useContext(CourseContext)
//     const navigate = useNavigate();


//     // Filter courses by mentor name if provided
//     const filteredCourses = courses.filter(course => {
//         const isBundle = course.type.toLowerCase() === 'bundle course';
//         const matchesMentor =
//             name &&
//             course.mentors
//                 .split(',')
//                 .some(mentor => mentor.trim().toLowerCase() === name.toLowerCase());

//         return isBundle || matchesMentor;
//     });



//     return (
//         <div className=' lg:bg-[#0C0C0C]  rounded-lg py-4 '>
//             <div>
//                 <div className='flex justify-between items-center mb-6 px-4 sm:px-10 lg:px-3'>
//                     <p className='font-inter font-semibold text-[18px]'>Courses</p>
//                     <Link
//                         to="/courses"
//                         className="font-inter font-medium text-[14px] leading-[20px] underline"
//                     >
//                         See all
//                     </Link>
//                 </div>
//                 <div className='flex lg:justify-center'>
//                     {filteredCourses.length === 0 ? (
//                         <p className='text-yellow font-medium text-xl text-center'>
//                             Coming Soon
//                         </p>
//                     ) : (
//                         <div ref={scrollRef} className='flex flex-row lg:flex-col gap-4 overflow-x-auto px-4 sm:px-10 lg:px-0 scrollbar-hidden items-stretch'>
//                             {filteredCourses.slice(0, 2).map((data, i) => (
//                                 <BundleCourse
//                                     key={i}
//                                     course={data}
//                                     width="290px"
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div className=" bg-[#F2F2F21A] border border-[#FFFFFF33] rounded-[4px] py-[11px] mt-4 text-center lg:block hidden mx-3">
//                     <button
//                         onClick={() => navigate('/courses')}
//                         className="text-white font-medium"
//                     >
//                         View all courses
//                     </button>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Courses





import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CourseContext } from '../../context/CourseContextProvider';
import BundleCourse from '../CourseComponents/BundleCourse';

const Courses = ({ name }) => {
  const { courses, scrollRef } = useContext(CourseContext);
  const navigate = useNavigate();

  // Detect if screen is large (lg breakpoint: 1024px and above)
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  // Filter courses by mentor name or bundle type
  const filteredCourses = courses.filter(course => {
    const isBundle = course.type.toLowerCase() === 'bundle course';
    const matchesMentor =
      name &&
      course.mentors
        .split(',')
        .some(mentor => mentor.trim().toLowerCase() === name.toLowerCase());

    return isBundle || matchesMentor;
  });

  // Slice only on large screens
  const displayedCourses = isLargeScreen
    ? filteredCourses.slice(0, 2)
    : filteredCourses;

  return (
    <div className="lg:bg-[#0C0C0C] rounded-lg py-4">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-4 sm:px-10 lg:px-3">
          <p className="font-inter font-semibold text-[18px]">Courses</p>
          <Link
            to="/courses"
            className="font-inter font-medium text-[14px] leading-[20px] underline"
          >
            See all
          </Link>
        </div>

        {/* Course List */}
        <div className="flex lg:justify-center">
          {filteredCourses.length === 0 ? (
            <p className="text-yellow font-medium text-xl text-center">
              Coming Soon
            </p>
          ) : (
            <div
              ref={scrollRef}
              className="flex flex-row lg:flex-col gap-4 overflow-x-auto px-4 sm:px-10 lg:px-0 scrollbar-hidden items-stretch"
            >
              {displayedCourses.map((data, i) => (
                <BundleCourse key={i} course={data} width="290px" />
              ))}
            </div>
          )}
        </div>

        {/* View All Button (only on lg) */}
        {isLargeScreen && filteredCourses.length > 2 && (
          <div className="bg-[#F2F2F21A] border border-[#FFFFFF33] rounded-[4px] py-[11px] mt-4 text-center mx-3">
            <button
              onClick={() => navigate('/courses')}
              className="text-white font-medium"
            >
              View all courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
