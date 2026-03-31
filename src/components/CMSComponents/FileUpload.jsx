import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';

/**
 * FileUpload Component
 * Handles image and video uploads with preview
 * Files are converted to base64 for localStorage storage
 * In production, files would be uploaded to server
 */
const FileUpload = ({
    value,
    onChange,
    type = 'image',
    label = 'Upload File',
    placeholder = '/path/to/file',
    accept
}) => {
    const inputRef = useRef(null);
    const isImage = type === 'image';
    const acceptTypes = accept || (isImage ? 'image/*' : 'video/*');
    const Icon = isImage ? ImageIcon : Video;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // For development: convert to base64 data URL
        // For production: would upload to server and return URL
        const reader = new FileReader();
        reader.onload = () => {
            onChange(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleClear = () => {
        onChange('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const isDataUrl = value?.startsWith('data:');
    const hasValue = value && value.trim() !== '';

    return (
        <div className="space-y-2">
            <label className="block text-sm text-neutral-400">{label}</label>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                />

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    title="Upload file"
                >
                    <Upload className="w-5 h-5" />
                </button>

                {hasValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        title="Clear"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={acceptTypes}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Preview */}
            {hasValue && (
                <div className="mt-3 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                    {isImage ? (
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full max-h-48 object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <video
                            src={value}
                            className="w-full max-h-48 object-cover"
                            controls
                            muted
                        />
                    )}
                </div>
            )}

            {!hasValue && (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="mt-3 border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center cursor-pointer hover:border-neutral-600 transition-colors"
                >
                    <Icon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">
                        Click to upload or enter URL above
                    </p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
