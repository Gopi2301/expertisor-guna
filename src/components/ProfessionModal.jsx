// import React, { useState, useEffect } from "react";

// const DEFAULT_ROUTES = {
//   student: "student",
//   professional: "working-professional",
//   business: "business-owner",
// };

// const CARDS = [
//   { id: "student", title: "Student" },
//   { id: "professional", title: "Working Professional" },
//   { id: "business", title: "Business Owner" },
// ];

// const ProfessionModal = ({ isOpen, onClose, baseRoute = "/", onNavigate }) => {
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     if (!isOpen) setSelected(null);
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleNext = () => {
//     if (!selected) return;

//     const professionSegment = DEFAULT_ROUTES[selected];
//     const dest = `${baseRoute}?profession=${professionSegment}`;

//     onNavigate(dest);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
//       <div className="absolute inset-0" onClick={onClose} />

//       <div className="relative bg-[#1b1b1b] w-full max-w-3xl rounded-xl p-8 z-10 text-white">
//         <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>×</button>

//         <h2 className="text-center text-2xl font-semibold">Choose Your Profession</h2>
//         <p className="text-center text-gray-400 mt-1 text-sm">
//           We personalize your blockchain learning based on your profile
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//           {CARDS.map(card => (
//             <div
//               key={card.id}
//               onClick={() => setSelected(card.id)}
//               className={`p-4 rounded-lg cursor-pointer border 
//                 ${selected === card.id 
//                   ? "border-yellow-400 bg-white/5" 
//                   : "border-gray-600 bg-black/30"
//                 }`}
//             >
//               <div className="h-32 bg-gray-700 rounded-md mb-3" />
//               <p className="text-center">{card.title}</p>
//             </div>
//           ))}
//         </div>

//         <button
//           className={`w-full py-3 mt-6 rounded-md font-semibold 
//             ${selected ? "bg-yellow-400 text-black" : "bg-gray-600 cursor-not-allowed"}
//           `}
//           disabled={!selected}
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfessionModal;




import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

/**
 * ProfessionModal
 * Props:
 * - isOpen (bool)
 * - onClose (fn)
 * - baseRoute (string)  -> the course page_link (e.g. "/blockchain-tamil")
 * - onNavigate(dest) (fn) -> parent handles actual navigation
 *
 * Behavior:
 * - Next disabled until a profession is selected
 * - Builds dest as `${baseRoute}?profession=${professionSegment}`
 */
const DEFAULT_ROUTES = {
    student: "/blockchain-course-for-students",
    professional: "/blockchain-course-for-working-professionals",
    business: "/blockchain-course-for-business",
}


const CARDS = [
    { id: "student", title: "Student", img1: assets.bc_bw_1, img2: assets.bc_y_1 },
    { id: "professional", title: "Working Professional", img1: assets.bc_bw_2, img2: assets.bc_y_2 },
    { id: "business", title: "Business Owner", img1: assets.bc_bw_3, img2: assets.bc_y_3 },
];


const ProfessionModal = ({ isOpen, onClose, baseRoute = "/", onNavigate }) => {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (!isOpen) setSelected(null);
    }, [isOpen])

    if (!isOpen) return null;

    const handleNext = () => {
        if (!selected) return;
        const professionSegment = DEFAULT_ROUTES[selected] || selected;
        // const dest = `${baseRoute}?profession=${professionSegment}`;
        const dest = professionSegment
        if (onNavigate) onNavigate(dest, selected);
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 mt-16 md:mt-0">
            <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden="true" />

            <div className="relative z-10 w-full max-w-5xl rounded-2xl bg-[#1b1b1b] p-4 md:p-10 text-white shadow-xl">
                <button
                    className="absolute right-4 top-4 text-2xl leading-none hover:opacity-80 hidden sm:block"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <h2 className="text-center text-lg md:text-2xl font-semibold tracking-wider">
                    CHOOSE YOUR PROFESSION
                </h2>
                <p className="text-center text-sm text-gray-300 mt-1 md:mt-2">This helps to customize your learning experience</p>

                {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {CARDS.map((c) => {
                        const active = selected === c.id;
                        return (
                            <div>
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => setSelected(c.id)}
                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(c.id) } }}
                                    aria-pressed={active}
                                    className={
                                        "flex flex-col items-center gap-2 rounded-lg border transition-shadow focus:outline-none w-full " +
                                        (active
                                            ? "ring-2 ring-yellow-400 bg-white/5 shadow-lg"
                                            : "bg-white/2 hover:shadow-md")
                                    }
                                >
                                    <div className="w-full  rounded-md  flex items-center justify-center">
                                        <img src={c.img1} alt="" />
                                        <img src={c.img2} alt="" />
                                    </div>

                                </button>

                                <p className="font-inter mt-4 font-normal text-[18px] leading-[100%] tracking-[0] text-center">{c.title}</p>
                            </div>

                        );
                    })}
                </div> */}

                <div className=" grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-3 md:mt-6">
                    {CARDS.map((c) => {
                        const active = selected === c.id;
                        return (
                            <div key={c.id} className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => setSelected(c.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelected(c.id);
                                        }
                                    }}
                                    aria-pressed={active}
                                    aria-label={c.title}

                                    className={
                                        "group relative flex flex-col items-center gap-2 w-full rounded-lg transition-shadow focus:outline-none " +
                                        // hover gradient
                                        "hover:from-[#000000] hover:to-[#462500] " +
                                        // active
                                        (active
                                            ? " ring-1 ring-yellow bg-gradient-to-b from-[#000000] to-[#462500]"
                                            : " hover:ring-1 hover:ring-yellow/50 bg-gradient-to-b from-[#121212] to-[#464646]"
                                        )
                                    }
                                    >



                                    <div className="
    flex w-full 
    items-center justify-between px-8 md:px-0
    md:flex-col md:justify-start md:items-center
">
                                        {/* Title on mobile-left, hidden on desktop */}
                                        <p className="text-left md:hidden uppercase">{c.title}</p>

                                        {/* Image */}
                                        <div className="rounded-md flex items-center justify-center relative h-28 md:h-56 overflow-hidden">
                                            <img
                                                src={c.img1}
                                                alt={`${c.title} bw`}
                                                className={
                                                    "w-auto h-full object-cover transition-opacity duration-300 " +
                                                    (active ? "opacity-0" : "opacity-100 group-hover:opacity-0")
                                                }
                                                draggable="false"
                                            />

                                            <img
                                                src={c.img2}
                                                alt={`${c.title} color`}
                                                className={
                                                    "absolute inset-0 m-auto w-auto h-full object-cover transition-opacity duration-300 " +
                                                    (active ? "opacity-100" : "opacity-0 group-hover:opacity-100")
                                                }
                                                draggable="false"
                                            />
                                        </div>
                                    </div>



                                </button>

                                <p className="font-inter hidden md:block mt-4 font-normal text-[18px] leading-[100%] tracking-[0] text-center">
                                    {c.title}
                                </p>
                            </div>
                        );
                    })}
                </div>




                <div className="mt-4 md:mt-6">
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!selected}
                        className={
                            "w-full rounded-md text-[18px] py-2 md:py-3 font-bold text-black transition-opacity disabled:opacity-60 " +
                            (selected ? "bg-yellow hover:brightness-95" : "bg-yellow/60")
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfessionModal;