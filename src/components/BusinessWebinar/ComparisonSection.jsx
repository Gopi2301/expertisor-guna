import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ComparisonSection = ({
  sectionTitle,
  sectionTitleHighlight,
  mistakes,
  solutions,
  cta,
  onCtaClick,
}) => {
  // Helper to render the "Hand-Drawn" style underline
  const renderHighlightedText = (
    text,
    highlight,
    colorClass,
    underlineAssetPath, // Path to your SVG/PNG underline
  ) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              className={`${colorClass} relative inline-block z-10 px-1`}
            >
              {part}
              {/* The Image Asset Underline */}
              {underlineAssetPath && (
                <img
                  src={underlineAssetPath}
                  alt=""
                  className="absolute -bottom-2 left-0 w-full h-auto min-h-[8px] -z-10 object-contain pointer-events-none"
                  style={{
                    // Adjusting scale to make it slightly wider than the word
                    transform: "scaleX(1.1)",
                  }}
                />
              )}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="w-full px-4 md:mt-24 md:mb-20 mb-12 flex justify-center bottom-gradient font-sans">
      <div className="w-full max-w-6xl relative overflow-hidden p-6 md:p-12 mobile-gradient-card md:no-gradient">
        <h3
          className="text-center text-white font-clash font-semibold leading-normal tracking-wide mb-8 md:mb-12"
          style={{
            fontFamily: '"Clash Display Variable", sans-serif',
            fontSize: "clamp(24px, 4vw, 36px)",
            letterSpacing: "1.44px",
          }}
        >
          {
            (() => {
              const fullTitle =
                sectionTitle ||
                "How Most Firms Try to Fix This (And Why It Backfires)";
              const [first, ...rest] = fullTitle.split("(");
              const second = rest.length ? "(" + rest.join("(") : "";
              return (
                <>
                  <span className="block">
                    {first?.trim()}
                  </span>
                  {second && (
                    <span className="block">
                      {renderHighlightedText(
                        second,
                        sectionTitleHighlight || "Why It Backfires",
                        "text-[#FF0000]",
                        "",
                      )}
                    </span>
                  )}
                </>
              );
            })()
          }
        </h3>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mistakes Card (Red/Dark Theme) */}
          <Card
            sx={{
              borderRadius: "16px",
              border: "1px solid #4A0000",
              background:
                "radial-gradient(170.97% 65.56% at 84.73% 100%, #5C0000 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(91.79% 96.12% at 5.63% 100%, #2D0000 0%, rgba(0, 0, 0, 0.00) 100%), #150000",
              backgroundBlendMode: "screen, screen, normal",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "400",
                  mb: 4,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  lineHeight: 1.3,
                  fontFamily: '"Clash Display Variable", sans-serif',
                }}
              >
                {renderHighlightedText(
                  mistakes.title,
                  mistakes.highlight,
                  "text-[#ff4d4d]",
                  "/business-webinar/icons/red_underline.svg",
                )}
              </Typography>

              <ul className="flex flex-col gap-3">
                {mistakes.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3 px-4 py-3 rounded-xl w-full text-gray-200 text-sm md:text-base font-medium"
                  >
                    <img
                      src="/business-webinar/icons/dangerous.png"
                      alt="x"
                      className="w-5 h-5 object-contain mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Solutions Card (Yellow/Dark Theme) */}
          <Card
            sx={{
              borderRadius: "8px",
              border: "1px solid #4A3A00",
              background:
                "radial-gradient(170.97% 65.56% at 84.73% 100%, #B18800 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(91.79% 96.12% at 5.63% 100%, #A38200 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(#151100, #151100)",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
              isolation: "isolate",
            }}
          >
            <CardContent sx={{ p: "16px 12px" }}>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "400",
                  mb: 4,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  lineHeight: 1.5,
                  fontFamily: '"Clash Display Variable", sans-serif',
                }}
              >
                {renderHighlightedText(
                  solutions.title,
                  solutions.highlight,
                  "text-[#facc15]",
                  "/business-webinar/icons/yellow_underline.svg",
                )}
              </Typography>

              <ul className="flex flex-col gap-3">
                {solutions.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-white/5 flex items-start gap-2.5 px-3 py-2.5 rounded-[8px] w-full text-gray-200 text-base font-medium"
                  >
                    <img
                      src="/business-webinar/icons/check_circle.png"
                      alt="check"
                      className="w-6 h-6 object-contain mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10 md:mt-12">
          <Button
            variant="contained"
            onClick={onCtaClick}
            sx={{
              // 1. Multi-stepped horizontal gradient (Yellow to Light Yellow to Yellow)
              background:
                "linear-gradient(to right, #fff200, #FFF876, #FFF200, #FFF876, #fff200)",

              color: "#000",
              fontWeight: "600",
              fontSize: { xs: "0.5rem", md: "1rem" },
              px: { xs: 4, md: 6 },
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              border: "1px solid rgba(255, 255, 255, 0.5)", // Bright edge highlight

              // 2. Spreaded Glow Effect
              // The first shadow is a tight glow, the second is a wide spread
              boxShadow: `
                0px 0px 15px 1px rgba(255, 242, 0, .2), 
                0px 0px 40px 5px rgba(255, 242, 0, .2),
                inset 0px 1px 1px rgba(255, 255, 255, 0.8)
              `,

              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

              "&:hover": {
                // Subtle shift in glow intensity on hover
                boxShadow: `
                  0px 0px 25px 2px rgba(255, 242, 0, 0.2), 
                  0px 0px 60px 8px rgba(255, 242, 0, 0.2)
                `,
                transform: "scale(1.02)",
                filter: "brightness(1.05)",
              },
            }}
          >
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
