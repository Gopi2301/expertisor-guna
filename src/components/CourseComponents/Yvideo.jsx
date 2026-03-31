import React, { useState } from 'react'
import { assets } from '../../assets/assets';



const Yvideo = () => {

    // y video
    const videos = {
        id: 1,
        url: "https://www.youtube.com/embed/v02U7mvaIvk",
        thumbnail: "https://img.youtube.com/vi/v02U7mvaIvk/hqdefault.jpg"
    };

    const [playing, setPlaying] = useState(false);

    return (
        <div>
            <div className="relative w-full pt-[56.25%]">
                {playing !== 1 ? (
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(1)}>
                        <img src={videos.thumbnail} alt="Video Thumbnail" className="h-full w-full object-cover rounded-3xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-yellow w-[47px] h-[47px] sm:w-[86px] sm:h-[86px] rounded-full flex justify-center items-center">
                                <img src={assets.pause} alt="" className='w-[33px] h-[33px] sm:w-[60px] sm:h-[60px]' />
                            </div>
                        </div>
                    </div>
                ) : (
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-3xl"
                        src="https://www.youtube.com/embed/v02U7mvaIvk?autoplay=1&modestbranding=1&showinfo=0&controls=1&rel=0&disablekb=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                )}
            </div>

            <h2 className='text-[#ffffff] font-inter font-semibold text-[18px] sm:text-[20px] leading-[28px] align-middle tracking-[0%] mt-5'>Mastering Full Stack Development: Your Complete Guide to Building Robust Web Applications from start to end.</h2>

            <div className='flex gap-1 items-center my-4'>
                <img src={assets.ins} alt="" className='w-[36px] h-[36px]'/>
                <p className='text-white font-inter font-normal text-[14px] leading-[17.5px] tracking-[0] align-middle'>Sathesh PC</p>
                <p className='text-[#8A8A8A] font-inter font-normal text-[12px] sm:text-[14px] leading-[17.5px] tracking-[0%] align-middle'>(Instructor, Java Specialist, YouTuber)</p>
            </div>

            <div className='flex items-center gap-2 '>

                 <div className='flex gap-1 px-2 py-1  items-center rounded border border-[#676428]'   style={{background: "linear-gradient(94.6deg, #000000 2.3%, #2D2B00 99.99%)"}}>
                    <img src={assets.best_icon} alt="" />
                    <p className='text-yellow font-inter font-normal text-[14px] leading-[14px] tracking-[0] text-center align-middle'>Best Seller</p>
                 </div>

                 <div className='flex gap-1 px-2 py-1 bg-[#0C0C0C] items-center rounded'>
                    <img src={assets.clock_icon} alt="" />
                    <p className='
                     font-inter text-[#A7A7A7] font-normal text-[14px] leading-[14px] tracking-[0] text-center align-middle'>10h15m</p>
                 </div>

                 <div className='flex gap-1 px-2 py-1 bg-[#0C0C0C] items-center rounded'>
                    <img src={assets.lang_icon} alt="" />
                    <p className='
                     font-inter text-[#A7A7A7] font-normal text-[14px] leading-[14px] tracking-[0] text-center align-middle'>Tamil</p>
                 </div>
            </div>
        </div>
    )
}

export default Yvideo