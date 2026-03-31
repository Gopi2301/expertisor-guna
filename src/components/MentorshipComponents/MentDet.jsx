



import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { pages } from "../../constants/pages";
import Heading from "../Heading";
import { assets } from "../../assets/assets";
import { useState } from "react";
import SeatsBanner from "./SeatsBanner";


const MentDet = () => {

    const { mentorKey } = useParams();
    const location = useLocation();
    const sessionId = location.state?.sessionId; // get from navigation state

    // Get mentor data
    const mentor = pages.mentorship[mentorKey];
    if (!mentor) return <p className="text-center text-red-500">Mentor not found!</p>;

    // Get session data if sessionId exists
    const session = sessionId
        ? mentor.sessions.consulting.find((s) => s.id === sessionId)
        : null;


    const features = [
        "1:1 Mentorship Calls with Raghulan Gowthamian",
        "Monthly Group Mastermind Calls with the Elite Community",
        "A Personalized Strategy Blueprint for Your Mindset, Career, and Business",
        "Continuous Support for Real Transformation",
    ];

    const [playVideo, setPlayVideo] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);


    const thumbnails = [
        `https://img.youtube.com/vi/PPMKUJgoFSA/maxresdefault.jpg`,
        `https://img.youtube.com/vi/PPMKUJgoFSA/hqdefault.jpg`,
        `https://img.youtube.com/vi/PPMKUJgoFSA/mqdefault.jpg`,
    ];

    const handleThumbError = () => {
        if (thumbIndex < thumbnails.length - 1) {
            setThumbIndex((prev) => prev + 1);
        }
    };

    return (
        <div className="px-3 sm:px-14 lg:px-20">
            <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center  py-12">
                {/* Heading Section */}
                <div className="max-w-5xl text-center ">
                    <h1 className="font-clash font-semibold text-[25px] sm:text-[35px] lg:text-[50px] leading-[100%] tracking-[0.02em] text-center">
                        Transform your{" "}
                        <span className="text-yellow">mindset</span>,{" "}
                        <span className="text-yellow">career</span>, and{" "}
                        <span className="text-yellow">business</span> in{" "}
                        <span className="text-yellow">90 days</span> with my
                        personalized transformation framework.
                    </h1>



                    <p className="font-inter mt-4 md:mt-8 inline-block bg-yellow/10 text-yellow-400 text-[14px] md:text-[18px] border border-yellow/20 rounded-lg px-4 py-2">
                        🎁 If you don’t get results, I’ll work with you again for{" "}
                        <span className=" text-yellow ">free</span> until you get results.
                    </p>
                </div>

                {/* Video Section */}
                <div className="w-full max-w-5xl mx-auto my-14">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        {playVideo ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/PPMKUJgoFSA?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div
                                className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                                onClick={() => setPlayVideo(true)}
                            >
                                <img
                                    src={thumbnails[thumbIndex]}
                                    onError={handleThumbError}
                                    alt="Video Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 text-white"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* Features Section */}
                <div className=" space-y-4">
                    <p className="font-inter font-semibold text-[18px] sm:text-[20px] leading-[24px]  text-[#FFFFFF]">What You will get in this 90 days personalized transformation?</p>
                    <ul className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] space-y-3 text-left md:text-center list-none">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <img src={assets.verified} alt="tick" className="w-5 h-5" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>


                <SeatsBanner/>
            </section>
        </div>
    );
};

export default MentDet;

