import React from "react";
import StartButton from "../StartButton";
import Download from "../Download";
import { assets } from "../../assets/assets";
import { useFormContext } from "../../context/FormContext";

const Hero = ({ data }) => {
    const { setShowApplyModal } = useFormContext();

    const { icon, head, highlights, para, features, start_button, download } = data || {};

    // Highlight selected words inside heading
    const renderHeading = () => {
        if (!head) return null;
        let result = [];
        let remaining = head;

        highlights?.forEach((word, index) => {
            const parts = remaining.split(word);
            result.push(parts[0]); // normal text before highlight
            result.push(
                <span key={index} className="text-yellow">
                    {word}
                </span>
            );
            remaining = parts[1]; // continue after highlight
        });

        result.push(remaining); // leftover text
        return result;
    };

    return (
        <div className="relative w-full h-screen">
            {/* Background Video */}
            <video
                src={assets.videoBg}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            />

            <div className="px-3 sm:px-14 lg:px-20 absolute top-0 flex flex-col justify-center items-center h-full w-full">

                {/* Top Badge */}
                {icon && (
                    <div className="flex justify-center">
                        <div className="flex gap-2 p-2 bg-[#02020299] border border-[#FFFFFF] rounded-lg items-center">
                            <img src={icon?.threed_icon} alt="" />
                            <p className="text-white">{icon?.para}</p>
                        </div>
                    </div>
                )}

                {/* Heading + Paragraph */}
                <div className="my-5 md:my-10 max-w-5xl mx-auto">
                    <h2 className="font-clash font-semibold text-[28px] md:text-[35px] lg:text-[50px] leading-tight text-center text-white">
                        {renderHeading()}
                    </h2>

                    <p className="mt-3 md:mt-5 font-inter text-[14px] sm:text-[20px] text-center text-[#DBDBDB]">
                        {para}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
                    {start_button?.useModal ? (
                        <div
                            onClick={() => setShowApplyModal(true)}
                            className="flex cursor-pointer justify-center gap-1 rounded-[4px] px-[22px] py-[12px] sm:py-[14px] bg-yellow items-center"
                        >
                            <p className="text-black font-inter font-semibold text-[18px] leading-[100%] text-nowrap">
                                {start_button.name}
                            </p>
                            <img src={assets.r_long_arrow} alt="Right arrow" />
                        </div>
                    ) : (
                        <StartButton data={start_button} courseId={data?.deal_course_id} />
                    )}

                    {download && <Download data={download} />}
                </div>

                {/* Features */}
                {features && (
                    <div className="flex justify-center sm:gap-2 flex-wrap mt-4">
                        {features?.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 p-2">
                                <img src={item.i} alt="" />
                                <p className="font-inter text-[14px] sm:text-[16px] whitespace-nowrap text-white">
                                    {item.para}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Hero;
