import React from 'react';
import { Info } from 'lucide-react';

/**
 * Lead Form Editor
 */
const FormEditor = ({ course, setCourse }) => {
    const formData = course.form_data || {};

    const updateFormData = (field, value) => {
        setCourse(prev => ({
            ...prev,
            form_data: {
                ...prev.form_data,
                [field]: value
            }
        }));
    };

    return (
        <div className="space-y-4">

            {/* Form Title */}
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Form Title
                </label>
                <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder="STRUGGLING TO FIGURE IT OUT ALONE?"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                />
            </div>

            {/* Form Subtitle */}
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Form Subtitle
                </label>
                <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => updateFormData('subtitle', e.target.value)}
                    placeholder="Get Expert 1:1 Guidance"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                />
            </div>

            {/* Submit Button Text */}
            <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Submit Button Text
                </label>
                <input
                    type="text"
                    value={formData.submitButton || ''}
                    onChange={(e) => updateFormData('submitButton', e.target.value)}
                    placeholder="Get Fast Help"
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                />
            </div>

            {/* Zoho Forms Configuration */}
            <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="text-lg font-semibold text-white mb-4">Zoho Integration</h3>

                {/* Zoho Form ID */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Zoho Form ID (Optional)
                    </label>
                    <input
                        type="text"
                        value={formData.zohoFormId || ''}
                        onChange={(e) => updateFormData('zohoFormId', e.target.value)}
                        placeholder="Leave empty to use default form"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        Custom Zoho Form endpoint for this course
                    </p>
                </div>

                {/* Lead Source */}
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Lead Source Tag
                    </label>
                    <input
                        type="text"
                        value={formData.leadSource || 'Website Form'}
                        onChange={(e) => updateFormData('leadSource', e.target.value)}
                        placeholder="Website Form"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        How this lead will be tagged in Zoho CRM
                    </p>
                </div>

                {/* Deal Name */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Deal Name (Optional)
                    </label>
                    <input
                        type="text"
                        value={formData.dealName || ''}
                        onChange={(e) => updateFormData('dealName', e.target.value)}
                        placeholder="e.g. Custom Course Enquiry"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                        Custom deal name to be created in Zoho CRM for this form
                    </p>
                </div>
            </div>

            {/* Status Info - Active Integration */}
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-700/50 mt-4">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-green-300 font-medium mb-1">
                            Zoho Integration Active
                        </p>
                        <p className="text-xs text-neutral-400">
                            Form submissions will be sent to Zoho Forms and stored locally. Check browser console for detailed submission logs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Fields Info */}
            <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700 mt-4">
                <p className="text-sm text-neutral-400">
                    <strong className="text-white">Form Fields:</strong> Name, Email, Phone, Educational Qualification, Current Profile
                </p>
            </div>

        </div>
    );
};

export default FormEditor;
