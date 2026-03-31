import Card from "@mui/material/Card";
import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Lottie from "lottie-react";
import whatYouWillLearnAnimation from "../../assets/animations/what_you_will_learn.json";
import OptimizedImage from "../OptimizedImage";

// Actually LeadGenCard used MUI Button, so I will stick to it for the CTA to be safe, or just use a styled button.
// The image shows a yellow button. I'll style it to match.

const LearnSection = ({
  title,
  highlightWord,
  subtitle,
  image,
  whoIsFor,
  onCtaClick,
}) => {
  // Helper to highlight specific word in title
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(new RegExp(`(${highlightWord})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={i} className="text-[#FFE500]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="w-full  text-white">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center my-12">
          <h2 className="text-4xl md:text-5xl font-semibold font-clash mb-4">
            {renderTitle()}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">{subtitle}</p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center mx-1 md:mx-0">
          {/* Left Column: Image */}
          <div className="w-full md:w-auto flex justify-center">
            {/* Placeholder for the image if not provided, or use the provided image prop */}
            <div className="rounded-2xl overflow-hidden border border-gray-800 relative z-10 w-full max-w-[400px] md:max-w-none">
              {/* Use the uploaded image behavior or placeholder if empty */}
              <OptimizedImage
                src={
                  image ||
                  "https://placehold.co/600x600/1a1a1a/FFF?text=Instructor+Image"
                }
                alt="Instructor"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column: List & CTA */}
          <div className="relative w-full md:w-auto">
            {/* Vertical Line for Timeline Effect */}
            {/* Positioned absolutely relative to the container. 
                left-4 is 1rem (16px), which is exactly the center of the w-8 (32px) icon container.
                top-4 is the center of the first star (approx).
            {/* Refactored Layout: List and Line wrapper */}
            <div className="relative">
              {/* Centered vertical line
                  - Centered in w-12 (48px) column -> left-6 (24px).
                  - Width 2px.
                  - top-[48px]: Starts below the active star (which is h-12).
                  - bottom-[50px]: Stops roughly above the last item content/star.
              */}
              <div className="w-full max-w-[600px] mx-auto relative z-10 flex justify-center">
                <Lottie
                  animationData={whatYouWillLearnAnimation}
                  loop={true}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Figma-style CTA Button - Moved outside relative wrapper */}
            <div className="mt-6 md:mt-12 flex justify-center md:block md:pl-16">
              <button
                onClick={onCtaClick}
                className="border border-solid border-white px-10 py-[13.5px] rounded-[4px] font-semibold text-[14px] text-black w-full md:w-auto"
                style={{
                  backgroundImage:
                    "linear-gradient(93.9deg, rgba(255, 242, 0, 1) 0%, rgba(255, 248, 118, 1) 29.8%, rgba(255, 242, 0, 1) 54.7%, rgba(255, 248, 118, 1) 78.4%, rgba(255, 242, 0, 1) 100%)",
                  boxShadow: "0 2px 8px 0 rgba(255, 242, 0, 0.10)",
                }}
              >
                I Want to Learn This Live
              </button>
            </div>
          </div>
        </div>
        {/* For whom */}
        <div className="relative mt-20 py-20 flex flex-col gap-6 items-center justify-center overflow-hidden">
          {/* Background Image Layer */}
          <OptimizedImage
            src="/business-webinar/background-people.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
          {/* 1. The Gradient Overlay: Sitting between BG image and Content */}
          <div className="absolute inset-0 bottom-gradient z-0 opacity-90 pointer-events-none" />

          {/* 2. Content Wrapper: Higher Z-index to stay above the overlay */}
          <div className="relative z-10 flex flex-col items-center gap-6 w-full px-4">
            <h3 className="fix-title">
              Who this is <span className="for">for</span> and{" "}
              <span className="not-for">Not for?</span>
            </h3>

            <Box
              className="gold-bottom-gradient"
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                justifyContent: "center",
                maxWidth: 900,
                width: "100%",
              }}
            >
              {whoIsFor?.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    gap: 2,
                    bgcolor: "rgba(255, 255, 255, 0.05)", // Darker fill for the tags to pop against the gold
                    borderRadius: 2,
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                    flex: {
                      xs: "1 1 100%",
                      sm: item.fullWidth ? "1 1 100%" : "1 1 auto",
                    },
                  }}
                >
                  {item.type === "success" ? (
                    <CheckCircleIcon sx={{ color: "#FFE500" }} />
                  ) : (
                    <CancelIcon sx={{ color: "#FF0000" }} />
                  )}
                  <Typography
                    sx={{ color: "#fff", fontSize: "0.95rem", fontWeight: 400 }}
                  >
                    {item.text}
                  </Typography>
                </Card>
              ))}
            </Box>

            <button
              onClick={onCtaClick}
              className="primary-btn-gradient hover:bg-yellow-400 text-black font-semibold font-inter py-4 px-8 rounded-lg text-md w-full max-w-[384px] transition-all duration-300 transform hover:scale-[1.02] shadow-xl mt-4"
            >
              Yes, I've Been Doing this Wrong
            </button>
          </div>
        </div>
        {/* cta */}
      </div>
    </div>
  );
};

export default LearnSection;
