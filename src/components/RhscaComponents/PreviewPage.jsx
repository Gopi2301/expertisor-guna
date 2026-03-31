import { useState } from "react";
import { assets } from "../../assets/assets";
import Download from "../Download";
import StartButton from "../StartButton";

const PreviewPage = () => {
    const [playVideo, setPlayVideo] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);

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

    const heading = "Struggling to crack RHCSA because theory never matches the real exam?";
    const highlights = ["Struggling to crack RHCSA"];

    return (
        <div
            className="px-3 min-h-screen sm:px-14 lg:px-20
                       bg-cover bg-center bg-no-repeat
                       flex items-center justify-center"
            style={{ backgroundImage: `url(${assets.simple_bg})` }}
        >
            <section className="text-white flex flex-col items-center w-full">
                {/* Heading Section */}
                <div className="max-w-5xl text-center">
                    <h1 className="font-clash font-semibold text-[25px] sm:text-[35px] lg:text-[41px]
                                   leading-[100%] tracking-[0.02em]">
                        {renderHeading(heading, highlights)}
                    </h1>
                </div>

                {/* Video Section */}
                <div className="w-full max-w-2xl mx-auto my-10">
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

                {/* Buttons */}
                <div className="sm:flex-row flex flex-col justify-center gap-3 w-full">
                    <StartButton data={{ name: "Apply Now", link: "" }} />
                    <Download data={{ name: "Download Brochure", link: "" }} />
                </div>
            </section>
        </div>
    );
};

export default PreviewPage;
