import React, { useState } from 'react';
import {
    Eye,
    Gift,
    Video,
    MousePointerClick,
    FileText,
    ChevronDown,
    ChevronUp,
    Layout
} from 'lucide-react';
import HeroEditor from './TemplateEditors/HeroEditor';
import GuaranteeEditor from './TemplateEditors/GuaranteeEditor';
import VideoEditor from './TemplateEditors/VideoEditor';
import CTAEditor from './TemplateEditors/CTAEditor';
import FormEditor from './TemplateEditors/FormEditor';
import LifeTransformationEditor from './TemplateEditors/LifeTransformationEditor';
import FullCourseEditor from './TemplateEditors/FullCourseEditor';


/**
 * Template Editor Panel - CLEANED UP
 */
const TemplateEditorPanel = ({ course, setCourse }) => {
    const [expandedSections, setExpandedSections] = useState({
        template: true,
        hero: true,
        guarantee: false,
        video: false,
        cta: false,
        form: false,
        template2: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleTemplateChange = (templateId) => {
        setCourse(prev => ({
            ...prev,
            template_id: templateId
        }));
    };

    const template1Sections = [
        { id: 'hero', label: 'Hero Section', icon: Eye, component: HeroEditor },
        { id: 'guarantee', label: 'Guarantee Badge', icon: Gift, component: GuaranteeEditor },
        { id: 'video', label: 'Video Section', icon: Video, component: VideoEditor },
        { id: 'cta', label: 'CTA Buttons', icon: MousePointerClick, component: CTAEditor },
        { id: 'form', label: 'Lead Form', icon: FileText, component: FormEditor }
    ];

    const currentTemplate = course.template_id || 'transformation-framework';

    return (
        <div className="p-6 space-y-4">
            {/* Template Selection */}
            <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                <button
                    onClick={() => toggleSection('template')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Layout className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-base font-semibold text-white">Template Selection</h3>
                    </div>
                    {expandedSections.template ? (
                        <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                </button>

                {expandedSections.template && (
                    <div className="px-6 py-4 border-t border-neutral-800">
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Choose Template
                        </label>
                        <select
                            value={currentTemplate}
                            onChange={(e) => handleTemplateChange(e.target.value)}
                            className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors"
                        >
                            <option value="transformation-framework">Template 1: Transformation Framework</option>
                            <option value="life-transformation">Template 2: Life Transformation</option>
                            <option value="simple-elite">Template 3: Simple Elite</option>
                            <option value="full-course">Template 4: Full Course Template</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Template 1 Editors */}
            {currentTemplate === 'transformation-framework' && (
                <>
                    {template1Sections.map(({ id, label, icon: Icon, component: Component }) => (
                        <div key={id} className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                            <button
                                onClick={() => toggleSection(id)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-yellow-400" />
                                    <h3 className="text-base font-semibold text-white">{label}</h3>
                                </div>
                                {expandedSections[id] ? (
                                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                                )}
                            </button>

                            {expandedSections[id] && (
                                <div className="px-6 py-4 border-t border-neutral-800">
                                    <Component course={course} setCourse={setCourse} />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Template 2 Editor - FRESH */}
            {currentTemplate === 'life-transformation' && (
                <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                    <button
                        onClick={() => toggleSection('template2')}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Layout className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-base font-semibold text-white">Template 2 Configuration</h3>
                        </div>
                        {expandedSections.template2 ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>

                    {expandedSections.template2 && (
                        <div className="px-6 py-4 border-t border-neutral-800">
                            <LifeTransformationEditor
                                course={course}
                                updateCourse={setCourse}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Template 3 Editor - Simple Elite */}
            {currentTemplate === 'simple-elite' && (
                <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                    <button
                        onClick={() => toggleSection('template3')}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Layout className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-base font-semibold text-white">Template 3 Configuration</h3>
                        </div>
                        {expandedSections.template3 ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>

                    {expandedSections.template3 && (
                        <div className="px-6 py-4 border-t border-neutral-800">
                            <LifeTransformationEditor
                                course={course}
                                updateCourse={setCourse}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Template 4 Editor - Full Course */}
            {currentTemplate === 'full-course' && (
                <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                    <button
                        onClick={() => toggleSection('template4')}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Layout className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-base font-semibold text-white">Template 4 Configuration</h3>
                        </div>
                        {expandedSections.template4 ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                    </button>

                    {expandedSections.template4 && (
                        <div className="px-6 py-4 border-t border-neutral-800">
                            <FullCourseEditor
                                course={course}
                                updateCourse={setCourse}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TemplateEditorPanel;
