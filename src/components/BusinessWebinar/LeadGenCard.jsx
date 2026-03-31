import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LeadGenCard = ({
  title,
  highlightWord,
  subtitle,
  tags,
  cta,
  costingTitle,
  costingList,
  systemLabel,
  systemText,
  systemHighlight,
  onCtaClick,
}) => {
  // Highlighting logic for Title (Red Highlight)
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(new RegExp(`(${highlightWord})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={i} className="text-[#FF0000] font-bold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  // Highlighting logic for System Text with "Correction" style
  const renderSystemText = () => {
    if (!systemHighlight) return systemText;
    const parts = systemText.split(new RegExp(`(${systemHighlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === systemHighlight.toLowerCase() ? (
            <span key={i} className="relative inline-block mx-1">
              {/* Correction Label (System) */}
              {systemLabel && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-caveat text-[#FFFF00] text-xl md:text-2xl whitespace-nowrap rotate-[-6deg]">
                  {systemLabel}
                </span>
              )}
              {/* Struck-through text */}
              <span className="line-through text-gray-500 decoration-red-600 decoration-2">
                {part}
              </span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center w-full py-6 md:py-10 px-4">
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          background: "linear-gradient(180deg, #300000 0%, #200000 100%)",
          boxShadow: "inset 0px 0px 39px 0px rgba(255, 168, 168, 0.1)",
          color: "#fff",
          border: "1px solid #450a0a",
          borderRadius: { xs: "24px", md: "32px" },
          padding: { xs: "24px", md: "48px" },
          overflow: "visible", // Allow arrow/elements to slightly overlap if needed
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <h2 className="font-clash font-semibold text-white text-3xl md:text-[36px] leading-tight md:leading-normal tracking-wide mb-8 text-center">
            {renderTitle()}
          </h2>

          {/* Tags / Subtitle Area */}
          <div className="flex flex-col gap-4 mb-8 items-start relative px-2">
            {subtitle && (
              <div className="relative inline-block">
                <span className="font-caveat brand-text text-3xl md:text-4xl italic relative z-10 block mb-2">
                  {subtitle}
                </span>
                {/* Arrow Graphic - responsive positioning */}
                <div className="absolute -right-16 top-5 md:-right-24 md:top-2 w-12 md:w-16">
                  <img
                    src="/business-webinar/white_arrow.svg"
                    className="w-full opacity-90 transform rotate-12 md:rotate-0"
                    alt="arrow"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3 justify-start w-full">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm font-medium bg-[#3f0d0d] text-gray-200 border border-[#5c1c1c] shadow-sm`}
                >
                  {tag.type === "error" && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full text-white shrink-0">
                      <img
                        src="/business-webinar/icons/dangerous.png"
                        alt="alert"
                        className="w-full h-full object-contain"
                      />
                    </span>
                  )}
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column: Costing List */}
            <div>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mb: 2,
                  fontWeight: "medium",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  textAlign: "left",
                }}
              >
                {costingTitle}
              </Typography>
              <ul className="space-y-3 text-gray-300 pl-1">
                {costingList?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="min-w-[6px] min-h-[6px] mt-2.5 rounded-full bg-gray-400 shrink-0"></span>
                    <span className="text-base md:text-lg leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side 'System' card mimic */}
            <div className="bg-white/5 rounded-xl p-2 flex gap-2 md:flex-col items-center justify-center border border-white/10 min-h-[60px] md:min-h-[160px] relative mt-4 md:mt-0">
              {/* Red Alert Icon */}
              <div className="w-6 h-6 md:w-10 md:h-10 mb-3 flex items-center justify-center">
                <img
                  src="/business-webinar/icons/brightness_alert.png"
                  alt="alert"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>

              <Typography
                component="div"
                sx={{
                  color: "white",
                  textAlign: "center",
                  lineHeight: 1.5,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  fontWeight: "medium",
                  mt: 1,
                }}
              >
                {/* Note: systemLabel is now handled inside renderSystemText for correct positioning */}
                {renderSystemText()}
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions sx={{ p: 0, mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            className="gradient-btn-dynamic"
            onClick={onCtaClick}
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              py: { xs: 1.5, md: 2 },
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(255, 0, 0, 0.4)",
            }}
          >
            {cta}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default LeadGenCard;
