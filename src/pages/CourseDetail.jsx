import React, { useEffect, useState, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Play, ArrowRight, Download } from 'lucide-react';
import { getCourseBySlug } from '../services/api';
import ApplyNowModal from '../components/CMSComponents/ApplyNowModal';

const CourseDetail = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const data = await getCourseBySlug(slug);
                if (!data || data.status === 'DRAFT') {
                    setNotFound(true);
                    return;
                }
                setCourse(data);
            } catch (error) {
                console.error('Error loading course:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        loadCourse();
    }, [slug]);

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play();
        }
    };



    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0805] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (notFound) {
        return <Navigate to="/404" replace />;
    }

    const hero = course.hero_data || {};

    // Render headline with highlights
    const renderHeadline = () => {
        if (!hero.headline?.parts) return course.title;
        return hero.headline.parts.map((part, index) => (
            <span key={index} className={part.highlight ? 'text-yellow' : ''}>
                {part.text}
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-[#0a0805] relative overflow-hidden">
            {/* Lens Flare Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-20 -left-20 w-[800px] h-[800px]"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,200,50,0.3) 0%, rgba(200,150,30,0.15) 30%, transparent 70%)',
                        transform: 'rotate(-30deg)',
                    }}
                />
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,220,100,0.15) 0%, transparent 40%)',
                    }}
                />
                <div
                    className="absolute -bottom-40 -left-40 w-[600px] h-[600px]"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,180,50,0.25) 0%, rgba(180,120,20,0.1) 40%, transparent 70%)',
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Headline */}
                    <h1 className="font-playfair italic text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-10">
                        {renderHeadline()}
                    </h1>

                    {/* Subheadline */}
                    {hero.subheadline && (
                        <div className="inline-flex items-center gap-4 px-8 py-4 bg-neutral-800/50 backdrop-blur-sm rounded-full mb-12 border border-neutral-700/40">
                            <span className="text-2xl">🎁</span>
                            <span className="text-base md:text-lg text-neutral-300">{hero.subheadline}</span>
                        </div>
                    )}

                    {/* Video Player */}
                    {hero.video?.url && (
                        <div className="relative max-w-4xl mx-auto mb-14 rounded-2xl overflow-hidden">
                            <video
                                ref={videoRef}
                                src={hero.video.url}
                                className="w-full aspect-video object-cover"
                                playsInline
                                muted
                                loop
                                poster={course.thumbnail || ''}
                            />
                            {!isVideoPlaying && (
                                <button
                                    onClick={handlePlayVideo}
                                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                                >
                                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-105 transition-transform shadow-xl" style={{ width: '72px', height: '72px' }}>
                                        <Play className="w-8 h-8 md:w-9 md:h-9 text-black fill-black ml-1" />
                                    </div>
                                </button>
                            )}
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsApplyOpen(true)}
                            className="inline-flex items-center gap-3 px-10 py-4 bg-yellow text-black font-bold text-lg rounded-md transition-all hover:bg-yellow-400"
                        >
                            {hero.buttons?.primary?.text || 'Apply Now'}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        {hero.buttons?.secondary?.text && (
                            hero.buttons.secondary.url ? (
                                <a
                                    href={hero.buttons.secondary.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-neutral-700/60 hover:bg-neutral-600/60 text-neutral-200 font-medium text-lg rounded-md transition-all"
                                >
                                    {hero.buttons.secondary.text}
                                    <Download className="w-6 h-6" />
                                </a>
                            ) : (
                                <button
                                    onClick={() => setIsApplyOpen(true)}
                                    className="inline-flex items-center gap-3 px-10 py-4 bg-neutral-700/60 hover:bg-neutral-600/60 text-neutral-200 font-medium text-lg rounded-md transition-all"
                                >
                                    {hero.buttons.secondary.text}
                                    <Download className="w-6 h-6" />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Apply Modal - Using ApplyNowModal with Zoho Integration */}
            <ApplyNowModal
                isOpen={isApplyOpen}
                onClose={() => setIsApplyOpen(false)}
                formConfig={{
                    courseName: course?.title || 'Course',
                    courseId: course?.id,
                    dealCourseId: course?.deal_course_id
                }}
            />
        </div>
    );
};

export default CourseDetail;
