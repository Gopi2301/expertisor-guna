import React from 'react';
import { useNavigate } from 'react-router-dom';

// Seat icon from Figma
const seatIcon = 'business-webinar/seat-icon.png';

const ReservationBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 p-4">
      <div className="flex items-center gap-2 w-full">
        {/* Reserve Button */}
        <button
          className="flex-1 bg-gradient-to-r from-[#FFF200] via-[#FFF876] to-[#FFF200] text-black font-medium text-sm py-2.5 px-4 rounded-md text-center"
          onClick={() => {
            navigate("/proclass/ssr/seat");
          }}
        >
          Reserve My <span className="font-semibold">Live</span> seat
        </button>

        {/* Seats Left Info */}
        <div className="flex items-center bg-black/50 rounded-md px-3 py-1.5">
          <div className="w-4 h-4 mr-1">
            <img
              src={seatIcon}
              alt="Seat"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-semibold leading-none">
              <span className="text-red-500">13 seats</span> left
            </p>
            <p className="text-white text-[10px] leading-none mt-0.5">
              24 Dec, 06:15:24 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationBanner;
