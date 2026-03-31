import React from 'react';
import TransformationTemplate from '../../pages/landingPages/TransformationTemplate';

/**
 * CoursePreview - Live preview component for the course editor
 * Renders the selected template with current course data
 */
const CoursePreview = ({ course }) => {
    if (!course) {
        return (
            <div className="h-full flex items-center justify-center bg-neutral-900 text-neutral-500">
                <div className="text-center">
                    <p className="text-lg">No preview available</p>
                    <p className="text-sm mt-2">Fill in course details to see preview</p>
                </div>
            </div>
        );
    }

    // Render based on template type
    if (course.template_id === 'transformation-framework') {
        return (
            <div className="w-full h-full overflow-auto bg-[#0a0a0a]">
                <div className="transform scale-[0.6] origin-top-left w-[166.67%]">
                    <TransformationTemplate {...(course.template_data || {})} />
                </div>
            </div>
        );
    }

    // Default preview for non-template courses
    return (
        <div className="h-full overflow-auto bg-[#0a0a0a] p-6">
            <div className="max-w-lg mx-auto">
                {/* Hero Preview */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-6 mb-6">
                    {/* Badge */}
                    {course.hero_data?.badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-full mb-4">
                            <span>{course.hero_data.badge.emoji}</span>
                            <span className="text-white/80 text-xs">{course.hero_data.badge.text}</span>
                        </div>
                    )}

                    {/* Headline */}
                    <h2 className="text-xl font-bold mb-2">
                        {course.hero_data?.headline?.parts?.map((part, i) => (
                            <span key={i} className={part.highlight ? 'text-yellow-400' : 'text-white'}>
                                {part.text}
                            </span>
                        )) || course.title || 'Course Title'}
                    </h2>

                    {/* Subheadline */}
                    <p className="text-neutral-400 text-sm mb-4">
                        {course.hero_data?.subheadline || 'Course description here...'}
                    </p>

                    {/* Video placeholder */}
                    <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-3 mt-4">
                        <button className="flex-1 py-2 px-4 bg-yellow-400 text-black text-sm font-semibold rounded">
                            {course.hero_data?.buttons?.primary?.text || 'Apply Now'}
                        </button>
                        <button className="flex-1 py-2 px-4 bg-neutral-700 text-white text-sm rounded border border-neutral-600">
                            {course.hero_data?.buttons?.secondary?.text || 'Learn More'}
                        </button>
                    </div>
                </div>

                {/* Card Preview */}
                <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
                    {course.thumbnail && (
                        <img src={course.thumbnail} alt="" className="w-full h-32 object-cover" />
                    )}
                    <div className="p-4">
                        <h3 className="font-semibold text-white mb-1">{course.title || 'Course Title'}</h3>
                        <p className="text-sm text-neutral-500 mb-2">{course.mentor_name || 'Mentor Name'}</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                            <span>⭐ {course.rating || '4.9'}</span>
                            <span>•</span>
                            <span>{course.student_count || '0+'} students</span>
                            <span>•</span>
                            <span>{course.duration || '0h'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;
