import React from "react";

const StickyCards = () => {
    return (
        <div className=" py-10">
            <div className="flex flex-col gap-[10px] ">
                <div className="bg-red-200 w-[400px] h-[300px] sticky top-[100px]  ">
                    div 1
                </div>
                <div className="bg-green-200 w-[400px] h-[300px] sticky top-[100px] ">
                    div 2
                </div>
                <div className="bg-yellow w-[400px] h-[300px] sticky top-[100px] ">
                    div 3
                </div>
                <div className="bg-green-500 w-[400px] h-[300px] sticky  top-[100px]">
                    div 4
                </div>
            </div>
        </div>
    );
};

export default StickyCards;



// import React from "react";

// const StickyCards = () => {
//   return (
//     <div className="min-h-screen py-10 bg-red-600">
//       <div className="flex flex-col gap-[10px] ">
//         <div className="bg-red-200 w-[400px] h-[300px] sticky top-[20px]">
//           div 1
//         </div>
//         <div className="bg-green-200 w-[400px] h-[300px] sticky top-[20px]">
//           div 2
//         </div>
//         <div className="bg-yellow w-[400px] h-[300px] sticky top-[20px]">
//           div 3
//         </div>
//         <div className="bg-pink-200 w-[400px] h-[300px] sticky top-[20px]">
//           div 4
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StickyCards;

