import "./WithOutSystem.css";

const WithOutSystem = ({ title, highlight, subtitle, image, cta, onCtaClick }) => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="desktop-only w-full py-16 px-4 flex-col items-center justify-center bg-black relative z-10">
        {/* Title Section */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
          {title && highlight && title.includes(highlight) ? (
            <>
              <span className="text-[#FFEA00]">{highlight}</span>
              {title.replace(highlight, "")}
            </>
          ) : (
            title
          )}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm md:text-lg mb-12 text-center max-w-2xl font-light">
          {subtitle}
        </p>

        {/* Image Container with CTA Overlay */}
        <div className="relative w-full max-w-5xl group">
          {/* The Card/Image Background */}
          <div className="w-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            {image ? (
              <img
                src={image}
                alt="With vs Without System"
                className="w-full h-auto object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-96 bg-gray-900 flex items-center justify-center text-gray-600">
                Image Placeholder
              </div>
            )}

            {/* Fade gradient at bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
          </div>

          {/* CTA Button - Absolute positioned at bottom center */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-max z-20">
            <button
              className="primary-btn-gradient hover:scale-105 transition-all duration-300 text-black font-semibold py-3 md:py-4 px-8 md:px-12 rounded shadow-[0_0_20px_rgba(255,234,0,0.5)] cursor-pointer"
              onClick={onCtaClick}
            >
              {cta}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-only without-system-frame" style={{ background: '#000', paddingBottom: '40px' }}>
        {/* Mobile reuses the logic? No, completely different structure per reference.
              Ref has: frame > frame2 (img) > frame2 (button). 
              It seems title/subtitle are NOT in the mobile Ref? 
              User said "optimize this component for mobile view ... match this reference"
              The reference HTML ONLY contains the image and the button.
              It does NOT show the Title or Subtitle in the reference HTML.
              However, removing the title/subtitle might be drastic.
              
              Looking at the reference HTML image:
              It has NO text except the button. 
              The prompt says "optimize... use mobile-without_system.png".
              The `mobile-without_system.png` likely contains the text embedded if it matches the style of previous images, OR the user just wants the image + button.
              Given the explicit HTML provided only has Image + Button, I will follow that for the Mobile View.
              
              If the user made a mistake and wants text, I can add it back later. Sticking to the reference.
          */}
        <div className="without-system-frame2">
          <img className="without-system-icon" alt="" src="/business-webinar/mobile-without_system.png" />
        </div>
        <div className="without-system-frame2">
          <div className="without-system-frame4" onClick={onCtaClick}>
            <div className="without-system-confirmation">{cta || "I Want a Clear System for My Firm"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithOutSystem;
