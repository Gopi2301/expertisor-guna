import { useState, useEffect, useRef, memo } from 'react';

const LazyImage = memo(({ src, alt, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
                threshold: 0.01,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {isInView ? (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className={className}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        ...props.style
                    }}
                    {...props}
                />
            ) : (
                <div ref={imgRef} className={className} />
            )}
        </>
    );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
