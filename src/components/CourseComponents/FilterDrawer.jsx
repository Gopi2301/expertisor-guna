// import React, { useContext, useState } from 'react';
// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import { CourseContext } from '../../context/CourseContextProvider';
// import { FaCheck, FaSearch, } from 'react-icons/fa';
// import { assets } from '../../assets/assets';


// const FilterDrawer = ({ onClose }) => {
//     const [openSection, setOpenSection] = useState(null);
//     const { categories, languages, mentors, selectedCategories, handleCheckboxChange, typeOfCourse } = useContext(CourseContext)

//     const section = [
//         { key: 'courses', label: 'COURSES', options: typeOfCourse },
//         { key: 'categories', label: 'CATEGORIES', options: categories },
//         { key: 'languages', label: 'LANGUAGES', options: languages },
//         { key: 'mentors', label: 'MENTORS', options: mentors },
//         { key: 'sort', label: 'SORT BY', options: ['Popularity', 'Newest', 'Rating'] }
//     ]


//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end">
//             <div className=" bg-[#111] w-full rounded-t-2xl p-4 max-h-[94%] overflow-y-auto">
//                 <div className="w-12 h-1 rounded-full bg-gray-500 mx-auto mb-4"></div>
//                 <div className="flex justify-between items-center pb-4 border-b border-[#272727]">
//                     <h2 className="text-white font-inter font-semibold text-[16px] leading-[18px]">Filter by</h2>
//                     <img onClick={onClose} src={assets.close} className="text-white w-[14px] h-[14px]" />
//                 </div>


//                 {/* Sections */}
//                 {
//                     section.map(section => (
//                         <div key={section.key} className="">
//                             <button
//                                 onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
//                                 className="flex justify-between items-center py-4  w-full"
//                             >
//                                 <span className="text-white font-inter font-normal text-[12px] leading-[100%]">{section.label}</span>
//                                 <ChevronDownIcon
//                                     className={`w-5 h-5 text-white transform transition-transform ${openSection === section.key ? 'rotate-180' : ''}`}
//                                 />
//                             </button>
//                             {/* {openSection === section.key && (
//                             <div className="flex flex-col gap-3 py-2 pl-2">
//                                 {section.options.map((item) => {
//                                     const isChecked=selectedCategories.includes(item.toLowerCase())

//                                     return(
//                                     <label key={item} className="flex items-center gap-2 text-white">
//                                         <div onClick={() => handleCheckboxChange(item)} className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked ? 'bg-yellow border-yellow' : 'bg-black border-[#353535]'}`}>
//                                             {isChecked && <FaCheck className="text-black text-xs" />}
//                                         </div>
//                                         <p className='text-[#969696] font-inter font-normal text-[14px] leading-[100%]'>{item}</p>
//                                     </label>
//                                     )
//                                 })}
//                             </div>
//                         )} */}

//                             {openSection === section.key && (
//                                 section.key === "courses" ? (
//                                     <div className="py-2 pl-2 text-[#969696] text-sm">
//                                         {/* custom UI for courses section */}
//                                         <p>Courses section content here...</p>
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col gap-3 py-2 pl-2">
//                                         {section.options.map((item) => {
//                                             const isChecked = selectedCategories.includes(item.toLowerCase());

//                                             return (
//                                                 <label key={item} className="flex items-center gap-2 text-white">
//                                                     <div
//                                                         onClick={() => handleCheckboxChange(item)}
//                                                         className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked
//                                                                 ? "bg-yellow border-yellow"
//                                                                 : "bg-black border-[#353535]"
//                                                             }`}
//                                                     >
//                                                         {isChecked && <FaCheck className="text-black text-xs" />}
//                                                     </div>
//                                                     <p className="text-[#969696] font-inter font-normal text-[14px] leading-[100%]">
//                                                         {item}
//                                                     </p>
//                                                 </label>
//                                             );
//                                         })}
//                                     </div>
//                                 )
//                             )}




//                             <hr className=' border-[#272727]' />

//                         </div>
//                     ))}


//                 {/* Buttons */}
//                 <div className="flex gap-2 mt-4    ">
//                     <button onClick={onClose} className="flex-1 bg-[#222] text-white py-2 rounded" >Cancel</button>
//                     <button className="flex-1 bg-yellow text-black font-semibold py-2 rounded" onClick={onClose}>Apply</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterDrawer;









import React, { useContext, useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CourseContext } from '../../context/CourseContextProvider';
import { FaCheck } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const FilterDrawer = ({ onClose }) => {
    const [openSection, setOpenSection] = useState(null);

    // pull context
    const { categories, languages, mentors, selectedCategories, setSelectedCategories, typeOfCourse,courseType,setCourseType } = useContext(CourseContext);

    // local copy of selected
    const [tempSelected, setTempSelected] = useState([]);

    // local copy of courses
    const [tempCourseType,setTempCourseType]=useState("")


    // when drawer opens, copy the context state into temp
    useEffect(() => {
        setTempSelected(selectedCategories);
        setTempCourseType(courseType)
    }, [selectedCategories,courseType]);

    const handleTempCheckboxChange = (category) => {
        const lowerCategory = category.toLowerCase();
        setTempSelected((prev) =>
            prev.includes(lowerCategory)
                ? prev.filter((item) => item !== lowerCategory)
                : [...prev, lowerCategory]
        );
    };

    const handleApply = () => {
        setSelectedCategories(tempSelected); // update global
        setCourseType(tempCourseType)
        onClose();
    };

    const handleCancel = () => {
        setSelectedCategories([]);   // clear all filters in context
        setTempSelected([]);         // also clear local state
        onClose();

    };


    const section = [
        { key: 'courses', label: 'COURSES', options: typeOfCourse },
        { key: 'categories', label: 'CATEGORIES', options: categories },
        { key: 'languages', label: 'LANGUAGES', options: languages },
        { key: 'mentors', label: 'MENTORS', options: mentors },
        { key: 'sort', label: 'SORT BY', options: ['Popularity', 'Newest', 'Rating'] }
    ];

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end">
            <div className=" bg-[#111] w-full rounded-t-2xl p-4 max-h-[94%] overflow-y-auto">
                <div className="w-12 h-1 rounded-full bg-gray-500 mx-auto mb-4"></div>
                <div className="flex justify-between items-center pb-4 border-b border-[#272727]">
                    <h2 className="text-white font-inter font-semibold text-[16px] leading-[18px]">Filter by</h2>
                    <img onClick={onClose} src={assets.close} className="text-white w-[14px] h-[14px]" />
                </div>

                {/* Sections */}
                {section.map((section) => (
                    <div key={section.key}>
                        <button
                            onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                            className="flex justify-between items-center py-4  w-full"
                        >
                            <span className="text-white font-inter font-normal text-[12px] leading-[100%]">{section.label}</span>
                            <ChevronDownIcon
                                className={`w-5 h-5 text-white transform transition-transform ${openSection === section.key ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {openSection === section.key && (
                            section.key === "courses" ? (
                                <div className="py-2  text-[#969696] text-sm">
                                    <div className="">
                                        {section.options.map((type, i) => {
                                            const isChecked = tempCourseType.toLowerCase().trim() == type.toLowerCase().trim()
                                            return (
                                                <div key={type} onClick={() => setTempCourseType(type)} className={`py-2 pl-3  ${isChecked ? 'bg-[linear-gradient(270deg,_rgba(0,0,0,0.1)_0%,_rgba(255,242,0,0.1)_100%)] text-[#ffffff] border-l-2 border-l-[yellow]' : 'bg-transparent text-[#969696]'} cursor-pointer `}>
                                                    <span className="text-sm">{type}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 py-2 pl-2">
                                    {section.options.map((item) => {
                                        const isChecked = tempSelected.includes(item.toLowerCase());

                                        return (
                                            <label key={item} onClick={() => handleTempCheckboxChange(item)} className="flex items-center gap-2 text-white">
                                                <div

                                                    className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked
                                                        ? "bg-yellow border-yellow"
                                                        : "bg-black border-[#353535]"
                                                        }`}
                                                >
                                                    {isChecked && <FaCheck className="text-black text-xs" />}
                                                </div>
                                                <p className="text-[#969696] font-inter font-normal text-[14px] leading-[100%]">
                                                    {item}
                                                </p>
                                            </label>
                                        );
                                    })}
                                </div>
                            )
                        )}

                        <hr className=' border-[#272727]' />
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                    <button onClick={() => handleCancel()} className="flex-1 bg-[#222] text-white py-2 rounded" >Cancel</button>
                    <button onClick={() => handleApply()} className="flex-1 bg-yellow text-black font-semibold py-2 rounded">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default FilterDrawer;
