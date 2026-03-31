/**
 * YouTube Thumbnail Utility
 * Extracts video ID from various YouTube URL formats and fetches thumbnails
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL or video ID
 * @returns {string|null} - Video ID or null if invalid
 */
export const getYouTubeVideoId = (url) => {
    if (!url) return null;

    // If it's already just an ID (11 characters, alphanumeric with - and _)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
    }

    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    const standardMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (standardMatch) return standardMatch[1];

    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    return null;
};

/**
 * Get YouTube thumbnail URL from video ID or URL
 * @param {string} videoIdOrUrl - YouTube video ID or URL
 * @param {string} quality - Thumbnail quality: 'maxres', 'hq', 'mq', 'sd', 'default'
 * @returns {string|null} - Thumbnail URL or null if invalid
 */
export const getYouTubeThumbnail = (videoIdOrUrl, quality = 'maxres') => {
    const videoId = getYouTubeVideoId(videoIdOrUrl);
    if (!videoId) return null;

    const qualityMap = {
        maxres: 'maxresdefault',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
        default: 'default'
    };

    const thumbnailQuality = qualityMap[quality] || qualityMap.maxres;
    return `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
};

/**
 * Get all available thumbnail URLs for a video (for fallback)
 * @param {string} videoIdOrUrl - YouTube video ID or URL
 * @returns {string[]} - Array of thumbnail URLs in descending quality order
 */
export const getYouTubeThumbnailFallbacks = (videoIdOrUrl) => {
    const videoId = getYouTubeVideoId(videoIdOrUrl);
    if (!videoId) return [];

    return [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];
};

/**
 * Get YouTube embed URL
 * @param {string} videoIdOrUrl - YouTube video ID or URL
 * @param {boolean} autoplay - Enable autoplay
 * @returns {string|null} - Embed URL or null if invalid
 */
export const getYouTubeEmbedUrl = (videoIdOrUrl, autoplay = false) => {
    const videoId = getYouTubeVideoId(videoIdOrUrl);
    if (!videoId) return null;

    const autoplayParam = autoplay ? '?autoplay=1' : '';
    return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
};
