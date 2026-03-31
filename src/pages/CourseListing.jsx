import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Globe } from 'lucide-react';
import { getPublishedCourses, getCategories } from '../services/api';

const CourseCard = ({ course, categoryName }) => {
    return (
        <Link
            to={`/${course.slug}`}
            className="group bg-[#111] rounded-2xl border border-neutral-800 overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
                {course.thumbnail ? (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl">🎓</span>
                    </div>
                )}
                {/* Category Badge */}
                {categoryName && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {categoryName}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {course.title}
                </h3>

                {/* Mentor */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden">
                        {course.mentor_image ? (
                            <img src={course.mentor_image} alt={course.mentor_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-500">
                                👤
                            </div>
                        )}
                    </div>
                    <span className="text-sm text-neutral-400">{course.mentor_name || 'Instructor'}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{course.rating || '4.9'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                        <Users className="w-4 h-4" />
                        <span>{course.student_count || '0+'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                        <Globe className="w-4 h-4" />
                        <span>{course.language || 'Tamil'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [coursesData, categoriesData] = await Promise.all([
                getPublishedCourses(),
                getCategories()
            ]);
            setCourses(coursesData || []);
            setCategories(categoriesData || []);
        } catch (error) {
            console.error('Failed to load courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = activeCategory === 'all'
        ? courses
        : courses.filter(c => c.category_id === parseInt(activeCategory));

    const getCategoryName = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat?.name || '';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-yellow">Courses</span>
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Learn from industry experts and transform your career with our comprehensive courses.
                    </p>
                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all'
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                }`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(String(cat.id))}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === String(cat.id)
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Course Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-400 text-lg">No courses available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                categoryName={getCategoryName(course.category_id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseListing;
