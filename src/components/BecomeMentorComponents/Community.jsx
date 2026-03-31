import React from "react";
import Lottie from "lottie-react";
import mentors_run from "../../../src/mentors_run.json";
import mentors_mobile from '../../../src/mentors_mobile.json'
import StartButton from "../StartButton";
import { pages } from "../../constants/pages";

const Community = () => {
    return (
        <div className="relative w-full ">
            {/* Fullscreen Lottie Background */}
            <Lottie
                animationData={mentors_run}
                loop
                autoplay
                className="w-full xl:h-[500px] roundd-lg sm:block hidden"
            />

            {/* mobile below md */}
            {/* <div className="w-full h-[500px]"> */}
            <Lottie
                animationData={mentors_mobile}
                loop
                autoplay
                className="block sm:hidden w-full object-contain "
            />
            {/* </div> */}



            {/* Left Content */}
            <div className="absolute top-0 z-20 px-3 sm:pl-8 lg:pl-20 py-16 flex flex-col gap-3 justify-start sm:justify-center w-full md:max-w-3xl lg:max-w-4xl h-full">
                <h3 className="text-[28px] sm:text-[20px] md:text-[26px] lg:text-[36px] font-bold uppercase  leading-snug bg-gradient-to-r from-white to-[#FFFF9C] bg-clip-text text-transparent">
                    Join a vibrant mentor community <br /> and unleash your potential!
                </h3>
                <p className="text-[14px] md:text-[16px] text-gray-300 text-sm sm:text-base leading-relaxed">
                    Connect with passionate educators, creators, and professionals from
                    around the world. Grow your network, share your knowledge, and make a
                    real impact together.
                </p>

                <div className="sm:w-1/2">
                    <StartButton data={pages?.become_mentors.start_button} />
                </div>
            </div>


        </div>
    );
};

export default Community;


