
import { useState } from "react";
import { assets } from "../../assets/assets";
import Download from "../Download";
import ApplyModal from "./ApplyModal";

const Home = ({ heading, guarantee, video, ctas, form }) => {

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);

    // Extract video ID from URL or use provided ID
    const videoId = video?.youtubeId || video?.youtubeUrl?.split('v=')[1]?.split('&')[0] || 'PPMKUJgoFSA';

    const thumbnails = [
        video?.customThumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    ];

    const handleThumbError = () => {
        if (thumbIndex < thumbnails.length - 1) {
            setThumbIndex((prev) => prev + 1);
        }
    };

    // Helper to render heading with highlights
    const renderHeading = () => {
        if (!heading?.parts || heading.parts.length === 0) {
            // Default heading matching guna-dev
            return (
                <>
                    Transform your{" "}
                    <span className="text-yellow">mindset</span>,{" "}
                    <span className="text-yellow">career</span>, and{" "}
                    <span className="text-yellow">business</span> in{" "}
                    <span className="text-yellow">90 days</span> with my
                    personalized transformation framework.
                </>
            );
        }

        return heading.parts.map((part, index) => {
            if (part.highlight) {
                return <span key={index} className="text-yellow">{part.text}</span>;
            }
            return <span key={index}>{part.text}</span>;
        });
    };

    // Default guarantee text
    const guaranteeText = guarantee || "If you don't get results, I'll work with you again for free until you get results.";

    return (
        <div
            className="px-3 min-h-screen sm:px-14 lg:px-20
             bg-cover bg-center bg-no-repeat
             flex items-center justify-center py-10"
            style={{ backgroundImage: `url(${assets.simple_bg})` }}
        >
            <section className="text-white flex flex-col items-center w-full">

                {/* Heading Section */}
                <div className="max-w-5xl text-center">
                    <h1 className="font-clash font-semibold text-[25px] sm:text-[35px] lg:text-[41px]
                     leading-[100%] tracking-[0.02em]">
                        {renderHeading()}
                    </h1>

                    <p className="font-inter mt-4 md:mt-6 inline-block bg-yellow/10
                    text-yellow-400 text-[14px] md:text-[18px]
                    border border-yellow/20 rounded-lg px-4 py-2">
                        🎁 {guaranteeText}
                    </p>
                </div>

                {/* Video Section */}
                <div className="w-full max-w-2xl mx-auto my-10">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        {playVideo ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div
                                className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                                onClick={() => setPlayVideo(true)}
                            >
                                <img
                                    src={thumbnails[thumbIndex]}
                                    onError={handleThumbError}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 text-white"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="sm:flex-row flex flex-col cursor-pointer
                    justify-center gap-3 w-full">
                    <div onClick={() => setShowApplyModal(true)}>
                        <div className="flex justify-center gap-1 rounded-[4px]
                        px-[22px] py-[12px] sm:py-[14px]
                        bg-yellow items-center w-full">
                            <p className="text-black font-inter font-semibold
                        text-[18px] leading-[100%] whitespace-nowrap">
                                {ctas?.primary?.text || 'Apply Now'}
                            </p>
                            <img src={assets.r_long_arrow} alt="Right arrow" />
                        </div>
                    </div>

                    {ctas?.secondary?.enabled !== false && (
                        <Download data={{
                            name: ctas?.secondary?.text || "Download Brochure",
                            link: ctas?.secondary?.url || ""
                        }} />
                    )}
                </div>

            </section>

            {/* Modal */}
            <ApplyModal
                open={showApplyModal}
                onClose={() => setShowApplyModal(false)}
                courseId={form?.dealCourseId}
            />
        </div>

    );
};

export default Home
