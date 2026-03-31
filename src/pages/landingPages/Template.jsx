import Hero from '../../components/TemplateComponents/Hero';
import Mentor from '../../components/Mentor';
import AboutUs from '../../components/HomeComponents/AboutUs';
import FreAQ from '../../components/AffilateComponents/FreAQ';
import PassiveIncome from '../../components/TemplateComponents/PassiveIncome';
import CoursePreview from '../../components/CoursePreview';
import ReviewOnly from '../../components/ReviewOnly';
import Rating from '../../components/SolidworksComponents/Rating';
import CivilDemands from '../../components/Civil3DComponents/CivilDemands';
import StudentsSay from '../../components/HomeComponents/StudentsSay';
import ApplyModal from '../../components/TemplateComponents/ApplyModal';
import { useFormContext } from '../../context/FormContext';
import OfferBanner from '../../components/TemplateComponents/OfferBanner';



const Template = ({ data }) => {

    const { showApplyModal, setShowApplyModal } = useFormContext()

    const {
        hero_section,
        rating_sec,
        demands,
        solidworks_demands,
        lessons_comp,
        mentor_section,
        students_say_video,
        course_review,
        passive_income,
        FAQ,
        OfferBanner: offerBannerData
    } = data || {};

    // Use demands or solidworks_demands as fallback
    const demandsData = demands || solidworks_demands;

    return (
        <>
            {/* HERO SECTION */}
            {hero_section && <Hero data={hero_section} />}

            {rating_sec && <Rating data={rating_sec} />}

            {demandsData && <CivilDemands data={demandsData} />}

            {/* COURSE PREVIEW SECTION */}
            {lessons_comp && (
                <div className='pb-24 sm:pb-20 md:pb-[120px]'>
                    <CoursePreview lessons_data={lessons_comp} />
                </div>
            )}

            {/* MENTOR SECTION */}
            {mentor_section && <Mentor data={mentor_section} />}

            {students_say_video && <StudentsSay students_say={students_say_video} />}


            {/* COURSE REVIEW SECTION */}
            {course_review && <ReviewOnly review={course_review} />}

            {/* PASSIVE INCOME SECTION */}
            {passive_income && <PassiveIncome p_income={passive_income} />}

            {/* ABOUT US SECTION */}
            <AboutUs />

            {/* FREQUENTLY ASKED QUESTIONS */}
            {FAQ && <FreAQ data={FAQ} />}

            {/* FIXED OFFER BANNER */}
            {offerBannerData && (
                <div className="fixed bottom-0 left-0 w-full z-[1]">
                    <OfferBanner offer_detail={offerBannerData} />
                </div>
            )}

            {/* Modal */}
            <ApplyModal
                open={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                courseId={data?.deal_course_id}
            />
        </>
    );
};

export default Template;
