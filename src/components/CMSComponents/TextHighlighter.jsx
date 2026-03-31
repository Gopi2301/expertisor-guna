import React, { useState, useRef, useEffect } from 'react';
import { Palette, Plus, X, Trash2, Eye } from 'lucide-react';

/**
 * Text Highlighting Component for CMS
 * 
 * Allows users to select text and apply color highlights
 * Features:
 * - Text selection with mouse
 * - Color picker for highlights
 * - Multiple highlights support
 * - Edit/remove highlights
 * - Live preview
 */
const TextHighlighter = ({
    text = '',
    onChange,
    placeholder = 'Enter text...',
    label = 'Text'
}) => {
    const [inputText, setInputText] = useState(text);
    const [highlights, setHighlights] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#FFF200');
    const [selectionRange, setSelectionRange] = useState(null);
    const textareaRef = useRef(null);

    const colors = [
        { name: 'Yellow', value: '#FFF200' },
        { name: 'Blue', value: '#60A5FA' },
        { name: 'Green', value: '#34D399' },
        { name: 'Red', value: '#F87171' },
        { name: 'Purple', value: '#A78BFA' },
        { name: 'Orange', value: '#FB923C' },
        { name: 'Pink', value: '#F472B6' },
        { name: 'Cyan', value: '#22D3EE' }
    ];

    // Handle text selection
    const handleTextSelect = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start !== end) {
            setSelectionRange({ start, end });
        }
    };

    // Add highlight
    const addHighlight = () => {
        if (!selectionRange) return;

        const { start, end } = selectionRange;
        const selectedText = inputText.substring(start, end);

        if (!selectedText.trim()) return;

        const newHighlight = {
            id: Date.now(),
            start,
            end,
            text: selectedText,
            color: selectedColor
        };

        const updatedHighlights = [...highlights, newHighlight].sort((a, b) => a.start - b.start);
        setHighlights(updatedHighlights);
        setSelectionRange(null);

        // Notify parent
        if (onChange) {
            onChange(inputText, updatedHighlights);
        }
    };

    // Remove highlight
    const removeHighlight = (id) => {
        const updatedHighlights = highlights.filter(h => h.id !== id);
        setHighlights(updatedHighlights);

        if (onChange) {
            onChange(inputText, updatedHighlights);
        }
    };

    // Change highlight color
    const changeHighlightColor = (id, newColor) => {
        const updatedHighlights = highlights.map(h =>
            h.id === id ? { ...h, color: newColor } : h
        );
        setHighlights(updatedHighlights);

        if (onChange) {
            onChange(inputText, updatedHighlights);
        }
    };

    // Clear all highlights
    const clearAllHighlights = () => {
        setHighlights([]);
        if (onChange) {
            onChange(inputText, []);
        }
    };

    // Handle text change
    const handleTextChange = (e) => {
        const newText = e.target.value;
        setInputText(newText);

        // Clear highlights if text changes significantly
        // In production, you'd want to adjust highlight positions
        if (newText.length < inputText.length - 10) {
            setHighlights([]);
        }

        if (onChange) {
            onChange(newText, highlights);
        }
    };

    // Render highlighted preview
    const renderPreview = () => {
        if (!inputText || highlights.length === 0) {
            return <span className="text-neutral-500">{inputText || 'No text to preview'}</span>;
        }

        let result = [];
        let lastIndex = 0;

        highlights.forEach((highlight, idx) => {
            // Add text before highlight
            if (highlight.start > lastIndex) {
                result.push(
                    <span key={`text-${idx}`} className="text-white">
                        {inputText.substring(lastIndex, highlight.start)}
                    </span>
                );
            }

            // Add highlighted text
            result.push(
                <span
                    key={`highlight-${idx}`}
                    style={{ color: highlight.color }}
                    className="font-semibold"
                >
                    {highlight.text}
                </span>
            );

            lastIndex = highlight.end;
        });

        // Add remaining text
        if (lastIndex < inputText.length) {
            result.push(
                <span key="text-end" className="text-white">
                    {inputText.substring(lastIndex)}
                </span>
            );
        }

        return result;
    };

    return (
        <div className="space-y-4">
            {/* Text Input */}
            <div>
                <label className="block text-sm text-neutral-400 mb-2">{label}</label>
                <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={handleTextChange}
                    onMouseUp={handleTextSelect}
                    onKeyUp={handleTextSelect}
                    placeholder={placeholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 resize-none"
                />
            </div>

            {/* Selection Controls */}
            {selectionRange && (
                <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-sm text-white font-medium">Selected Text</p>
                            <p className="text-xs text-neutral-500 mt-1">
                                "{inputText.substring(selectionRange.start, selectionRange.end)}"
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectionRange(null)}
                            className="p-1 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Color Picker */}
                    <div className="flex items-center gap-2 mb-3">
                        <Palette className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs text-neutral-400">Choose color:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {colors.map(color => (
                            <button
                                key={color.value}
                                onClick={() => setSelectedColor(color.value)}
                                className={`w-8 h-8 rounded-lg transition-all ${selectedColor === color.value
                                        ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110'
                                        : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                    </div>

                    <button
                        onClick={addHighlight}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Highlight
                    </button>
                </div>
            )}

            {/* Applied Highlights List */}
            {highlights.length > 0 && (
                <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm text-white font-medium">Applied Highlights ({highlights.length})</h4>
                        <button
                            onClick={clearAllHighlights}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="space-y-2">
                        {highlights.map(highlight => (
                            <div
                                key={highlight.id}
                                className="flex items-center gap-2 p-2 bg-neutral-800 rounded-lg"
                            >
                                <div
                                    className="w-4 h-4 rounded flex-shrink-0"
                                    style={{ backgroundColor: highlight.color }}
                                />
                                <span className="text-sm text-white flex-1 truncate">
                                    "{highlight.text}"
                                </span>
                                <div className="flex items-center gap-1">
                                    {/* Color change dropdown */}
                                    <select
                                        value={highlight.color}
                                        onChange={(e) => changeHighlightColor(highlight.id, e.target.value)}
                                        className="text-xs bg-neutral-700 text-white border-none rounded px-2 py-1 cursor-pointer"
                                    >
                                        {colors.map(color => (
                                            <option key={color.value} value={color.value}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeHighlight(highlight.id)}
                                        className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                                        title="Remove highlight"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Live Preview */}
            <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">Live Preview</span>
                </div>
                <p className="text-xl font-semibold leading-relaxed">
                    {renderPreview()}
                </p>
            </div>
        </div>
    );
};

export default TextHighlighter;
