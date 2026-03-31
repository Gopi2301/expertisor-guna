import React from 'react'
import Hero from '../components/AffilateComponents/Hero'
import System from '../components/AffilateComponents/System'
import Works from '../components/AffilateComponents/Works'
import Mentor from '../components/Mentor'
import StudentsSay from '../components/HomeComponents/StudentsSay'
import AboutUs from '../components/HomeComponents/AboutUs'
import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
import FreAQ from '../components/AffilateComponents/FreAQ'
import AffiliateReview from '../components/AffilateComponents/AffiliateReview'
import { pages } from '../constants/pages'
import OfferBanner from '../components/OfferBanner'
import CoursePreview from '../components/CoursePreview'


const AffilateMarketing = () => {
  return (
    <div>
      <Hero />
      <System />
      <Works works={pages.marketing_affilate.works} />
      <div className='pb-24 sm:pb-20 md:pb-[120px]'>
      <CoursePreview lessons_data={pages.marketing_affilate.lessons_comp} />
      </div>
      <Mentor data={pages.marketing_affilate.mentor_section}/>
      {/* <StudentsSay students_say={pages.marketing_affilate.students_say_video} /> */}
      <AffiliateReview review={pages?.marketing_affilate?.affiliate_review} />
      <PassiveIncome p_income={pages.marketing_affilate.passive_income} courseId={pages.marketing_affilate.deal_course_id} />
      <AboutUs />
      <FreAQ data={pages.marketing_affilate.FAQ} />
      <div className="fixed bottom-0 left-0 w-full z-[1]">
        <OfferBanner offer_detail={pages.marketing_affilate.OfferBanner} courseId={pages.marketing_affilate.deal_course_id} />
      </div>
    </div>
  )
}

export default AffilateMarketing