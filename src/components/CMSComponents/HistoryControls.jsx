import React from 'react';
import { Undo, Redo } from 'lucide-react';

/**
 * HistoryControls - Undo/Redo buttons
 * @param {Function} onUndo - Undo callback
 * @param {Function} onRedo - Redo callback  
 * @param {boolean} canUndo - Whether undo is available
 * @param {boolean} canRedo - Whether redo is available
 */
const HistoryControls = ({ onUndo, onRedo, canUndo, canRedo }) => {
    return (
        <div className="flex items-center gap-1 bg-neutral-900 rounded-lg p-1 border border-neutral-800">
            <button
                onClick={onUndo}
                disabled={!canUndo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 text-neutral-400 hover:text-white"
                title="Undo (Ctrl+Z)"
            >
                <Undo className="w-4 h-4" />
                <span className="hidden sm:inline">Undo</span>
            </button>
            <div className="w-px h-5 bg-neutral-800"></div>
            <button
                onClick={onRedo}
                disabled={!canRedo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 text-neutral-400 hover:text-white"
                title="Redo (Ctrl+Y)"
            >
                <Redo className="w-4 h-4" />
                <span className="hidden sm:inline">Redo</span>
            </button>
        </div>
    );
};

export default HistoryControls;
