// import CoursePreview from '../components/CoursePreview'
// import ReviewOnly from '../components/ReviewOnly'
// import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
// import AboutUs from '../components/HomeComponents/AboutUs'
// import FreAQ from '../components/AffilateComponents/FreAQ'
// import OfferBanner from '../components/OfferBanner'
// import { pages } from '../constants/pages'
// import Mentor from '../components/Mentor'
// import Hero from '../components/BlockchainComponents/Hero'
// import Rating from '../components/Rating'
// import CivilDemands from '../components/Civil3DComponents/CivilDemands'
// import StudentsSay from '../components/HomeComponents/StudentsSay'




// const Blockchain = () => {
//     return (
//         <div>
//             <Hero data={pages?.blockchain?.hero_section} />
//             <Rating data={pages.blockchain.rating_sec}/>
//             <CivilDemands data={pages.blockchain.civil_demands}/>
//             <div className='pb-20  lg:pb-[160px]'>
//                 <CoursePreview lessons_data={pages.blockchain.lessons_comp} />
//             </div>
//             <Mentor data={pages.blockchain.mentor_section} />
//             <StudentsSay students_say={pages.marketing_affilate.students_say_video} />
//             <ReviewOnly review={pages.blockchain.course_review} />
//             <PassiveIncome p_income={pages.blockchain.passive_income} />
//             <AboutUs />
//             <FreAQ data={pages.blockchain.FAQ} />
//             <div className="fixed bottom-0 left-0 w-full z-[1]">
//                 <OfferBanner offer_detail={pages.blockchain.OfferBanner} />
//             </div>
//         </div>
//     )
// }

// export default Blockchain










// Blockchain.jsx
import CoursePreview from '../components/CoursePreview'
import ReviewOnly from '../components/ReviewOnly'
import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
import AboutUs from '../components/HomeComponents/AboutUs'
import FreAQ from '../components/AffilateComponents/FreAQ'
import OfferBanner from '../components/OfferBanner'
import Mentor from '../components/Mentor'
import Hero from '../components/BlockchainComponents/Hero'
import Rating from '../components/Rating'
import CivilDemands from '../components/Civil3DComponents/CivilDemands'
import StudentsSay from '../components/HomeComponents/StudentsSay'

const Blockchain = ({ data }) => {
    const p = data

    return (
        <div>
            <Hero data={{ ...p?.hero_section, deal_course_id: p?.deal_course_id }} />
            <Rating data={p?.rating_sec} />
            <CivilDemands data={p?.civil_demands} />
            <div className="pb-20 lg:pb-[160px]">
                <CoursePreview lessons_data={p?.lessons_comp} />
            </div>
            <Mentor data={p?.mentor_section} />
            {/* <StudentsSay students_say={p?.students_say_video} /> */}
            <ReviewOnly review={p?.course_review} />
            <PassiveIncome p_income={p?.passive_income} courseId={p?.deal_course_id} />
            <AboutUs />
            <FreAQ data={p?.FAQ} />

            <div className="fixed bottom-0 left-0 w-full z-[1]">
                <OfferBanner offer_detail={p?.OfferBanner} courseId={p?.deal_course_id} />
            </div>
        </div>
    )
}

export default Blockchain
