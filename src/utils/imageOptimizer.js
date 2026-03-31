/**
 * Helper function to get optimized image paths
 * Returns WebP version if available, falls back to original
 */
export function getOptimizedImage(originalPath) {
    if (!originalPath) return originalPath;

    // If already using optimized path, return as is
    if (originalPath.includes('/optimized/') || originalPath.endsWith('.webp')) {
        return originalPath;
    }

    // Try to find WebP version
    const optimizedPath = originalPath
        .replace(/\/assets\//, '/assets/optimized/')
        .replace(/\.(png|jpg|jpeg|svg)$/i, '.webp');

    return optimizedPath;
}

/**
 * Get both original and WebP versions for OptimizedImage component
 */
export function getImageSources(originalPath) {
    if (!originalPath) return { src: null, webpSrc: null };

    const webpPath = getOptimizedImage(originalPath);

    return {
        src: originalPath,
        webpSrc: webpPath !== originalPath ? webpPath : null,
    };
}
