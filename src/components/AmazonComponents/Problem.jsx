import React from 'react'
import { assets } from '../../assets/assets';
import { pages } from '../../constants/pages';

const Problem = () => {



    return (
        <section className="px-5  xl:px-24">
            <div className="bg-black pt-12 rounded-2xl">
                <div className="flex flex-wrap justify-center gap-3  mx-auto">
                    {pages.Amazon_page.feeling_stuck.problems.map((text, index) => (
                        <div
                            key={index}
                            className="w-full md:w-auto flex items-center gap-2 bg-[#1a1a1a] text-white px-3 py-3 rounded-full hover:bg-[#262626] transition cursor-pointer"
                        >
                            <img src={assets.dangerous} alt="" />
                            <span className="text-[16px]">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>)
}

export default Problem