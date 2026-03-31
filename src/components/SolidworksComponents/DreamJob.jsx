import React from 'react'
import Heading from '../Heading'

const DreamJob = ({ dreamjob }) => {
  return (
    <div className='mt-[80px] md:mt-[180px] px-3 sm:px-14 lg:px-20'>
      <div>
        <Heading head={dreamjob.title} highlights={dreamjob.highlights} p1={dreamjob.p1} p2={dreamjob.p2} />
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-[40px] md:mt-[64px]">
            {dreamjob.challenges.map((item, index) => (
              <div
                key={index}
                className="bg-[#111010] p-3 rounded-xl flex flex-col shadow-md hover:shadow-lg transition-shadow"
              >
                <img src={item.img} alt={item.title} className="object-cover w-full" />
                <h3 className="text-white text-left font-semibold  text-lg mb-1 mt-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>        </div>
      </div>
    </div>
  )
}

export default DreamJob