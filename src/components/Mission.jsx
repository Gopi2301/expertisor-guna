import React, { useState } from 'react'
import StartButton from './StartButton'
import ApplyModal from './Simple_elite_temp_Components.jsx/ApplyModal';


const Mission = ({ mission_det }) => {
    const [isApplyOpen, setIsApplyOpen] = useState(false);

    return (
        <div className="md:flex-row flex flex-col justify-between gap-5 md:items-center p-4 md:p-11 bg-gradient-to-b from-[#141414] to-[#212121] mt-8 rounded-lg">
            <div className="">
                <div className="flex gap-2">
                    <h4 className="font-clash font-semibold text-[24px] leading-[100%]  uppercase text-yellow">{mission_det.head}</h4>
                    <img src={mission_det.rocket_i} alt="" />
                </div>
                <p className="block mt-2 font-inter font-normal text-[18px] leading-[125%]  align-middle text-[#FFFFFF]">{mission_det.para}</p>
            </div>
            <StartButton
                data={mission_det.start_button}
                onClick={() => setIsApplyOpen(true)}
            />
            <ApplyModal open={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
        </div>)
}

export default Mission