import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const BundleCourse = ({ width, course, onClick }) => {
    // Helper to get mentor image, prioritizing CMS field first
    const getMentorImage = () => {
        if (course.mentor_image) return course.mentor_image; // CMS field
        if (course.ment_icon) return course.ment_icon; // Legacy field
        if (course.instructor_image) return course.instructor_image;
        return assets.profile_icon; // Default fallback
    };

    // Helper to capitalize and format level
    const formatLevel = (level) => {
        if (!level) return 'All levels';
        return level
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Map CMS fields to card display fields
    const displayData = {
        // Title
        domain: course.title || course.domain || 'Untitled Course',

        // Level badge
        level: formatLevel(course.level),

        // Rating - use CMS value or default to 4.9
        rating: course.rating || '4.9',
        // Reviews count - use CMS value if set (even if 0), otherwise generate random
        rating_persons: (course.reviews_count !== null && course.reviews_count !== undefined)
            ? course.reviews_count.toString() + '+'
            : (() => {
                // Generate unique number (1000-2999) based on course slug/title hash
                const str = (course.slug || course.title || course.id || Math.random()).toString();
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) - hash) + str.charCodeAt(i);
                }
                // Ensure positive and within range 1000-2999
                const num = 1000 + (Math.abs(hash) % 2000);
                return num.toString() + '+';
            })(),
        star_i: assets.star_icon || course.star_i,
        bundle_tot_courses: course.module_count || course.bundle_tot_courses || null,
        bundle_i: (course.module_count || course.bundle_tot_courses) ? (assets.bundle_icon || course.bundle_i) : null,
        indi_lang_i: assets.language_icon || course.indi_lang_i,
        lang_detail: course.language || course.lang_detail || 'Tamil',
        hours: course.duration || course.hours || '0h',
        schedule_i: assets.clock_icon || course.schedule_i,
        ment_icon: getMentorImage(),
        mentors: course.instructor || course.mentor_name || course.mentors || 'Instructor',
        more_count: course.more_count || '',
        para: course.subtitle || course.description || course.para || '',
        page_link: course.page_link || `/ courses / ${course.slug || course.id} `
    };

    const card = (
        <div className='h-full'>

            {/* Image */}
            <div className=' h-full flex flex-col p-3 bg-black  rounded-lg text-white text-left cursor-pointer border border-[#7B6E3E] bg-[radial-gradient(circle_at_bottom_center,#705900_0%,rgba(0,0,0,0.3)_38%),radial-gradient(circle_at_top_right,#705900_0%,rgba(0,0,0,0.3)_36%)] bg-blend-screen' style={{ width }}>

                <div>
                    <img src={course.thumbnail || course.img} alt={course.domain || "course"} className="w-full rounded-md" />
                </div>

                <div className='flex flex-col  gap-[6px] mt-2 h-full'>
                    <div className='flex justify-between items-center'>
                        <p className='py-[6.5px] px-[8px] bg-[#00DC281A] text-[#00DC28] rounded-[4px] font-inter font-medium text-[12px] leading-[100%] tracking-[0] align-middle'>{displayData.level}</p>
                        <div className='flex gap-1 items-center'>
                            <img src={displayData.star_i} alt="" className='' />
                            <p className='text-white'>{displayData.rating} <span>({displayData.rating_persons})</span></p>
                        </div>
                    </div>

                    <h3 className="font-semibold text-[16px] leading-[20px] ">{displayData.domain}</h3>

                    <div className=" flex items-center text-[#8A8A8A] text-[13px] space-x-3">
                        {
                            displayData.bundle_tot_courses && (<div className="flex items-center space-x-1">
                                <img src={displayData.bundle_i} alt="" />
                                <span className='font-normal text-[14px] leading-[20px] align-middle'>{displayData.bundle_tot_courses} </span>
                            </div>)
                        }
                        {
                            displayData.indi_lang_i && (<div className="flex items-center space-x-1">
                                <img src={displayData.indi_lang_i} alt="" />
                                <span className='font-normal text-[14px] leading-[20px] align-middle'>{displayData.lang_detail} </span>
                            </div>)
                        }
                        {
                            displayData.hours &&
                            <div className="flex items-center space-x-1">
                                <img src={displayData.schedule_i} alt="" />
                                <span className='font-normal text-[14px] leading-[20px] align-middle'>{displayData.hours}</span>
                            </div>
                        }

                    </div>

                    <div className=" flex items-center  gap-1">
                        <div className="">
                            <img className='h-7 w-7 rounded-full object-cover' src={displayData.ment_icon} alt="" />
                        </div>
                        <p className=" font-inter font-normal text-[14px]  leading-[20px] align-middle flex items-center gap-1">
                            <span className={`truncate ${displayData.bundle_i && 'max-w-[110px]'} block`}>{displayData.mentors}</span>
                            <span>{displayData.more_count}</span>
                        </p>
                    </div>

                    <p className="  font-inter font-normal text-[14px] leading-[20px] align-middle line-clamp-2">
                        {displayData.para}
                    </p>
                </div>
            </div>
        </div>
    )

    // if parent passed onClick, render a div with handler (keeps layout exact)
    if (onClick) {
        return (
            <div
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onClick() }}
            >
                {card}
            </div>
        )
    }

    // default behaviour (unchanged)
    return (
        <Link to={displayData.page_link}>
            {card}
        </Link>
    )
}

export default BundleCourse






