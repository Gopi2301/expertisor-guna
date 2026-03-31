import React, { useEffect, useRef } from "react";
import { ArrowRight, Download, Headset, Lock, FileText } from "lucide-react";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen md:min-h-[90vh] overflow-hidden flex flex-col justify-center bg-[#050505] max-w-[100vw]">
      {/* Background Video */}
      <div className="absolute inset-0 z-[1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/Background.webm" type="video/webm" />
        </video>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505] z-[2]"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1236px] mx-auto flex flex-col justify-center items-center gap-4 md:gap-6 py-8 md:py-12 px-4 md:px-6">
        {/* Top Badge */}
        <div className="w-fit p-2 bg-black/60 rounded-lg outline outline-1 outline-neutral-700 backdrop-blur-sm inline-flex justify-center items-center gap-2">
          <div className="size-7 flex items-center justify-center shrink-0">
            <span className="text-xl">🤔</span>
          </div>
          <div className="w-fit flex justify-start items-center gap-1">
            <div className="text-center justify-start text-white text-sm sm:text-base font-normal font-inter">
              Don't waste 10 Years by making Trial and Error in your Firm
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="self-stretch text-center justify-start px-2">
          <span className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">Launch Your </span>
          <span className="text-yellow text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">Architecture</span>
          <span className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">, </span>
          <span className="text-yellow text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">Interior</span>
          <span className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">, or </span>
          <span className="text-yellow text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">Construction Firm</span>
          <span className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight"> in </span>
          <span className="text-yellow text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">30 Days</span>
          <span className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold font-clash leading-tight">
            {" "}
            With a Proven Business System (Without Struggling for Clients or Working for Low Fees)
          </span>
        </div>

        {/* Subheading */}
        <div className="self-stretch text-center justify-start text-zinc-300 text-base sm:text-lg md:text-xl font-normal font-inter max-w-4xl mx-auto px-2">
          No team and no business experience needed. Learn the system and apply it step by step to launch and grow your firm
        </div>

        {/* Buttons */}
        <div className="w-full sm:w-fit pt-4 md:pt-6 pb-2 md:pb-4 inline-flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 px-4 sm:px-0">
          <button className="w-full sm:w-auto h-12 px-6 bg-[#FFF200] hover:bg-yellow-400 rounded-md flex justify-center items-center gap-2 transition-colors group">
            <span className="text-black text-base md:text-lg font-semibold font-inter">Start Your Firm</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full sm:w-auto h-12 px-6 bg-[#1A1A1A] hover:bg-[#252525] rounded-md border border-neutral-700 flex justify-center items-center gap-2 transition-colors">
            <span className="text-white text-base md:text-lg font-normal font-inter">Firm Blueprint</span>
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Feature Badges */}
        <div className="w-full flex flex-wrap justify-center items-center gap-3 md:gap-4 lg:gap-6 px-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm">
            <Headset className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs md:text-sm font-normal font-inter">Lifetime support</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm">
            <Lock className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs md:text-sm font-normal font-inter">Private community</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 backdrop-blur-sm">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span className="text-white text-xs md:text-sm font-normal font-inter whitespace-nowrap">Templates & Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
