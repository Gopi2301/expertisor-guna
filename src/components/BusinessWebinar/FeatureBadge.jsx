import React from 'react';

const FeatureBadge = ({ icon, text }) => {
  return (
    <div className="relative rounded-[1000px] bg-gradient-to-b from-[#212121] to-[#211f00] border border-[#3c3800] flex items-center px-2 py-1 gap-1 text-sm text-white font-inter box-border">
      <img src={icon} alt="" className="w-5 relative max-h-full" />
      <span className="relative leading-5">
        {text}
      </span>
    </div>
  );
};

export default FeatureBadge;
