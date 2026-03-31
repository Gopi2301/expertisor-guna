import { useState, useEffect } from "react";
import FeatureBadge from "./FeatureBadge";
import WebinarDetailCard from "./WebinarDetailCard";
import VideoPlayButton from "./VideoPlayButton";
import ReservationBanner from "./ReservationBanner";

const Hero = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { heading, highlights, para, features, webinar_details } = data || {};

  // Optimization: Memoize the heading formatter if this re-renders often
  const formatHeading = (text, highlights) => {
    if (!text || !highlights?.length) return text;

    const escaped = highlights.map((h) =>
      h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");

    return text.split(regex).map((part, index) =>
      highlights.some(
        (h) => h.toLowerCase().trim() === part.toLowerCase().trim()
      ) ? (
        <span key={index} className="brand-text">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      <section
        className="w-full min-h-screen flex flex-col items-center justify-center pt-12 pb-20 overflow-x-hidden"
        style={{
          background:
            "radial-gradient(174.52% 50% at 95.47% 97.18%, #ffffea, #ffc400 22.5%, rgba(0, 0, 0, 0)), radial-gradient(106.17% 50% at 22.13% 100%, #ffcc00, rgba(0, 0, 0, 0))",
          mixBlendMode: "normal",
        }}
      >
        {/* Content Container */}
        <div className="container mx-auto px-4 z-10 flex flex-col items-center gap-8">
          {/* Header Section */}
          <div className="md:max-h-[50vh]">
            <div className="text-center max-w-5xl">
              <h1 className="font-clash text-[28px] md:text-[50px] font-semibold text-white leading-none tracking-[0.02em] text-center capitalize">
                {formatHeading(heading, highlights)}
              </h1>
              <p className="mt-6 text-sm md:text-base font-inter text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {para}
              </p>
            </div>

            {/* Feature Badges */}
            <div className="w-full relative flex items-start justify-center flex-wrap content-start gap-3 text-left text-sm text-white font-inter mt-3">
              {features?.map((feature, index) => (
                <FeatureBadge key={index} icon={feature.i} text={feature.para} />
              ))}
            </div>
          </div>
          {/* Video/Image Preview Container */}
          <div className="flex flex-col items-center justify-center gap-3 md:max-h-[50vh] w-full">
            <div className="relative flex flex-col gap-3 w-full md:w-auto md:h-[45vh] aspect-video rounded-xl overflow-hidden mx-auto shadow-2xl">
              {!isPlaying ? (
                <>
                  <img
                    src={data.hero_image}
                    className="max-h-full w-full h-full object-contain"
                    alt="Webinar Preview"
                  />
                  {/* play button */}
                  <VideoPlayButton onClick={() => setIsPlaying(true)} />
                </>
              ) : (
                <>
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1rZduaU4oco?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  {/* Close button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors"
                    aria-label="Close video"
                  >
                    âœ•
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-row justify-start gap-3 w-full md:w-auto">
              {webinar_details?.map((detail, index) => (
                <WebinarDetailCard key={index} {...detail} />
              ))}
            </div>
            {/* Play Button Overlay could go here */}

            {/* Webinar Info Cards */}
          </div>
        </div>

        {/* Mobile Reservation Banner */}
        {isMobile && <ReservationBanner />}

      </section>
    </div>
  );
};

export default Hero;
