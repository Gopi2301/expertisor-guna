import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { assets } from '../../assets/assets'

const CourseRatings = () => {
  const ratings = [
    { stars: 5, percent: 73 },
    { stars: 4, percent: 17 },
    { stars: 3, percent: 10 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 2 },
  ];

  const feedbacks = [
    { count: 10, label: "Simplest form of teaching" },
    { count: 2, label: "Placement support" },
    { count: 21, label: "24×7 Mentor Support" },
  ];

  return (
    <div className=''>
      <div className=" text-white  max-w-4xl ">
        <h2 className="text-lg font-semibold mb-4">Course Ratings</h2>

        <div className="flex flex-col md:flex-row md:items-start gap-5 xl:gap-12 pl-3">

          {/* Left Side - Ratings */}
          <div className="flex flex-col ">
            <div className="flex items-center text-yellow text-4xl">
              <img src={assets.rev_star} alt="" />
              <span className="text-white font-inter font-bold text-[44px] leading-[100%] align-middle ml-2">4.9</span>
            </div>
            <p className="font-inter font-normal text-[14px] leading-[100%] align-middle text-gray-400 mt-1">250 ratings and 124 reviews</p>
          </div>

          {/* Right Side - Rating Bars */}
          <div className="flex-1 space-y-3 mt-1">
            {ratings.map((rating, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={assets.star_i} alt="" />
                <span className="font-inter font-normal text-[16px] leading-[100%] align-middle w-3">{rating.stars}</span>

                <div className="flex-1 bg-[#242424] h-2 max-w-[250px] lg:max-w-none">
                  <div
                    className="bg-white h-2 "
                    style={{ width: `${rating.percent}%` }}
                  ></div>
                </div>

                <span className=" text-gray-300 w-8 text-right font-inter font-normal text-[14px]">{rating.percent}%</span>
              </div>
            ))}
          </div>

          {/* Right Side - Feedback Hearts */}
          <div className="flex flex-col gap-3 mt-1 ml-5 lg:ml-0">
            {feedbacks.map((item, index) => (
              <div key={index} className=" ">
                <div className='flex gap-2'>
                  <FaHeart className="text-red-500 mt-1" />
                  <p className="text-white font-medium">{item.count}</p>
                </div>
                <p className="font-inter font-normal text-[12px] text-gray-300 mt-1">{item.label}</p>
              </div>
            ))}
          </div>


        </div>
      </div>

      <hr className='mt-8 border-[#272727]' />
    </div>
  );
};

export default CourseRatings;
