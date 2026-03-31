import React from 'react'
import FeelingStuck from '../components/AmazonComponents/FeelingStuck'
import Works from '../components/AffilateComponents/Works'
import { pages } from '../constants/pages'
import Mentor from '../components/Mentor'
import StudentsSay from '../components/HomeComponents/StudentsSay'
import AffiliateReview from '../components/AffilateComponents/AffiliateReview'
import AboutUs from '../components/HomeComponents/AboutUs'
import FreAQ from '../components/AffilateComponents/FreAQ'
import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
import OfferBanner from '../components/OfferBanner'
import AmazonAnimation from '../components/AmazonComponents/AmazonAnimation'
import ReviewOnly from '../components/ReviewOnly'
import CoursePreview from '../components/CoursePreview'


const AmazonCourse = () => {
  return (
    <div>
      <AmazonAnimation />
      <FeelingStuck />
      <Works works={pages.Amazon_page.works} />
      <div className='pb-24 sm:pb-20 md:pb-[120px]'>
        <CoursePreview lessons_data={pages.Amazon_page.lessons_comp} />
      </div>
      <Mentor data={pages.Amazon_page.mentor_section} />
      {/* <StudentsSay students_say={pages.Amazon_page.students_say_video} /> */}
      <ReviewOnly review={pages.Amazon_page.course_review} />
      <PassiveIncome p_income={pages.Amazon_page.passive_income} courseId={pages.Amazon_page.deal_course_id} />
      <AboutUs />
      <FreAQ data={pages.Amazon_page.FAQ} />
      <div className="fixed bottom-0 left-0 w-full z-[1]">
        <OfferBanner offer_detail={pages.Amazon_page.OfferBanner} courseId={pages.Amazon_page.deal_course_id} />
      </div>
    </div>
  )
}

export default AmazonCourse