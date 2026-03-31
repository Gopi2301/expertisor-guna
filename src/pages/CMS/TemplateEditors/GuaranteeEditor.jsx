import React from 'react';

/**
 * Guarantee Badge Editor
 */
const GuaranteeEditor = ({ course, setCourse }) => {
    const heroData = course.hero_data || {};
    const guarantee = heroData.guarantee || {};

    const updateGuarantee = (value) => {
        setCourse(prev => ({
            ...prev,
            hero_data: {
                ...prev.hero_data,
                guarantee: value
            }
        }));
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Guarantee Text
                </label>
                <textarea
                    value={guarantee.text || guarantee || ''}
                    onChange={(e) => updateGuarantee(e.target.value)}
                    placeholder="If you don't get results, I'll work with you again for free until you get results."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 resize-none"
                />
                <p className="mt-2 text-xs text-neutral-500">
                    💡 The word "free" will be automatically highlighted in yellow
                </p>
            </div>
        </div>
    );
};

export default GuaranteeEditor;
