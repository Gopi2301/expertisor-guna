import React from 'react'
import { assets } from '../../assets/assets';


const Skill = () => {

    const skills = [
        { name: 'HTML', img: assets.html,bg:'bg-[#3A1400]' },
        { name: 'Javascript', img: assets.js,bg:'bg-[#3A2C00]' },
        { name: 'React-JS', img: assets.react,bg:'bg-[#00283A]' },
        { name: 'Node-JS', img: assets.node,bg:'bg-[#003A1A]' },
        { name: 'Express-JS', img: assets.express,bg:'bg-[#3A0034]' },
        { name: 'Github', img: assets.github_im ,bg:'bg-[#3A3A3A]'},
    ];

    return (
        <div>
            <div className='bg-[#0C0C0C] p-4 rounded-lg mt-6 sm:mt-10'>
                <h3 className='font-inter text-white font-semibold text-[20px] leading-[28px] tracking-[0] align-middle'>Skills</h3>
                <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4'>
                    {skills.map((skill, index) => (
                        <div key={index} className={`${skill.bg} py-4 rounded-lg`}>
                            <div className='flex justify-center'>
                                <img  src={skill.img} alt="" className='w-[92px] h-[92px]'/>
                            </div>
                            <p className=' text-white font-medium text-[14px] leading-[22px] tracking-[0] text-center'>{skill.name}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Skill