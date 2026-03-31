import React from 'react';
import { Globe, Archive, Trash2, X } from 'lucide-react';

const BulkActionBar = ({ selectedCount, onPublish, onArchive, onDelete, onClear }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-[#111] border border-neutral-800 rounded-xl shadow-2xl px-6 py-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-sm">
                        {selectedCount}
                    </div>
                    <span className="text-white font-medium">
                        {selectedCount} selected
                    </span>
                </div>

                <div className="w-px h-6 bg-neutral-700" />

                <div className="flex items-center gap-2">
                    <button
                        onClick={onPublish}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                        title="Publish selected"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">Publish</span>
                    </button>

                    <button
                        onClick={onArchive}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
                        title="Archive selected"
                    >
                        <Archive className="w-4 h-4" />
                        <span className="text-sm font-medium">Archive</span>
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        title="Delete selected"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>

                <div className="w-px h-6 bg-neutral-700" />

                <button
                    onClick={onClear}
                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Clear selection"
                >
                    <X className="w-4 h-4 text-neutral-400" />
                </button>
            </div>
        </div>
    );
};

export default BulkActionBar;
