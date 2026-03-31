/**
 * Device capabilities detection utilities
 * Detects device CPU, memory, and connection capabilities for adaptive performance
 */

// Cache detection results
let deviceCapabilities = null;

/**
 * Detects device capabilities including:
 * - CPU cores
 * - Memory (if available)
 * - Connection speed
 * - Device type (mobile/desktop)
 */
export const getDeviceCapabilities = () => {
    if (deviceCapabilities) {
        return deviceCapabilities;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    const cores = navigator.hardwareConcurrency || 4; // Default to 4 if not available
    const memory = navigator.deviceMemory || 4; // Default to 4GB if not available

    // Connection type detection
    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection ||
        null;

    const effectiveType = connection?.effectiveType || '4g';
    const downlink = connection?.downlink || 10; // Default to 10 Mbps

    // Calculate performance score (0-1)
    // Higher score = better performance
    let performanceScore = 1;

    // Adjust based on cores
    if (cores < 4) performanceScore *= 0.7;
    if (cores < 2) performanceScore *= 0.5;

    // Adjust based on memory
    if (memory < 4) performanceScore *= 0.8;
    if (memory < 2) performanceScore *= 0.6;

    // Adjust based on connection
    if (effectiveType === 'slow-2g' || effectiveType === '2g') performanceScore *= 0.4;
    else if (effectiveType === '3g') performanceScore *= 0.7;

    // Adjust based on device type
    if (isMobile) performanceScore *= 0.8;

    // Categorize performance level
    let performanceLevel = 'high';
    if (performanceScore < 0.5) performanceLevel = 'low';
    else if (performanceScore < 0.7) performanceLevel = 'medium';

    deviceCapabilities = {
        isMobile,
        cores,
        memory,
        connection: {
            effectiveType,
            downlink,
            saveData: connection?.saveData || false,
        },
        performanceScore,
        performanceLevel,
    };

    return deviceCapabilities;
};

/**
 * Check if device can handle high-quality animations
 */
export const canHandleHighQualityAnimations = () => {
    const capabilities = getDeviceCapabilities();
    return capabilities.performanceLevel === 'high' && !capabilities.connection.saveData;
};

/**
 * Get recommended Lottie animation quality based on device
 * @returns {number} Quality level (0-1)
 */
export const getRecommendedAnimationQuality = () => {
    const capabilities = getDeviceCapabilities();

    if (capabilities.performanceLevel === 'low') return 0.5;
    if (capabilities.performanceLevel === 'medium') return 0.75;
    return 1; // High performance
};

/**
 * Get recommended frame rate limit based on device
 * @returns {number} Frame rate limit (fps)
 */
export const getRecommendedFrameRate = () => {
    const capabilities = getDeviceCapabilities();

    if (capabilities.performanceLevel === 'low') return 30;
    if (capabilities.performanceLevel === 'medium') return 45;
    return 60; // High performance
};

/**
 * Check if animations should be reduced
 */
export const shouldReduceAnimations = () => {
    const capabilities = getDeviceCapabilities();
    return (
        capabilities.performanceLevel === 'low' ||
        capabilities.connection.saveData ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
};
