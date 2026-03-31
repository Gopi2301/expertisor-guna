import { useState } from "react";
import Heading from "./Heading";
import { assets } from "../assets/assets";

const CoursePreview = ({ lessons_data }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  // YouTube thumbnail options (highest → lowest quality)
  const thumbnails = [
    `https://img.youtube.com/vi/${lessons_data.video_id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${lessons_data.video_id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${lessons_data.video_id}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${lessons_data.video_id}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${lessons_data.video_id}/default.jpg`,
  ];

  const handleThumbError = () => {
    if (thumbIndex < thumbnails.length - 1) {
      setThumbIndex(prev => prev + 1);
    }
  };

  return (
    <div className="bg-black text-white px-3 sm:px-14 lg:px-20 rounded-2xl overflow-hidden shadow-lg">
      {/* Heading Section */}
      <Heading
        head={lessons_data.head}
        highlights={lessons_data.highlights}
        p1={lessons_data.p1}
        p2={lessons_data.p2}
      />

      {/* Video Section */}
      <div className="bg-[#111] p-4 md:p-6 rounded-2xl mt-8">
        <div className="relative xl:h-[675px] aspect-video xl:aspect-auto">
          {playVideo ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${lessons_data.video_id}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              className="w-full h-full rounded-lg cursor-pointer relative group"
              onClick={() => setPlayVideo(true)}
            >
              <img
                src={thumbnails[thumbIndex]}
                onError={handleThumbError}
                alt="Video Thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center group-hover:scale-110 transition">
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

        {/* Download Button */}
        {
          lessons_data.download &&

          <div className="flex justify-center mt-8">
            <style>{`
            @keyframes rotate {
              100% { transform: rotate(1turn); }
            }
            .rainbow::before {
              content: '';
              position: absolute;
              z-index: -2;
              left: -50%;
              top: -50%;
              width: 200%;
              height: 200%;
              background-position: 100% 50%;
              background-repeat: no-repeat;
              background-size: 50% 30%;
              filter: blur(6px);
              background-image: conic-gradient(#ff0080,#ff8c00,#40e0d0,#ff0080);
              animation: rotate 4s linear infinite;
            }
          `}</style>

            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-md hover:scale-105 transition duration-300 active:scale-100">
              <a
                href={lessons_data.download.link}
                target="_blank"
                download
                className="flex gap-2 py-2 sm:py-4 px-4 sm:px-5 rounded-md bg-yellow backdrop-blur items-center"
              >
                <p className="font-inter font-semibold text-[14px] sm:text-[18px] leading-[100%] text-black">
                  {lessons_data.download.name}
                </p>
                <img src={assets.down_arrow_black} alt="Download" />
              </a>
            </div>
          </div>

        }

      </div>
    </div>
  );
};

export default CoursePreview;
