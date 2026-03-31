import React, { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import TransformationTemplate from '../landingPages/TransformationTemplate';
import LifeTransformationTemplate from '../landingPages/LifeTransformationTemplate';
import Simple_elite_temp from '../landingPages/Simple_elite_temp';
import FullCourseTemplate from '../landingPages/FullCourseTemplate';
import TemplateEditorPanel from './TemplateEditorPanel';

/**
 * Template Tab - Split View - CLEANED UP
 */
const TemplateTab = ({ course, setCourse }) => {
    const [previewDevice, setPreviewDevice] = useState('desktop');

    return (
        <div className="flex min-h-screen">
            {/* Editor Panel - Left Side */}
            <div className="w-2/5 border-r border-neutral-800 overflow-y-auto bg-[#0a0a0a] relative z-[60]">
                <TemplateEditorPanel course={course} setCourse={setCourse} />
            </div>

            {/* Preview Panel - Right Side */}
            <div className="flex-1 bg-neutral-900 overflow-y-auto">
                {/* Preview Controls */}
                <div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-neutral-400">Live Preview</h3>

                        <div className="flex items-center gap-2 bg-neutral-800 rounded-lg p-1">
                            <button
                                onClick={() => setPreviewDevice('desktop')}
                                className={`px - 3 py - 1.5 rounded flex items - center gap - 2 text - sm transition - colors ${previewDevice === 'desktop'
                                    ? 'bg-neutral-700 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    } `}
                            >
                                <Monitor className="w-4 h-4" />
                                Desktop
                            </button>
                            <button
                                onClick={() => setPreviewDevice('mobile')}
                                className={`px - 3 py - 1.5 rounded flex items - center gap - 2 text - sm transition - colors ${previewDevice === 'mobile'
                                    ? 'bg-neutral-700 text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    } `}
                            >
                                <Smartphone className="w-4 h-4" />
                                Mobile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Content */}
                <div className={`${previewDevice === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full'} `}>
                    {/* Template 1 */}
                    {(!course.template_id || course.template_id === 'transformation-framework') && (
                        <TransformationTemplate
                            heading={course.hero_data?.headline || { parts: [] }}
                            guarantee={course.hero_data?.guarantee || "If you don't get results, I'll work with you again for free until you get results."}
                            video={{
                                embedUrl: course.hero_data?.video?.embedUrl || course.hero_data?.video_url || '',
                                thumbnail: course.hero_data?.video?.thumbnail || '/src/assets/images/video-overlay.png'
                            }}
                            ctas={{
                                primary: course.hero_data?.buttons?.primary || { text: 'Apply Now', action: 'openModal' },
                                secondary: course.hero_data?.buttons?.secondary || { text: 'Download Brochure', enabled: false }
                            }}
                            form={course.form_data || {}}
                            badge={course.hero_data?.badge}
                            backgroundImage={course.background_image}
                        />
                    )}

                    {/* Template 2 - FRESH */}
                    {course.template_id === 'life-transformation' && (
                        <LifeTransformationTemplate
                            heading={course.hero_data?.headline || { parts: [] }}
                            guarantee={course.hero_data?.guarantee || ""}
                            video={{
                                youtubeUrl: course.hero_data?.video?.youtubeUrl || '',
                                youtubeId: course.hero_data?.video?.youtubeId || '',
                                customThumbnail: course.hero_data?.video?.customThumbnail || '',
                                description: course.hero_data?.video?.description || ''
                            }}
                            features={course.hero_data?.features || { title: '', items: [] }}
                            ctas={{
                                primary: course.hero_data?.buttons?.primary || { text: 'Apply Now', action: 'openModal' },
                                secondary: course.hero_data?.buttons?.secondary || { text: 'Download Brochure', enabled: false }
                            }}
                            form={course.form_data || {}}
                            backgroundImage={course.background_image}
                        />
                    )}

                    {/* Template 3 - Simple Elite */}
                    {course.template_id === 'simple-elite' && (
                        <Simple_elite_temp
                            heading={course.hero_data?.headline || { parts: [] }}
                            guarantee={course.hero_data?.guarantee || "If you don't get results, I'll work with you again for free until you get results."}
                            video={{
                                youtubeUrl: course.hero_data?.video?.youtubeUrl || '',
                                youtubeId: course.hero_data?.video?.youtubeId || '',
                                customThumbnail: course.hero_data?.video?.customThumbnail || ''
                            }}
                            ctas={{
                                primary: course.hero_data?.buttons?.primary || { text: 'Apply Now', action: 'openModal' },
                                secondary: course.hero_data?.buttons?.secondary || { text: 'Download Brochure', enabled: false }
                            }}
                            form={course.form_data || {}}
                        />
                    )}

                    {/* Template 4 - Full Course */}
                    {course.template_id === 'full-course' && (
                        <FullCourseTemplate data={course.template_data || {}} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTab;
