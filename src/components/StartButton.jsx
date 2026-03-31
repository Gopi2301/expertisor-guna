// import { assets } from "../assets/assets"


// const StartButton = ({data}) => {
//   const a=data


//   return (
//     <div>
//       <a
//         href={data.link}
//       >
//         <div className="flex justify-center gap-1 rounded-[4px] px-[18px] py-[12px] sm:py-[14px] bg-yellow items-center w-full sm:w-[233px] sm:min-w-[233px] ">
//           <p className="text-black font-inter font-semibold text-[18px] leading-[100%]">
//             {data.name}
//           </p>
//           <img src={assets.r_long_arrow} alt="Right arrow" />
//         </div>
//       </a>
//     </div>
//   )
// }

// export default StartButton



import { useState } from "react";
import { assets } from "../assets/assets"
import ApplyModal from "./Simple_elite_temp_Components.jsx/ApplyModal";

const StartButton = ({ data, onClick, courseId, course_id }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  if (!data) return null; // prevent crash if no prop

  // Resolve course ID from various possible prop names
  const finalCourseId = course_id || courseId || data?.courseId || data?.deal_course_id;

  // pick link if exists, otherwise links
  const { name, link } = data;
  const para = name || "start"

  // Unified click handler
  const handleLinkClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (!link || link === "#" || link === "") {
      e.preventDefault();
      setShowApplyModal(true);
    }
  };

  const href = link || "#";

  return (
    <div>
      {onClick || (!link || link === "#" || link === "") ? (
        <button
          onClick={handleLinkClick}
          className="flex justify-center gap-1 rounded-[4px] px-[22px] py-[12px] sm:py-[14px] bg-yellow items-center w-full cursor-pointer hover:bg-yellow/90 transition-colors"
        >
          <p className="text-black font-inter font-semibold text-[18px] leading-[100%] text-nowrap">
            {para}
          </p>
          <img src={assets.r_long_arrow} alt="Right arrow" />
        </button>
      ) : (
        <a href={href} onClick={handleLinkClick} className="block w-full">
          <div className="flex justify-center gap-1 rounded-[4px] px-[22px] py-[12px] sm:py-[14px] bg-yellow items-center w-full cursor-pointer hover:bg-yellow/90 transition-colors">
            <p className="text-black font-inter font-semibold text-[18px] leading-[100%] text-nowrap">
              {para}
            </p>
            <img src={assets.r_long_arrow} alt="Right arrow" />
          </div>
        </a>
      )}
      <ApplyModal
        open={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        courseId={finalCourseId}
      />
    </div>
  );
};

export default StartButton;

