import React, { useState, useMemo } from "react";
import { assets } from "../../assets/assets";
import OptimizedImage from "../OptimizedImage";

const Hero = () => {
  const videos = {
    id: 1,
    url: "https://www.youtube.com/embed/vLlD6MxPGGM?si=n09IZ8H93zLuoQ-c",
    thumbnail: "https://img.youtube.com/vi/vLlD6MxPGGM/hqdefault.jpg",
  };

  const reviewAvatars = useMemo(
    () => [assets.a, assets.b, assets.c, assets.d],
    [],
  );

  const [playing, setPlaying] = useState(false);

  return (
    <>
      <div className="bg-black pt-10 sm:pt-20 px-3 sm:px-14 lg:px-20">
        <div>
          {/* side padding for modile */}
          <div className=" text-center pb-10 lg:pb-16">
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 border border-[#FFFFFF] rounded-full bg-black/60 backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {reviewAvatars.map((avatar, index) => (
                    <OptimizedImage
                      key={avatar + index}
                      src={avatar}
                      alt="Student avatar"
                      className="w-9 h-9 rounded-full border border-black object-cover"
                      width={36}
                      height={36}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#DBDBDB] font-inter text-sm sm:text-base">
                  <img src={assets.star_i} alt="" className="w-6 h-6" />
                  <p className="text-nowrap">4.9 (7462 reviews)</p>
                </div>
              </div>
            </div>
            <h1 className="text-[#ffff] text-[40px] sm:text-[54px] lg:text-[84px] font-semibold font-clash my-4  leading-[41px] sm:leading-[65px] lg:leading-[92px] ">
              Trusted by <span className="text-yellow">13709+</span>{" "}
              <span className="md:block">Empowered Learners</span>
            </h1>
            <p className="text-[#ffff] font-inter font-normal text-[16px] md:text-[20px]  tracking-[0%] text-center  leading-tight ">
              Thousands of lives transformed through real-world learning. You
              could be next.
            </p>
          </div>

          <div className="relative xl:mx-[200px] pb-16 sm:pb-8">
            <div
              className="relative w-full pb-[53.25%] sm:pb-[48.25%] h-0   border-[15px] sm:border-[20px] "
              style={{
                // borderWidth: '18px',
                borderImageSource:
                  "linear-gradient(87.14deg, rgba(66, 63, 36, 0.15) 5%, #968C44 95.47%)",
                borderImageSlice: 1,
                backdropFilter: "blur(5px)",
              }}
            >
              {playing !== 1 ? (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setPlaying(1)}
                >
                  <img
                    src={videos.thumbnail}
                    width={"100%"}
                    alt="Video Thumbnail"
                    className="max-w-full h-full object-cover "
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-yellow p-2 sm:p-3  rounded-full">
                      <img
                        src={assets.pause}
                        alt=""
                        className="w-[33px] h-[33px] sm:w-[60px] sm:h-[60px]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute top-0 left-0 w-full h-full "
                  src="https://www.youtube.com/embed/vLlD6MxPGGM?autoplay=1&modestbranding=1&showinfo=0&controls=1&rel=0&disablekb=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-[4px] border-solid"
        style={{
          borderImageSource:
            "radial-gradient(48.58% 104146.22% at 51.42% 0%, #FFFFFF 0%, #FFE100 36.54%, #786A00 66.83%, #271800 100%)",
          borderImageSlice: 1,
        }}
      ></div>
    </>
  );
};

export default Hero;
