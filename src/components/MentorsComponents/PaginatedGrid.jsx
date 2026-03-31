import React, { memo, useMemo } from 'react';
import ProfileCard from './ProfileCard';
import { assets } from '../../assets/assets';
import { pages } from '../../constants/pages';


// const images = [
//   assets.m1,
//   assets.m2,
//   assets.m3,
//   assets.m4,
//   assets.m1,
//   assets.m2,
//   assets.m3,
//   assets.m4,
//   assets.m1,
//   assets.m2,
//   assets.m3,
//   assets.m4,
// ]

const PaginatedGrid = () => {
  const mentors = useMemo(() => pages.become_mentors.wall_of_mentors.mentors, []);
  // const [currentPage, setCurrentPage] = useState(1);
  // const cardsPerPage = 9;

  // const indexOfLast = currentPage * cardsPerPage;
  // const indexOfFirst = indexOfLast - cardsPerPage;
  // const currentCards = images.slice(indexOfFirst, indexOfLast);

  // const totalPages = Math.ceil(images.length / cardsPerPage);

  return (
    <div className="min-h-screen bg-black text-white p-8 px-3 sm:px-14 lg:px-20">




      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
        {currentCards.map((img, idx) => (
          <ProfileCard key={idx} imgSrc={img} />
        ))}
      </div> */}

      <div>
        <div className='mt-[32px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-4 lg:gap-5'>
          {mentors.map((data, i) => (
            <div
              key={i}
              className='relative border  border-[#323232] rounded-lg bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)] bg-black bg-blend-screen overflow-hidden group'
            >

              {/* <div className='flex justify-center '>
                                        <img src={data.img} alt={data.name} className='' />
                                    </div> */}

              {/* <div className="w-full aspect-[4/5] overflow-hidden">
          <img
            src={data.img}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div> */}


              <div className="w-full aspect-[5/6] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                <img
                  src={data.img}
                  alt={data.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <p className="absolute bottom-7 w-full text-center font-clash font-semibold text-[25px]  md:text-[28px] lg:text-[31px] leading-[100%] tracking-normal uppercase">
                {data.name}
              </p>


              {/* hover content */}
              <div className="absolute inset-0  text-white p-4 flex flex-col  justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-blend-screen bg-[radial-gradient(191.1%_153.45%_at_14.26%_121.55%,#705900_0%,rgba(0,0,0,0.3)_66.08%)]">
                <div className="w-24 min-h-34 rounded-lg overflow-hidden mb-3">
                  <img src={data.img} alt={data.name} className="w-full h-full bg-[#473901] object-contain" loading="lazy" decoding="async" />
                </div>

                <div>
                  <h2 className="text-yellow font-inter font-semibold text-[18px]">{data.name}</h2>
                  <p className="text-gray-400 font-inter font-normal text-[12px] md:text-[14px] mb-4">
                    ({data.role || "Instructor"})
                  </p>
                </div>

                <div className="space-y-2 mb-4 w-full font-inter font-normal text-[14px]">
                  {
                    data?.rating?.map((value, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img src={value.img} alt={value.name} loading="lazy" decoding="async" width={20} height={20}/>
                        <span>{value.name}</span>
                      </div>
                    ))
                  }
                </div>

                <div className="grid grid-cols-2 gap-2 w-full font-inter font-medium text-[14px]">

                  {
                    data?.social_media?.map((value, idx) => (
                      <a key={idx} target="_blank" href={value.link} rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#2c2c2c] rounded-lg py-2">
                        <img src={value.sm_i} alt={`${data.name} ${value.followers}`} loading="lazy" decoding="async" width={20} height={20}/>
                        <p>{value.followers}</p>
                        <img src={value.link_i} alt="External link icon" loading="lazy" decoding="async" width={16} height={16}/>

                      </a>
                    ))
                  }
                </div>
              </div>
            </div>
          ))}



        </div>
      </div>





      {/* Pagination */}
      {/* <div className="flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1  rounded ${currentPage === idx + 1 ? 'bg-yellow text-black' : 'bg-[#1A1A1A]'
              }`}
          >
            {idx + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default memo(PaginatedGrid);
