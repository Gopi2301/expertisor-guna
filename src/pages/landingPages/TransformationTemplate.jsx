import React, { useState } from 'react';
import { ArrowRight, Download, Gift, Play, X } from 'lucide-react';
import ApplyNowModal from '../../components/CMSComponents/ApplyNowModal';
import bgTemplate from '../../assets/images/bg-template.png';
import videoOverlay from '../../assets/images/video-overlay.png';
import { getYouTubeThumbnail } from '../../utils/youtubeThumbnail';

/**
 * Transformation Framework Landing Page Template
 * Matches reference design exactly
 */
const TransformationTemplate = ({
    heading = {},
    guarantee = {},
    video = {},
    ctas = {},
    form = {},
    badge = {},
    backgroundImage = bgTemplate
}) => {
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    return (
        <div
            className="min-h-screen text-white font-sans selection:bg-[#FFF200]/30 overflow-x-hidden relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
                backgroundImage: `url('${backgroundImage}')`,
                backgroundColor: "#000000"
            }}
        >
            {/* Stronger ambient glow effect - matching reference */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#FFF200]/8 blur-[150px] pointer-events-none rounded-full"></div>
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#FFF200]/5 blur-[120px] pointer-events-none rounded-full"></div>

            {/* Dark Overlay - matching reference */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-[1064px] px-4 py-16 flex flex-col items-center gap-16">

                {/* Course Info Block */}
                <div className="flex flex-col items-center gap-5 w-full">

                    {/* Heading - Dynamic from editor */}
                    <h1
                        style={{ fontFamily: "'Clash Display Variable', sans-serif" }}
                        className="w-full max-w-[1064px] text-[40px] md:text-[56px] leading-[1.2] md:leading-[70px] font-semibold text-center tracking-tight text-white drop-shadow-2xl antialiased"
                    >
                        {heading.parts && heading.parts.length > 0 ? (
                            heading.parts.map((part, index) => (
                                <span key={index} className={part.highlight ? 'text-[#FFF200]' : ''}>
                                    {part.text}
                                    {index < heading.parts.length - 1 ? ' ' : ''}
                                </span>
                            ))
                        ) : (
                            <>
                                Transform your <span className="text-[#FFF200]">mindset, career,</span> and{' '}
                                <span className="text-[#FFF200]">business</span> in <span className="text-[#FFF200]">90 days</span> with my personalized transformation framework.
                            </>
                        )}
                    </h1>

                    {/* Guarantee Badge - Dynamic from editor */}
                    <div className="group flex items-center justify-center gap-3 w-full max-w-[777px] min-h-[56px] px-6 py-3 bg-[#3A3A00]/40 border border-[#FFF200]/30 rounded-lg backdrop-blur-sm cursor-default hover:bg-[#3A3A00]/50 transition-colors">
                        <Gift className="w-6 h-6 text-[#FFF200] flex-shrink-0" />
                        <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-[16px] md:text-[18px] leading-[24px] text-white font-normal text-center">
                            {(() => {
                                const guaranteeText = typeof guarantee === 'string' ? guarantee : (guarantee?.text || "If you don't get results, I'll work with you again for free until you get results.");
                                const parts = guaranteeText.split(/(free)/gi);
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

                </div>

                {/* Video Section - Inline Playback */}
                <div className="w-full max-w-[900px]">
                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
                        <iframe
                            className="w-full h-full"
                            src={video.embedUrl}
                            title="Video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* CTAs - Matching reference design */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">

                    {/* Primary Button - Yellow with arrow */}
                    <button
                        onClick={() => setIsApplyOpen(true)}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="px-8 py-4 group bg-[#FFF200] hover:bg-[#FFD500] text-black font-bold text-[18px] leading-[22px] rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg shadow-[#FFF200]/20 min-w-[180px]"
                    >
                        {ctas.primary?.text || 'Apply Now'}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                    </button>

                    {/* Secondary Button - Gray with download icon */}
                    {ctas.secondary?.enabled !== false && ctas.secondary?.url && (
                        <button
                            onClick={() => window.open(ctas.secondary.url, '_blank')}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="px-8 py-4 group bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-[18px] leading-[22px] rounded-lg flex items-center justify-center gap-3 transition-all min-w-[220px]"
                        >
                            {ctas.secondary?.text || 'Download Brochure'}
                            <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5 stroke-[2]" />
                        </button>
                    )}
                </div>

            </main>



            {/* Apply Modal - Using new ApplyNowModal component */}
            <ApplyNowModal
                isOpen={isApplyOpen}
                onClose={() => setIsApplyOpen(false)}
                formConfig={{
                    ...form,
                    courseName: heading?.parts?.map(p => p.text).join(' ') || 'Expertisor Academy Course',
                    title: heading?.parts?.map(p => p.text).join(' ')
                }}
            />
        </div>
    );
};

export default TransformationTemplate;
