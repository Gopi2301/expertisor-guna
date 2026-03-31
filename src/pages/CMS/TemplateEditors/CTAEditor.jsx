import React from 'react';
import { Upload } from 'lucide-react';

/**
 * CTA Buttons Editor
 */
const CTAEditor = ({ course, setCourse }) => {
    const heroData = course.hero_data || {};
    const buttons = heroData.buttons || {};

    const updateButton = (buttonType, field, value) => {
        setCourse(prev => ({
            ...prev,
            hero_data: {
                ...prev.hero_data,
                buttons: {
                    ...prev.hero_data?.buttons,
                    [buttonType]: {
                        ...prev.hero_data?.buttons?.[buttonType],
                        [field]: value
                    }
                }
            }
        }));
    };

    return (
        <div className="space-y-6">

            {/* Primary Button */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Primary Button (Yellow)</h4>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Button Text
                    </label>
                    <input
                        type="text"
                        value={buttons.primary?.text || ''}
                        onChange={(e) => updateButton('primary', 'text', e.target.value)}
                        placeholder="Apply Now"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Action
                    </label>
                    <select
                        value={buttons.primary?.action || 'openModal'}
                        onChange={(e) => updateButton('primary', 'action', e.target.value)}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                    >
                        <option value="openModal">Open Application Modal</option>
                        <option value="link">Navigate to URL</option>
                    </select>
                </div>

                {buttons.primary?.action === 'link' && (
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            URL
                        </label>
                        <input
                            type="url"
                            value={buttons.primary?.url || ''}
                            onChange={(e) => updateButton('primary', 'url', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                        />
                    </div>
                )}
            </div>

            {/* Secondary Button */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Secondary Button (Gray)</h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={buttons.secondary?.enabled !== false}
                            onChange={(e) => updateButton('secondary', 'enabled', e.target.checked)}
                            className="w-4 h-4 text-yellow-400 rounded focus:ring-yellow-400"
                        />
                        <span className="text-sm text-neutral-400">Enabled</span>
                    </label>
                </div>

                {buttons.secondary?.enabled !== false && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">
                                Button Text
                            </label>
                            <input
                                type="text"
                                value={buttons.secondary?.text || ''}
                                onChange={(e) => updateButton('secondary', 'text', e.target.value)}
                                placeholder="Download Brochure"
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">
                                Type
                            </label>
                            <select
                                value={buttons.secondary?.type || 'link'}
                                onChange={(e) => updateButton('secondary', 'type', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            >
                                <option value="link">External Link</option>
                                <option value="file">File Download</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">
                                {buttons.secondary?.type === 'file' ? 'File URL' : 'URL'}
                            </label>
                            <input
                                type="url"
                                value={buttons.secondary?.url || ''}
                                onChange={(e) => updateButton('secondary', 'url', e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                            />
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default CTAEditor;
