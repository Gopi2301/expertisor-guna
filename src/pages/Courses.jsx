import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaSearch } from 'react-icons/fa'; // npm install react-icons
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CourseContext } from '../context/CourseContextProvider';
import FilterDrawer from '../components/CourseComponents/FilterDrawer';
import { assets } from '../assets/assets';
import BundleCourse from '../components/CourseComponents/BundleCourse';
import Header from '../components/Header';

const Courses = () => {
    const navigate = useNavigate();
    const { courses, categories, languages, mentors, selectedCategories, handleCheckboxChange, typeOfCourse, setCourseType, courseType, handleCourseClick } = useContext(CourseContext)

    const [lan_more, setLan_more] = useState(true)
    const [ment_more, setMent_more] = useState(true)
    const [showLoginModal, setShowLoginModal] = useState(false)

    // final course data
    const [searchCourse, setSearchCourse] = useState([""])

    // searched course
    const [searched, setSearched] = useState("")

    // mobile filter display
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // sorting
    const [showDropdown, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState("Best Match");
    const options = ["Best Match", "Newest", "Most Popular"];
    // -------



    useEffect(() => {
        let data = courses.slice();

        // search filter
        data = data.filter((value) =>
            value.domain?.toLowerCase().includes(searched.toLowerCase()) ||
            value.mentors?.toLowerCase().includes(searched.toLowerCase()) ||
            value.language?.toLowerCase().includes(searched.toLowerCase())
        );

        // course type filter
        data = data.filter((value) =>
            courseType.trim().toLowerCase() === "all"
                ? true
                : courseType.trim().toLowerCase() === value.type.trim().toLowerCase()
        );

        // category & language filter
        if (selectedCategories.length > 0) {
            const hasCategory = categories.some((c) =>
                selectedCategories.includes(c.toLowerCase())
            );
            const hasLanguage = languages.some((l) =>
                selectedCategories.includes(l.toLowerCase())
            );

            data = data.filter((value) => {
                const categoryMatch = selectedCategories.includes(value.category.trim().toLowerCase());
                const languageMatch = selectedCategories.includes(value.language.trim().toLowerCase());

                // both selected → must match both
                if (hasCategory && hasLanguage) {
                    return categoryMatch && languageMatch;
                }

                // otherwise match either
                return categoryMatch || languageMatch;
            });
        }

        setSearchCourse(data);
    }, [searched, selectedCategories, courseType, courses, categories, languages]);



    return (
        <>
            <Header onLoginClick={() => setShowLoginModal(true)} />
            <div className='bg-black '>
                <div className=' text-[#ffffff] px-4 2xl:px-0 pt-3 max-w-[1440px] mx-auto'>
                    <div className='flex justify-between '>
                        {/* left */}
                        <div className='w-[22%] lg:w-[18%] h-[90vh] overflow-y-auto scrollbar-hidden md:block hidden'>
                            <div className='flex flex-col gap-6 pb-5'>

                                {/* COURSE TYPE */}
                                <div>
                                    <h5>COURSES</h5>
                                    <hr className='my-3 border-[#353535]' />
                                    <div className="">
                                        {typeOfCourse.map((type) => {
                                            const isChecked = courseType.toLowerCase().trim() == type.toLowerCase().trim()
                                            return (
                                                <div
                                                    key={type}
                                                    onClick={() => setCourseType(type)}
                                                    className={`py-2 pl-3 ${isChecked
                                                        ? 'bg-[linear-gradient(270deg,_rgba(0,0,0,0.1)_0%,_rgba(255,242,0,0.1)_100%)] text-[#ffffff] border-l-2 border-l-[yellow]'
                                                        : 'bg-transparent text-[#969696]'
                                                        } cursor-pointer `}
                                                >
                                                    <span className="text-sm">{type}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* CATEGORIES */}
                                <div>
                                    <h5>CATEGORIES</h5>
                                    <hr className='my-3 border-[#353535]' />
                                    <div className="space-y-3 ml-3">
                                        {categories.map((category) => {
                                            const isChecked = selectedCategories.includes(category.toLowerCase());
                                            return (
                                                <label
                                                    key={category}
                                                    onClick={() => handleCheckboxChange(category)}
                                                    className="flex items-center space-x-3 cursor-pointer"
                                                >
                                                    <div className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked ? 'bg-yellow border-yellow' : 'bg-black border-[#353535]'}`}>
                                                        {isChecked && <FaCheck className="text-black text-xs" />}
                                                    </div>
                                                    <span className={`text-sm ${isChecked ? 'text-[#ffffff]' : 'text-[#969696]'}`}>{category}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* LANGUAGES */}
                                <div>
                                    <h5>LANGUAGES</h5>
                                    <hr className='my-3 border-[#353535]' />
                                    <div className="space-y-3 ml-3">
                                        {(lan_more ? languages.slice(0, 5) : languages).map((language) => {
                                            const isChecked = selectedCategories.includes(language.toLowerCase());
                                            return (
                                                <label
                                                    key={language}
                                                    onClick={() => handleCheckboxChange(language)}
                                                    className="flex items-center space-x-3 cursor-pointer"
                                                >
                                                    <div className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked ? 'bg-yellow border-yellow' : 'bg-black border-[#353535] text-[#969696]'}`}>
                                                        {isChecked && <FaCheck className="text-black text-xs" />}
                                                    </div>
                                                    <span className={`text-sm ${isChecked ? 'text-[#ffffff]' : 'text-[#969696]'}`}>{language}</span>
                                                </label>
                                            );
                                        })}

                                        <div className='flex justify-between' onClick={() => { setLan_more(prev => !prev) }}>
                                            {lan_more ? <p className='text-yellow'>view more (25)</p> : <p className='text-yellow'>view less</p>}
                                            {lan_more ? <MdKeyboardArrowDown className='text-[##969696]' /> : <MdOutlineKeyboardArrowDown className='text-[##969696]' />}
                                        </div>
                                    </div>
                                </div>

                                {/* MENTORS */}
                                <div>
                                    <h5>MENTORS</h5>
                                    <hr className='my-3 border-[#353535]' />
                                    <div className="space-y-3 ml-3">
                                        {(ment_more ? mentors.slice(0, 3) : mentors).map((mentor) => {
                                            const isChecked = selectedCategories.includes(mentor.toLowerCase());
                                            return (
                                                <label
                                                    key={mentor}
                                                    onClick={() => handleCheckboxChange(mentor)}
                                                    className="flex items-center space-x-3 cursor-pointer"
                                                >
                                                    <div className={`h-4 w-4 flex items-center justify-center border rounded-sm ${isChecked ? 'bg-yellow border-yellow' : 'bg-black border-[#353535] text-[#969696]'}`}>
                                                        {isChecked && <FaCheck className="text-black text-xs" />}
                                                    </div>
                                                    <span className={`text-sm ${isChecked ? 'text-[#ffffff]' : 'text-[#969696]'}`}>{mentor}</span>
                                                </label>
                                            );
                                        })}

                                        <div className='flex justify-between' onClick={() => { setMent_more(prev => !prev) }}>
                                            {ment_more ? <p className='text-yellow'>view more (28)</p> : <p className='text-yellow'>view less</p>}
                                            {ment_more ? <MdKeyboardArrowDown className='text-[##969696]' /> : <MdOutlineKeyboardArrowDown className='text-[##969696]' />}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* right */}
                        {/* md:h-[90vh] */}
                        <div className='w-full md:w-[75%] lg:w-[79%]  md:overflow-y-auto md:scrollbar-hidden'>
                            <div className='flex justify-between gap-4'>
                                <div className='w-full md:w-[60%]'>
                                    <div className="flex pl-4 pr-1 py-1 bg-[#1a1a1a] text-white rounded-md ">
                                        <input
                                            type="text"
                                            placeholder="Search for courses, mentors, languages etc.,"
                                            className="w-full 
    text-[14px] 
    bg-[#1a1a1a] 
    border-none 
    focus:outline-none
    placeholder:text-gray-400 placeholder:truncate /* truncate text */
    placeholder:max-w-none
    md:placeholder:max-w-none      /* normal full text on md+ */"
                                            value={searched}
                                            onChange={(e) => setSearched(e.target.value)}
                                        />
                                        <button className="bg-yellow px-3 py-3 rounded-md">
                                            <FaSearch className="text-black" />
                                        </button>
                                    </div>
                                </div>

                                {/* Sort dropdown */}
                                <div className='w-[30%] md:flex justify-end hidden'>
                                    <div className="relative inline-flex text-left text-white items-center gap-3 ">
                                        <label className="text-sm mr-2">Sort by:</label>
                                        <div
                                            className="bg-[#1a1a1a] px-4 py-2 rounded-md border border-[#2c2c2c] cursor-pointer flex items-center justify-between min-w-[160px]"
                                            onClick={() => setShowDropdown((prev) => !prev)}
                                            onMouseEnter={() => setShowDropdown(true)}
                                        >
                                            <div>{selected}</div>
                                            <div className="ml-2 text-gray-400">&#9662;</div>

                                            {showDropdown && (
                                                <div
                                                    className="absolute top-12 mt-2 left-0 w-full bg-black border border-[#2c2c2c] rounded-md shadow-md z-10"
                                                    onMouseEnter={() => setShowDropdown(true)}
                                                    onMouseLeave={() => setShowDropdown(false)}
                                                >
                                                    {options.map((option) => (
                                                        <div
                                                            key={option}
                                                            onClick={() => {
                                                                setSelected(option);
                                                                setShowDropdown(true);
                                                            }}
                                                            className={`px-4 py-2 text-sm flex justify-between items-center cursor-pointer hover:bg-[#333] ${selected === option ? "text-white" : "text-gray-400"
                                                                }`}
                                                        >
                                                            <span>{option}</span>
                                                            {selected === option && <FaCheck className="text-white text-xs" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <img src={assets.mob_filter} onClick={() => setIsFilterOpen(true)} className="md:hidden block" />
                            </div>

                            {/* Results */}
                            <div className='mt-7'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                                    {
                                        searchCourse.length == 0 ? (
                                            <p className='text-yellow font-medium text-xl text-center mt-10'>Coming Soon</p>
                                        ) : (
                                            searchCourse.map((data, i) =>
                                                data ? (
                                                    <BundleCourse key={i} course={data} onClick={() => handleCourseClick(data)} />
                                                ) : (
                                                    <div key={i} className="flex items-center justify-center space-x-1 p-6">
                                                        <p className="text-gray-300 font-medium">Loading</p>
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                                                    </div>
                                                )
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isFilterOpen && <FilterDrawer onClose={() => setIsFilterOpen(false)} />}
            </div>
        </>
    )
}


export default Courses;
