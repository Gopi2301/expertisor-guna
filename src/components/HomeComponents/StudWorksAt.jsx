import React, { memo, useMemo } from 'react'
import { assets } from '../../assets/assets'
import Marquee from 'react-fast-marquee'


const StudWorksAt = () => {
  const comp = useMemo(() => ([
    assets.c1,
    assets.c2,
    assets.c3,
    assets.c4,
    assets.c5,
    assets.c6,
    assets.c7,
    assets.c8,
    assets.c1,
    assets.c2,
    assets.c3,
    assets.c4,
    assets.c5,
    assets.c6,
    assets.c7,
    assets.c8,
  ]), [])

  return (
    // <div className='my-32 w-full'   style={{
    // backgroundImage: `url(${assets.studwork})`,
    // backgroundRepeat: 'no-repeat',         // or 'no-repeat', 'repeat-x', etc.
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',}}>
    //   <div className='py-20'>
    //       <h6 className='mt-4'>Where do our students works at</h6>
    //   </div>
    // </div>

    //     <div
    //   className="w-full  my-32"
    //   style={{
    //     backgroundImage: `url(${assets.studwork})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //   }}
    // >
    //   <h2 className="text-white text-center text-xl font-medium ">
    //     Where do our students work at
    //   </h2>

    //   <div className="flex flex-wrap justify-center items-center gap-8 ">
    //     <img src={assets.ex_logo} alt="Virtua" className="h-10 object-contain" />

    //   </div>
    // </div>


    <div>
      <div className=" my-20" style={{
    backgroundImage: `url(${assets.studwork})`,
    backgroundRepeat: 'no-repeat',         // or 'no-repeat', 'repeat-x', etc.
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    }}>
        <h4 className='py-6 xl:py-8 text-white text-center text-[20px] leading-[24px] font-medium'>Where do our students works at</h4>
        <div className='pb-7'>
          <Marquee speed={60}  >
            {comp.map((value, index) => (
              <div key={index} className='mr-20 '>
                  <img src={value} alt="Company logo" loading="lazy" decoding="async" width={120} height={48} />
              </div>
            ))}
          </Marquee>
        </div>

      </div>

    </div>

  )
}

export default memo(StudWorksAt)