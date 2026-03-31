import React from "react";

// Image assets
const imgSeatIcon =
  "business-webinar/seat-icon.png";
const imgFrame1 =
  "https://www.figma.com/api/mcp/asset/011b43d4-c756-46fa-b4b2-83e62c70a284";

const OnboardingConfirmation = ({ onProceed, isLoading }) => {
  return (
    <div
      className="onboarding-confirm-card"
      style={{
        display: "flex",
        top: "50%",
        animation: "fadeIn 0.5s ease",
      }}
    >
      <div className="onboarding-confirm-header">
        <span className="onboarding-confirm-title">Confirm Your Seat</span>
        <img src={imgFrame1} alt="confirm" className="onboarding-confirm-img" />
      </div>
      <span className="onboarding-confirm-sub">SSR Live Proclass</span>
      <div className="onboarding-confirm-list">
        <div className="onboarding-confirm-item">
          <span>AI Workflows</span>
          <span>₹1,600</span>
        </div>
        <div className="onboarding-confirm-item">
          <span>Live Proclass</span>
          <span>₹1,300</span>
        </div>
        <div className="onboarding-confirm-item">
          <span>100M+ Systems & Templates</span>
          <span>₹1,999</span>
        </div>
      </div>
      <div className="onboarding-confirm-total-row">
        <span>Total</span>
        <span>₹4,899</span>
      </div>
      <div className="onboarding-confirm-discount-row">
        <span className="onboarding-confirm-discount-label">
          Limited Time Discount (~93%)
        </span>
        <span className="onboarding-confirm-discount">- ₹4,600</span>
      </div>
      <div className="onboarding-confirm-final-row">
        <span>Final Price</span>
        <span className="onboarding-highlight">₹299</span>
      </div>
      <button
        className="onboarding-confirm-btn"
        onClick={onProceed}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Proceed to Secure My Seat"}
      </button>
      <div className="onboarding-confirm-seats">
        <span className="onboarding-confirm-seat-icon">
          <img src={imgSeatIcon} alt="seats left" />
        </span>
        <span>
          <span className="onboarding-confirm-seats-left">13 seats</span> left
        </span>
      </div>
      <span className="onboarding-confirm-date">24 Dec, 06:15:24 PM</span>
    </div>
  );
};

export default OnboardingConfirmation;
