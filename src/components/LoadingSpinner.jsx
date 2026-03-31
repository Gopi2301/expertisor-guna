import React from 'react';

/**
 * Loading Spinner Component
 * Used as fallback for lazy-loaded components
 */
const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
                <div className={`${sizeClasses[size]} border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
                {message && (
                    <p className="text-neutral-400 text-sm">{message}</p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;
