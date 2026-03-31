import React from 'react'

const Heading = ({head,highlights,p1,p2}) => {
    const renderHeading = () => {
        let result = [];
        let remaining = head;

        highlights && highlights.forEach((word, index) => {
            const parts = remaining.split(word);
            result.push(parts[0]); // normal text before highlight
            result.push(
                <span key={index} className="text-yellow">
                    {word}
                </span>
            );
            remaining = parts[1]; // continue after highlight
        });

        result.push(remaining); // add the last remaining text
        return result;
    };

    return (
        <div className='text-center'>
            <h1 className='text-[#ffffff] font-clash font-semibold text-[28px] md:text-[40px] leading-[100%] tracking-[0%] align-middle uppercase xl:mx-[200px]'>{renderHeading()}</h1>
            {p1 && <p className='mt-3 text-[#B8B8B8] font-inter font-normal text-[14px] md:text-[18px] leading-tight tracking-[0%] text-center align-middle'>{p1}  {p2 && <span className='md:block'>{p2}</span>}</p>}
        </div>
    )
}

export default Heading