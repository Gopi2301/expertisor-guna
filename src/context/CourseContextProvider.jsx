import React, { createContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'
import ProfessionModal from '../components/ProfessionModal'



export const CourseContext = createContext()


const CourseContextProvider = (props) => {

    const navigate = useNavigate();


    const hardcodedCourses = [
        {
            page_link: "/techbundle",
            img: assets.all_bundle,
            type: "bundle course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 7941,
            domain: "All-in-One Tech Career Bundle",
            // bundle
            bundle_i: assets.book,
            bundle_tot_courses: "4 Courses",
            more_count: "+6more",
            // -----
            schedule_i: assets.schedule,
            hours: "70h15m",
            ment_icon: assets.ment_icon,
            mentors: "Code Javid,Raghulann,sathesh",
            para: " Full Stack, Cloud (AWS & Azure), Linux Admin, Prompt Engineering, Data Science, VMware",
            language: "tamil",
            category: "technology",
        },

        // civil3D
        {
            page_link: "/civil3d-tamil",
            img: assets.civil3D,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 3485,
            domain: "AutoCAD Civil 3D",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "Tamil",
            // -------
            schedule_i: assets.schedule,
            hours: "43 Modules",
            ment_icon: assets.raghulan_ment_i,
            mentors: "Raghulan Gowthaman",
            para: "Site Design, Surveying Tools, Transportation Design, Land Development 3D Visualization",
            language: "Tamil",
            category: "Civil",
        },

        // 3DMax
        {
            page_link: "/3dsmax-tamil",
            img: assets.threeDsmax,
            type: "individual course",
            level: "Beginner",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 4217,
            domain: "3DS Max Mastery Program",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "Tamil",
            // -------
            schedule_i: assets.schedule,
            hours: "32 Modules",
            ment_icon: assets.raghulan_ment_i,
            mentors: "Raghulan Gowthaman",
            para: " Modeling, Texturing, Animation, Rendering and more.",
            language: "Tamil",
            category: "Civil",
        },


        // affilate
        {
            page_link: "/reels-affiliate-marketing-tamil",
            img: assets.affilate_card_img,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.8,
            rating_persons: 3649,
            domain: "Learn Reels Affiliate Marketing",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "tamil",
            // -------
            schedule_i: assets.schedule,
            hours: "8h10m",
            ment_icon: assets.sridhar_ment_i,
            mentors: "Sridhar S",
            para: " Amazon, Flipkart, Meesho, Secret Platform and more",
            language: "tamil",
            category: "Bussiness",
        },

        // solidworks
        {
            page_link: "/solidworks-tamil",
            img: assets.solidworks,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.8,
            rating_persons: 963,
            domain: "SolidWorks Design Mastery",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "Tamil",
            // -------
            schedule_i: assets.schedule,
            hours: "12h",
            ment_icon: assets.elavarasan_ment_i,
            mentors: "Elavarasan S",
            para: "3D Modeling, Assembly, Simulation, Sheet Metal, Drafting",
            language: "Tamil",
            category: "Mechanical",
        },

        // blockchain
        {
            page_link: "/blockchain-course",
            img: assets.blockchain_ment,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.8,
            rating_persons: 874,
            domain: "Blockchain Masterclass English",
            indi_lang_i: assets.lang_i,
            lang_detail: "English",
            schedule_i: assets.schedule,
            // hours: "9h 45m",
            ment_icon: assets.ment_img,
            mentors: "Sathya P",
            para: "Web3, Crypto, Smart Contracts, Blockchain Projects",
            language: "English",
            category: "Technology"
        },

        // Amazon
        {
            page_link: "/amazon-seller-tamil-course",
            img: assets.amazon,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 2376,
            domain: "Amazon Business Profit Blueprint",
            indi_lang_i: assets.lang_i,
            lang_detail: "Tamil",
            schedule_i: assets.schedule,
            hours: "6h",
            ment_icon: assets.swaminathan_ment_i,
            mentors: "Swaminathan yuvaraj",
            para: " Amazon Ads,Scaling Strategies,Listing Optimization,Product Research",
            language: "Tamil",
            category: "Bussiness",
        },

        // civil3D english
        {
            page_link: "/civil3d-english",
            img: assets.civil_3d_eng,
            type: "individual course",
            level: "All levels",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 1753,
            domain: "AutoCAD Civil 3D",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "English",
            // -------
            schedule_i: assets.schedule,
            hours: "43 Modules",
            ment_icon: assets.raghulan_ment_i,
            mentors: "Raghulan Gowthaman",
            para: "Site Design, Surveying Tools, Transportation Design, Land Development 3D Visualization",
            language: "English",
            category: "Civil",
        },


        // 3Dsmax english
        {
            page_link: "/3dsmax-english",
            img: assets.threeDMax_eng,
            type: "individual course",
            level: "Beginner",
            star_i: assets.star_i,
            rating: 4.9,
            rating_persons: 1346,
            domain: "3DS Max Mastery Program",
            // individual course
            indi_lang_i: assets.lang_i,
            lang_detail: "English",
            // -------
            schedule_i: assets.schedule,
            hours: "32 Modules",
            ment_icon: assets.raghulan_ment_i,
            mentors: "Raghulan Gowthaman",
            para: " Modeling, Texturing, Animation, Rendering and more.",
            language: "English",
            category: "Civil",
        },
    ];

    const [courses, setCourses] = useState(hardcodedCourses);

    // API imports
    // import { getPublishedCourses } from '../services/api'; // Assuming this import will be added at top

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Dynamically import to avoid circular dependency issues if any
                const { getPublishedCourses } = await import('../services/api');
                const data = await getPublishedCourses();

                const mappedCourses = data.map(course => ({
                    id: course.id,
                    page_link: course.slug ? `/courses/${course.slug}` : '#',
                    img: course.thumbnail || assets.all_bundle, // Fallback image
                    type: "individual course", // Default type
                    level: course.level || "All levels",
                    star_i: assets.star_i,
                    rating: course.rating || 4.9,
                    rating_persons: course.reviews_count || 0,
                    domain: course.title,
                    // individual course
                    indi_lang_i: assets.lang_i,
                    lang_detail: course.language || "Tamil",
                    // -------
                    schedule_i: assets.schedule,
                    hours: course.duration || "0h",
                    ment_icon: course.mentor_image || assets.ment_img, // Use mentor image if available
                    mentors: course.instructor || course.mentor_name || "Instructor",
                    para: course.description || course.hero_data?.subheadline || course.title,
                    language: course.language || "Tamil",
                    category: course.category_name || "Technology", // Fallback category
                }));

                setCourses([...hardcodedCourses, ...mappedCourses]);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                // Fallback to empty or show error
                setCourses(hardcodedCourses);
            }
        };

        fetchCourses();
    }, []);







    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { getCategories } = await import('../services/api');
                const data = await getCategories();
                // Map to just strings if that's what the component expects, 
                // or keep objects if refactoring Courses.jsx. 
                // Looking at Courses.jsx, it maps categories directly: {categories.map((category) => ...)}
                // and expects strings based on: const isChecked = selectedCategories.includes(category.toLowerCase());

                // If API returns objects {id, name, slug}, we need to map to names.
                const categoryNames = data.map(c => c.name);
                setCategories(categoryNames);

                // Fallback or seed if empty?
                if (categoryNames.length === 0) {
                    setCategories(["Technology", "Business", "Civil", "Mechanical", "Medical", "Electrical"]);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories(["Technology", "Business", "Civil", "Mechanical", "Medical", "Electrical"]);
            }
        };
        fetchCategories();
    }, []);

    const languages = [
        "English",
        "Tamil",
        "Telugu",
        "Hindi",
        "Malayalam",
        "French",
    ]

    const mentors = [
        "Davis Philips",
        "Ann Vaccaro",
        "Angel Gouse",
        "Giana Herwitz",
        "Lindsey Workman"
    ]

    const typeOfCourse = [
        "All",
        "Bundle course",
        "Individual course",
    ]

    const [selectedCategories, setSelectedCategories] = useState([].map(item => item.toLowerCase()));
    const [courseType, setCourseType] = useState("all")


    const handleCheckboxChange = (category) => {
        const lowerCategory = category.toLowerCase();
        setSelectedCategories((prev) =>
            prev.includes(lowerCategory)
                ? prev.filter((item) => item !== lowerCategory)
                : [...prev, lowerCategory]
        );
    };


    // scroll
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -310, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
    };

    // blockchain

    const [showModal, setShowModal] = useState(false);

    const isProfessionModalCourse = (course) => {
        const link = (course?.page_link || "").toLowerCase();
        const domain = (course?.domain || "").toLowerCase();
        // match your blockchain course by page_link or domain containing "blockchain"
        return link.includes('blockchain') || domain.includes('blockchain');
    }

    function handleCourseClick(course) {
        if (isProfessionModalCourse(course)) {
            // setCurrentCourse(course);
            setShowModal(true);
        } else {
            console.log(course)
            navigate(course.page_link);
        }
    }

    function handleModalNavigate(dest) {
        setShowModal(false);
        // setCurrentCourse(null);
        navigate(dest);
    }



    const value = { courses, selectedCategories, setSelectedCategories, handleCheckboxChange, categories, languages, mentors, scrollRef, scrollLeft, scrollRight, typeOfCourse, courseType, setCourseType, handleCourseClick }
    return (
        <CourseContext.Provider value={value}>
            {props.children}

            <ProfessionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                // baseRoute={currentCourse?.page_link || '/'}
                onNavigate={(dest) => handleModalNavigate(dest)}
            />

        </CourseContext.Provider>
    )
}

export default CourseContextProvider