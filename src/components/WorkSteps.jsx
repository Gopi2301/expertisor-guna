import React from 'react'

const WorkSteps = ({work_steps}) => {
    return (
        <div className='grid md:grid-cols-2 gap-5 mt-10 sm:mt-14 items-stretch'>
            {
                work_steps.map((data, i) => (
                    <div key={i} className='bg-[linear-gradient(180deg,#0A0A0A_0%,#111010_100%)] p-[16px] sm:p-[24px] sm:pt-[40px] rounded-2xl flex flex-col justify-between'>
                        <div className='flex gap-3 items-center justify-between md:justify-normal'>
                            {data.step_no && <h6 className='font-clash font-semibold text-black text-[20px] leading-[100%] tracking-[0] p-2 rounded-[4px] bg-gradient-to-b from-[#FFFA97] to-[#FFF200] order-2 md:order-1'>
                                {data.step_no}
                            </h6>}
                            <h4 className='font-clash font-semibold text-[21px] lg:text-[28px] leading-tight tracking-[0] order-1 md:order-2'>
                                {data.head}
                            </h4>
                        </div>
                        <p className='font-inter font-normal text-[#FFFFFFBF] text-[14px] md:text-[16px] leading-[24px] tracking-[0] mt-4'>
                            {data.para}
                        </p>
                        <div className='flex justify-center'>
                            <img src={data.img} alt="" className='mt-3' />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default WorkSteps