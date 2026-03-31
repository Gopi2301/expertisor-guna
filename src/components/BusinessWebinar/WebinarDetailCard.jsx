import React from "react";

const WebinarDetailCard = ({ label, value, icon }) => {
  return (
    <div className="flex items-center gap-2 bg-[#0F0F0FDB] backdrop-blur-[4px] rounded-xl px-4 py-2 min-w-[100px]">
      <div
        className="rounded-lg p-2 flex items-center justify-center w-8 h-8"
        style={{
          background:
            "linear-gradient(174deg, rgba(255, 242, 0, 1) 0%, rgba(255, 248, 118, 1) 50%, rgba(255, 242, 0, 1) 100%)",
        }}
      >
        <img src={icon} alt={label} className="w-6 h-6 object-contain" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8A8A8A] text-xs font-normal">{label}</span>
        <span className="text-white text-xs  font-inter">{value}</span>
      </div>
    </div>
  );
};

export default WebinarDetailCard;
