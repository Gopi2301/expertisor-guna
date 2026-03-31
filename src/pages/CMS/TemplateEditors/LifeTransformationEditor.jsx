import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { getYouTubeVideoId, getYouTubeThumbnail } from '../../../utils/youtubeThumbnail';

/**
 * Template 2 CMS Editor - Full Implementation
 */
const LifeTransformationEditor = ({ course, updateCourse }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');

    // Sync video URL from course data
    useEffect(() => {
        if (course.hero_data?.video?.youtubeUrl) {
            setVideoUrl(course.hero_data.video.youtubeUrl);
            const thumbnail = getYouTubeThumbnail(course.hero_data.video.youtubeUrl);
            if (thumbnail) setThumbnailPreview(thumbnail);
        }
    }, [course.hero_data?.video?.youtubeUrl]);

    // Handle video URL change
    const handleVideoUrlChange = (e) => {
        const url = e.target.value;
        setVideoUrl(url);

        const videoId = getYouTubeVideoId(url);
        const thumbnail = getYouTubeThumbnail(url);

        if (thumbnail) setThumbnailPreview(thumbnail);

        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                video: {
                    ...course.hero_data?.video,
                    youtubeUrl: url,
                    youtubeId: videoId
                }
            }
        });
    };

    // Headline Management
    const addHeadlinePart = () => {
        const parts = course.hero_data?.headline?.parts || [];
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                headline: {
                    parts: [...parts, { text: '', highlight: false }]
                }
            }
        });
    };

    const updateHeadlinePart = (index, field, value) => {
        const parts = [...(course.hero_data?.headline?.parts || [])];
        parts[index] = { ...parts[index], [field]: value };
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                headline: { parts }
            }
        });
    };

    const removeHeadlinePart = (index) => {
        const parts = [...(course.hero_data?.headline?.parts || [])];
        parts.splice(index, 1);
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                headline: { parts }
            }
        });
    };

    // Features Management
    const addFeature = () => {
        const items = course.hero_data?.features?.items || [];
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                features: {
                    ...course.hero_data?.features,
                    items: [...items, { text: '' }]
                }
            }
        });
    };

    const updateFeature = (index, value) => {
        const items = [...(course.hero_data?.features?.items || [])];
        items[index] = { text: value };
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                features: {
                    ...course.hero_data?.features,
                    items
                }
            }
        });
    };

    const removeFeature = (index) => {
        const items = [...(course.hero_data?.features?.items || [])];
        items.splice(index, 1);
        updateCourse({
            ...course,
            hero_data: {
                ...course.hero_data,
                features: {
                    ...course.hero_data?.features,
                    items
                }
            }
        });
    };

    return (
        <div className="space-y-8">
            {/* Headline Parts */}
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Headline Construction</h3>
                    <button
                        onClick={addHeadlinePart}
                        className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Part
                    </button>
                </div>

                <div className="space-y-3">
                    {(course.hero_data?.headline?.parts || []).map((part, index) => (
                        <div key={index} className="flex gap-3 items-start p-3 bg-[#111] rounded-lg border border-neutral-800">
                            <div className="flex-1 space-y-2">
                                <input
                                    type="text"
                                    value={part.text}
                                    onChange={(e) => updateHeadlinePart(index, 'text', e.target.value)}
                                    placeholder="Enter text..."
                                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={part.highlight || false}
                                        onChange={(e) => updateHeadlinePart(index, 'highlight', e.target.checked)}
                                        id={`highlight-${index}`}
                                        className="rounded border-neutral-700"
                                    />
                                    <label htmlFor={`highlight-${index}`} className="text-sm text-neutral-400">
                                        Highlight in Yellow
                                    </label>
                                </div>
                            </div>
                            <button
                                onClick={() => removeHeadlinePart(index)}
                                className="p-2 text-neutral-500 hover:text-red-500 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guarantee Badge */}
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-white">Guarantee Badge</h3>
                <textarea
                    value={course.hero_data?.guarantee || ''}
                    onChange={(e) => updateCourse({
                        ...course,
                        hero_data: {
                            ...course.hero_data,
                            guarantee: e.target.value
                        }
                    })}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    placeholder="e.g., If you don't get results, I'll work with you again for free..."
                />
            </div>

            {/* Video Settings */}
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-white">Video Settings</h3>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        YouTube Video URL
                    </label>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={handleVideoUrlChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-3 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                </div>

                {thumbnailPreview && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-neutral-700">
                        <img
                            src={thumbnailPreview}
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Custom Thumbnail (Optional)
                    </label>
                    <input
                        type="text"
                        value={course.hero_data?.video?.customThumbnail || ''}
                        onChange={(e) => updateCourse({
                            ...course,
                            hero_data: {
                                ...course.hero_data,
                                video: {
                                    ...course.hero_data?.video,
                                    customThumbnail: e.target.value
                                }
                            }
                        })}
                        placeholder="Enter image URL..."
                        className="w-full px-4 py-3 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Video Description (for sticky footer)
                    </label>
                    <textarea
                        value={course.hero_data?.video?.description || ''}
                        onChange={(e) => updateCourse({
                            ...course,
                            hero_data: {
                                ...course.hero_data,
                                video: {
                                    ...course.hero_data?.video,
                                    description: e.target.value
                                }
                            }
                        })}
                        rows={2}
                        className="w-full px-4 py-3 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                        placeholder="Transform your mindset, career, and business..."
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Features List</h3>
                    <button
                        onClick={addFeature}
                        className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Feature
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={course.hero_data?.features?.title || ''}
                        onChange={(e) => updateCourse({
                            ...course,
                            hero_data: {
                                ...course.hero_data,
                                features: {
                                    ...course.hero_data?.features,
                                    title: e.target.value
                                }
                            }
                        })}
                        placeholder="e.g., What You'll Get"
                        className="w-full px-4 py-3 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                </div>

                <div className="space-y-3">
                    {(course.hero_data?.features?.items || []).map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                            <div className="w-8 h-8 rounded-full bg-[#111] border border-neutral-700 flex items-center justify-center text-neutral-500 text-sm flex-shrink-0">
                                {index + 1}
                            </div>
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                placeholder="Feature description..."
                                className="flex-1 px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                            />
                            <button
                                onClick={() => removeFeature(index)}
                                className="p-2 text-neutral-500 hover:text-red-500 transition flex-shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-medium text-white">CTA Buttons</h3>

                {/* Primary Button */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white">Primary Button (Yellow)</h4>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Button Text
                        </label>
                        <input
                            type="text"
                            value={course.hero_data?.buttons?.primary?.text || ''}
                            onChange={(e) => updateCourse({
                                ...course,
                                hero_data: {
                                    ...course.hero_data,
                                    buttons: {
                                        ...course.hero_data?.buttons,
                                        primary: {
                                            ...course.hero_data?.buttons?.primary,
                                            text: e.target.value
                                        }
                                    }
                                }
                            })}
                            placeholder="Apply Now"
                            className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                            Action
                        </label>
                        <select
                            value={course.hero_data?.buttons?.primary?.action || 'openModal'}
                            onChange={(e) => updateCourse({
                                ...course,
                                hero_data: {
                                    ...course.hero_data,
                                    buttons: {
                                        ...course.hero_data?.buttons,
                                        primary: {
                                            ...course.hero_data?.buttons?.primary,
                                            action: e.target.value
                                        }
                                    }
                                }
                            })}
                            className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                        >
                            <option value="openModal">Open Application Modal</option>
                            <option value="link">Navigate to URL</option>
                        </select>
                    </div>

                    {course.hero_data?.buttons?.primary?.action === 'link' && (
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">
                                URL
                            </label>
                            <input
                                type="url"
                                value={course.hero_data?.buttons?.primary?.url || ''}
                                onChange={(e) => updateCourse({
                                    ...course,
                                    hero_data: {
                                        ...course.hero_data,
                                        buttons: {
                                            ...course.hero_data?.buttons,
                                            primary: {
                                                ...course.hero_data?.buttons?.primary,
                                                url: e.target.value
                                            }
                                        }
                                    }
                                })}
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                            />
                        </div>
                    )}
                </div>

                {/* Secondary Button */}
                <div className="space-y-3 pt-6 border-t border-neutral-800">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white">Secondary Button (Gray)</h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={course.hero_data?.buttons?.secondary?.enabled !== false}
                                onChange={(e) => updateCourse({
                                    ...course,
                                    hero_data: {
                                        ...course.hero_data,
                                        buttons: {
                                            ...course.hero_data?.buttons,
                                            secondary: {
                                                ...course.hero_data?.buttons?.secondary,
                                                enabled: e.target.checked
                                            }
                                        }
                                    }
                                })}
                                className="w-4 h-4 text-yellow-400 rounded focus:ring-yellow-400"
                            />
                            <span className="text-sm text-neutral-400">Enabled</span>
                        </label>
                    </div>

                    {course.hero_data?.buttons?.secondary?.enabled !== false && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Button Text
                                </label>
                                <input
                                    type="text"
                                    value={course.hero_data?.buttons?.secondary?.text || ''}
                                    onChange={(e) => updateCourse({
                                        ...course,
                                        hero_data: {
                                            ...course.hero_data,
                                            buttons: {
                                                ...course.hero_data?.buttons,
                                                secondary: {
                                                    ...course.hero_data?.buttons?.secondary,
                                                    text: e.target.value
                                                }
                                            }
                                        }
                                    })}
                                    placeholder="Download Brochure"
                                    className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    Type
                                </label>
                                <select
                                    value={course.hero_data?.buttons?.secondary?.type || 'link'}
                                    onChange={(e) => updateCourse({
                                        ...course,
                                        hero_data: {
                                            ...course.hero_data,
                                            buttons: {
                                                ...course.hero_data?.buttons,
                                                secondary: {
                                                    ...course.hero_data?.buttons?.secondary,
                                                    type: e.target.value
                                                }
                                            }
                                        }
                                    })}
                                    className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                                >
                                    <option value="link">External Link</option>
                                    <option value="file">File Download</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">
                                    {course.hero_data?.buttons?.secondary?.type === 'file' ? 'File URL' : 'URL'}
                                </label>
                                <input
                                    type="url"
                                    value={course.hero_data?.buttons?.secondary?.url || ''}
                                    onChange={(e) => updateCourse({
                                        ...course,
                                        hero_data: {
                                            ...course.hero_data,
                                            buttons: {
                                                ...course.hero_data?.buttons,
                                                secondary: {
                                                    ...course.hero_data?.buttons?.secondary,
                                                    url: e.target.value
                                                }
                                            }
                                        }
                                    })}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 bg-[#111] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 font-mono text-sm"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LifeTransformationEditor;
