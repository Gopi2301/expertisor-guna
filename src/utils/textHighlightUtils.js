/**
 * Text Highlight Utilities
 * Helper functions for managing text highlights
 */

/**
 * Apply highlights to text and return React elements
 * @param {string} text - The text to highlight
 * @param {Array} highlights - Array of highlight objects {start, end, color}
 * @returns {Array} Array of React elements
 */
export const applyHighlights = (text, highlights = []) => {
    if (!text || !highlights || highlights.length === 0) {
        return [text];
    }

    const result = [];
    let lastIndex = 0;

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

    sortedHighlights.forEach((highlight, idx) => {
        // Add text before highlight
        if (highlight.start > lastIndex) {
            result.push({
                type: 'text',
                content: text.substring(lastIndex, highlight.start),
                key: `text-${idx}`
            });
        }

        // Add highlighted text
        result.push({
            type: 'highlight',
            content: text.substring(highlight.start, highlight.end),
            color: highlight.color,
            key: `highlight-${idx}`
        });

        lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
        result.push({
            type: 'text',
            content: text.substring(lastIndex),
            key: 'text-end'
        });
    }

    return result;
};

/**
 * Validate highlight object
 * @param {Object} highlight - Highlight object to validate
 * @param {string} text - The text being highlighted
 * @returns {boolean} True if valid
 */
export const isValidHighlight = (highlight, text) => {
    if (!highlight || typeof highlight !== 'object') return false;
    if (typeof highlight.start !== 'number' || typeof highlight.end !== 'number') return false;
    if (highlight.start < 0 || highlight.end > text.length) return false;
    if (highlight.start >= highlight.end) return false;
    if (!highlight.color || typeof highlight.color !== 'string') return false;

    return true;
};

/**
 * Merge overlapping highlights
 * @param {Array} highlights - Array of highlight objects
 * @returns {Array} Merged highlights
 */
export const mergeOverlappingHighlights = (highlights) => {
    if (!highlights || highlights.length === 0) return [];

    const sorted = [...highlights].sort((a, b) => a.start - b.start);
    const merged = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        const last = merged[merged.length - 1];

        if (current.start <= last.end) {
            // Overlapping - merge them
            last.end = Math.max(last.end, current.end);
            // Keep the first color
        } else {
            merged.push(current);
        }
    }

    return merged;
};

/**
 * Convert highlights to JSON-safe format
 * @param {Array} highlights - Array of highlight objects
 * @returns {string} JSON string
 */
export const highlightsToJSON = (highlights) => {
    if (!highlights || highlights.length === 0) return null;

    const sanitized = highlights.map(h => ({
        start: h.start,
        end: h.end,
        text: h.text,
        color: h.color
    }));

    return JSON.stringify(sanitized);
};

/**
 * Parse highlights from JSON
 * @param {string} json - JSON string
 * @returns {Array} Array of highlight objects
 */
export const highlightsFromJSON = (json) => {
    if (!json) return [];

    try {
        const parsed = JSON.parse(json);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error('Failed to parse highlights JSON:', e);
        return [];
    }
};

export default {
    applyHighlights,
    isValidHighlight,
    mergeOverlappingHighlights,
    highlightsToJSON,
    highlightsFromJSON
};
