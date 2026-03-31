// import React from 'react'
// import Hero from '../components/ThreeDMaxComponents/Hero'
// import SoftwareScroll from '../components/ThreeDMaxComponents/SoftwareScroll'
// import Course from '../components/ThreeDMaxComponents/Course'
// // import Mentor from '../components/ThreeDMaxComponents/Mentor'
// import Mentor from '../components/Mentor'
// import StudentsSay from '../components/HomeComponents/StudentsSay'
// import AffiliateReview from '../components/AffilateComponents/AffiliateReview'
// import { pages } from '../constants/pages'
// import AboutUs from '../components/HomeComponents/AboutUs'
// import FreAQ from '../components/AffilateComponents/FreAQ'
// import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
// import OfferBanner from '../components/OfferBanner'
// import BestMentors from '../components/BestMentors'
// import CoursePreview from '../components/CoursePreview'
// import ReviewOnly from '../components/ReviewOnly'



// const ThreeDMax = () => {
//   return (
//     <>
//       <Hero />
//       {/* <BestMentors/> */}
//       <SoftwareScroll />
//       <Course course_data={pages.ThreeDMax.course_section} />
//       <div className='pb-24 sm:pb-20 md:pb-[120px]'>
//         <CoursePreview lessons_data={pages.ThreeDMax.lessons_comp} />
//       </div>
//       <Mentor data={pages.ThreeDMax.mentor_section} />
//       {/* <StudentsSay students_say={pages.ThreeDMax.students_say_video} /> */}
//       {/* <AffiliateReview review={pages.ThreeDMax.course_review} /> */}
//       <ReviewOnly review={pages.ThreeDMax.course_review}/>
//       <PassiveIncome p_income={pages.ThreeDMax.passive_income} />
//       <AboutUs />
//       <FreAQ data={pages.ThreeDMax.FAQ} />
//       <div className="fixed bottom-0 left-0 w-full z-[1]">
//         <OfferBanner offer_detail={pages.ThreeDMax.OfferBanner} />
//       </div>
//     </>
//   )
// }


// export default ThreeDMax






import React from 'react';
import Hero from '../components/ThreeDMaxComponents/Hero';
import SoftwareScroll from '../components/ThreeDMaxComponents/SoftwareScroll';
import Course from '../components/ThreeDMaxComponents/Course';
import Mentor from '../components/Mentor';
import AboutUs from '../components/HomeComponents/AboutUs';
import FreAQ from '../components/AffilateComponents/FreAQ';
import PassiveIncome from '../components/AffilateComponents/PassiveIncome';
import OfferBanner from '../components/OfferBanner';
import CoursePreview from '../components/CoursePreview';
import ReviewOnly from '../components/ReviewOnly';

const ThreeDMax = ({ data }) => {

  // ✅ Destructure everything from `pages.ThreeDMax`
  const {
    hero_section,
    software_scroll,
    course_section,
    lessons_comp,
    mentor_section,
    course_review,
    passive_income,
    FAQ,
    OfferBanner: offerBannerData,
    deal_course_id, // Zoho lookup field
  } = data;

  return (
    <>
      {/* HERO SECTION */}
      <Hero data={{ ...hero_section, deal_course_id }} />

      {/* SOFTWARE SCROLL SECTION */}
      <SoftwareScroll data={software_scroll} />

      {/* COURSE SECTION */}
      <Course course_data={course_section} />

      {/* COURSE PREVIEW SECTION */}
      <div className='pb-24 sm:pb-20 md:pb-[120px]'>
        <CoursePreview lessons_data={lessons_comp} />
      </div>

      {/* MENTOR SECTION */}
      <Mentor data={mentor_section} />

      {/* <StudentsSay students_say={pages.ThreeDMax.students_say_video} /> */}


      {/* COURSE REVIEW SECTION */}
      <ReviewOnly review={course_review} />

      {/* PASSIVE INCOME SECTION */}
      <PassiveIncome p_income={passive_income} courseId={deal_course_id} />

      {/* ABOUT US SECTION */}
      <AboutUs />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FreAQ data={FAQ} />

      {/* FIXED OFFER BANNER */}
      <div className="fixed bottom-0 left-0 w-full z-[1]">
        <OfferBanner offer_detail={offerBannerData} courseId={deal_course_id} />
      </div>
    </>
  );
};

export default ThreeDMax;
