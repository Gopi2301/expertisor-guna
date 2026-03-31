import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Copy, Globe, BookOpen, Search, Download, X } from 'lucide-react';
import { getAllCourses, deleteCourse, publishCourse, unpublishCourse, archiveCourse, getCategories, duplicateCourse, exportLeadsCSV, getLeads } from '../../services/api';
import BulkActionBar from '../../components/CMSComponents/BulkActionBar';
import TransformationTemplate from '../landingPages/TransformationTemplate';
import toast from 'react-hot-toast';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [previewCourse, setPreviewCourse] = useState(null);
    const [leadCount, setLeadCount] = useState(0);
    const [selected, setSelected] = useState([]);
    const [bulkActionConfirm, setBulkActionConfirm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [coursesData, categoriesData, leads] = await Promise.all([
                getAllCourses(),
                getCategories(),
                getLeads()
            ]);
            setCourses(coursesData || []);
            setCategories(categoriesData || []);
            setLeadCount(leads?.length || 0);
        } catch (error) {
            toast.error('Failed to load courses');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCourse(id);
            toast.success('Course deleted');
            setDeleteConfirm(null);
            loadData();
        } catch (error) {
            toast.error('Failed to delete course');
        }
    };

    const handlePublishToggle = async (id, currentStatus) => {
        try {
            if (currentStatus === 'PUBLISHED') {
                await unpublishCourse(id);
                toast.success('Course unpublished');
            } else {
                await publishCourse(id);
                toast.success('Course published');
            }
            loadData();
        } catch (error) {
            toast.error('Failed to update course status');
        }
    };

    const handleDuplicate = async (id) => {
        try {
            const newCourse = await duplicateCourse(id);
            toast.success('Course duplicated');
            navigate(`/cms/courses/edit/${newCourse.id}`);
        } catch (error) {
            toast.error('Failed to duplicate course');
        }
    };

    const handleExportLeads = async () => {
        try {
            const csv = await exportLeadsCSV();
            if (!csv) {
                toast.error('No leads to export');
                return;
            }
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Leads exported');
        } catch (error) {
            toast.error('Failed to export leads');
        }
    };

    const toggleSelectAll = () => {
        if (selected.length === filteredCourses.length) {
            setSelected([]);
        } else {
            setSelected(filteredCourses.map(c => c.id));
        }
    };

    const toggleSelect = (id) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const handleBulkPublish = async () => {
        try {
            await Promise.all(selected.map(id => publishCourse(id)));
            toast.success(`${selected.length} courses published`);
            setSelected([]);
            loadData();
        } catch (error) {
            toast.error('Failed to publish courses');
        }
    };

    const handleBulkArchive = async () => {
        setBulkActionConfirm({
            action: 'archive',
            message: `Archive ${selected.length} courses?`,
            onConfirm: async () => {
                try {
                    await Promise.all(selected.map(id => archiveCourse(id)));
                    toast.success(`${selected.length} courses archived`);
                    setSelected([]);
                    setBulkActionConfirm(null);
                    loadData();
                } catch (error) {
                    toast.error('Failed to archive courses');
                }
            }
        });
    };

    const handleBulkDelete = async () => {
        setBulkActionConfirm({
            action: 'delete',
            message: `Delete ${selected.length} courses permanently?`,
            onConfirm: async () => {
                try {
                    await Promise.all(selected.map(id => deleteCourse(id)));
                    toast.success(`${selected.length} courses deleted`);
                    setSelected([]);
                    setBulkActionConfirm(null);
                    loadData();
                } catch (error) {
                    toast.error('Failed to delete courses');
                }
            }
        });
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || course.category_id === parseInt(filterCategory);
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCategoryName = (categoryId) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat?.name || '-';
    };

    // Render headline with highlights for preview
    const renderHeadline = (hero) => {
        if (!hero?.headline?.parts) return 'Course Preview';
        return hero.headline.parts.map((part, index) => (
            <span key={index} className={part.highlight ? 'text-yellow' : ''}>
                {part.text}
            </span>
        ));
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Courses</h1>
                    <p className="text-neutral-400 mt-1">
                        {courses.length} total • {courses.filter(c => c.status === 'PUBLISHED').length} published
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {leadCount > 0 && (
                        <button
                            onClick={handleExportLeads}
                            className="flex items-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            Export {leadCount} Leads
                        </button>
                    )}
                    <Link
                        to="/cms/courses/new"
                        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Course
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#111] border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                        />
                    </div>
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-[#111] border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                    <option value="all">All Status</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="ARCHIVED">Archived</option>
                </select>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 bg-[#111] border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Course Table */}
            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 bg-[#111] rounded-2xl border border-neutral-800">
                    <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                    <p className="text-neutral-400 mb-6">
                        {courses.length === 0 ? 'Create your first course to get started' : 'Try adjusting your filters'}
                    </p>
                    {courses.length === 0 && (
                        <Link
                            to="/cms/courses/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Create Course
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-800">
                                <th className="w-12 px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.length === filteredCourses.length && filteredCourses.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 checked:bg-yellow-400 checked:border-yellow-400"
                                    />
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Course</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Category</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-400">Updated</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className="border-b border-neutral-800 hover:bg-neutral-900/50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(course.id)}
                                            onChange={() => toggleSelect(course.id)}
                                            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 checked:bg-yellow-400 checked:border-yellow-400"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center overflow-hidden">
                                                {course.thumbnail ? (
                                                    <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <BookOpen className="w-6 h-6 text-neutral-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{course.title}</p>
                                                <p className="text-sm text-neutral-500">/{course.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-400">
                                        {getCategoryName(course.category_id)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' :
                                            course.status === 'SCHEDULED' ? 'bg-blue-500/20 text-blue-400' :
                                                course.status === 'ARCHIVED' ? 'bg-neutral-500/20 text-neutral-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-400 text-sm">
                                        {formatDate(course.updated_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/cms/courses/edit/${course.id}`}
                                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => setPreviewCourse(course)}
                                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                                title="Preview"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDuplicate(course.id)}
                                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                                title="Duplicate"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePublishToggle(course.id, course.status)}
                                                className={`p-2 rounded-lg transition-colors ${course.status === 'PUBLISHED'
                                                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                                                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                                                    }`}
                                                title={course.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                                            >
                                                <Globe className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(course.id)}
                                                className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Course?</h2>
                        <p className="text-neutral-400 mb-6">
                            This action cannot be undone. The course will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Course Preview Modal */}
            {previewCourse && (
                <div className="fixed inset-0 bg-black/95 z-50 overflow-auto">
                    {/* Close Button */}
                    <button
                        onClick={() => setPreviewCourse(null)}
                        className="fixed top-4 right-4 p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full z-[60]"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Preview Header Bar */}
                    <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur border-b border-neutral-800 z-[55] px-4 py-3">
                        <div className="flex items-center justify-between max-w-4xl mx-auto">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${previewCourse.status === 'PUBLISHED'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {previewCourse.status}
                                </span>
                                <span className="text-neutral-500">/{previewCourse.slug}</span>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/cms/courses/edit/${previewCourse.id}`}
                                    className="px-4 py-2 bg-white hover:bg-neutral-100 text-black font-semibold rounded-lg transition-colors"
                                >
                                    Edit Course
                                </Link>
                                <a
                                    href={`/courses/${previewCourse.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                >
                                    Open Live
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Actual Template Preview */}
                    <div className="pt-16">
                        <TransformationTemplate
                            heading={{
                                parts: previewCourse.hero_data?.headline?.parts || [
                                    { text: previewCourse.title || 'Course Title', highlight: false }
                                ]
                            }}
                            guarantee={{
                                text: previewCourse.hero_data?.guarantee || "If you don't get results, I'll work with you again for free until you get results."
                            }}
                            video={{
                                thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                                embedUrl: previewCourse.hero_data?.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                            }}
                            ctas={{
                                primary: {
                                    text: previewCourse.hero_data?.buttons?.primary?.text || 'Apply Now',
                                    action: 'openModal'
                                },
                                secondary: {
                                    text: previewCourse.hero_data?.buttons?.secondary?.text || 'Download Brochure',
                                    url: previewCourse.hero_data?.buttons?.secondary?.url || '',
                                    type: previewCourse.hero_data?.buttons?.secondary?.type || 'link',
                                    fileName: previewCourse.hero_data?.buttons?.secondary?.fileName
                                }
                            }}
                            form={{
                                title: previewCourse.form_data?.title || 'STRUGGLING to figure it out alone?',
                                subtitle: previewCourse.form_data?.subtitle || 'Get Expert 1:1 Guidance',
                                fields: [
                                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
                                    { name: 'email', label: 'Email', type: 'email', placeholder: 'yourname@gmail.com', required: true },
                                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter WhatsApp Number', required: true }
                                ],
                                submitButton: previewCourse.form_data?.submit_text || 'Get Fast Help',
                                formAction: ''
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Bulk Action Bar */}
            <BulkActionBar
                selectedCount={selected.length}
                onPublish={handleBulkPublish}
                onArchive={handleBulkArchive}
                onDelete={handleBulkDelete}
                onClear={() => setSelected([])}
            />

            {/* Bulk Action Confirmation */}
            {bulkActionConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Confirm Action</h2>
                        <p className="text-neutral-400 mb-6">{bulkActionConfirm.message}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setBulkActionConfirm(null)}
                                className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={bulkActionConfirm.onConfirm}
                                className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-colors ${bulkActionConfirm.action === 'delete'
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseList;
