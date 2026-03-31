import React from "react";
import ImgRun from "../HomeComponents/ImgRun";

const LogoCarousel = ({ logos }) => {
  const defaultLogos = Array.from(
    { length: 22 },
    (_, i) => `/business-webinar/business-webinar-client-logo-${i + 1}.svg`
  );

  const logoList = logos || defaultLogos;

  return (
    <div className="w-full py-10">
      <p className=" text-center text-[#8A8A8A] uppercase ">as seen in</p>
      <ImgRun
        datas={logoList}
        dirc="left"
        speed="40"
        m="py-10"
        h="md:max-h[100px] w-auto object-contain transition-all duration-300 mx-6"
      />
    </div>
  );
};

export default LogoCarousel;
