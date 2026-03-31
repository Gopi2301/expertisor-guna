import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseBySlug } from '../services/api';
import TransformationTemplate from './landingPages/TransformationTemplate';
import LifeTransformationTemplate from './landingPages/LifeTransformationTemplate';
import Simple_elite_temp from './landingPages/Simple_elite_temp';
import FullCourseTemplate from './landingPages/FullCourseTemplate';


const LandingPage = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourse = async () => {
            const courseData = await getCourseBySlug(slug);
            setCourse(courseData);
            setLoading(false);
        };
        loadCourse();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Template 1: Transformation Framework
    if (course && (!course.template_id || course.template_id === 'transformation-framework')) {
        return (
            <TransformationTemplate
                heading={{
                    parts: course.hero_data?.headline?.parts || [
                        { text: course.title || 'Course Title', highlight: false }
                    ]
                }}
                guarantee={course.hero_data?.guarantee || "If you don't get results, I'll work with you again for free until you get results."}
                video={{
                    thumbnail: course.hero_data?.video?.thumbnail || '/src/assets/images/video-overlay.png',
                    embedUrl: course.hero_data?.video?.embedUrl || course.hero_data?.video_url || ''
                }}
                ctas={{
                    primary: {
                        text: course.hero_data?.buttons?.primary?.text || 'Apply Now',
                        action: 'openModal'
                    },
                    secondary: {
                        text: course.hero_data?.buttons?.secondary?.text || 'Download Brochure',
                        url: course.hero_data?.buttons?.secondary?.url || '',
                        type: course.hero_data?.buttons?.secondary?.type || 'link',
                        fileName: course.hero_data?.buttons?.secondary?.fileName,
                        enabled: course.hero_data?.buttons?.secondary?.enabled
                    }
                }}
                form={{
                    title: course.form_data?.title || 'STRUGGLING TO FIGURE IT OUT ALONE?',
                    subtitle: course.form_data?.subtitle || 'Get Expert 1:1 Guidance',
                    submitButton: course.form_data?.submitButton || 'Get Fast Help',
                    formAction: course.form_data?.formAction || '',
                    dealCourseId: course.deal_course_id
                }}
                badge={course.hero_data?.badge}
            />
        );
    }

    // Template 2: Life Transformation
    if (course && course.template_id === 'life-transformation') {
        return (
            <LifeTransformationTemplate
                heading={{
                    parts: course.hero_data?.headline?.parts || [
                        { text: course.title || 'Course Title', highlight: false }
                    ]
                }}
                guarantee={course.hero_data?.guarantee || ""}
                video={{
                    youtubeUrl: course.hero_data?.video?.youtubeUrl || '',
                    youtubeId: course.hero_data?.video?.youtubeId || '',
                    customThumbnail: course.hero_data?.video?.customThumbnail || '',
                    description: course.hero_data?.video?.description || 'Transform your mindset, career, and business in 90 days with my personalized training.'
                }}
                features={{
                    title: course.hero_data?.features?.title || '',
                    items: course.hero_data?.features?.items || []
                }}
                cta={{
                    text: course.hero_data?.cta?.text || '',
                    seatsRemaining: course.hero_data?.cta?.seatsRemaining || null
                }}
                form={{
                    title: course.form_data?.title || 'STRUGGLING TO FIGURE IT OUT ALONE?',
                    subtitle: course.form_data?.subtitle || 'Get Expert 1:1 Guidance',
                    submitButton: course.form_data?.submitButton || 'Get Fast Help',
                    formAction: course.form_data?.formAction || '',
                    dealCourseId: course.deal_course_id
                }}
            />
        );
    }

    // Template 3: Simple Elite
    if (course && course.template_id === 'simple-elite') {
        return (
            <Simple_elite_temp
                heading={{
                    parts: course.hero_data?.headline?.parts || [
                        { text: course.title || 'Course Title', highlight: false }
                    ]
                }}
                guarantee={course.hero_data?.guarantee || "If you don't get results, I'll work with you again for free until you get results."}
                video={{
                    youtubeUrl: course.hero_data?.video?.youtubeUrl || '',
                    youtubeId: course.hero_data?.video?.youtubeId || '',
                    customThumbnail: course.hero_data?.video?.customThumbnail || ''
                }}
                ctas={{
                    primary: {
                        text: course.hero_data?.buttons?.primary?.text || 'Apply Now',
                        action: 'openModal'
                    },
                    secondary: {
                        text: course.hero_data?.buttons?.secondary?.text || 'Download Brochure',
                        url: course.hero_data?.buttons?.secondary?.url || '',
                        type: course.hero_data?.buttons?.secondary?.type || 'link',
                        fileName: course.hero_data?.buttons?.secondary?.fileName,
                        enabled: course.hero_data?.buttons?.secondary?.enabled
                    }
                }}
                form={{
                    title: course.form_data?.title || 'STRUGGLING TO FIGURE IT OUT ALONE?',
                    subtitle: course.form_data?.subtitle || 'Get Expert 1:1 Guidance',
                    submitButton: course.form_data?.submitButton || 'Get Fast Help',
                    formAction: course.form_data?.formAction || '',
                    dealCourseId: course.deal_course_id
                }}
            />
        );
    }

    // Template 4: Full Course Template
    if (course && course.template_id === 'full-course') {
        return (
            <FullCourseTemplate data={course.template_data} courseId={course.deal_course_id} />
        );
    }

    // Page not found
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-neutral-400 mb-6">The landing page you're looking for doesn't exist or isn't published.</p>
            <Link to="/" className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                Go Home
            </Link>
        </div>
    );
};

export default LandingPage;
