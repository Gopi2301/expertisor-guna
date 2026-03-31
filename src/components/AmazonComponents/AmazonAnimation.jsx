import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../Amazon selling cart.json";
import { pages } from "../../constants/pages";
import StartButton from "../StartButton";
import Download from "../Download";
import ApplyModal from "../Simple_elite_temp_Components.jsx/ApplyModal";

const AmazonAnimation = () => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  return (
    <div className="relative w-full flex items-center justify-center h-screen">
      {/* Background animation */}
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className=" w-full  "
      />

      {/* Content overlay */}
      <div className="px-3 sm:px-14 lg:px-20 absolute top-0  flex flex-col justify-start items-center mt-10 lg:mt-24 w-full">
        <div className="flex justify-center">
          <div className=" p-2 bg-[#02020299] border border-[#FFFFFF] rounded-lg">
            <p className="text-center">
              <span className="text-yellow ">
                {pages.Amazon_page.hero_section.icon.highlight}
              </span>{" "}
              {pages.Amazon_page.hero_section.icon.para}
            </p>
          </div>
        </div>

        <div className="my-5 md:my-10">
          <h2 className="font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight tracking-[0%] text-center">
            {" "}
            <span className="text-yellow">Struggling</span> to Start{" "}
            <span className="text-yellow">Selling on Amazon</span>? No Trial &{" "}
            <span className="lg:block">
              Error With Our Proven Path to Consistent Profits
            </span>
          </h2>
          <p className="mt-3 md:mt-5 font-inter font-normal text-[14px] sm:text-[20px] leading-tight tracking-[0%] text-center text-[#DBDBDB]">
            {pages.Amazon_page.hero_section.para}
          </p>
        </div>

        <div className="sm:flex-row flex flex-col   justify-center gap-3 w-full">
          <StartButton
            data={pages.Amazon_page.start_button}
            onClick={() => setIsApplyOpen(true)}
          />
          <Download data={pages.Amazon_page.download} />
        </div>

        <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
          {pages.Amazon_page.hero_section.features.map((feature, i) => (
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

      {/* Apply Modal */}
      <ApplyModal open={isApplyOpen} onClose={() => setIsApplyOpen(false)} courseId={pages.Amazon_page.deal_course_id} />
    </div>
  );
};

export default AmazonAnimation;
