import { useEffect } from 'react';

/**
 * useKeyboardShortcuts - Register keyboard shortcuts
 * @param {Object} shortcuts - Map of key combinations to handlers
 * 
 * Example:
 * useKeyboardShortcuts({
 *   'ctrl+z': undo,
 *   'ctrl+y': redo,
 *   'ctrl+s': save,
 *   'escape': closeModal
 * });
 */
export const useKeyboardShortcuts = (shortcuts) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Build key combination string
            const keys = [];
            if (e.ctrlKey || e.metaKey) keys.push('ctrl');
            if (e.shiftKey) keys.push('shift');
            if (e.altKey) keys.push('alt');
            keys.push(e.key.toLowerCase());

            const combination = keys.join('+');

            // Check if we have a handler for this combination
            const handler = shortcuts[combination];
            if (handler) {
                e.preventDefault();
                handler(e);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};

export default useKeyboardShortcuts;
