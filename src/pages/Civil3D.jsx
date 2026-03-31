// import CoursePreview from '../components/CoursePreview'
// import ReviewOnly from '../components/ReviewOnly'
// import PassiveIncome from '../components/AffilateComponents/PassiveIncome'
// import AboutUs from '../components/HomeComponents/AboutUs'
// import FreAQ from '../components/AffilateComponents/FreAQ'
// import OfferBanner from '../components/OfferBanner'
// import { pages } from '../constants/pages'
// import Mentor from '../components/Mentor'
// import Hero from '../components/Civil3DComponents/Hero'
// import Rating from '../components/Rating'
// import CivilDemands from '../components/Civil3DComponents/CivilDemands'
// import Course from '../components/ThreeDMaxComponents/Course'



// const Civil3D = () => {
//     return (
//         <div>
//             <Hero data={pages?.civil3d?.hero_section} />
//             <Rating data={pages.civil3d.rating_sec}/>
//             <CivilDemands data={pages.civil3d.civil_demands}/>
//             {/* <CourseFor data={pages.civil3d.course_for}/> */}
//             <div className='pb-20  lg:pb-[160px]'>
//                 <CoursePreview lessons_data={pages.civil3d.lessons_comp} />
//             </div>
//             <Mentor data={pages.civil3d.mentor_section} />
//             {/* <StudentsSay students_say={pages.marketing_affilate.students_say_video} /> */}
//             <Course course_data={pages.civil3d.course_section} />
//             <ReviewOnly review={pages.civil3d.course_review} />
//             <PassiveIncome p_income={pages.civil3d.passive_income} />
//             <AboutUs />
//             <FreAQ data={pages.civil3d.FAQ} />
//             <div className="fixed bottom-0 left-0 w-full z-[1]">
//                 <OfferBanner offer_detail={pages.civil3d.OfferBanner} />
//             </div>
//         </div>
//     )
// }

// export default Civil3D







import CoursePreview from '../components/CoursePreview';
import ReviewOnly from '../components/ReviewOnly';
import PassiveIncome from '../components/AffilateComponents/PassiveIncome';
import AboutUs from '../components/HomeComponents/AboutUs';
import FreAQ from '../components/AffilateComponents/FreAQ';
import OfferBanner from '../components/OfferBanner';
import Mentor from '../components/Mentor';
import Hero from '../components/Civil3DComponents/Hero';
import Rating from '../components/Rating';
import CivilDemands from '../components/Civil3DComponents/CivilDemands';
import Course from '../components/ThreeDMaxComponents/Course';

// ⬅️ Civil3D now receives whole data through props
const Civil3D = ({ data }) => {

    // 🎯 Destructure all child props here
    const {
        hero_section,
        rating_sec,
        civil_demands,
        lessons_comp,
        mentor_section,
        course_section,
        course_review,
        passive_income,
        FAQ,
        OfferBanner: offerBannerData,
        deal_course_id, // Zoho lookup field
    } = data;

    return (
        <div>
            <Hero data={{ ...hero_section, deal_course_id }} />

            <Rating data={rating_sec} />

            <CivilDemands data={civil_demands} />

            <div className='pb-20 lg:pb-[160px]'>
                <CoursePreview lessons_data={lessons_comp} />
            </div>

            <Mentor data={mentor_section} />

            <Course course_data={course_section} />

            <ReviewOnly review={course_review} />

            <PassiveIncome p_income={passive_income} courseId={deal_course_id} />

            <AboutUs />

            <FreAQ data={FAQ} />

            <div className="fixed bottom-0 left-0 w-full z-[1]">
                <OfferBanner offer_detail={offerBannerData} courseId={deal_course_id} />
            </div>
        </div>
    );
};

export default Civil3D;
