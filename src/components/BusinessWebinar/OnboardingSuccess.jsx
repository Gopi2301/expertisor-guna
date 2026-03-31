import React from "react";

const imgSuccessBg =
    "business-webinar/onboarding-thanks.png"; // Reusing the visual asset
// Placeholder for WhatsApp icon, since none was found. using a simple colored circle or similar if generic icon not found
// Or using a CDN link if appropriate, but stick to placeholders for now.
const imgWhatsapp = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

const OnboardingSuccess = () => {
    return (
        <div className="onboarding-success-card">
            {/* The top illustration/icon */}
            <img
                src={imgSuccessBg}
                alt="Success"
                className="onboarding-success-img"
            />

            <div className="onboarding-success-content">
                <div className="onboarding-success-text-group">
                    <div className="onboarding-success-title-wrapper">
                        <div className="onboarding-success-title">
                            You’re Successfully Registered
                        </div>
                    </div>
                    <div className="onboarding-success-subtitle">
                        Join the WhatsApp group to receive the live link, reminders, and session resources
                    </div>
                </div>

                <div className="onboarding-success-action-group">
                    <a
                        href="#"
                        className="onboarding-success-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {/* Placeholder generic icon for WhatsApp */}
                        <img
                            src={imgWhatsapp}
                            alt="WhatsApp"
                            className="onboarding-success-btn-icon"
                        />
                        <div className="onboarding-success-btn-text">
                            Join the WhatsApp Group
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OnboardingSuccess;
