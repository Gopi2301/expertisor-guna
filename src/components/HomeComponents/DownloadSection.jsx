// import React from 'react';
// import { assets } from '../../assets/assets';

// const DownloadSection = () => {
//     return (
//         <div>
//             <div className=' px-3 sm:px-14 lg:px-20 my-10' >
//                 <div className='relative'>
//                     <img src={assets.bg_download} alt="" />
//                     <div className='absolute inset-0 grid grid-cols-2 items-center ' >
//                         <div className='ml-16'>
//                             <h2 className='font-clash text-[44px] leading-[50px] font-semibold uppercase align-middle text-white'> <span className='block text-yellow'>Learn</span> Anywhere Anytime</h2>
//                             <p className='font-inter py-5 text-[#B8B8B8] text-[16px] leading-[24px] font-normal align-middle'>Download our mobile app and access 100+ creator-led courses, live webinars, and personalized mentorship - all from your pocket.</p>
//                             <img src={assets.gplay} alt="" />
//                         </div>

//                         <div className='flex justify-center items-end'>
//                             <div>
//                             <img  src={assets.iphone} alt="" className='max-w-[100%]'/>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DownloadSection;






import React, { memo } from 'react';
import { assets } from '../../assets/assets';
import OptimizedImage from '../OptimizedImage';


const DownloadSection = () => {
    return (
        <div className='px-3 sm:px-14 lg:px-20'>
            <div className="relative w-full overflow-hidden px-6 pt-8 rounded-2xl flex items-center justify-center">
                <OptimizedImage
                    src={assets.bg_download}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                <div className=" w-full flex flex-col md:flex-row  justify-between gap-10">

                    <div className="flex-1 text-left text-white flex flex-col justify-center ">
                        <h2 className="text-3xl  lg:text-4xl  xl:text-5xl font-bold leading-tight">
                            <span className="text-yellow lg:block">LEARN</span> <span>ANYWHERE ANYTIME</span>
                        </h2>

                        <p className="text-gray-300 mt-4 max-w-md">
                            Download our mobile app and access 100+ creator-led courses, live webinars, and personalized mentorship – all from your pocket.
                        </p>
                        <div >
                            <a href="https://play.google.com/store/apps/details?id=triggerupacademy.com ">
                                <OptimizedImage
                                    src={assets.gplay}
                                    alt="Download on Google Play"
                                    className='my-6'
                                    width={180}
                                    height={54}
                                />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-end">
                        <OptimizedImage
                            src={assets.mobile_phone}
                            alt="Expertisor mobile app preview"
                            className="w-64 md:w-96 drop-shadow-2xl"
                            width={384}
                            height={768}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(DownloadSection);