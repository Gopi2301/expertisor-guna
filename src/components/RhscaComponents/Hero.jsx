import { useState } from "react";
import { assets } from "../../assets/assets";
import ApplyModal from "./ApplyModal";

const Hero = () => {
    const [showApplyModal, setShowApplyModal] = useState(false);

    // Highlight renderer
    const renderHeading = (head, highlights) => {
        if (!highlights || highlights.length === 0) return head;

        let result = [];
        let remaining = head;

        highlights.forEach((word, index) => {
            const parts = remaining.split(word);
            result.push(parts[0]); // normal text  
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

    const heading = "Struggling to crack RHCSA because theory never matches the real exam?";
    const highlights = ["Struggling to crack RHCSA"];

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${assets.simple_bg})` }}
        >
            {/* Overlay padding container */}
            <div className="min-h-screen px-3 sm:px-14 lg:px-20 flex items-center justify-center">
                {/* Content wrapper */}
                <div className="w-full max-w-5xl text-center text-white">
                    {/* Heading */}
                    <h2 className="font-clash font-semibold text-[24px] sm:text-[28px] md:text-[35px] lg:text-[50px]
                                 leading-tight uppercase">
                        {renderHeading(heading, highlights)}
                    </h2>

                    {/* Description */}
                    <div className="flex justify-center">
                        <p className="mt-3 md:mt-5 font-inter px-6 text-center text-[16px] sm:text-[20px] text-[#DBDBDB] max-w-[940px]">
                            Get hands-on, exam-focused training that prepares you for the actual RHCSA certification exam.
                            Learn practical skills in Tamil with real lab scenarios and expert guidance.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex justify-center">
                        <div
                            onClick={() => setShowApplyModal(true)}
                            className="flex items-center gap-2 rounded-[4px]
                                     px-[22px] py-[12px] sm:py-[14px]
                                     bg-yellow cursor-pointer hover:bg-[#FFD500] transition-colors"
                        >
                            <p className="text-black font-inter font-semibold text-[16px] sm:text-[18px] whitespace-nowrap">
                                Get the RHCSA Exam Crack System
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ApplyModal
                open={showApplyModal}
                onClose={() => setShowApplyModal(false)}
            />
        </div>
    );
};

export default Hero;
