import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, FolderOpen } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/api';
import toast from 'react-hot-toast';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data || []);
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!categoryName.trim()) {
            toast.error('Please enter a category name');
            return;
        }
        try {
            await createCategory(categoryName.trim());
            toast.success('Category created');
            setCategoryName('');
            setShowCreateModal(false);
            loadCategories();
        } catch (error) {
            toast.error('Failed to create category');
        }
    };

    const handleUpdate = async () => {
        if (!categoryName.trim()) {
            toast.error('Please enter a category name');
            return;
        }

        const trimmedName = categoryName.trim();
        const originalCategories = [...categories];
        const categoryId = editingCategory.id;

        // Generate slug from name
        const newSlug = trimmedName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Optimistic update - apply immediately
        setCategories(prev => prev.map(cat =>
            cat.id === categoryId
                ? { ...cat, name: trimmedName, slug: newSlug }
                : cat
        ));

        // Close modal immediately for better UX
        setCategoryName('');
        setEditingCategory(null);

        try {
            const result = await updateCategory(categoryId, { name: trimmedName });
            if (!result) {
                throw new Error('Update returned null');
            }
            toast.success('Category updated');
        } catch (error) {
            // Revert on failure
            setCategories(originalCategories);
            console.error('Category update error:', error);
            toast.error(error.message || 'Failed to update category');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            toast.success('Category deleted');
            setDeleteConfirm(null);
            loadCategories();
        } catch (error) {
            toast.error(error.message || 'Failed to delete category');
        }
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        setCategoryName(category.name);
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Categories</h1>
                    <p className="text-neutral-400 mt-1">Organize your courses into categories</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Category
                </button>
            </div>

            {/* Categories List */}
            {categories.length === 0 ? (
                <div className="text-center py-20 bg-[#111] rounded-2xl border border-neutral-800">
                    <FolderOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No categories yet</h3>
                    <p className="text-neutral-400 mb-6">Create categories to organize your courses</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create Category
                    </button>
                </div>
            ) : (
                <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={`flex items-center justify-between px-6 py-4 ${index !== categories.length - 1 ? 'border-b border-neutral-800' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                                    <FolderOpen className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{category.name}</p>
                                    <p className="text-sm text-neutral-500">
                                        /{category.slug} • {category.course_count || 0} courses
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEditModal(category)}
                                    className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(category.id)}
                                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-4">New Category</h2>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Category name"
                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 mb-4"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setCategoryName('');
                                }}
                                className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex-1 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingCategory && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Edit Category</h2>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Category name"
                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 mb-4"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setEditingCategory(null);
                                    setCategoryName('');
                                }}
                                className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="flex-1 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Category?</h2>
                        <p className="text-neutral-400 mb-6">
                            Categories with courses cannot be deleted. Move or delete courses first.
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
        </div>
    );
};

export default CategoryManager;
