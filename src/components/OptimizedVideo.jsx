import React, { useState, useEffect, useRef, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { getDeviceCapabilities } from '../utils/deviceCapabilities';

/**
 * OptimizedVideo component with lazy loading, intersection observer, and adaptive quality
 * 
 * @param {string} src - Video source URL
 * @param {string} poster - Poster image URL
 * @param {string} className - CSS classes
 * @param {boolean} autoplay - Whether to autoplay (default: false)
 * @param {boolean} loop - Whether to loop (default: false)
 * @param {boolean} muted - Whether to mute (default: true for autoplay)
 * @param {boolean} controls - Whether to show controls (default: true)
 * @param {Object} qualityVariants - Object with quality variants { hd: 'url', sd: 'url', mobile: 'url' }
 * @param {Object} options - Additional options
 */
const OptimizedVideo = memo(({
    src,
    poster,
    className = '',
    autoplay = false,
    loop = false,
    muted = autoplay, // Default to muted if autoplay
    controls = true,
    qualityVariants = null,
    options = {},
    ...props
}) => {
    const [videoSrc, setVideoSrc] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldPlay, setShouldPlay] = useState(false);
    const videoRef = useRef(null);
    const deviceCapabilities = getDeviceCapabilities();

    // Intersection Observer for lazy loading
    const { ref, inView } = useInView({
        threshold: 0.1,
        rootMargin: '100px',
        triggerOnce: false,
    });

    // Select appropriate video quality based on device
    useEffect(() => {
        if (!inView || !qualityVariants) {
            setVideoSrc(src);
            return;
        }

        // Select quality based on device capabilities
        if (deviceCapabilities.performanceLevel === 'low' || deviceCapabilities.connection.saveData) {
            setVideoSrc(qualityVariants.mobile || qualityVariants.sd || src);
        } else if (deviceCapabilities.performanceLevel === 'medium') {
            setVideoSrc(qualityVariants.sd || qualityVariants.hd || src);
        } else {
            setVideoSrc(qualityVariants.hd || qualityVariants.sd || src);
        }
    }, [inView, qualityVariants, deviceCapabilities, src]);

    // Control video playback based on visibility
    useEffect(() => {
        if (!videoRef.current) return;

        if (inView && autoplay && !shouldPlay) {
            setShouldPlay(true);
            videoRef.current.play().catch((error) => {
                console.warn('Video autoplay failed:', error);
            });
        } else if (!inView && videoRef.current) {
            videoRef.current.pause();
            setShouldPlay(false);
        }
    }, [inView, autoplay, shouldPlay]);

    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!videoRef.current) return;

            if (document.hidden) {
                videoRef.current.pause();
            } else if (inView && autoplay && shouldPlay) {
                videoRef.current.play().catch((error) => {
                    console.warn('Video play failed:', error);
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [inView, autoplay, shouldPlay]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    const handleCanPlay = () => {
        setIsLoaded(true);
    };

    // Don't load video until in view (for lazy loading)
    if (!inView && !options.preload) {
        return (
            <div
                ref={ref}
                className={className}
                style={{
                    backgroundImage: poster ? `url(${poster})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    aspectRatio: '16/9',
                    contain: 'layout style paint',
                }}
            />
        );
    }

    return (
        <div ref={ref} className={className} style={{ contain: 'layout style paint' }}>
            <video
                ref={videoRef}
                src={videoSrc || src}
                poster={poster}
                className="w-full h-full object-cover"
                autoPlay={autoplay && shouldPlay}
                loop={loop}
                muted={muted}
                controls={controls}
                playsInline
                preload={inView ? 'auto' : 'none'}
                onLoadedData={handleLoadedData}
                onCanPlay={handleCanPlay}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    willChange: 'opacity',
                    ...props.style,
                }}
                {...props}
            />
        </div>
    );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
