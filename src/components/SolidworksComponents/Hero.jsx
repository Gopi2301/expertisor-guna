import React, { useState } from "react";
import { pages } from "../../constants/pages";
import StartButton from "../StartButton";
import Download from "../Download";
import ApplyModal from "../Simple_elite_temp_Components.jsx/ApplyModal";

const Hero = ({ data }) => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  return (
    <div className="  ">
      <div className="px-3 sm:px-14 lg:px-20 mt-10 sm:mt-14 ">
        <div className="flex w-full justify-center items-center">
          <div className="flex gap-2 p-2 sm:bg-[#1B1B1B99] sm:border border-gray-600 rounded-lg items-center">
            <img
              src={data.icon.threed_icon}
              alt=""
              className="w-12 h-12 object-cover rounded-full shrink-0"
            />
            <p className="font-inter font-normal text-[12px] sm:text-[16px] inline">
              Learn from Industry Expert with 3+{" "}
              <span className="block sm:inline">years of experience</span>
            </p>
          </div>
        </div>

        <div className="my-5 md:my-10 ">
          <h2 className="font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight tracking-[0%] text-center">
            Struggling to Land{" "}
            <span className="text-yellow">Core Mechanical Jobs</span>?{" "}
            <span className="lg:block">
              Master SolidWorks & Land{" "}
              <span className="text-yellow">₹7LPA+</span> Job
            </span>
          </h2>
          <p className="mt-3 md:mt-5 font-inter font-normal text-[14px] sm:text-[20px] leading-tight tracking-[0%] text-center text-[#DBDBDB]">
            {data.para}
          </p>
        </div>

        <div className="sm:flex-row flex flex-col   justify-center gap-3 w-full">
          <StartButton
            data={pages?.solidworks?.start_button}
            onClick={() => setIsApplyOpen(true)}
          />

          <Download data={pages?.solidworks?.download} />
        </div>

        <div className="flex justify-center sm:gap-2 flex-wrap mt-4 ">
          {data.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              {Array.isArray(feature.i) ? (
                <div className="flex -space-x-4">
                  {feature.i.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-black object-cover shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={feature.i}
                  alt=""
                  className="w-8 h-8 object-contain shrink-0"
                />
              )}
              <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] whitespace-nowrap">
                {feature.para}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative my-5">
        <video
          src={data.car_video} // your video path (public folder or imported asset)
          autoPlay
          loop
          muted
          playsInline
          className=" w-full "
        ></video>
      </div>

      {/* Apply Modal */}
      <ApplyModal open={isApplyOpen} onClose={() => setIsApplyOpen(false)} courseId={data.courseId || data.deal_course_id} />
    </div>
  );
};

export default Hero;
