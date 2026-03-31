import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Type, Sparkles } from 'lucide-react';

/**
 * HeadlineBuilder - Visual editor for transformation template headlines
 * @param {Array} parts - Headline parts array
 * @param {Function} onChange - Callback when headline changes
 */
const HeadlineBuilder = ({ parts = [], onChange }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    const addPart = () => {
        onChange([...parts, { text: 'New text', highlight: false }]);
    };

    const updatePart = (index, updates) => {
        const newParts = [...parts];
        newParts[index] = { ...newParts[index], ...updates };
        onChange(newParts);
    };

    const deletePart = (index) => {
        onChange(parts.filter((_, i) => i !== index));
    };

    const toggleHighlight = (index) => {
        updatePart(index, { highlight: !parts[index].highlight });
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-300">Headline Parts</label>
                <button
                    onClick={addPart}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Part
                </button>
            </div>

            <div className="space-y-2">
                {parts.map((part, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-neutral-900 border border-neutral-800 rounded-lg group hover:border-neutral-700 transition-colors"
                    >
                        <GripVertical className="w-4 h-4 text-neutral-600 cursor-move" />

                        <input
                            type="text"
                            value={part.text}
                            onChange={(e) => updatePart(index, { text: e.target.value })}
                            onFocus={() => setEditingIndex(index)}
                            onBlur={() => setEditingIndex(null)}
                            className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                            placeholder="Enter text..."
                        />

                        <button
                            onClick={() => toggleHighlight(index)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-colors ${part.highlight
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                            title={part.highlight ? 'Remove highlight' : 'Add highlight'}
                        >
                            <Sparkles className="w-4 h-4" />
                            {part.highlight && <span className="hidden sm:inline">Highlighted</span>}
                        </button>

                        <button
                            onClick={() => deletePart(index)}
                            className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                            title="Delete part"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {parts.length === 0 && (
                    <div className="text-center py-8 text-neutral-500 text-sm">
                        No headline parts yet. Click "Add Part" to get started.
                    </div>
                )}
            </div>

            {/* Preview */}
            {parts.length > 0 && (
                <div className="mt-4 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <p className="text-xs text-neutral-500 mb-2">Preview:</p>
                    <h2 className="text-2xl font-semibold">
                        {parts.map((part, i) => (
                            <span key={i} className={part.highlight ? 'text-yellow-400' : 'text-white'}>
                                {part.text}
                            </span>
                        ))}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default HeadlineBuilder;
