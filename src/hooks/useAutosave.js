import { useEffect, useRef, useState } from 'react';

/**
 * useAutosave - Custom hook for automatic saving
 * @param {Function} saveFn - Function to call for saving
 * @param {any} data - Data to save
 * @param {number} interval - Autosave interval in milliseconds (default: 30000 = 30s)
 * @param {boolean} enabled - Whether autosave is enabled
 */
export const useAutosave = (saveFn, data, interval = 30000, enabled = true) => {
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'
    const [lastSaved, setLastSaved] = useState(null);
    const timeoutRef = useRef(null);
    const dataRef = useRef(data);
    const isFirstRender = useRef(true);

    // Update data ref when data changes
    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    // Autosave logic
    useEffect(() => {
        if (!enabled || isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout for autosave
        timeoutRef.current = setTimeout(async () => {
            try {
                setSaveStatus('saving');
                await saveFn(dataRef.current);
                setSaveStatus('saved');
                setLastSaved(new Date());
            } catch (error) {
                console.error('Autosave error:', error);
                setSaveStatus('error');
            }
        }, interval);

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, interval, enabled, saveFn]);

    // Manual save function
    const saveNow = async () => {
        try {
            setSaveStatus('saving');
            await saveFn(dataRef.current);
            setSaveStatus('saved');
            setLastSaved(new Date());
        } catch (error) {
            console.error('Manual save error:', error);
            setSaveStatus('error');
            throw error;
        }
    };

    return {
        saveStatus,
        lastSaved,
        saveNow
    };
};

export default useAutosave;
