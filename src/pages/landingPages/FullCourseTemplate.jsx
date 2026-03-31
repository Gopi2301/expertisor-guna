import React from 'react';
import { FormProvider, useFormContext } from '../../context/FormContext';
import Hero from '../../components/Template4Components/Hero';
import PassiveIncome from '../../components/Template4Components/PassiveIncome';
import OfferBanner from '../../components/Template4Components/OfferBanner';
import ApplyModal from '../../components/Template4Components/ApplyModal';
import Mentor from '../../components/Mentor';
import AboutUs from '../../components/HomeComponents/AboutUs';
import FreAQ from '../../components/AffilateComponents/FreAQ';
import CoursePreview from '../../components/CoursePreview';
import ReviewOnly from '../../components/ReviewOnly';
import Rating from '../../components/SolidworksComponents/Rating';
import CivilDemands from '../../components/Civil3DComponents/CivilDemands';
import StudentsSay from '../../components/HomeComponents/StudentsSay';
import { assets } from '../../assets/assets';

// Default data for preview
const defaultHeroSection = {
    head: "Master the skills that get you hired in today's competitive market",
    highlights: ["Master", "hired"],
    para: "Transform your career with our comprehensive training program. Learn from industry experts and get hands-on experience.",
    start_button: {
        name: "Apply Now",
        useModal: true
    },
    download: {
        name: "Download Brochure",
        link: "#"
    },
    icon: {
        threed_icon: assets.threemax_icon,
        para: "Learn from Scratch"
    },
    features: [
        { i: assets.Headset, para: "Lifetime support" },
        { i: assets.ArrowClockwise, para: "Monthly mentor Q&A sessions" },
        { i: assets.stud_icon, para: "Community access" }
    ]
};

const defaultPassiveIncome = {
    head: "Ready to kickstart your career?",
    highlights: ["kickstart", "career"],
    p1: "Get ready to transform your skills! ",
    p2: "Don't forget to use the coupon before it expires!",
    bg: assets.sw_bg,
    start_button: {
        link: "#",
        name: "Start Your Journey"
    },
    card: {
        price: "₹ 6,999",
        original_price: "₹ 12,499",
        name: "Course Mastery Program",
        token_img: assets.token,
        time: assets.time,
        coupon_code: "OFFER44",
        discount_percent: "44%",
        expires_in: "1 days 23 hours 59 minutes"
    },
    show_form: true,
    what_you_get: {
        head: "What you'll get",
        tick_img: assets.verified,
        benefit: [
            "24/7 dedicated support",
            "Monthly mentor live Career sessions",
            "Direct mentor access"
        ]
    }
};

const defaultOfferBanner = {
    title: "Course Mastery Program",
    coupen_code: "OFFER44",
    discount_percent: 44,
    no_days: 2,
    d_broucher: ""
};

/**
 * Template 4: Full Course Template
 * Complete landing page with all course sections
 */
const FullCourseTemplateContent = ({ data, courseId }) => {
    const { showApplyModal, setShowApplyModal } = useFormContext();

    // Merge provided data with defaults
    const hero_section = data?.hero_section?.head ? data.hero_section : defaultHeroSection;
    const passive_income = data?.passive_income?.head ? data.passive_income : defaultPassiveIncome;
    const offerBannerData = data?.OfferBanner?.title ? data.OfferBanner : defaultOfferBanner;

    // Extract other optional sections from data
    const {
        rating_sec,
        demands,
        lessons_comp,
        mentor_section,
        students_say_video,
        course_review,
        FAQ
    } = data || {};

    return (
        <>
            {/* HERO SECTION */}
            <Hero data={{ ...hero_section, deal_course_id: courseId }} />

            {/* RATING SECTION */}
            {rating_sec && <Rating data={rating_sec} />}

            {/* DEMANDS SECTION */}
            {demands && <CivilDemands data={demands} />}

            {/* COURSE PREVIEW SECTION */}
            {lessons_comp && (
                <div className='pb-24 sm:pb-20 md:pb-[120px]'>
                    <CoursePreview lessons_data={lessons_comp} />
                </div>
            )}

            {/* MENTOR SECTION */}
            {mentor_section && <Mentor data={mentor_section} />}

            {/* STUDENTS SAY VIDEO SECTION */}
            {students_say_video && <StudentsSay students_say={students_say_video} />}

            {/* COURSE REVIEW SECTION */}
            {course_review && <ReviewOnly review={course_review} />}

            {/* PASSIVE INCOME SECTION */}
            <PassiveIncome p_income={passive_income} />

            {/* ABOUT US SECTION */}
            <AboutUs />

            {/* FREQUENTLY ASKED QUESTIONS */}
            {FAQ && <FreAQ data={FAQ} />}

            {/* FIXED OFFER BANNER */}
            <div className="fixed bottom-0 left-0 w-full z-[1]">
                <OfferBanner offer_detail={offerBannerData} />
            </div>

            {/* Apply Modal */}
            <ApplyModal
                open={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                courseId={courseId}
            />
        </>
    );
};

// Wrap with FormProvider
const FullCourseTemplate = ({ data, courseId }) => {
    return (
        <FormProvider>
            <FullCourseTemplateContent data={data} courseId={courseId} />
        </FormProvider>
    );
};

export default FullCourseTemplate;
