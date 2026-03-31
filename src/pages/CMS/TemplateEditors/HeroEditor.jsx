import React from 'react';
import { Plus, X, Highlighter, CornerDownRight, Trash2 } from 'lucide-react';

/**
 * Hero Section Editor
 * Edit badge, headline parts, and subheadline
 */
const HeroEditor = ({ course, setCourse }) => {
    const heroData = course.hero_data || {};
    const headline = heroData.headline || { parts: [] };

    const updateHeroData = (field, value) => {
        setCourse(prev => ({
            ...prev,
            hero_data: {
                ...prev.hero_data,
                [field]: value
            }
        }));
    };

    const updateHeadline = (updates) => {
        updateHeroData('headline', {
            ...headline,
            ...updates
        });
    };

    const addHeadlinePart = () => {
        const newParts = [...(headline.parts || []), { text: '', highlight: false }];
        updateHeadline({ parts: newParts });
    };

    const updateHeadlinePart = (index, field, value) => {
        const newParts = [...(headline.parts || [])];
        newParts[index] = { ...newParts[index], [field]: value };
        updateHeadline({ parts: newParts });
    };

    const removeHeadlinePart = (index) => {
        const newParts = headline.parts.filter((_, i) => i !== index);
        updateHeadline({ parts: newParts });
    };

    const toggleHighlight = (index) => {
        updateHeadlinePart(index, 'highlight', !headline.parts[index].highlight);
    };

    return (
        <div className="space-y-6">

            {/* Headline Parts */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-neutral-400">
                        Headline Parts
                    </label>
                    <button
                        onClick={addHeadlinePart}
                        className="flex items-center gap-1 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Part
                    </button>
                </div>

                <div className="space-y-3">
                    {(headline.parts || []).map((part, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <input
                                type="text"
                                value={part.text}
                                onChange={(e) => updateHeadlinePart(index, 'text', e.target.value)}
                                placeholder="Enter text..."
                                className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                            />

                            <button
                                onClick={() => toggleHighlight(index)}
                                className={`p-2 rounded-lg transition-colors ${part.highlight
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                    }`}
                                title="Toggle Highlight"
                            >
                                <Highlighter className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => removeHeadlinePart(index)}
                                className="p-2 bg-neutral-800 hover:bg-red-900/50 text-neutral-400 hover:text-red-400 rounded-lg transition-colors"
                                title="Remove Part"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {headline.parts?.length === 0 && (
                    <p className="text-sm text-neutral-500 text-center py-4">
                        No headline parts added. Click "Add Part" to start.
                    </p>
                )}
            </div>

        </div>
    );
};

export default HeroEditor;
