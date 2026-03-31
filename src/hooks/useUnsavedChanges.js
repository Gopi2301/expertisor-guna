import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * useUnsavedChanges - Warns user before leaving page with unsaved changes
 * @param {boolean} hasUnsavedChanges - Whether there are unsaved changes
 * @param {string} message - Custom warning message
 */
export const useUnsavedChanges = (hasUnsavedChanges, message = 'You have unsaved changes. Are you sure you want to leave?') => {
    const navigate = useNavigate();

    useEffect(() => {
        // Browser navigation warning
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, message]);

    // React Router navigation warning
    useEffect(() => {
        if (!hasUnsavedChanges) return;

        const handleNavigation = (e) => {
            if (!window.confirm(message)) {
                e.preventDefault();
            }
        };

        // Note: This is a simplified version. For full React Router v6 support,
        // you'd use unstable_useBlocker or implement a custom solution
        return () => { };
    }, [hasUnsavedChanges, message, navigate]);
};

export default useUnsavedChanges;
