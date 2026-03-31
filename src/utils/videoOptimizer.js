/**
 * Video optimization utilities
 * Provides helper functions for video optimization and quality selection
 */

/**
 * Get recommended video quality based on device capabilities
 * @param {Object} deviceCapabilities - Device capabilities object
 * @returns {string} Recommended quality ('hd', 'sd', or 'mobile')
 */
export const getRecommendedVideoQuality = (deviceCapabilities) => {
    if (!deviceCapabilities) return 'sd';

    if (deviceCapabilities.performanceLevel === 'low' || deviceCapabilities.connection.saveData) {
        return 'mobile';
    }

    if (deviceCapabilities.performanceLevel === 'medium') {
        return 'sd';
    }

    return 'hd';
};

/**
 * Generate video quality variants object from base path
 * @param {string} basePath - Base path to video file
 * @returns {Object} Object with hd, sd, and mobile variants
 */
export const generateVideoVariants = (basePath) => {
    if (!basePath) return null;

    const pathParts = basePath.split('.');
    const extension = pathParts.pop();
    const baseName = pathParts.join('.');

    return {
        hd: `${baseName}-hd.${extension}`,
        sd: `${baseName}-sd.${extension}`,
        mobile: `${baseName}-mobile.${extension}`,
    };
};

/**
 * Get video preload strategy based on context
 * @param {boolean} isAboveFold - Whether video is above the fold
 * @param {boolean} autoplay - Whether video autoplays
 * @returns {string} Preload strategy ('auto', 'metadata', or 'none')
 */
export const getVideoPreloadStrategy = (isAboveFold, autoplay) => {
    if (isAboveFold && autoplay) {
        return 'auto';
    }

    if (isAboveFold && !autoplay) {
        return 'metadata';
    }

    return 'none';
};

/**
 * Check if video should be loaded based on connection
 * @param {Object} deviceCapabilities - Device capabilities object
 * @returns {boolean} Whether video should be loaded
 */
export const shouldLoadVideo = (deviceCapabilities) => {
    if (!deviceCapabilities) return true;

    // Don't load on slow connections or data saver mode
    if (
        deviceCapabilities.connection.saveData ||
        deviceCapabilities.connection.effectiveType === 'slow-2g' ||
        deviceCapabilities.connection.effectiveType === '2g'
    ) {
        return false;
    }

    return true;
};
