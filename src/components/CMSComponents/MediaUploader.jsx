import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Film } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * MediaUploader - Component for uploading images and videos
 * @param {Function} onUpload - Callback when file is uploaded (receives file URL)
 * @param {string} accept - Accepted file types (default: images and videos)
 * @param {number} maxSize - Max file size in MB (default: 10MB)
 */
const MediaUploader = ({
    onUpload,
    accept = 'image/*,video/*',
    maxSize = 10,
    label = 'Upload Media'
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            toast.error(`File size must be less than ${maxSize}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Upload file
        setUploading(true);
        try {
            // For now, just use the data URL
            // In production, you'd upload to server and get back a URL
            const formData = new FormData();
            formData.append('file', file);

            // Simulate upload (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For now, return the data URL
            // In production: const response = await fetch('/api/upload', { method: 'POST', body: formData });
            // const { url } = await response.json();

            onUpload(reader.result);
            toast.success('File uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3">
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
                id="media-upload"
            />

            {preview ? (
                <div className="relative group">
                    {preview.startsWith('data:image') ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-neutral-700"
                        />
                    ) : (
                        <video
                            src={preview}
                            className="w-full h-48 object-cover rounded-lg border border-neutral-700"
                            controls
                        />
                    )}
                    <button
                        onClick={clearPreview}
                        className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label
                    htmlFor="media-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-yellow-400 hover:bg-neutral-900/50 transition-all group"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <>
                                <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-sm text-neutral-400">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-10 h-10 text-neutral-500 group-hover:text-yellow-400 transition-colors mb-3" />
                                <p className="mb-2 text-sm text-neutral-400">
                                    <span className="font-semibold text-white">{label}</span>
                                </p>
                                <p className="text-xs text-neutral-500">
                                    PNG, JPG, GIF, MP4, WEBM (max {maxSize}MB)
                                </p>
                            </>
                        )}
                    </div>
                </label>
            )}
        </div>
    );
};

export default MediaUploader;
