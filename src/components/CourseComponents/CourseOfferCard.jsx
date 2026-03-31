import React from 'react'
import { assets } from '../../assets/assets'


const CourseOfferCard = () => {
    return (
        <>
            <div className="lg:bg-[#121212] text-white rounded-xl lg:p-4 my-4 lg:my-0 lg:mb-5 space-y-3 ">
                {/* Title */}
                <h2 className="text-[16px] font-semibold leading-[22px] hidden lg:block">
                    Mastering Full Stack Development: Your Complete Guide to Building Robust Web...
                </h2>

                {/* Instructor Info */}
                <div className="lg:flex items-center gap-1 hidden ">
                    <img
                        src="https://i.pravatar.cc/30" 
                        alt="Instructor"
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="font-inter font-normal text-[12px] 2xl:text-[13px]">Sathesh PC</p>
                    <p className="text-gray-400 font-inter font-normal text-[8px] xl:text-[11px] 2xl:text-[14px]">(Instructor,Java Specialist,YouTuber)</p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 text-[16px]">
                    <span className="line-through text-gray-400">₹ 2000</span>
                    <span className="font-bold text-[20px]">₹ 800</span>
                    <span className="text-[#ffe100] text-sm">60% off</span>
                </div>

                {/* Buy Button */}
                <button className="w-full bg-[#ffe100] text-black font-semibold py-2 text-[14px] rounded-md hover:opacity-90 transition">
                    Buy Now
                </button>

                {/* Brochure Button */}
                <button className="w-full border border-gray-400 text-white font-medium text-[14px] leading-[100%] py-3 rounded-md hover:bg-gray-800 transition">
                    Download Brochure
                </button>

                {/* Coupon Code */}
                <div>
                    <p className="text-sm mb-1">Coupon Code</p>
                    <div className="flex items-center justify-between bg-[#1e1e1e] p-1 rounded-[4px]">
                        <div className="  rounded-l-md font-inter font-semibold text-[14px] leading-[16px] tracking-[0.1em] align-middle ml-2">
                            FIRSTBUY100
                        </div>
                        <button className="bg-[#272500] text-yellow px-4 py-1 rounded-[4px] font-semibold hover:opacity-90 transition">
                            Apply
                        </button>
                    </div>
                </div>

                {/* Expiry Info */}
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <span>🔔</span>
                    <span>
                        Code expires in <span className="text-red-500 font-medium">5 days 10 hours 5 minutes</span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default CourseOfferCard