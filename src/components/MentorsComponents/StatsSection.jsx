import { assets } from "../../assets/assets";

const StatsSection = () => {
  const stats = [
    {
      icon: assets.patam,
      number: "1,00,000+",
      label: "IMPACTED STUDENTS",
    },
    {
      icon: assets.clock,
      number: "65000+",
      label: "WATCH HOURS",
    },
    {
      icon: assets.subscriptions,
      number: "50+",
      label: "COURSES",
    },
    {
      icon: assets.cont,
      number: "10M+",
      label: "TOTAL FOLLOWERS",
    },
  ];

  return (
    <div className="my-6 sm:my-8 lg:my-10">
      <div className=" flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white">
        <div className="flex gap-4 md:gap-6">
          {stats.slice(0, 2).map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-black to-[#1C1800] rounded-md p-4 text-center flex items-center gap-2 lg:gap-3"
            >
              <img src={stat.icon} alt="" />
              <div>
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFA98] text-[19px] lg:text-[36px] font-clash leading-[100%] font-semibold  uppercase ">
                  {stat.number}
                </h2>
                <p className="text-[9px] lg:text-[14px] mt-2 font-inter leading-[100%] font-normal uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 md:gap-6">
          {stats.slice(2, 5).map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-black to-[#1C1800] rounded-md p-4 text-center flex items-center gap-2 lg:gap-3"
            >
              <img src={stat.icon} alt="" />
              <div>
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFA98] text-[19px] lg:text-[36px] font-clash leading-[100%] font-semibold  uppercase">
                  {stat.number}
                </h2>
                <p className="text-[9px] lg:text-[14px] mt-2 font-inter leading-[100%] font-normal uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
