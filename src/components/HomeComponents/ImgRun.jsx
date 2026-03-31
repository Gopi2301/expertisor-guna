import React from 'react'
import Marquee from 'react-fast-marquee';
import OptimizedImage from '../OptimizedImage';

const ImgRun = ({ datas, dirc, speed, m, h }) => {
    return (
        <div className={`relative  overflow-hidden ${m}`}>
            <Marquee direction={dirc} speed={speed} gradient={false} className="relative">
                {datas.map((value, index) => (
                    <div key={index} className="relative pr-5">
                        <OptimizedImage
                            src={value}
                            alt=""
                            className={`relative z-10 ${h} rounded-lg`}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default ImgRun;