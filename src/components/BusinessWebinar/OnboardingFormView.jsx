import React from "react";
import { assets } from "../../assets/assets";

// Image assets
const imgFiberManualRecord = "/business-webinar/onboarding/record.png";
const whatsappPng = "/business-webinar/onboarding/whatsapp.png";
const imgFrame =
  "https://www.figma.com/api/mcp/asset/cbdda1ec-cc99-4cc5-9e84-c29c55dbd80f";
const imgKeyboardArrowDown =
  "https://www.figma.com/api/mcp/asset/227b4df3-a85b-4775-ab18-1024eb50bc63";




const OnboardingFormView = ({ onSubmit, isSubmitting, error }) => {
  return (
    <div className="onboarding-content min-h-screen gap-7 ">
      {/* Top Section */}
      <div className="onboarding-hero gap-4 sm:gap-6">
        <div className="onboarding-logo">
          <img src={assets.onboard_icon} alt="SSR Proclass" />
        </div>
        <h1 className=" font-clash font-semibold text-[28px] md:text-[36px] lg:text-[50px] text-center text-white capitalize">
          Struggling to Build{" "}
          <span className="onboarding-highlight">Consistent Revenue</span> for
          Your Firm?
        </h1>
        <div className="onboarding-badge text-[14px] sm:text-[16px]">
          <img
            src={imgFiberManualRecord}
            alt="live"
            className="onboarding-badge-dot w-4 h-4"
          />
          <span>
            Attend a live{" "}
            <span className="onboarding-highlight">SSR Proclass</span> to get
            clarity
          </span>
        </div>
      </div>


      {/* Form Card */}
      <div className="onboarding-form-card mb-7 sm:w-[437px] mx-4">
        <h2 className="onboarding-form-title">
          Enter your details to{" "}
          <span className="onboarding-highlight">reserve your seat</span>
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4 bg-red-100/10 p-2 rounded">
            {error}
          </div>
        )}

        <form className="onboarding-form" onSubmit={onSubmit}>
          <label className="onboarding-label">
            Name*
            <input
              name="name"
              className="onboarding-input"
              type="text"
              placeholder="Your Name"
              required
            />
          </label>
          <label className="onboarding-label">
            Email*
            <input
              name="email"
              className="onboarding-input"
              type="email"
              placeholder="yourname@gmail.com"
              required
            />
          </label>
          <label className="onboarding-label">
            Phone Number*
            <div className="onboarding-phone-row">
              <div className="onboarding-country-picker">
                <span className="onboarding-flag">🇮🇳</span>
                <span className="onboarding-country-code">+91</span>
                <img
                  src={imgKeyboardArrowDown}
                  alt="dropdown"
                  className="onboarding-arrow"
                />
              </div>
              <input
                name="phone"
                className="onboarding-input onboarding-phone-input"
                type="tel"
                placeholder="Enter WhatsApp Number"
                required
              />
            </div>
          </label>
          <div className="onboarding-checkbox-row">
            <input
              type="checkbox"
              id="whatsapp-updates"
              className="onboarding-checkbox"
              defaultChecked
            />
            <label
              htmlFor="whatsapp-updates"
              className="onboarding-checkbox-label"
            >
              Get regular updates on WhatsApp
              <img
                src={whatsappPng}
                alt="WhatsApp"
                className="onboarding-wa-icon"
              />
            </label>
          </div>
          <button
            type="submit"
            className="onboarding-submit-btn"
            disabled={isSubmitting}
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? "Reserving Seat..." : "Continue to Reserve Seat"}
          </button>
        </form>
      </div>
    </div>
  );
};




export default OnboardingFormView;
