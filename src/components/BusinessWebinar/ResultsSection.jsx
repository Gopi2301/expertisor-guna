import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import VideoPlayButton from "./VideoPlayButton";
import "./ResultsSection.css";

const ResultsSection = ({
  title,
  highlight,
  subtitle,
  cta = "Yes, I Want Results Like This",
  main_video_image,
  floating_profiles = [],
  onCtaClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const renderTitle = (text, highlightText) => {
    if (!text || !highlightText) return <span className="from-professionals-like">{text}</span>;
    const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
    return (
      <span className="achievements-title-txt-container">
        {parts.map((part, index) =>
          part.toLowerCase() === highlightText.toLowerCase() ? (
            <span key={index} className="text-[#FFE500]">
              {part}
            </span>
          ) : (
            <span key={index} className="from-professionals-like">{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <Box className="relative w-full py-16 bg-black flex flex-col items-center overflow-hidden">
      {/* Radial background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,226,0,0.15) 0%, rgba(0,0,0,0.85) 60%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <Typography
          variant="h3"
          // className="text-white font-[Clash Display Variable, sans-serif] font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[880px] mx-auto achievements-title "
          className="achievements-title"
          style={{ fontFamily: "'Clash Display Variable', sans-serif", fontWeight: 600, letterSpacing: '1px', color: '#fff', fontSize: '40px', maxWidth: '518px', margin: '0 auto' }}
        >
          {renderTitle(title, highlight)}
        </Typography>
        <p className="text-[#bdbdbd] mt-3 text-sm sm:text-base max-w-[520px] mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
          {subtitle}
        </p>

        {/* Visual area */}
        {isMobile ? (
          <MobileSteppedVisual
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            main_video_image={main_video_image}
            floating_profiles={floating_profiles}
          />
        ) : (
          <DesktopSteppedVisual
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            main_video_image={main_video_image}
            floating_profiles={floating_profiles}
          />
        )}

        {/* CTA */}
        <div className="mt-8">
          <Button
            onClick={onCtaClick}
            aria-label="Reserve My Live seat"
            className="text-black font-semibold rounded-full"
            sx={{
              background: "linear-gradient(90deg,#FFE500,#FFD100)",
              px: { xs: 6, sm: 8 },
              py: 1.6,
              color: "black",
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 520 },
              boxShadow: "0 8px 24px rgba(255,202,0,0.16)",
              fontFamily: "'Clash Display Variable', sans-serif",
              fontWeight: 600,
            }}
          >
            {cta}
          </Button>
        </div>
      </div>
    </Box>
  );
};

const FloatingProfile = ({ src, size: sizeProp, style = {}, alt = "profile", isMobile = false }) => {
  const size = sizeProp || (isMobile ? 44 : 56);
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        zIndex: 20,
        borderRadius: 2,
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        background: "#FFE500",
        padding: isMobile ? "4px" : "6px",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ display: "block", borderRadius: 8 }}
      />
    </Box>
  );
};

const MobileSteppedVisual = ({ isPlaying, setIsPlaying, main_video_image, floating_profiles = [] }) => {
  const getProfile = (i) => floating_profiles[i]?.src || "";

  // Helper for Frame styles to reduce repetition if possible, but they are very specific.
  // Using direct style objects for precision as requested.

  return (
    <div className="w-full relative flex flex-col items-center justify-center isolate gap-[5.9px]"
      style={{
        height: "313.2px",
        background: "radial-gradient(60.49% 47.25% at 50% 46.23%, #4a3f00 35.77%, rgba(5, 4, 0, 0))",
      }}
    >
      {/* Background Frames (Reverse order for z-index layering implied by CSS, or use zIndex explicitly) */}
      <div style={{
        width: "266.3px", height: "159.8px", position: "absolute", top: "calc(50% - 79.86px)", left: "54.38px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      <div style={{
        width: "301.5px", height: "195px", position: "absolute", top: "calc(50% - 97.48px)", left: "36.75px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 1, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      <div style={{
        width: "334.5px", height: "222.8px", position: "absolute", top: "calc(50% - 111.36px)", left: "20.25px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 2, opacity: 0.8, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      <div style={{
        width: "375px", height: "255px", position: "absolute", top: "calc(50% - 127.48px)", left: "0px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 3, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      <div style={{
        width: "418.5px", height: "284.3px", position: "absolute", top: "calc(50% - 142.11px)", left: "-21.75px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 4, opacity: 0.4, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      <div style={{
        width: "462px", height: "313.5px", position: "absolute", top: "calc(50% - 156.73px)", left: "-43.5px",
        borderRadius: "3px", border: "0.4px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
        zIndex: 5, opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center"
      }} />

      {/* Frame Icon (Placeholder/Decoration) */}
      {/* The CSS defined .frame-icon, assuming it's a decorative element or part of the design without a specified source in the snippet. 
          If it's an image, we need a src. I will skip rendering an <img> without src to avoid broken image icon, 
          unless it's a specific asset. The user's snippet had `object-fit: contain`, implying it's an image.
      */}

      {/* Main Content Area (Frame 8) */}
      <div style={{
        width: "211.1px", height: "126.6px", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", isolation: "isolate", gap: "5.6px", zIndex: 7, flexShrink: 0
      }}>
        <div style={{
          flex: 1, position: "relative", borderRadius: "2.81px", maxWidth: "100%", overflow: "hidden",
          maxHeight: "100%", zIndex: 0, width: "100%", height: "100%"
        }}>
          {!isPlaying ? (
            <>
              <img
                src="/business-webinar/mobile-write.png"
                alt="Results"
                className="w-full h-full object-cover"
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
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {/* Floating Elements / Decor */}

      {/* Group (Profile with background) */}
      <div style={{
        height: "73.5px", width: "73.5px", position: "absolute", top: "calc(50% - 36.75px)", left: "calc(50% - 36.79px)", zIndex: 1
      }}>
        <div style={{
          position: "absolute", top: "calc(50% - 17.56px)", left: "calc(50% - 17.56px)",
          boxShadow: "0px 0px 0px rgba(210, 200, 6, 0.25), 0px 0px 0px rgba(210, 200, 6, 0.15)",
          backdropFilter: "blur(7.12px)", borderRadius: "50%", backgroundColor: "rgba(255, 242, 0, 0.8)",
          width: "35.6px", height: "35.6px"
        }} />
        <img src={getProfile(0)} style={{
          position: "absolute", top: "calc(50% - 12.22px)", left: "calc(50% - 12.22px)",
          boxShadow: "0px 1.78px 3.56px rgba(0, 0, 0, 0.45)", width: "24.9px", height: "24.9px",
          objectFit: "cover", borderRadius: "50%"
        }} alt="" />
      </div>

      {/* Scattered Images */}
      <img src={getProfile(1)} style={{
        width: "42.6px", height: "42.6px", position: "absolute", top: "70.62px", left: "325.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 8
      }} alt="" />

      <img src={getProfile(2)} style={{
        width: "42.6px", height: "42.6px", position: "absolute", top: "19.12px", left: "233.46px",
        borderRadius: "5px", objectFit: "contain", zIndex: 9
      }} alt="" />

      <img src={getProfile(3)} style={{
        width: "41.6px", height: "41.6px", position: "absolute", top: "238.62px", left: "257.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 10
      }} alt="" />

      <img src={getProfile(4)} style={{
        width: "26.6px", position: "absolute", top: "174.62px", left: "325.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 11
      }} alt="" />

      <img src={getProfile(5)} style={{
        width: "42.8px", height: "42.8px", position: "absolute", top: "188.6px", left: "11.4px",
        borderRadius: "5px", objectFit: "contain", zIndex: 12
      }} alt="" />

      <img src={getProfile(6)} style={{
        width: "42.8px", height: "42.8px", position: "absolute", top: "93.62px", left: "18.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 13
      }} alt="" />

      <img src={getProfile(0)} style={{ // Reusing 0 if run out
        width: "27.4px", position: "absolute", top: "247.62px", left: "131.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 14, maxHeight: "100%"
      }} alt="" />

      <img src={getProfile(1)} style={{
        width: "23.5px", position: "absolute", top: "30.15px", left: "126.1px",
        borderRadius: "5px", objectFit: "cover", zIndex: 15, maxHeight: "100%"
      }} alt="" />

      <img src={getProfile(2)} style={{
        width: "27.8px", position: "absolute", top: "24.62px", left: "22.5px",
        borderRadius: "5px", objectFit: "contain", zIndex: 16, maxHeight: "100%"
      }} alt="" />

    </div>
  );
};

export default ResultsSection;

const DesktopSteppedVisual = ({ isPlaying, setIsPlaying, main_video_image, floating_profiles = [] }) => {
  const getProfile = (i) => floating_profiles[i]?.src || "";

  return (
    <div className="w-full relative flex flex-col items-center justify-center isolate"
      style={{
        padding: "145px 0px",
        background: "radial-gradient(60.49% 47.25% at 50% 46.23%, #4a3f00 35.77%, rgba(5, 4, 0, 0))",
      }}
    >
      <div className="relative w-[1200px] flex items-center justify-center flex-shrink-0">
        {/* Background Frames */}
        <div style={{
          width: "710px", height: "426px", position: "absolute", top: "calc(50% - 213px)", left: "245px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        <div style={{
          width: "804px", height: "520px", position: "absolute", top: "calc(50% - 260px)", left: "198px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 1, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        <div style={{
          width: "892px", height: "594px", position: "absolute", top: "calc(50% - 297px)", left: "154px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 2, opacity: 0.8, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        <div style={{
          width: "1000px", height: "680px", position: "absolute", top: "calc(50% - 340px)", left: "100px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 3, opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        <div style={{
          width: "1116px", height: "758px", position: "absolute", top: "calc(50% - 379px)", left: "42px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 4, opacity: 0.4, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        <div style={{
          width: "1232px", height: "836px", position: "absolute", top: "calc(50% - 418px)", left: "-16px",
          borderRadius: "8px", border: "1px solid #6e6900", boxSizing: "border-box", overflow: "hidden",
          zIndex: 5, opacity: 0.2, display: "flex", alignItems: "center", justifyContent: "center"
        }} />

        {/* Main Content Area (Frame 8) */}
        <div style={{
          width: "600px", height: "360px", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", isolation: "isolate", gap: "16px", zIndex: 7, flexShrink: 0
        }}>
          <div style={{
            flex: 1, position: "relative", borderRadius: "8px", maxWidth: "100%", overflow: "hidden",
            maxHeight: "100%", zIndex: 0, width: "100%", height: "100%", objectFit: "cover"
          }}>
            {!isPlaying ? (
              <>
                <img
                  src={main_video_image}
                  alt="Results"
                  className="w-full h-full object-cover"
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
                  ✕
                </button>
              </>
            )}
          </div>
        </div>

        {/* Floating Elements / Decor */}

        {/* Group (Profile with background) */}
        <div style={{
          height: "100px", width: "100px", position: "absolute", top: "calc(50% - 50px)", left: "calc(50% - 50px)", zIndex: 1
        }}>
          <div style={{
            position: "absolute", top: "calc(50% - 25.32px)", left: "calc(50% - 25.32px)",
            boxShadow: "0px 0px 0px rgba(210, 200, 6, 0.25), 0px 0px 0px rgba(210, 200, 6, 0.15)",
            backdropFilter: "blur(10.13px)", borderRadius: "50%", backgroundColor: "rgba(255, 242, 0, 0.8)",
            width: "50.6px", height: "50.6px"
          }} />
          <img src={getProfile(0)} style={{
            position: "absolute", top: "calc(50% - 17.72px)", left: "calc(50% - 17.72px)",
            boxShadow: "0px 2.53px 5.06px rgba(0, 0, 0, 0.45)", width: "35.3px", height: "35.3px",
            objectFit: "cover", borderRadius: "50%"
          }} alt="" />
        </div>

        {/* Scattered Images */}
        <img src={getProfile(1)} style={{
          width: "115.8px", height: "115.8px", position: "absolute", top: "128px", left: "985px",
          borderRadius: "5px", objectFit: "cover", zIndex: 8
        }} alt="" />

        <img src={getProfile(2)} style={{
          width: "115.8px", height: "115.8px", position: "absolute", top: "-43px", left: "736px",
          borderRadius: "5px", objectFit: "cover", zIndex: 9
        }} alt="" />

        <img src={getProfile(3)} style={{
          width: "112.9px", height: "112.9px", position: "absolute", top: "566px", left: "1004px",
          borderRadius: "5px", objectFit: "cover", zIndex: 10
        }} alt="" />

        <img src={getProfile(4)} style={{
          width: "112.9px", height: "112.9px", position: "absolute", top: "582px", left: "286px",
          borderRadius: "5px", objectFit: "cover", zIndex: 11
        }} alt="" />

        <img src={getProfile(5)} style={{
          width: "72.3px", height: "72.3px", position: "absolute", top: "357px", left: "1098px",
          borderRadius: "5px", objectFit: "cover", zIndex: 12
        }} alt="" />

        <img src={getProfile(6)} style={{
          width: "112.9px", height: "112.9px", position: "absolute", top: "368px", left: "63px",
          borderRadius: "5px", objectFit: "cover", zIndex: 13
        }} alt="" />

        <img src={getProfile(0)} style={{
          width: "116.4px", height: "116.4px", position: "absolute", top: "112px", left: "-16px",
          borderRadius: "5px", objectFit: "cover", zIndex: 14
        }} alt="" />

        <img src={getProfile(1)} style={{
          width: "74.1px", height: "74.1px", position: "absolute", top: "620px", left: "63px",
          borderRadius: "5px", objectFit: "cover", zIndex: 15
        }} alt="" />

        <img src={getProfile(2)} style={{
          width: "74.1px", height: "74.1px", position: "absolute", top: "564px", left: "679px",
          borderRadius: "5px", objectFit: "cover", zIndex: 16
        }} alt="" />

        <img src={getProfile(3)} style={{
          width: "64px", height: "64px", position: "absolute", top: "15px", left: "415px",
          borderRadius: "5px", objectFit: "cover", zIndex: 17
        }} alt="" />

        <img src={getProfile(4)} style={{
          width: "75.7px", height: "75.7px", position: "absolute", top: "35px", left: "168px",
          borderRadius: "5px", objectFit: "cover", zIndex: 18
        }} alt="" />

      </div>
    </div>
  );
};
