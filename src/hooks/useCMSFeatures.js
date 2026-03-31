import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Auto-save Hook
 * 
 * Automatically saves data after a delay when changes are detected
 * 
 * @param {Function} saveFunction - Function to call for saving
 * @param {any} data - Data to save
 * @param {number} delay - Delay in ms before saving (default: 2000)
 * @returns {Object} - { isSaving, lastSaved, forceSave }
 */
export const useAutoSave = (saveFunction, data, delay = 2000) => {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const timeoutRef = useRef(null);
    const previousDataRef = useRef(data);

    const save = useCallback(async () => {
        if (!saveFunction) return;

        setIsSaving(true);
        try {
            await saveFunction(data);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Auto-save failed:', error);
        } finally {
            setIsSaving(false);
        }
    }, [saveFunction, data]);

    // Auto-save effect
    useEffect(() => {
        // Skip if data hasn't changed
        if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) {
            return;
        }

        previousDataRef.current = data;

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            save();
        }, delay);

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, delay, save]);

    // Force save function
    const forceSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        save();
    }, [save]);

    return { isSaving, lastSaved, forceSave };
};

/**
 * Undo/Redo Hook
 * 
 * Manages history stack for undo/redo functionality
 * 
 * @param {any} initialState - Initial state
 * @param {number} maxHistory - Maximum history size (default: 50)
 * @returns {Object} - { state, setState, undo, redo, canUndo, canRedo, clearHistory }
 */
export const useUndoRedo = (initialState, maxHistory = 50) => {
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const state = history[currentIndex];

    const setState = useCallback((newState) => {
        setHistory(prev => {
            // Remove any future history if we're not at the end
            const newHistory = prev.slice(0, currentIndex + 1);

            // Add new state
            newHistory.push(newState);

            // Limit history size
            if (newHistory.length > maxHistory) {
                newHistory.shift();
                setCurrentIndex(prev => prev); // Adjust index
                return newHistory;
            }

            setCurrentIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [currentIndex, maxHistory]);

    const undo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, history.length]);

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

    const clearHistory = useCallback(() => {
        setHistory([state]);
        setCurrentIndex(0);
    }, [state]);

    return {
        state,
        setState,
        undo,
        redo,
        canUndo,
        canRedo,
        clearHistory
    };
};

/**
 * Keyboard Shortcuts Hook
 * 
 * Handles keyboard shortcuts for undo/redo
 * 
 * @param {Function} onUndo - Undo callback
 * @param {Function} onRedo - Redo callback
 * @param {Function} onSave - Save callback
 */
export const useKeyboardShortcuts = (onUndo, onRedo, onSave) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd/Ctrl + Z = Undo
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                onUndo?.();
            }

            // Cmd/Ctrl + Shift + Z = Redo
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
                e.preventDefault();
                onRedo?.();
            }

            // Cmd/Ctrl + S = Save
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                onSave?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUndo, onRedo, onSave]);
};

export default {
    useAutoSave,
    useUndoRedo,
    useKeyboardShortcuts
};
