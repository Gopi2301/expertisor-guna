import React from "react";
import { pages } from "../../constants/pages";
import Heading from "../Heading";

const CivilDemands = ({ data }) => {
    return (
        <div className="bg-black py-[80px] lg:py-[160px] text-white font-inter px-3 sm:px-14 lg:px-20">
            {/* Heading */}
            <Heading head={data.title} highlights={data.highlights} p1={data.p1} p2={data.p2} />

            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-4 ">

                {/*card 1*/}
                <div className="md:col-span-2">
                    <div className="bg-[#111] p-6 rounded-lg grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="font-clash font-semibold text-[30px] sm:text-[40px] ">
                                {data.card1.salary_range}
                            </h3>
                            <p className="text-yellow font-inter font-semibold text-[20px] sm:text-[28px] mt-2">
                                {data.card1.title}
                            </p>
                            <p className="text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[24px] mt-2">
                                {data.card1.description}
                            </p>

                            <div className=" mt-6">
                                <p className="font-inter font-normal text-[16px] sm:text-[18px] text-[#B8B8B8]">Source:</p>
                                <div className="flex gap-3 items-center">
                                    {
                                        data.card1.sources.map((data, i) => (
                                            <a key={i} href={data.link}>
                                                <img src={data.img} alt="" />
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center justify-center">
                            <img src={data.card1.desc_img} alt="vdf" />
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#111] p-6 rounded-lg">
                    <h3 className="font-clash font-semibold text-[30px] sm:text-[40px]">{data.card2.percentage}</h3>
                    <p className="text-yellow font-inter font-semibold text-[20px] sm:text-[28px] mt-2">{data.card2.title}</p>
                    <p className="text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[24px] mt-2">
                        {data.card2.description}
                    </p>
                    <div className="flex justify-center mt-5">
                        <img src={data.card2.desc_img} alt="img" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#111] p-6 rounded-lg">
                    <h3 className="font-clash font-semibold text-[30px] sm:text-[40px]">{data.card3.percentage}</h3>
                    <p className="text-yellow font-inter font-semibold text-[20px] sm:text-[28px] mt-2">{data.card3.title}</p>
                    <p className="text-[#B8B8B8] font-inter font-normal text-[16px] sm:text-[18px] leading-[24px] mt-2">
                        {data.card3.description}
                    </p>
                    <div className="flex justify-center mt-5">
                        <img src={data?.card3?.desc_img} alt="img" />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CivilDemands;



