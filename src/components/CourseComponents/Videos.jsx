import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowDown } from "react-icons/md";




const Videos = () => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [seemore,setSeemore]=useState(true)



    const videos = [
        { id: 1, url: "https://www.youtube.com/embed/hEZ4_yp3338", thumbnail: "https://img.youtube.com/vi/hEZ4_yp3338/maxresdefault.jpg", col: "md:col-span-2" },
        { id: 2, url: "https://www.youtube.com/embed/mCkZBuY8G3k", thumbnail: "https://img.youtube.com/vi/mCkZBuY8G3k/maxresdefault.jpg", },
        { id: 3, url: "https://www.youtube.com/embed/0byxBZjb7DA", thumbnail: "https://img.youtube.com/vi/0byxBZjb7DA/maxresdefault.jpg", },
        { id: 4, url: "https://www.youtube.com/embed/_AFxkykDCzo", thumbnail: "https://img.youtube.com/vi/_AFxkykDCzo/maxresdefault.jpg", },
        { id: 5, url: "https://www.youtube.com/embed/olgqBQ1cNuk", thumbnail: "https://img.youtube.com/vi/olgqBQ1cNuk/maxresdefault.jpg", },
        { id: 6, url: "https://www.youtube.com/embed/mCkZBuY8G3k", thumbnail: "https://img.youtube.com/vi/mCkZBuY8G3k/maxresdefault.jpg", },
        { id: 7, url: "https://www.youtube.com/embed/0byxBZjb7DA", thumbnail: "https://img.youtube.com/vi/0byxBZjb7DA/maxresdefault.jpg", },
        { id: 8, url: "https://www.youtube.com/embed/_AFxkykDCzo", thumbnail: "https://img.youtube.com/vi/_AFxkykDCzo/maxresdefault.jpg", },
        { id: 9, url: "https://www.youtube.com/embed/olgqBQ1cNuk", thumbnail: "https://img.youtube.com/vi/olgqBQ1cNuk/maxresdefault.jpg", },
    ];


    return (
        <div className='text-white'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
                {(seemore ? videos.slice(0,5) : videos).map((video) => (
                    <div key={video.id} className={`relative ${video.col ? video.col : null}`}  >
                        <div className="relative w-full pt-[60%]">
                            {playingVideo !== video.id ? (
                                <div
                                    className="absolute inset-0 cursor-pointer"
                                    onClick={() => setPlayingVideo(video.id)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt="Video Thumbnail"
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`bg-yellow ${video.col == 'col-span-2' ? 'w-[80px] h-[80px]' : 'w-[40px] h-[40px]'} w-[40px] h-[40px] rounded-full flex justify-center items-center`}>
                                            <img src={assets.pause} alt="" className={`${video.col == 'col-span-2' ? 'w-[55px] h-[55px]' : 'w-[27px] h-[27px]'}`} />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <iframe
                                    className="absolute inset-0 w-full h-full rounded-lg"
                                    src={`${video.url}?autoplay=1&modestbranding=1&showinfo=0&controls=0&rel=0&disablekb=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                        <div>
                            <div className='flex justify-between mt-3 items-center'>
                                <div className='flex gap-4 items-center'>
                                    <img src={video.thumbnail} alt="" className='w-[44px] h-[44px] rounded-full' />
                                    <div>
                                        <h5 className='mb-2 text-white font-inter font-normal text-[16px] leading-[1] tracking-[0] align-middle'>Kaylynn Press</h5>
                                        <p className='text-[#A7A7A7] font-inter font-normal text-[14px] leading-[1] tracking-[0] align-middle'>Fullstack Developer</p>
                                    </div>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <img src={assets.star_i} alt="" className='w-5 h-5 ' />
                                    <p>5</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-[#242424] rounded-lg mt-4 relative' >
                {seemore && <div className="absolute top-[-81px] left-0 w-full h-20 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none" />}

                <div className='flex gap-2 items-center justify-center py-2 text-white' onClick={()=> setSeemore((prev)=>!prev)}>
                    <p>{seemore ? 'See More' : 'See Less'}</p>
                    <img src={assets.down_arrow} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Videos