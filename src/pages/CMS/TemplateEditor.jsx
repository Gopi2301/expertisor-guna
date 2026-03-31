import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Globe, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getTemplate, updateTemplate, publishTemplate, unpublishTemplate, deleteTemplate } from '../../utils/cmsStorage';
import toast from 'react-hot-toast';

const TemplateEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState(null);
    const [expandedSections, setExpandedSections] = useState({ hero: true, form: true });
    const [hasChanges, setHasChanges] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        const loaded = getTemplate(id);
        if (!loaded) {
            toast.error('Template not found');
            navigate('/cms');
            return;
        }
        setTemplate(loaded);
    }, [id, navigate]);

    const handleSave = useCallback(() => {
        if (!template) return;
        updateTemplate(id, { sections: template.sections, name: template.name });
        toast.success('Template saved');
        setHasChanges(false);
    }, [id, template]);

    const handlePublish = () => {
        if (template.status === 'published') {
            unpublishTemplate(id);
            setTemplate(prev => ({ ...prev, status: 'draft' }));
            toast.success('Template unpublished');
        } else {
            handleSave();
            publishTemplate(id);
            setTemplate(prev => ({ ...prev, status: 'published' }));
            toast.success('Template published! View at /courses/' + template.slug);
        }
    };

    const handleDelete = () => {
        deleteTemplate(id);
        toast.success('Template deleted');
        navigate('/cms');
    };

    const updateSection = (section, key, value) => {
        setTemplate(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: {
                    ...prev.sections[section],
                    [key]: value
                }
            }
        }));
        setHasChanges(true);
    };

    const updateNestedSection = (section, parentKey, key, value) => {
        setTemplate(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: {
                    ...prev.sections[section],
                    [parentKey]: {
                        ...prev.sections[section][parentKey],
                        [key]: value
                    }
                }
            }
        }));
        setHasChanges(true);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (!template) {
        return (
            <div className="p-8 text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#111] border-b border-neutral-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/cms"
                            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-400" />
                        </Link>
                        <div>
                            <input
                                type="text"
                                value={template.name}
                                onChange={(e) => {
                                    setTemplate(prev => ({ ...prev, name: e.target.value }));
                                    setHasChanges(true);
                                }}
                                className="text-xl font-bold text-white bg-transparent border-none outline-none focus:ring-1 focus:ring-yellow-400 rounded px-2 py-1 -mx-2"
                            />
                            <p className="text-sm text-neutral-400 mt-1">
                                /{template.slug}
                                <span className={`ml-3 px-2 py-0.5 rounded text-xs ${template.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {template.status}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to={`/cms/preview/${id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${hasChanges
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                }`}
                        >
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>
                        <button
                            onClick={handlePublish}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${template.status === 'published'
                                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                                : 'bg-yellow-400 hover:bg-yellow-500 text-black font-semibold'
                                }`}
                        >
                            <Globe className="w-4 h-4" />
                            {template.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Editor Content */}
            <div className="p-6 max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="bg-[#111] rounded-xl border border-neutral-800 mb-6 overflow-hidden">
                    <button
                        onClick={() => toggleSection('hero')}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-800/50 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white">Hero Section</h2>
                        {expandedSections.hero ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>

                    {expandedSections.hero && (
                        <div className="p-4 pt-0 space-y-4">
                            {/* Badge */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Badge Emoji</label>
                                    <input
                                        type="text"
                                        value={template.sections.hero.badge.emoji}
                                        onChange={(e) => updateNestedSection('hero', 'badge', 'emoji', e.target.value)}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Badge Text</label>
                                    <input
                                        type="text"
                                        value={template.sections.hero.badge.text}
                                        onChange={(e) => updateNestedSection('hero', 'badge', 'text', e.target.value)}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Headline Parts */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Headline (Edit parts below)</label>
                                <div className="space-y-2">
                                    {template.sections.hero.headline.parts.map((part, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                value={part.text}
                                                onChange={(e) => {
                                                    const newParts = [...template.sections.hero.headline.parts];
                                                    newParts[index] = { ...newParts[index], text: e.target.value };
                                                    updateNestedSection('hero', 'headline', 'parts', newParts);
                                                }}
                                                className={`flex-1 px-4 py-2 bg-neutral-900 border rounded-lg focus:outline-none ${part.highlight
                                                    ? 'border-yellow-500 text-yellow-400'
                                                    : 'border-neutral-700 text-white'
                                                    } focus:border-yellow-400`}
                                            />
                                            <label className="flex items-center gap-2 text-sm text-neutral-400">
                                                <input
                                                    type="checkbox"
                                                    checked={part.highlight}
                                                    onChange={(e) => {
                                                        const newParts = [...template.sections.hero.headline.parts];
                                                        newParts[index] = { ...newParts[index], highlight: e.target.checked };
                                                        updateNestedSection('hero', 'headline', 'parts', newParts);
                                                    }}
                                                    className="rounded bg-neutral-800 border-neutral-600"
                                                />
                                                Highlight
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subheadline */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Subheadline</label>
                                <textarea
                                    value={template.sections.hero.subheadline}
                                    onChange={(e) => updateSection('hero', 'subheadline', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 resize-none"
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Background Video URL</label>
                                <input
                                    type="text"
                                    value={template.sections.hero.video.url}
                                    onChange={(e) => updateNestedSection('hero', 'video', 'url', e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    placeholder="/videos/Background.webm"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Primary Button Text</label>
                                    <input
                                        type="text"
                                        value={template.sections.hero.buttons.primary.text}
                                        onChange={(e) => {
                                            const buttons = { ...template.sections.hero.buttons };
                                            buttons.primary = { ...buttons.primary, text: e.target.value };
                                            updateSection('hero', 'buttons', buttons);
                                        }}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Secondary Button Text</label>
                                    <input
                                        type="text"
                                        value={template.sections.hero.buttons.secondary.text}
                                        onChange={(e) => {
                                            const buttons = { ...template.sections.hero.buttons };
                                            buttons.secondary = { ...buttons.secondary, text: e.target.value };
                                            updateSection('hero', 'buttons', buttons);
                                        }}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Feature Badges</label>
                                <div className="space-y-2">
                                    {template.sections.hero.features.map((feature, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={feature.text}
                                            onChange={(e) => {
                                                const features = [...template.sections.hero.features];
                                                features[index] = { ...features[index], text: e.target.value };
                                                updateSection('hero', 'features', features);
                                            }}
                                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                <div className="bg-[#111] rounded-xl border border-neutral-800 mb-6 overflow-hidden">
                    <button
                        onClick={() => toggleSection('form')}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-800/50 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-white">Form Modal</h2>
                        {expandedSections.form ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>

                    {expandedSections.form && (
                        <div className="p-4 pt-0 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Form Title</label>
                                    <input
                                        type="text"
                                        value={template.sections.form.title}
                                        onChange={(e) => updateSection('form', 'title', e.target.value)}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-2">Submit Button Text</label>
                                    <input
                                        type="text"
                                        value={template.sections.form.submitButton}
                                        onChange={(e) => updateSection('form', 'submitButton', e.target.value)}
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Form Subtitle</label>
                                <input
                                    type="text"
                                    value={template.sections.form.subtitle}
                                    onChange={(e) => updateSection('form', 'subtitle', e.target.value)}
                                    className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                />
                            </div>



                            {/* Form Fields */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Form Fields</label>
                                <div className="space-y-3">
                                    {template.sections.form.fields.map((field, index) => (
                                        <div key={index} className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                                            <div className="grid grid-cols-2 gap-3 mb-2">
                                                <input
                                                    type="text"
                                                    value={field.label}
                                                    onChange={(e) => {
                                                        const fields = [...template.sections.form.fields];
                                                        fields[index] = { ...fields[index], label: e.target.value };
                                                        updateSection('form', 'fields', fields);
                                                    }}
                                                    placeholder="Label"
                                                    className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:border-yellow-400"
                                                />
                                                <input
                                                    type="text"
                                                    value={field.placeholder}
                                                    onChange={(e) => {
                                                        const fields = [...template.sections.form.fields];
                                                        fields[index] = { ...fields[index], placeholder: e.target.value };
                                                        updateSection('form', 'fields', fields);
                                                    }}
                                                    placeholder="Placeholder"
                                                    className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:border-yellow-400"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <label className="flex items-center gap-2 text-neutral-400">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.required}
                                                        onChange={(e) => {
                                                            const fields = [...template.sections.form.fields];
                                                            fields[index] = { ...fields[index], required: e.target.checked };
                                                            updateSection('form', 'fields', fields);
                                                        }}
                                                        className="rounded bg-neutral-800 border-neutral-600"
                                                    />
                                                    Required
                                                </label>
                                                <select
                                                    value={field.type}
                                                    onChange={(e) => {
                                                        const fields = [...template.sections.form.fields];
                                                        fields[index] = { ...fields[index], type: e.target.value };
                                                        updateSection('form', 'fields', fields);
                                                    }}
                                                    className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:outline-none"
                                                >
                                                    <option value="text">Text</option>
                                                    <option value="email">Email</option>
                                                    <option value="tel">Phone</option>
                                                    <option value="select">Dropdown</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Danger Zone */}
                <div className="bg-red-500/10 rounded-xl border border-red-500/30 p-4">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-neutral-400 mb-4">
                        Once you delete a template, there is no going back. Please be certain.
                    </p>
                    <button
                        onClick={() => setDeleteConfirm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Template
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111] rounded-2xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Template?</h2>
                        <p className="text-neutral-400 mb-6">
                            This action cannot be undone. The template "{template.name}" will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(false)}
                                className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
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

export default TemplateEditor;
