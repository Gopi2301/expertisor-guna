import React, { useState, useEffect } from 'react';
import {
    BookOpen,
    Tag,
    FileText,
    DollarSign,
    Clock,
    BarChart,
    Globe,
    User,
    Image as ImageIcon,
    Video,
    Star,
    Handshake
} from 'lucide-react';
import { getCategories, uploadFile } from '../../services/api';

/**
 * Course Card Tab - Basic Course Information
 */
const CourseCardTab = ({ course, setCourse, isNew }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (field, value) => {
        setCourse(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent, field, value) => {
        setCourse(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const handleImageUpload = async (file, field) => {
        try {
            const data = await uploadFile(file);
            const uploadUrl = data.url || data.data?.url;

            if (uploadUrl) {
                handleChange(field, uploadUrl);
                alert('Image uploaded successfully!');
            } else {
                console.error('Upload failed: No URL in response');
                alert('Failed to upload image: No URL returned');
            }
        } catch (error) {
            console.error('Upload error:', error);
            // Check for auth error
            if (error.message.includes('Invalid or expired token') || error.message.includes('Authentication required')) {
                alert('Session expired. Please log out and log in again.');
            } else {
                alert('Failed to upload image: ' + error.message);
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">

            {/* Course Info Section */}
            <section className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">Course Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Course Title *
                        </label>
                        <input
                            type="text"
                            value={course.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="e.g., Master Your Skill in 90 Days"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            URL Slug *
                        </label>
                        <input
                            type="text"
                            value={course.slug || ''}
                            onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            placeholder="master-your-skill"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors font-mono text-sm"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            URL: /courses/{course.slug || 'your-slug'}
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Category
                        </label>
                        <select
                            value={course.category_id || ''}
                            onChange={(e) => handleChange('category_id', parseInt(e.target.value) || null)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Description
                        </label>
                        <textarea
                            value={course.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Brief description of your course..."
                            rows={4}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                        />
                    </div>

                    {/* Course Subtitle/Tagline */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Course Subtitle/Tagline
                        </label>
                        <input
                            type="text"
                            value={course.subtitle || ''}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            placeholder="e.g., Modeling, Texturing, Animation, Rendering and more."
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Short tagline displayed on course card below mentor name
                        </p>
                    </div>

                    {/* Course Thumbnail */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <ImageIcon className="w-4 h-4 inline mr-1" />
                            Course Thumbnail
                        </label>

                        <div className="space-y-3">
                            {/* URL Input */}
                            <div>
                                <input
                                    type="text"
                                    value={course.thumbnail || ''}
                                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                                    placeholder="Enter image URL or upload a file below..."
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-white cursor-pointer transition-colors">
                                    <ImageIcon className="w-4 h-4" />
                                    <span className="text-sm">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleImageUpload(file, 'thumbnail');
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-xs text-neutral-500">
                                    Recommended: 1280x720px (16:9 ratio)
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Preview */}
                        {course.thumbnail && (
                            <div className="mt-4 rounded-lg overflow-hidden border border-neutral-700 max-w-md">
                                <img
                                    src={course.thumbnail}
                                    alt="Course thumbnail preview"
                                    className="w-full h-auto"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Course Settings */}
            <section className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <BarChart className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">Course Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Reviews Count */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Star className="w-4 h-4 inline mr-1" />
                            Reviews Count
                        </label>
                        <input
                            type="number"
                            value={course.reviews_count || 0}
                            onChange={(e) => handleChange('reviews_count', parseInt(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Star className="w-4 h-4 inline mr-1" />
                            Rating (out of 5)
                        </label>
                        <input
                            type="number"
                            value={course.rating || 4.9}
                            onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 4.9)}
                            placeholder="4.9"
                            step="0.1"
                            min="0"
                            max="5"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Star rating displayed on course card (0-5)
                        </p>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Duration
                        </label>
                        <input
                            type="text"
                            value={course.duration || ''}
                            onChange={(e) => handleChange('duration', e.target.value)}
                            placeholder="90 days"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                    </div>

                    {/* Level */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Level
                        </label>
                        <select
                            value={course.level || ''}
                            onChange={(e) => handleChange('level', e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                        >
                            <option value="">Select Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="all-levels">All Levels</option>
                        </select>
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Globe className="w-4 h-4 inline mr-1" />
                            Language
                        </label>
                        <select
                            value={course.language || 'Tamil'}
                            onChange={(e) => handleChange('language', e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                        >
                            <option value="Tamil">Tamil</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Malayalam">Malayalam</option>
                            <option value="Telugu">Telugu</option>
                        </select>
                    </div>

                    {/* Module Count */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <BookOpen className="w-4 h-4 inline mr-1" />
                            Module Count
                        </label>
                        <input
                            type="number"
                            value={course.module_count || ''}
                            onChange={(e) => handleChange('module_count', parseInt(e.target.value) || null)}
                            placeholder="32"
                            min="0"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                    </div>

                    {/* Instructor */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <User className="w-4 h-4 inline mr-1" />
                            Instructor
                        </label>
                        <input
                            type="text"
                            value={course.instructor || ''}
                            onChange={(e) => handleChange('instructor', e.target.value)}
                            placeholder="Instructor name"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                    </div>

                    {/* Mentor Image */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <User className="w-4 h-4 inline mr-1" />
                            Mentor Image
                        </label>

                        <div className="space-y-3">
                            {/* URL Input */}
                            <div>
                                <input
                                    type="text"
                                    value={course.mentor_image || ''}
                                    onChange={(e) => handleChange('mentor_image', e.target.value)}
                                    placeholder="Enter image URL or upload a file below..."
                                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-white cursor-pointer transition-colors">
                                    <ImageIcon className="w-4 h-4" />
                                    <span className="text-sm">Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleImageUpload(file, 'mentor_image');
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-xs text-neutral-500">
                                    Recommended: Square (1:1 ratio), min 200x200px
                                </span>
                            </div>
                        </div>

                        {/* Mentor Image Preview */}
                        {course.mentor_image && (
                            <div className="mt-4 rounded-lg overflow-hidden border border-neutral-700 max-w-[200px]">
                                <img
                                    src={course.mentor_image}
                                    alt="Mentor preview"
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Deal Settings */}
            <section className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Handshake className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">Deal Settings</h2>
                    <span className="ml-auto text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded-full">Zoho / CRM integration</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deal Name */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Tag className="w-4 h-4 inline mr-1" />
                            Deal Name
                        </label>
                        <input
                            type="text"
                            value={course.deal_name || ''}
                            onChange={(e) => handleChange('deal_name', e.target.value)}
                            placeholder="e.g., BlenderBatch6"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Used as the deal name when pushing leads to Zoho CRM
                        </p>
                    </div>

                    {/* Deal Course */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <BookOpen className="w-4 h-4 inline mr-1" />
                            Course (for Deal)
                        </label>
                        <input
                            type="text"
                            value={course.deal_course || ''}
                            onChange={(e) => handleChange('deal_course', e.target.value)}
                            placeholder="e.g., Blender 3D"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Course name sent as a field in the CRM deal record
                        </p>
                    </div>

                    {/* Deal Course ID */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            <Tag className="w-4 h-4 inline mr-1" />
                            Course ID (Zoho Lookup)
                        </label>
                        <input
                            type="text"
                            value={course.deal_course_id || ''}
                            onChange={(e) => handleChange('deal_course_id', e.target.value)}
                            placeholder="e.g., 1070637000000000000"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Numeric ID for the Course lookup field in Zoho CRM
                        </p>
                    </div>
                </div>
            </section>

            {/* SEO & Metadata */}
            <section className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Tag className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">SEO & Metadata</h2>
                </div>

                <div className="space-y-6">
                    {/* Meta Title */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={course.meta_title || ''}
                            onChange={(e) => handleChange('meta_title', e.target.value)}
                            placeholder="SEO title (60 characters max)"
                            maxLength={60}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            {(course.meta_title || '').length}/60 characters
                        </p>
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Meta Description
                        </label>
                        <textarea
                            value={course.meta_description || ''}
                            onChange={(e) => handleChange('meta_description', e.target.value)}
                            placeholder="SEO description (160 characters max)"
                            maxLength={160}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            {(course.meta_description || '').length}/160 characters
                        </p>
                    </div>

                    {/* Keywords */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Keywords
                        </label>
                        <input
                            type="text"
                            value={course.keywords || ''}
                            onChange={(e) => handleChange('keywords', e.target.value)}
                            placeholder="keyword1, keyword2, keyword3"
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <p className="mt-1 text-xs text-neutral-500">
                            Separate keywords with commas
                        </p>
                    </div>
                </div>
            </section>

            {/* Status */}
            <section className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-semibold text-white">Publishing</h2>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="status"
                            value="DRAFT"
                            checked={course.status === 'DRAFT'}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-white">Draft</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="status"
                            value="PUBLISHED"
                            checked={course.status === 'PUBLISHED'}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                        />
                        <span className="text-white">Published</span>
                    </label>
                </div>
            </section>

        </div>
    );
};

export default CourseCardTab;
