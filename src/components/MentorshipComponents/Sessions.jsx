





import React, { useState } from "react";
import { Star, Clock, Video, Users } from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Sessions = ({ data,mentorKey }) => {
    const [showMore, setShowMore] = useState(false);
    const navigate=useNavigate()

    return (
        <div className="bg-black text-white rounded-xl p-5">

            {/* Always visible part */}
            {data.desc1 && (
                <p className="mt-3 font-inter font-normal text-[16px] leading-[20px] text-[#A7A7A7]">
                    {data.desc1}
                </p>
            )}

            {/* Show More content */}
            {showMore && (
                <>
                    {data.desc2 && (
                        <p className="font-inter mt-3 font-normal text-[16px] leading-[20px] text-[#A7A7A7]">
                            {data.desc2}
                        </p>
                    )}

                    {data.pathway && (
                        <div className="my-3 flex gap-2 flex-wrap">
                            {data.pathway.map((path, i) => (
                                <div
                                    key={i}
                                    className="flex gap-2 p-[10px] bg-[#1C1C1C] rounded-full font-inter font-normal text-[16px] leading-[20px] items-center"
                                >
                                    <img src={path.icon} alt="" />
                                    <p>{path.para}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.desc3 && (
                        <p className="font-inter font-normal text-[16px] leading-[20px] text-[#A7A7A7]">
                            {data.desc3}
                        </p>
                    )}

                    {data.desc4 && (
                        <p className="mt-3 font-inter font-normal text-[16px] leading-[20px] text-[#A7A7A7]">
                            {data.desc4}
                        </p>
                    )}
                </>
            )}

            {/* Toggle button */}
            {(data.desc2 || data.pathway || data.desc3 || data.desc4) && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-2 text-gray-50 font-inter font-medium text-[15px] "
                >
                    {showMore ? "Show Less" : "Show More"}
                </button>
            )}

            {/* Existing Available Sessions Section */}
            <h2 className="text-[22px] font-semibold mb-5 mt-10">Available sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.consulting?.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-[#0C0C0C] relative rounded-lg p-5 flex flex-col md:flex-row items-center gap-4 ${item.image ? "md:col-span-2" : ""
                            }`}
                    >

                        <div
                            className="py-[6px] px-[8px] absolute top-0 right-0 rounded-bl-xl"
                            style={{ background: item.diamond_bg }}
                        >
                            <img src={item.diamond} alt="" />
                        </div>



                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-[220px] h-[160px] object-cover rounded-md"
                            />
                        )}

                        <div className="flex-1">
                            <h3 className="font-inter font-semibold text-[18px]">{item.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm mt-2 mb-3">
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFC2211A]">
                                    <img src={assets.star} alt="" />
                                    <span className="font-inter font-normal text-[14px] text-[#ffffff]">
                                        {item.rating}
                                    </span>
                                </div>

                                {item.slotsLeft && (
                                    <div className="flex items-center gap-1 px-2 py-[6px] rounded-full bg-[#FF21211A]">
                                        <Users className="w-4 h-4 text-[#FF2121]" />
                                        <p className="font-inter font-normal text-[14px] text-[#ffffff]">
                                            {item.slotsLeft} slots left
                                        </p>
                                    </div>
                                )}

                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-inter font-normal text-[14px]">{item.duration}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Video className="w-4 h-4" />
                                    <span className="font-inter font-normal text-[14px]">{item.type}</span>
                                </div>

                                {item.group && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span className="font-inter font-normal text-[14px]">{item.group}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-[#8A8A8A] font-inter font-normal text-[14px] leading-relaxed mb-4 line-clamp-3">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between">
                                {item.newPrice && (
                                    <div className="flex flex-col">
                                        <p className="text-[#8A8A8A] font-inter font-normal text-[14px] line-through">
                                            {item.oldPrice}
                                        </p>
                                        <p className="font-inter font-semibold text-[18px] text-white">
                                            {item.newPrice}
                                        </p>
                                    </div>
                                )}

                                {/* <a
                                    href={data.book_now_link}
                                    className="bg-yellow cursor-pointer text-black font-inter font-semibold text-[16px] px-3 py-2 rounded-[4px] inline-flex items-center gap-2"
                                >
                                    Book Now
                                    <img
                                        src={assets.r_long_arrow}
                                        alt="arrow"
                                        className="w-4 h-4 object-contain text-nowrap"
                                    />
                                </a> */}


                                <button
                                    onClick={() => {
                                        if (item.route?.startsWith("http")) {
                                            // ✅ External link (e.g., YouTube)
                                            window.open(item.route, "_blank");
                                        } else {
                                            // ✅ Internal navigation
                                            navigate(item.route || `/eliteconnect/${mentorKey}/life-transformation`,{state: { sessionId: item.id }});
                                        }
                                    }}
                                    className="bg-yellow cursor-pointer text-black font-inter font-semibold text-[16px] px-3 py-2 rounded-[4px] inline-flex items-center gap-2"
                                >
                                    Book Now
                                    <img
                                        src={assets.r_long_arrow}
                                        alt="arrow"
                                        className="w-4 h-4 object-contain text-nowrap"
                                    />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sessions;
