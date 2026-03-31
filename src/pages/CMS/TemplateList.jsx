import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, Copy, Globe, FileText, Download, Upload } from 'lucide-react';
import { getTemplates, createTemplate, deleteTemplate, publishTemplate, unpublishTemplate, duplicateTemplate, exportTemplatesAsJSON, importTemplatesFromJSON } from '../../utils/cmsStorage';
import toast from 'react-hot-toast';

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = () => {
        setTemplates(getTemplates());
    };

    const handleCreate = () => {
        if (!newTemplateName.trim()) {
            toast.error('Please enter a template name');
            return;
        }
        const template = createTemplate(newTemplateName.trim());
        toast.success('Template created successfully');
        setNewTemplateName('');
        setShowCreateModal(false);
        navigate(`/cms/edit/${template.id}`);
    };

    const handleDelete = (id) => {
        deleteTemplate(id);
        toast.success('Template deleted');
        setDeleteConfirm(null);
        loadTemplates();
    };

    const handlePublish = (id, currentStatus) => {
        if (currentStatus === 'published') {
            unpublishTemplate(id);
            toast.success('Template unpublished');
        } else {
            publishTemplate(id);
            toast.success('Template published');
        }
        loadTemplates();
    };

    const handleDuplicate = (id) => {
        const newTemplate = duplicateTemplate(id);
        if (newTemplate) {
            toast.success('Template duplicated');
            loadTemplates();
        }
    };

    const handleExport = () => {
        const count = exportTemplatesAsJSON();
        if (count > 0) {
            toast.success(`Exported ${count} published template(s). Save to /public folder for production.`);
        } else {
            toast.error('No published templates to export. Publish templates first.');
        }
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const count = importTemplatesFromJSON(e.target.result);
            if (count > 0) {
                toast.success(`Imported ${count} template(s)`);
                loadTemplates();
            } else {
                toast.error('Failed to import templates');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const publishedCount = templates.filter(t => t.status === 'published').length;

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Templates</h1>
                    <p className="text-neutral-400 mt-1">Manage your landing page templates</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium rounded-lg transition-colors"
                        title="Export published templates as JSON for production"
                    >
                        <Download className="w-5 h-5" />
                        Export ({publishedCount})
                    </button>

                    {/* Import Button */}
                    <label className="flex items-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
                        <Upload className="w-5 h-5" />
                        Import
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                    </label>

                    {/* New Template Button */}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Template
                    </button>
                </div>
            </div>

            {/* Templates Grid */}
            {templates.length === 0 ? (
                <div className="text-center py-20 bg-[#111] rounded-2xl border border-neutral-800">
                    <FileText className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No templates yet</h3>
                    <p className="text-neutral-400 mb-6">Create your first landing page template to get started</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create Template
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors"
                        >
                            {/* Preview Thumbnail */}
                            <div className="h-40 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative">
                                <FileText className="w-12 h-12 text-neutral-600" />
                                {/* Status Badge */}
                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${template.status === 'published'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                        }`}
                                >
                                    {template.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-1 truncate">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-neutral-400 mb-1">
                                    /{template.slug}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Updated {formatDate(template.updatedAt)}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="p-4 pt-0 flex gap-2">
                                <Link
                                    to={`/cms/edit/${template.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-sm"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </Link>
                                <Link
                                    to={`/cms/preview/${template.id}`}
                                    className="flex items-center justify-center px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                    title="Preview"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => handleDuplicate(template.id)}
                                    className="flex items-center justify-center px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                    title="Duplicate"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handlePublish(template.id, template.status)}
                                    className={`flex items-center justify-center px-3 py-2 rounded-lg transition-colors ${template.status === 'published'
                                        ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                                        }`}
                                    title={template.status === 'published' ? 'Unpublish' : 'Publish'}
                                >
                                    <Globe className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm(template.id)}
                                    className="flex items-center justify-center px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
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
                        <h2 className="text-xl font-bold text-white mb-4">Create New Template</h2>
                        <input
                            type="text"
                            value={newTemplateName}
                            onChange={(e) => setNewTemplateName(e.target.value)}
                            placeholder="Template name"
                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 mb-4"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewTemplateName('');
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

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Template?</h2>
                        <p className="text-neutral-400 mb-6">
                            This action cannot be undone. The template will be permanently deleted.
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

export default TemplateList;
