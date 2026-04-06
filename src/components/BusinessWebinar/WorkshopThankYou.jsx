import React from "react";

const yellowGradient =
  "linear-gradient(135deg, #FFF200 0%, #FFF876 30%, #FFF200 55%, #FFF876 78%, #FFF200 100%)";

const WorkshopThankYou = ({ whatsappLink = "#" }) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-6 rounded-2xl border border-[#2D2D2D] bg-black/75 p-6 backdrop-blur-[2px]">
      {/* Success Image */}
      <img
        src="/business-webinar/registration-success.png"
        alt="Success"
        className="h-[240px] w-[240px] object-contain"
        onError={(e) => {
          e.target.src = "/thank_you.png";
        }}
      />

      <div className="flex w-full flex-col items-start justify-start gap-10">
        <div className="flex w-full flex-col items-start justify-start gap-3">
          <div className="flex w-full items-start justify-between">
            <h2 className="w-full text-center font-clash text-xl font-semibold uppercase leading-7 tracking-widest text-white">
              You&apos;re Successfully Registered
            </h2>
          </div>
          <p className="w-full text-center font-inter text-sm font-normal text-[#8A8A8A]">
            Join the WhatsApp group to receive the live link, reminders, and
            session resources
          </p>
        </div>

        <div className="flex w-full items-center justify-start gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 px-5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: yellowGradient }}
          >
            <img
              src="/business-webinar/onboarding/whatsapp.png"
              alt="WhatsApp"
              className="h-6 w-6 rounded-full"
              onError={(e) => {
                e.target.src = "https://placehold.co/24x24?text=WA";
              }}
            />
            <span className="font-inter text-base font-semibold text-black">
              Join the WhatsApp Group
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkshopThankYou;
