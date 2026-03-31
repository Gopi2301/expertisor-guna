import Mission from "./Mission";
import IncomeProff from "./AffilateComponents/IncomeProff";
import OurMentor from './OurMentor'


const Mentor = ({data}) => {
    return (
        <>
            <div>
                <div className=" px-3 sm:px-14 lg:px-20 py-10 sm:py-14 md:py-20 bg-[#0A0A0A]">
                    <div className="mb-[40px] sm:mb-[71px]">
                        <h2 className='font-clash font-semibold not-italic text-[28px] md:text-[40px] leading-[100%] tracking-[2%] text-center align-middle uppercase'>Meet Your <span className='text-yellow'>Mentor</span></h2>
                    </div>


                    <OurMentor mentor_det={data}/>

                    {data.income_proof ? <IncomeProff/> : null}

                    <Mission mission_det={data.mission}/>
                </div>
            </div>
        </>
    )
}

export default Mentor