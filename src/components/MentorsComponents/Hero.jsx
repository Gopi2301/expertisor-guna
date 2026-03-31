import React from "react";
import StatsSection from "./StatsSection";
import MentorsRun from "./MentorsRun";
import { pages } from "../../constants/pages";
import Marquee from "react-fast-marquee";

const Hero = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center py-6 overflow-hidden">
        <div className="px-3 sm:px-14 lg:px-20">
          <div className="pt-2 sm:pt-4 md:pt-6 lg:pt-8">
            <h1 className="font-clash text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] xl:text-[76px] text-white leading-[38px] sm:leading-[50px] md:leading-[62px] lg:leading-[74px] xl:leading-[88px] font-semibold text-center ">
              <span className="block text-yellow">Industry Specialized</span>{" "}
              Top Creator Mentors{" "}
            </h1>
            <p className="mt-2 font-inter text-[12px] md:text-[18px] leading-tight font-normal text-center text-[#DBDBDB]">
              {" "}
              <span className="xl:block">
                Countless individuals have experienced life-changing growth
                thanks to guidance from creator mentors.
              </span>{" "}
              You could be one of them!
            </p>
          </div>
        </div>
        <StatsSection />
        {/* <MentorsRun /> */}
        <div className="my-4 lg:my-6">
          <Marquee speed={50}>
            {pages?.become_mentors?.wall_of_mentors?.mentors?.map(
              (mentor, i) => (
                <div
                  key={i}
                  className="relative mx-3 w-[160px] sm:w-[220px] bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)] bg-black rounded-lg overflow-hidden"
                >
                  {/* Aspect ratio container */}
                  <div className="w-full aspect-[16/18]">
                    <img
                      src={mentor?.img}
                      alt={mentor?.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Name */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full cursor-pointer">
                    <p className="font-clash font-semibold text-[18px] sm:text-[22px] text-center text-white">
                      {mentor?.name}
                    </p>

                    <div className="p-1 rounded-lg flex flex-wrap gap-1 justify-center ">
                      {mentor?.social_media?.map((data, i) => (
                        <a
                          href={data.link}
                          key={i}
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[linear-gradient(180deg,#2B1900_0%,#1A0F00_100%)]"
                        >
                          <img
                            src={data.sm_i}
                            alt=""
                            className="w-4 h-4 object-contain"
                          />
                          <p className="text-white text-[10px]">
                            {data.followers}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
          </Marquee>
        </div>
        <div
          className="border-[2px] border-solid"
          style={{
            borderImageSource:
              "radial-gradient(48.58% 104146.22% at 51.42% 0%, #FFFFFF 0%, #FFE100 36.54%, #786A00 66.83%, #271800 100%)",
            borderImageSlice: 1,
          }}
        ></div>
      </div>
    </>
  );
};

export default Hero;
