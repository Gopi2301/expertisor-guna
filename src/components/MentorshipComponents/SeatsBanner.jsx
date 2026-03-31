import { Users } from "lucide-react";

const SeatsBanner = () => {
  const totalSeats = 10;
  const remainingSeats = 5;
  const filledPercentage = ((totalSeats - remainingSeats) / totalSeats) * 100;

  return (
    <div className="px-3 sm:px-14 lg:px-20 fixed bottom-0 left-0 w-full bg-black text-white py-4 grid grid-cols-2 lg:grid-cols-3 items-center justify-between gap-4 shadow-[0_-2px_10px_rgba(0,0,0,0.3)] z-50">
      
      {/* Left text */}
      <p className="text-sm md:text-base font-medium text-center md:text-left  hidden lg:block">
        Transform your mindset, career, and business in 90 days with my personalized training.
      </p>

      {/* Middle: Seats + Progress bar */}
      <div className="flex flex-col items-start lg:items-center  ">
        <div className="flex items-center text-xs md:text-sm font-medium mb-2 ">
          <Users className="w-4 h-4 mr-1 text-gray-300" />
          <span className="text-nowrap">
            {String(remainingSeats).padStart(2, "0")} out of {totalSeats} Seats remaining
          </span>
        </div>
        <div className="w-40 h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow to-red-600"
            style={{ width: `${filledPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Right: Button */}
      <div className="flex justify-end">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScyROkdVDJsb_pozeejwBmNf8VKmUPWv2ge8rA_s79KJGawuw/viewform?usp=publish-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-300 transition inline-block"
        >
          Apply Now
        </a>
      </div>

    </div>
  );
};

export default SeatsBanner;
