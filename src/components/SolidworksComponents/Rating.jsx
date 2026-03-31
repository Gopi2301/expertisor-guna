import React from 'react'

const Rating = ({ data }) => {




    return (
        <div
            className="w-full bg-center bg-no-repeat bg-cover py-7 sm:py-10 "
            style={{ backgroundImage: `linear-gradient(90deg, #211A00 0%, rgba(33,26,0,0.4) 50.48%, #211A00 100%),url(${data.bg_img})`, }}
        >
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                {data.rating.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <h2 className="text-yellow font-inter font-bold text-[26px] sm:text-[36px] leading-[100%]">
                            {item.number}
                        </h2>
                        <p className="text-[#FFFFFF] font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] mt-1">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rating





