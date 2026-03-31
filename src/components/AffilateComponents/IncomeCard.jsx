import React from 'react'

const IncomeCard = ({data}) => {
    return (
            <div className="min-w-[311px] sm:min-w-[375px]">
                <img src={data.img} alt="" className="rounded-t-xl" />
                <div className="flex justify-between items-center bg-black p-4 rounded-b-xl">
                    <div className="flex gap-2 items-center">
                        <img src={data.logo} alt="" />
                        <p>{data.name}</p>
                    </div>

                    <div>
                        <h4 className="font-inter font-bold text-[20px] leading-[100%] tracking-[0] text-right text-yellow">{data.price}</h4>
                        <p className="text-[#A7A7A7] font-inter font-normal text-[12px] leading-[15px] tracking-[0] text-right">{data.desc}</p>
                    </div>
                </div>
            </div>
    )
}

export default IncomeCard