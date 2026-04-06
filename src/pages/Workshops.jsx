import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadGenCard from "../components/BusinessWebinar/LeadGenCard"; // Keep this eager as it's often near the top
import FeatureBadge from "../components/BusinessWebinar/FeatureBadge";
import VideoPlayButton from "../components/BusinessWebinar/VideoPlayButton";
import ReservationBanner from "../components/BusinessWebinar/ReservationBanner";
import WorkshopSeatPopup from "../components/BusinessWebinar/WorkshopSeatPopup";

// Lazy load below-the-fold components
const LogoCarousel = React.lazy(() => import("../components/BusinessWebinar/LogoCarousel"));
const ComparisonSection = React.lazy(() => import("../components/BusinessWebinar/ComparisonSection"));
const LearnSection = React.lazy(() => import("../components/BusinessWebinar/LearnSection"));
const ResultsSection = React.lazy(() => import("../components/BusinessWebinar/ResultsSection"));
const AboutAuthor = React.lazy(() => import("../components/BusinessWebinar/AboutAuthor"));
const WithOutSystem = React.lazy(() => import("../components/BusinessWebinar/WithOutSystem"));
const Cta = React.lazy(() => import("../components/BusinessWebinar/Cta"));
const FAQ = React.lazy(() => import("../components/BusinessWebinar/FAQ"));
const Footer = React.lazy(() => import("../components/Footer"));

const Workshops = ({ data }) => {
    const navigate = useNavigate();
    const heroData = data?.hero_section || {};
    const liveBadgeImg = "/business-webinar/2hr.svg";
    const seatIconImg = "/business-webinar/seat-icon.png";

    const handleCtaClick = () => {
        navigate("/proclass/ssr/seat");
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSeatPopupOpen, setIsSeatPopupOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState("24 Dec, 06:15:24 PM");
    const [seatsLeft, setSeatsLeft] = useState(13);
    const { heading, highlights, para, features, webinar_details, hero_image } = heroData;

    const formatHeading = (text, highlightList) => {
        if (!text || !highlightList?.length) return text;

        const escaped = highlightList.map((h) =>
            h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );
        const regex = new RegExp(`(${escaped.join("|")})`, "gi");

        return text.split(regex).map((part, index) =>
            highlightList.some(
                (h) => h.toLowerCase().trim() === part.toLowerCase().trim()
            ) ? (
                <span key={index} className="brand-text">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev);
            setSeatsLeft((prev) => prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const zohoConfig = {
        layoutId: "1070637000001855053",
        Amount: "99",
        Course_Name_Text: "Video Editing Course",
        Deal_Name: "Video Editing | WS",
        Workshop: "1070637000003468106",
        Course_Name: "1070637000002915041",
        Call_Status: "Not Called",
        Course_Interest: "Cold",
        Pipeline: "Workshop",
    };

    if (!data) return null;

    return (
        <div className="w-full h-full bg-[#050400] font-clash pb-24">
            <div
                className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-black bg-opacity-80 flex items-center justify-between px-20 py-3"
                data-name="LiveNotificationBar"
                style={{
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
            >
                <div className="flex flex-col gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1">
                        <div
                            className="relative w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden"
                            style={{
                                backgroundImage:
                                    "linear-gradient(90.703deg, rgba(255, 242, 0, 1) 0%, rgba(255, 248, 118, 1) 29.758%, rgba(255, 242, 0, 1) 54.656%, rgba(255, 248, 118, 1) 78.369%, rgba(255, 242, 0, 1) 100%)",
                            }}
                        >
                            <img
                                src={seatIconImg}
                                alt="seat"
                                className="w-4 h-4 object-contain"
                            />
                        </div>
                        <span className="text-white font-semibold text-sm tracking-tight">
                            <span className="text-[#ff2d2d]">{seatsLeft} seats</span>
                            <span className="text-white ml-1">left</span>
                        </span>
                    </div>

                    <p className="text-gray-300 text-xs font-normal">{timeLeft}</p>
                </div>

                <div className="flex-1 flex justify-center px-8">
                    <img
                        src={liveBadgeImg}
                        alt="Live Proclass Badge"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                <button
                    onClick={() => setIsSeatPopupOpen(true)}
                    className="bg-[#fff200] hover:bg-yellow-300 active:bg-yellow-400 transition-all duration-200 text-black font-semibold rounded-md px-5 py-2 text-sm whitespace-nowrap flex-shrink-0 shadow-lg hover:shadow-xl"
                >
                    Reserve My Live seat
                </button>
            </div>

            <div className="relative">
                <section
                    className="w-full min-h-screen flex flex-col items-center justify-center pt-12 pb-20 overflow-x-hidden"
                    style={{
                        background:
                            "radial-gradient(174.52% 50% at 95.47% 97.18%, #ffffea, #ffc400 22.5%, rgba(0, 0, 0, 0)), radial-gradient(106.17% 50% at 22.13% 100%, #ffcc00, rgba(0, 0, 0, 0))",
                        mixBlendMode: "normal",
                    }}
                >
                    <div className="container mx-auto px-4 z-10 flex flex-col items-center gap-8">
                        <div className="md:max-h-[50vh]">
                            <div className="text-center max-w-5xl">
                                <h1 className="font-clash text-[28px] md:text-[50px] font-semibold text-white leading-none tracking-[0.02em] text-center capitalize">
                                    {formatHeading(heading, highlights)}
                                </h1>
                                <p className="mt-6 text-sm md:text-base font-inter text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                    {para}
                                </p>
                            </div>

                            <div className="w-full relative flex items-start justify-center flex-wrap content-start gap-3 text-left text-sm text-white font-inter mt-3">
                                {features?.map((feature, index) => (
                                    <FeatureBadge key={index} icon={feature.i} text={feature.para} />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-3 md:max-h-[50vh] w-full">
                            <div className="relative flex flex-col gap-3 w-full md:w-auto md:h-[45vh] aspect-video rounded-xl overflow-hidden mx-auto shadow-2xl">
                                {!isPlaying ? (
                                    <>
                                        <img
                                            src={hero_image}
                                            className="max-h-full w-full h-full object-contain"
                                            alt="Webinar Preview"
                                        />
                                        <VideoPlayButton onClick={() => setIsPlaying(true)} />
                                    </>
                                ) : (
                                    <>
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/1rZduaU4oco?autoplay=1"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <button
                                            onClick={() => setIsPlaying(false)}
                                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors"
                                            aria-label="Close video"
                                        >
                                            X
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:flex md:flex-row justify-start gap-3 w-full md:w-auto">
                                {webinar_details?.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-[#0F0F0FDB] backdrop-blur-[4px] rounded-xl px-4 py-2 min-w-[100px]"
                                    >
                                        <div
                                            className="rounded-lg p-2 flex items-center justify-center w-8 h-8"
                                            style={{
                                                background:
                                                    "linear-gradient(174deg, rgba(255, 242, 0, 1) 0%, rgba(255, 248, 118, 1) 50%, rgba(255, 242, 0, 1) 100%)",
                                            }}
                                        >
                                            <img
                                                src={detail.icon}
                                                alt={detail.label}
                                                className="w-6 h-6 object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#8A8A8A] text-xs font-normal">
                                                {detail.label}
                                            </span>
                                            <span className="text-white text-xs font-inter">
                                                {detail.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isMobile && <ReservationBanner />}
                </section>
            </div>

            <WorkshopSeatPopup
                isOpen={isSeatPopupOpen}
                onClose={() => setIsSeatPopupOpen(false)}
                seatsLeft={seatsLeft}
                zohoConfig={zohoConfig}
            />
        </div>
    );

};

export default Workshops;
