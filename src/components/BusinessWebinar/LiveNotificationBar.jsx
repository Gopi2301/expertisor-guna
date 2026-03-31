import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Figma asset URLs for the badge
const liveBadgeImg = "/business-webinar/2hr.svg";
const seatIconImg = "/business-webinar/seat-icon.png";

const LiveNotificationBar = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("24 Dec, 06:15:24 PM");
  const [seatsLeft, setSeatsLeft] = useState(13);

  // Simulate countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // You can implement actual countdown logic here
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReserveSeat = () => {
    navigate("/proclass/ssr/seat");
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-black bg-opacity-80 flex items-center justify-between px-20 py-3"
      data-name="LiveNotificationBar"
      style={{
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Left Section - Seats and Time */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        {/* Seats Available */}
        <div className="flex items-center gap-1">
          {/* Seat Icon with Gradient */}
          <div
            className="relative w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(90.703deg, rgba(255, 242, 0, 1) 0%, rgba(255, 248, 118, 1) 29.758%, rgba(255, 242, 0, 1) 54.656%, rgba(255, 248, 118, 1) 78.369%, rgba(255, 242, 0, 1) 100%)",
            }}
          >
            <img
              src={seatIconImg}
              alt="seat"
              className="w-4 h-4 object-contain"
            />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            <span className="text-[#ff2d2d]">{seatsLeft} seats</span>
            <span className="text-white ml-1">left</span>
          </span>
        </div>

        {/* Date and Time */}
        <p className="text-gray-300 text-xs font-normal">{timeLeft}</p>
      </div>

      {/* Middle Section - Live Badge */}
      <div className="flex-1 flex justify-center px-8">
        <img
          src={liveBadgeImg}
          alt="Live Proclass Badge"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Right Section - CTA Button */}
      <button
        onClick={handleReserveSeat}
        className="bg-[#fff200] hover:bg-yellow-300 active:bg-yellow-400 transition-all duration-200 text-black font-semibold rounded-md px-5 py-2 text-sm whitespace-nowrap flex-shrink-0 shadow-lg hover:shadow-xl"
      >
        Reserve My Live seat
      </button>
    </div>
  );
};

export default LiveNotificationBar;
