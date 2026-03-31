import React from 'react'

const BrokenComp = ({data}) => {
    return (
        <>
            <div  className="lg:flex p-[16px] md:p-[40px] rounded-2xl" style={{ backgroundColor: data.bg }}>
                <div>
                    <h3 className="font-clash font-semibold text-[28px] leading-[100%] tracking-[0]">{data.head}</h3>
                    <p className="font-inter font-normal text-[16px] leading-[24px] tracking-[0] mt-4">{data.para}</p>
                    <div className="flex gap-3 flex-wrap mt-6">
                        {
                            data.rev.map((val, i) => (
                                <div key={i} className="flex gap-1 items-center p-3  rounded-full" style={{ backgroundColor: data.list_bg }}>
                                    <img src={data.sym} alt="" />
                                    <p className="font-inter font-normal text-[16px] leading-[24px] tracking-[0]">{val}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-center lg:hidden mt-8">
                    <img className="" src={data.img} alt="" />
                </div>
                <img className="lg:block hidden" src={data.img} alt="" />

            </div>
        </>
    )
}

export default BrokenComp