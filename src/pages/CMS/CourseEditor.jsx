import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Globe } from 'lucide-react';
import { getCourse, createCourse, updateCourse, publishCourse, unpublishCourse, defaultCourseData } from '../../services/api';
import toast from 'react-hot-toast';
import CourseEditorTabs from './CourseEditorTabs';

/**
 * Course Editor - Main Container with Tabbed Interface
 */
const CourseEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const [course, setCourse] = useState({
        ...defaultCourseData,
        template_id: 'transformation-framework'
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) loadCourse();
    }, [id]);

    const loadCourse = async () => {
        try {
            const data = await getCourse(id);
            if (data) {
                setCourse(data);
            } else {
                toast.error('Course not found');
                navigate('/cms/courses');
            }
        } catch (error) {
            toast.error('Failed to load course');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!course.title?.trim()) {
            toast.error('Course title is required');
            return;
        }
        if (!course.slug?.trim()) {
            toast.error('URL slug is required');
            return;
        }

        setSaving(true);
        try {
            if (isNew) {
                const created = await createCourse(course);
                toast.success('Course created!');
                navigate(`/cms/courses/edit/${created.id}`);
            } else {
                await updateCourse(id, course);
                toast.success('Saved!');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (isNew) {
            toast.error('Save the course first');
            return;
        }
        try {
            if (course.status === 'PUBLISHED') {
                await unpublishCourse(id);
                setCourse({ ...course, status: 'DRAFT' });
                toast.success('Unpublished');
            } else {
                await publishCourse(id);
                setCourse({ ...course, status: 'PUBLISHED' });
                toast.success('Published!');
            }
        } catch (error) {
            toast.error('Failed to publish');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-neutral-800 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link to="/cms" className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5 text-neutral-400" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {isNew ? 'Create Course' : 'Edit Course'}
                            </h1>
                            <p className="text-sm text-neutral-500">Transformation Framework Template</p>
                        </div>
                        {!isNew && (
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${course.status === 'PUBLISHED'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {course.status}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {!isNew && (
                            <>
                                <a
                                    href={`/courses/${course.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </a>
                                <button
                                    onClick={handlePublish}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${course.status === 'PUBLISHED'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-neutral-800 text-white hover:bg-neutral-700'
                                        }`}
                                >
                                    <Globe className="w-4 h-4" />
                                    {course.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-white hover:bg-neutral-100 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabbed Editor */}
            <CourseEditorTabs
                course={course}
                setCourse={setCourse}
                isNew={isNew}
                saving={saving}
                onSave={handleSave}
                onPublish={handlePublish}
            />
        </div>
    );
};

export default CourseEditor;
