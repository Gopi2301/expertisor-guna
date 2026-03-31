import React, { memo, useState } from 'react';
import Heading from '../Heading';

const StudentsSay = ({ students_say }) => {
    const [selectedVideo, setSelectedVideo] = useState(students_say.videos[0]);

    return (
        <div>
            <div className='pt-16 md:pt-24 lg:pt-28  px-5 sm:px-14 lg:px-20  '>

                {/* title and para */}
                <Heading head={students_say.title} p1={students_say.p1} p2={students_say.p2} highlights={students_say.highlights}/>

                <div className='my-7 sm:my-8 md:my-9 lg:my-12'>

                    <div className="flex flex-col md:flex-row gap-4 bg-black  text-white ">
                        <div className="relative w-full  md:w-2/3 aspect-video  bg-black  md:h-[45vh] lg:h-[55vh] xl:h-[70vh]">
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?modestbranding=1&showinfo=0&controls=1&rel=0&disablekb=1`}
                                title={selectedVideo.title}
                                className="w-full h-full object-cover rounded-xl"
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className=" text-white block md:hidden">
                            <h2 className="text-lg font-semibold">{selectedVideo.title}</h2>
                            {/* <p className="text-sm text-gray-300">{selectedVideo.subtitle}</p> */}
                        </div>

                        <div className="w-full md:w-1/3 flex flex-col  overflow-y-auto h-[45vh] sm:h-[60vh] md:h-[45vh] lg:h-[55vh] xl:h-[70vh]">
                            {students_say.videos.map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideo(video)}
                                    className="flex space-x-2 hover:bg-gray-800 rounded p-1 cursor-pointer"
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-1/3  rounded"
                                        loading="lazy"
                                        decoding="async"
                                        width={160}
                                        height={90}
                                    />
                                    <div className="flex flex-col justify-center w-2/3">
                                        <h3 className="text-sm font-medium leading-tight line-clamp-2">{video.title}</h3>
                                        {/* <p className="text-xs text-gray-400">{video.subtitle}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="py-4 text-white hidden md:block">
                        <h2 className="text-lg font-semibold">{selectedVideo.title}</h2>
                        {/* <p className="text-sm text-gray-300">{selectedVideo.subtitle}</p> */}
                    </div>

                </div>



            </div>


        </div>
    );
};

const areStudentsEqual = (prevProps, nextProps) =>
    prevProps.students_say === nextProps.students_say;

export default memo(StudentsSay, areStudentsEqual);






