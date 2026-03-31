// import CourseRatings from '../components/CourseComponents/CourseRatings';
// import Instructor from '../components/CourseComponents/Instructor';
// import Reviews from '../components/CourseComponents/Reviews';
// import Skill from '../components/CourseComponents/Skill';
// import VidReview from '../components/CourseComponents/VidReview';
// import Yvideo from '../components/CourseComponents/Yvideo';

// const Course = () => {



//     return (
//         <div>
//             <div className='px-3 sm:px-14 lg:px-20 py-48'>
//                 <div className='flex'>
//                     <div className='w-[70%]'>
//                         <div>
//                             <Yvideo />
//                         </div>
//                         <Reviews />
//                         <Skill />
//                         <Instructor />
//                         <div className='bg-[#0C0C0C] p-4 rounded-lg'>
//                             <CourseRatings />
//                             <VidReview/>
//                         </div>
//                     </div>

//                     <div className='w-[25%]'></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Course











import { Outlet } from 'react-router-dom';
import CourseRatings from '../components/CourseComponents/CourseRatings';
import Instructor from '../components/CourseComponents/Instructor';
import Skill from '../components/CourseComponents/Skill';
import Yvideo from '../components/CourseComponents/Yvideo';
import VidReview from '../components/CourseComponents/VidReview';
import RecomCourse from '../components/CourseComponents/RecomCourse';
import { assets } from '../assets/assets';
import CourseOfferCard from '../components/CourseComponents/CourseOfferCard';
import BundleCourse from '../components/CourseComponents/BundleCourse';

const Course = () => {
  return (
    <div className='px-3 sm:px-14 lg:px-10 xl:px-20'>
      <div className='flex justify-between'>
        <div className='w-full lg:w-[68%]'>
          <Yvideo />
          <div className='lg:hidden block'>
            <CourseOfferCard />
          </div>
          <Skill />
          <Instructor />
          <div className='bg-[#0C0C0C] p-4 rounded-lg'>
            <CourseRatings />
            {/* This is the tabs + <Outlet /> for Videos/Reviews */}
            <VidReview />
            <Outlet />
          </div>
          <div className='lg:hidden block'>
            <BundleCourse />
          </div>
          <RecomCourse />
        </div>

        <div className='lg:w-[30%] '>

          <div className="hidden lg:block">
            <CourseOfferCard />
            <BundleCourse />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Course;

