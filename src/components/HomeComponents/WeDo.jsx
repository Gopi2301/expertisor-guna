import React, { memo, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
// import { captureUTMParams } from '../../../utils/utmUtils';


const WeDo = () => {
      const [text, setText] = useState("Explore more");

  return (
    <>
      <div className=' bg-black px-3 sm:px-14 lg:px-20 pt-14 sm:pt-28'>
        <div className='text-center '>
          <h2 className='text-[#FFFFFF]  font-clash font-semibold text-[28px] sm:text-[40px] leading-[100%] tracking-[0] text-center align-middle uppercase'>WHAT WE <span className='text-yellow '>DO</span>?</h2>
          <p className='text-[#B8B8B8] font-inter font-normal text-[14px] sm:text-[16px] leading-[24px] tracking-[0] text-center align-middle mt-3 mb-10 sm:mb-14'>Explore our dynamic offerings, including engaging courses, insightful webinars, personalized <span className='md:block'>1-on-1 consulting and personalized trainings tailored for corporate success.</span></p>



          <div className="grid lg:grid-cols-2 gap-5">


            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#161616] p-4 sm:p-6 gap-4 rounded-lg">
              <div className="order-2 sm:order-1 flex-1 text-start">
                <h4 className="text-white text-[20px] sm:text-[24px] font-semibold mb-2">Courses</h4>
                <p className="text-[#B8B8B8] mb-3 text-sm">
                  Our curriculum has helped thousands turn ambition into achievement landing jobs, clearing interviews and upgrading skills. Backed by 10,000+ learners, each module delivers more than knowledge it delivers change.                </p>
                <Link to={"/courses"} className="text-white font-inter font-medium text-[16px] leading-[100%] tracking-[0] align-middle underline underline-offset-[0%] decoration-[0.5px] decoration-solid">Explore more</Link>
              </div>

              <div className="order-1 sm:order-2 flex-shrink-0 bg-gradient-to-b from-[#3B2D00] to-[#816D00] p-2 rounded-md">
                <img
                  src={assets.courses}
                  alt="Courses illustration"
                  className="w-full sm:w-[160px] h-[120px] object-contain"
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#161616] p-4 sm:p-6 gap-4 rounded-lg">
              <div className="order-2 sm:order-1 flex-1 text-start">
                <h4 className="text-white text-[20px] sm:text-[24px] font-semibold mb-2">Webinars</h4>
                <p className="text-[#B8B8B8] mb-3 text-sm">
                  What if 60 minutes could change your career?
                  A power-packed webinar to help you crack interviews and build real skills. 10,000+ learners have done it. Now it’s your turn.                 </p>
                <a onClick={()=>setText("Coming Soon")} className="text-white font-inter font-medium text-[16px] leading-[100%] tracking-[0] align-middle underline underline-offset-[0%] decoration-[0.5px] decoration-solid">{text}</a>
              </div>

              <div className="order-1 sm:order-2 flex-shrink-0 bg-gradient-to-b from-[#3B2D00] to-[#816D00] p-2 rounded-md">
                <img
                  src={assets.webinars}
                  alt="Webinars illustration"
                  className="w-full sm:w-[160px] h-[120px] object-contain"
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#161616] p-4 sm:p-6 gap-4 rounded-lg">
              <div className="order-2 sm:order-1 flex-1 text-start">
                <h4 className="text-white text-[20px] sm:text-[24px] font-semibold mb-2">1 on 1 Consulting</h4>
                <p className="text-[#B8B8B8] mb-3 text-sm">
                  Stuck or overwhelmed? You don't have to figure it all out alone. With 1-on-1 consulting, thousands have found clarity, confidence, and the next right step. Now it's your turn.                  </p>
                <a href="https://wa.me/919363414353?text=Hi%2C%20I%20came%20across%20your%201-on-1%20Consulting%20service%20and%20I%E2%80%99m%20interested%20in%20getting%20some%20guidance.%20I%E2%80%99m%20currently%20feeling%20a%20bit%20stuck%20and%20would%20love%20your%20support%20in%20finding%20clarity%20and%20the%20next%20steps.%20Can%20you%20please%20share%20the%20details%3F%20Thank%20you%21
" className="text-white font-inter font-medium text-[16px] leading-[100%] tracking-[0] align-middle underline underline-offset-[0%] decoration-[0.5px] decoration-solid">Contact us</a>
              </div>

              <div className="order-1 sm:order-2 flex-shrink-0 bg-gradient-to-b from-[#3B2D00] to-[#816D00] p-2 rounded-md">
                <img
                  src={assets.consult}
                  alt="Consulting illustration"
                  className="w-full sm:w-[160px] h-[120px] object-contain"
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#161616] p-4 sm:p-6 gap-4 rounded-lg">
              <div className="order-2 sm:order-1 flex-1 text-start">
                <h4 className="text-white text-[20px] sm:text-[24px] font-semibold mb-2">For Corporates</h4>
                <p className="text-[#B8B8B8] mb-3 text-sm">
                  Upskilled teams. 10% revenue growth. Real impact. Our training solutions have helped businesses boost efficiency and performance. Ready to empower your team and grow faster?                  </p>
                <a href="https://wa.me/919363414353?text=Hi%2C%20I%E2%80%99m%20reaching%20out%20regarding%20your%20corporate%20training%20services.%20I%E2%80%99m%20interested%20in%20exploring%20how%20your%20solutions%20can%20help%20our%20team%20improve%20skills%2C%20boost%20efficiency%2C%20and%20drive%20performance.%20Could%20you%20please%20share%20more%20details%20about%20your%20offerings%2C%20pricing%2C%20and%20how%20we%20can%20get%20started%3F%20Thank%20you%21
" className=" text-white font-inter font-medium text-[16px] leading-[100%] tracking-[0] align-middle underline underline-offset-[0%] decoration-[0.5px] decoration-solid">Contact us</a>
              </div>

              <div className="order-1 sm:order-2 flex-shrink-0 bg-gradient-to-b from-[#3B2D00] to-[#816D00] p-2 rounded-md">
                <img
                  src={assets.corporates}
                  alt="Corporate training illustration"
                  className="w-full sm:w-[160px] h-[120px] object-contain"
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default memo(WeDo)