import React from "react";

const VideoPlayButton = ({ onClick }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
      <div
        className="relative flex items-center justify-center group cursor-pointer w-[120px] h-[120px]"
        onClick={onClick}
      >
        {/* Animated Ripple Rings - Staggered */}
        <div className="absolute w-[50px] h-[50px] rounded-full bg-[#FFF200] animate-ripple [animation-delay:0s]"></div>
        <div className="absolute w-[50px] h-[50px] rounded-full bg-[#FFF200] animate-ripple [animation-delay:0.5s]"></div>
        <div className="absolute w-[50px] h-[50px] rounded-full bg-[#FFF200] animate-ripple [animation-delay:1s]"></div>

        {/* Main Button Image */}
        <div className="relative z-10 w-[50px] h-[50px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <img
            src="/business-webinar/play_button.png"
            alt="Play Video"
            className="w-full h-full object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayButton;
