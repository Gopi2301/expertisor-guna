import React, { useState, useEffect } from "react";
import "./Cta.css";

const Cta = ({
  title,
  titleHighlight,
  subtitle,
  subtitleHighlight,
  buttonText,
  disclaimer,
  image,
  onCtaClick,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 10,
    minutes: 30,
    seconds: 15,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          // Reset or stop
          return { days: 4, hours: 10, minutes: 30, seconds: 15 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, "0");

  const HighlightText = ({ text, highlight }) => {
    if (!highlight) return <>{text}</>;
    // Simple split might not work if highlight appears multiple times or case mismatch, 
    // but for this specific use case and keeping logic similar to before:
    const parts = text.split(highlight);
    // If exact match found
    if (parts.length > 1) {
      return (
        <span className="achievements-title-txt-container">
          <span>{parts[0]}</span>
          <span className="trial-and-error">{highlight}</span>
          <span>{parts[1]}</span>
        </span>
      );
    }
    return <span className="achievements-title-txt-container">{text}</span>;
  };

  return (
    <div className="frame">
      {/* DESKTOP VIEW */}
      <div className="desktop-only contents"> {/* contents helps to not break flex layout if needed, or just use Fragment logic */}
        <div className="frame2">
          <div className="achievements-title">
            <HighlightText text={title} highlight={titleHighlight} />
          </div>
          <div className="frame-parent">
            <div className="frame-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 64" fill="none" style={{ height: '100%', width: 'auto' }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M26.876 63.7308H25.0176L27.4896 52.7801H29.3479L26.876 63.7308ZM29.2953 63.7308H31.7498L31.6797 63.218C31.6797 62.9188 31.7498 62.5342 31.855 62.0642L32.1705 60.6046L32.2582 59.9801C32.2582 59.8059 32.2231 59.6645 32.153 59.5571L31.9952 59.4026C31.8199 59.2963 31.5219 59.2427 31.0836 59.2427H30.2947L29.2953 63.7308ZM34.0815 63.7308H36.4483L38.78 52.7801H34.2217C34.4672 52.8842 34.7126 53.0189 34.9055 53.1833C35.449 53.6325 35.7295 54.2363 35.7295 54.9945V55.1852L35.6243 55.8284L35.5717 56.053C35.4314 56.683 35.2035 57.1586 34.9055 57.4796C34.6074 57.7897 34.1516 58.0406 33.5029 58.2324C34.2568 58.468 34.6425 59.018 34.6425 59.9154C34.6425 60.1828 34.5899 60.5301 34.5022 60.9575L34.2042 62.2723C34.0815 62.7315 34.0289 63.0898 34.0289 63.3462L34.0815 63.7308ZM23.6502 59.018L22.6158 63.7308H20.1789L21.2308 59.018H23.6502ZM20.2315 52.7801L17.7771 63.7308H0L2.15639 53.3181C3.0505 49.1302 4.8212 45.4496 7.45094 42.2775C10.0281 39.1065 14.2707 35.7853 20.1964 32.3141C25.9994 28.9031 29.9791 26.0903 32.1355 23.877C34.1691 21.8422 35.186 19.4481 35.186 16.6956C35.186 12.866 33.2049 10.9507 29.2603 10.9507C25.491 10.9507 23.1067 13.0753 22.0899 17.3245L20.8276 23.0683H8.80088L10.2385 15.9779C12.5001 5.32633 19.0919 0 29.9791 0C33.1698 0 35.9574 0.45911 38.3767 1.37733C40.1124 2.03148 41.6376 2.91902 42.9876 4.03885C46.2835 6.73215 47.9315 10.5617 47.9315 15.5286C47.9315 20.2567 46.3186 24.5651 43.0927 28.4549C39.7968 32.2845 33.9237 36.7726 25.491 41.9192C21.1782 44.492 18.4959 46.3175 17.4089 47.3946C16.2694 48.5308 15.533 49.9082 15.1649 51.5233L14.9019 52.7801H20.2315ZM21.6691 57.0633L22.6509 52.7801H25.0702L24.0885 57.0633H21.6691ZM31.3641 54.4664L30.7329 57.2868H31.3991C32.3984 57.2868 32.977 56.8912 33.1523 56.1012L33.275 55.5884L33.3101 55.2509C33.3101 54.7283 32.9945 54.4664 32.3634 54.4664H31.3641Z" fill="url(#paint0_linear_5173_12942)" />
                <defs><linearGradient id="paint0_linear_5173_12942" x1="-0.175316" y1="9.87359" x2="39.0955" y2="63.7308" gradientUnits="userSpaceOnUse"><stop offset="0.254808" stopColor="#FFF200" /><stop offset="0.5" stopColor="#FFFA89" /><stop offset="0.990385" stopColor="#FFF200" /></linearGradient></defs>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', lineHeight: '1' }}>
                  <span style={{ fontFamily: 'Clash Display, sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: '18px', color: '#FFF200', letterSpacing: '0.05em' }}>LIVE</span>
                  <svg width="24" height="24" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 4px', height: '16px', width: 'auto' }}>
                    <circle cx="25" cy="15" r="5" fill="#FF0000" />
                    <path d="M18 8C16 10 16 12 16 15C16 18 16 20 18 22" stroke="#FF0000" strokeWidth="3" strokeLinecap="round" />
                    <path d="M32 8C34 10 34 12 34 15C34 18 34 20 32 22" stroke="#FF0000" strokeWidth="3" strokeLinecap="round" />
                    <path d="M12 4C8 8 8 12 8 15C8 18 8 22 12 26" stroke="#FF0000" strokeWidth="3" strokeLinecap="round" />
                    <path d="M38 4C42 8 42 12 42 15C42 18 42 22 38 26" stroke="#FF0000" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: 'Clash Display, sans-serif', fontStyle: 'italic', fontWeight: '700', fontSize: '18px', color: '#FFF200', letterSpacing: '0.05em', lineHeight: '1' }}>PROCLASS</span>
              </div>
            </div>
            <div className="frame3">
              <svg className="schedule-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
              <div className="architects-text">Ends in</div>
              <div className="architects-text2">{formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s</div>
            </div>
          </div>
          <div className="frame4">
            <div className="achievements-title2"><HighlightText text={subtitle} highlight={subtitleHighlight} /></div>
            <div className="frame5"><div className="frame6" onClick={onCtaClick}><div className="for-me-confirmation">{buttonText}</div></div></div>
            <div className="architects-text3">{disclaimer}</div>
          </div>
        </div>
        <img className="frame-icon2" alt="Speaker" src={image} />
      </div>

      {/* MOBILE VIEW */}
      <div className="mobile-only" style={{ width: '100%', display: 'none', flexDirection: 'column', alignItems: 'center' }}>
        {/* Achievements Title (Title in props - H2) Moved Out of Card */}
        <div className="achievements-title">
          <HighlightText text={title} highlight={titleHighlight} />
        </div>

        <div className="frame2">
          <img className="mobile-image" alt="Webinar" src="/business-webinar/mobile-cta.png" />
          <div className="mobile-content-wrapper">
            {/* Live Icon Component (Reused) */}
            <div className="frame-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '65px', width: 'auto' }}>
              <img src="/business-webinar/mobile-2hr.svg" alt="2 HR Live Proclass" style={{ height: '100%', width: 'auto' }} />
            </div>

            {/* Timer */}
            <div className="frame4" style={{ marginTop: 0 }}>
              <div className="frame3">
                <svg className="schedule-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
                <div className="architects-text">Ends in</div>
                <div className="architects-text2">{formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s</div>
              </div>
            </div>

            {/* Achievements Subtitle (Subtitle in props) */}
            <div className="achievements-title2">
              <HighlightText text={subtitle} highlight={subtitleHighlight} />
            </div>

            {/* Button */}
            <div className="frame5">
              <div className="frame6" onClick={onCtaClick}>
                <div className="for-me-confirmation">{buttonText}</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="architects-text3">{disclaimer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
