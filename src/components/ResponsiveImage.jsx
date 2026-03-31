import { useState, useEffect, memo } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * ResponsiveImage component with picture element and multiple source formats
 * Supports WebP, AVIF (future), and fallback formats
 * Automatically generates srcset for different screen sizes
 * 
 * @param {string} src - Original image source (required)
 * @param {string} alt - Alt text (required)
 * @param {Object} sources - Object with format keys and srcset arrays
 *   Example: { webp: ['/img-400w.webp', '/img-800w.webp'], jpeg: ['/img-400w.jpg', '/img-800w.jpg'] }
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {string} className - CSS classes
 * @param {string} loading - Loading strategy ('lazy' or 'eager')
 * @param {Object} breakpoints - Breakpoint sizes in pixels (default: [400, 800, 1200, 1600])
 */
const ResponsiveImage = memo(({
    src,
    alt,
    sources = {},
    sizes = '100vw',
    className = '',
    loading = 'lazy',
    breakpoints = [400, 800, 1200, 1600],
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [webpSupported, setWebpSupported] = useState(null);
    const { ref, inView } = useInView({
        threshold: 0.01,
        rootMargin: '50px',
        triggerOnce: true,
    });

    // Check WebP support
    useEffect(() => {
        if (webpSupported !== null) return;

        const webp = new Image();
        webp.onload = webp.onerror = () => {
            setWebpSupported(webp.height === 2);
        };
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }, [webpSupported]);

    // Generate srcset string from array
    const generateSrcSet = (srcArray) => {
        if (!srcArray || srcArray.length === 0) return '';

        return srcArray
            .map((src, index) => {
                const width = breakpoints[index] || breakpoints[breakpoints.length - 1];
                return `${src} ${width}w`;
            })
            .join(', ');
    };

    const handleLoad = () => {
        setIsLoaded(true);
    };

    // Don't render until in view (for lazy loading)
    if (loading === 'lazy' && !inView) {
        return <div ref={ref} className={className} style={{ aspectRatio: '16/9' }} />;
    }

    // Determine which format to use
    const hasWebp = sources.webp && sources.webp.length > 0;
    const hasAvif = sources.avif && sources.avif.length > 0;
    const hasJpeg = sources.jpeg && sources.jpeg.length > 0;
    const hasPng = sources.png && sources.png.length > 0;

    return (
        <picture ref={ref}>
            {/* AVIF format (best compression, future-proof) */}
            {hasAvif && inView && (
                <source
                    type="image/avif"
                    srcSet={generateSrcSet(sources.avif)}
                    sizes={sizes}
                />
            )}

            {/* WebP format (good compression, wide support) */}
            {hasWebp && webpSupported && inView && (
                <source
                    type="image/webp"
                    srcSet={generateSrcSet(sources.webp)}
                    sizes={sizes}
                />
            )}

            {/* JPEG fallback */}
            {hasJpeg && (
                <source
                    type="image/jpeg"
                    srcSet={generateSrcSet(sources.jpeg)}
                    sizes={sizes}
                />
            )}

            {/* PNG fallback */}
            {hasPng && (
                <source
                    type="image/png"
                    srcSet={generateSrcSet(sources.png)}
                    sizes={sizes}
                />
            )}

            {/* Default img tag with fallback */}
            <img
                src={src}
                srcSet={generateSrcSet(sources.jpeg || sources.png || [src])}
                sizes={sizes}
                alt={alt}
                className={className}
                loading={loading}
                decoding="async"
                onLoad={handleLoad}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    width: '100%',
                    height: 'auto',
                    contain: 'layout style paint',
                    ...props.style,
                }}
                {...props}
            />
        </picture>
    );
});

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
