import { useState, useCallback, useRef } from 'react';

/**
 * useHistory - Undo/Redo history management
 * @param {any} initialState - Initial state value
 * @param {number} maxHistory - Maximum history size (default: 50)
 */
export const useHistory = (initialState, maxHistory = 50) => {
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isUndoRedoAction = useRef(false);

    // Get current state
    const state = history[currentIndex];

    // Set new state (adds to history)
    const setState = useCallback((newState) => {
        if (isUndoRedoAction.current) {
            isUndoRedoAction.current = false;
            return;
        }

        setHistory(prev => {
            // Remove any future history if we're not at the end
            const newHistory = prev.slice(0, currentIndex + 1);

            // Add new state
            newHistory.push(typeof newState === 'function' ? newState(prev[currentIndex]) : newState);

            // Limit history size
            if (newHistory.length > maxHistory) {
                newHistory.shift();
                return newHistory;
            }

            return newHistory;
        });

        setCurrentIndex(prev => Math.min(prev + 1, maxHistory - 1));
    }, [currentIndex, maxHistory]);

    // Undo
    const undo = useCallback(() => {
        if (currentIndex > 0) {
            isUndoRedoAction.current = true;
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    // Redo
    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            isUndoRedoAction.current = true;
            setCurrentIndex(prev => prev + 1);
        }
    }, [currentIndex, history.length]);

    // Clear history
    const clearHistory = useCallback(() => {
        setHistory([state]);
        setCurrentIndex(0);
    }, [state]);

    const canUndo = currentIndex > 0;
    const canRedo = currentIndex < history.length - 1;

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

export default useHistory;
