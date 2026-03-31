import React, { useState } from 'react';
import { Check, Users, Play, Gift, X, ArrowRight, Download } from 'lucide-react';
import bgTemplate from '../../assets/images/bg-template.png';
import videoOverlay from '../../assets/images/video-overlay.png';
import ApplyNowModal from '../../components/CMSComponents/ApplyNowModal';
import { getYouTubeVideoId, getYouTubeThumbnail } from '../../utils/youtubeThumbnail';

/**
 * Template 2: Life Transformation - Matching Reference Design
 */
const LifeTransformationTemplate = ({ heading, guarantee, video, features, ctas, form, backgroundImage }) => {
    const [isApplyOpen, setIsApplyOpen] = useState(false);


    const videoId = getYouTubeVideoId(video?.youtubeUrl);
    const thumbnailUrl = video?.customThumbnail || getYouTubeThumbnail(video?.youtubeUrl) || videoOverlay;

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url(${backgroundImage || bgTemplate})` }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
                {/* Headline */}
                <h1
                    style={{ fontFamily: "'Clash Display Variable', sans-serif" }}
                    className="w-full max-w-[1064px] mx-auto text-[40px] md:text-[56px] leading-[1.2] md:leading-[70px] font-semibold text-center tracking-tight text-white drop-shadow-2xl antialiased mb-8"
                >
                    {heading?.parts?.map((part, idx) => (
                        <span
                            key={idx}
                            className={part.highlight ? 'text-[#FFF200]' : 'text-white'}
                        >
                            {part.text}{idx < heading.parts.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </h1>

                {/* Guarantee Badge */}
                {guarantee && (
                    <div className="flex items-center justify-center gap-3 w-full max-w-[777px] mx-auto min-h-[56px] px-6 py-3 bg-[#3A3A00]/40 border border-[#FFF200]/30 rounded-lg backdrop-blur-sm mb-12">
                        <Gift className="w-6 h-6 text-[#FFF200] flex-shrink-0" />
                        <p
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="text-[16px] md:text-[18px] leading-[24px] text-white font-normal text-center"
                        >
                            {(() => {
                                const parts = guarantee.split(/(free)/gi);
                                return parts.map((part, i) =>
                                    part.toLowerCase() === 'free' ? (
                                        <span key={i} className="text-[#FFF200] font-semibold">{part}</span>
                                    ) : (
                                        <React.Fragment key={i}>{part}</React.Fragment>
                                    )
                                );
                            })()}
                        </p>
                    </div>
                )}

                {/* Video Section - Inline Playback */}
                <div className="w-full max-w-[900px] mx-auto mb-16">
                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
                        <iframe
                            className="w-full h-full"
                            src={videoId ? `https://www.youtube.com/embed/${videoId}` : ''}
                            title="Video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* CTAs - Matching Template 1 design */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-[600px] mx-auto mb-16">

                    {/* Primary Button - Yellow with arrow */}
                    <button
                        onClick={() => setIsApplyOpen(true)}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="px-8 py-4 group bg-[#FFF200] hover:bg-[#FFD500] text-black font-bold text-[18px] leading-[22px] rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-[#FFF200]/20 min-w-[180px]"
                    >
                        {ctas?.primary?.text || 'Apply Now'}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                    </button>

                    {/* Secondary Button - Gray with download icon */}
                    {ctas?.secondary?.enabled !== false && ctas?.secondary?.url && (
                        <button
                            onClick={() => window.open(ctas.secondary.url, '_blank')}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="px-8 py-4 group bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-[18px] leading-[22px] rounded-lg flex items-center justify-center gap-3 transition-all min-w-[220px]"
                        >
                            {ctas?.secondary?.text || 'Download Brochure'}
                            <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5 stroke-[2]" />
                        </button>
                    )}
                </div>

                {/* Features Section */}
                {features?.title && (
                    <div className="max-w-3xl mx-auto mb-32">
                        <h2
                            style={{ fontFamily: "'Clash Display Variable', sans-serif" }}
                            className="text-3xl md:text-4xl font-bold text-center mb-8 text-white"
                        >
                            {features.title}
                        </h2>
                        <div className="space-y-4">
                            {features.items?.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#FFF200] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-5 h-5 text-black font-bold" strokeWidth={3} />
                                    </div>
                                    <p
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                        className="text-white text-lg flex-1"
                                    >
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>



            {/* Apply Now Modal */}
            {isApplyOpen && (
                <ApplyNowModal
                    isOpen={isApplyOpen}
                    onClose={() => setIsApplyOpen(false)}
                    formConfig={{
                        ...form,
                        courseName: heading?.parts?.map(p => p.text).join(' ') || 'Expertisor Academy Course',
                        title: heading?.parts?.map(p => p.text).join(' ')
                    }}
                />
            )}
        </div>
    );
};

export default LifeTransformationTemplate;
