import React from "react";

const AboutAuthor = ({
  title,
  highlightWord,
  subtitle,
  image,
  btnImage,
  cta,
  list,
  onCtaClick,
}) => {
  // Helper to highlight words
  const renderTextWithHighlight = (text, highlight) => {
    if (!highlight) return text;
    // Escape special regex characters
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-[#FFE500] font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="w-full font-clash bg-black py-20 px-6 md:px-20 text-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {renderTextWithHighlight(title, highlightWord)}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            {subtitle}
          </p>
        </div>

        {/* Content Container */}
        <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full rounded-lg overflow-hidden border border-gray-800">
              {/* Using object-cover to fill the box like the design */}
              <img
                src={image}
                alt="Author"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: List & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {list?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/5 rounded-lg p-2 flex items-center gap-4 hover:border-white/5 transition-colors"
                >
                  <div className="w-6 h-6 flex-shrink-0">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <p className="text-white text-sm md:text-base">
                    {renderTextWithHighlight(item.text, item.highlight)}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onCtaClick}
              className="w-full primary-btn-gradient text-black font-semibold text-sm md:text-base py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors mt-4"
            >
              {/* Small Avatar in Button - optional, hardcoding standard icon or omitting if not in props but shown in design */}
              <div className="w-8 h-8 rounded-full bg-black overflow-hidden relative">
                <img
                  src={btnImage}
                  alt="User"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>{cta}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
