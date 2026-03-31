import React from 'react';
import { Upload } from 'lucide-react';

/**
 * Video Section Editor
 */
const VideoEditor = ({ course, setCourse }) => {
    const heroData = course.hero_data || {};
    const video = heroData.video || {};

    const updateVideo = (field, value) => {
        setCourse(prev => ({
            ...prev,
            hero_data: {
                ...prev.hero_data,
                video: {
                    ...prev.hero_data?.video,
                    [field]: value
                }
            }
        }));
    };

    return (
        <div className="space-y-4">

            {/* YouTube URL */}
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    YouTube Video URL
                </label>
                <input
                    type="url"
                    value={video.embedUrl || video.url || ''}
                    onChange={(e) => updateVideo('embedUrl', e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-neutral-500">
                    Use the embed URL format
                </p>
            </div>

            {/* Thumbnail URL */}
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Thumbnail URL (Optional)
                </label>
                <input
                    type="url"
                    value={video.thumbnail || ''}
                    onChange={(e) => updateVideo('thumbnail', e.target.value)}
                    placeholder="https://... or leave empty to use default"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-neutral-500">
                    Leave empty to use the default video overlay image
                </p>
            </div>

        </div>
    );
};

export default VideoEditor;
