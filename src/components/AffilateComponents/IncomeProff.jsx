import IncomeCard from "./IncomeCard";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CourseContext } from "../../context/CourseContextProvider";
import { useContext } from "react";
import { pages } from "../../constants/pages"


const IncomeProff = () => {
    const { scrollLeft, scrollRight, scrollRef } = useContext(CourseContext)

    return (
        <div>
            <div>
                <div className="bg-[linear-gradient(95.13deg,#141414_2.62%,#212121_99.45%)] py-6 rounded-lg">


                    <div className="sm:flex items-center justify-between gap-2 px-6">
                        {/* Left Section */}
                        <div className="flex gap-1">
                            <h2 className="inline font-clash font-semibold text-[24px] leading-[100%] tracking-[0] uppercase">
                                Still don't believe! Here's the <span className="text-yellow">income proof</span>
                            </h2>
                            {/* <img src={assets.verified} alt="Verified" className="w-5 h-5" /> */}
                        </div>

                        {/* Right Section (Navigation Buttons) */}
                        <div className="flex items-center gap-2 mt-5 sm:mt-0">
                            <button
                                onClick={() => scrollLeft()}
                                className="bg-[#1A1A1A] p-2 rounded-full shadow text-white hover:bg-[#2a2a2a] transition"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={() => scrollRight()}
                                className="bg-[#1A1A1A] p-2 rounded-full shadow text-white hover:bg-[#2a2a2a] transition"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div ref={scrollRef} className="flex overflow-x-auto space-x-3 mt-8 px-3">
                        {
                            pages.marketing_affilate.mentor_section.income_proof.map((data, i) => (
                                <IncomeCard data={data} key={i} />
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default IncomeProff