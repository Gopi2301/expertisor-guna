import { pages } from "../../constants/pages"
import BrokenComp from "./BrokenComp"

const System = () => {
    return (
        <div>
            <div className=" px-3 sm:px-14 lg:px-20 py-9 sm:py-20 md:py-24 bg-[#0A0A0A]">
                <div>
                    <h2 className='font-clash font-semibold not-italic text-[28px] md:text-[40px] leading-[100%] tracking-[2%] text-center align-middle uppercase'>The System Is <span className='text-yellow'>Broken</span>,You're Not Alone</h2>
                    <p className="font-inter font-normal not-italic text-[14px] md:text-[18px] leading-[24px] tracking-[0%] text-center align-middle mt-4 text-[#B8B8B8]">{pages.marketing_affilate.system_section.system_desc.p1}<span className="lg:block">{pages.marketing_affilate.system_section.system_desc.p2}</span></p>
                </div>

                <div>
                    <div className="flex gap-4 justify-center mt-6 flex-wrap">
                        {pages.marketing_affilate.system_section.feature.map((data, i) => (
                            <div key={i}>
                                <div className="flex gap-1 items-center p-[10px] sm:p-3 rounded-full bg-[#211A00]">
                                    <img src={data.i1} alt="" />
                                    <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[0] text-center">{data.para}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 sm:mt-16 flex flex-col gap-5">
                        {pages.marketing_affilate.system_section.broken.map((data, i) => (
                             <BrokenComp data={data} key={i}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default System