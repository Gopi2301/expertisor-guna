import React from 'react';
import { Save, Check, AlertCircle, Clock } from 'lucide-react';

/**
 * SaveStatusIndicator - Shows current save status
 * @param {string} status - 'saving', 'saved', 'error'
 * @param {Date} lastSaved - Last save timestamp
 */
const SaveStatusIndicator = ({ status, lastSaved }) => {
    const getTimeAgo = (date) => {
        if (!date) return '';
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        return `${Math.floor(seconds / 3600)}h ago`;
    };

    const statusConfig = {
        saving: {
            icon: Save,
            text: 'Saving...',
            className: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        },
        saved: {
            icon: Check,
            text: lastSaved ? `Saved ${getTimeAgo(lastSaved)}` : 'Saved',
            className: 'text-green-400 bg-green-500/10 border-green-500/20'
        },
        error: {
            icon: AlertCircle,
            text: 'Save failed',
            className: 'text-red-400 bg-red-500/10 border-red-500/20'
        }
    };

    const config = statusConfig[status] || statusConfig.saved;
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${config.className}`}>
            <Icon className="w-3.5 h-3.5 animate-pulse" style={{ animationDuration: status === 'saving' ? '1s' : '0s' }} />
            <span>{config.text}</span>
        </div>
    );
};

export default SaveStatusIndicator;
