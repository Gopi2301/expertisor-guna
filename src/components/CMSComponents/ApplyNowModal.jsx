import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getDealNameFromRoute } from '../../utils/geolocation';
import { submitToZoho } from '../../utils/zohoApi';
import CountryCodePicker from '../CountryCodePicker';

/**
 * Apply Now Modal Component
 */
const ApplyNowModal = ({
    isOpen,
    onClose,
    formConfig = {},
    onSubmit
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91', // Default to India
        phone: '',
        education: '',
        profile: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setFormData(prev => ({
                ...prev,
                name: '',
                email: '',
                phone: '',
                education: '',
                profile: ''
            }));
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Resolve deal name from shared mapping utility
            const courseName = getDealNameFromRoute();

            // Combine country code and phone number
            const fullPhone = formData.countryCode + formData.phone;
            console.log('🚀 [ApplyNowModal] Submitting form...', { ...formData, phone: fullPhone, courseName });

            const payload = {
                name: formData.name,
                email: formData.email,
                phone: fullPhone, // Send combined phone with country code
                education: formData.education,
                profile: formData.profile,
                courseName: courseName, // Auto-extracted from URL
                courseId: formConfig.courseId,
                Course_ID: formConfig.dealCourseId, // Pass custom dealCourseId to backend if provided
                Course: formConfig.dealCourse || courseName, // Pass custom dealCourse to backend if provided
                Deal_Name: formConfig.dealName || courseName // Pass custom dealname to backend if provided, otherwise default to courseName
            };

            const result = await submitToZoho('/api/zoho/submit-form.php', payload);
            console.log('✅ [ApplyNowModal] Submission response:', result);

            toast.success('Thank you! We will contact you soon.');

            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error('❌ [ApplyNowModal] Submission error:', error);
            toast.error(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[738px] bg-black rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 z-10"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h2
                            className="text-[28px] font-bold mb-2 tracking-wide"
                            style={{ fontFamily: "'Clash Display Variable', sans-serif", color: '#FFF200' }}
                        >
                            STRUGGLING TO FIGURE IT OUT ALONE?
                        </h2>
                        <p className="text-[16px] text-neutral-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Get Expert 1:1 Guidance
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="yourname@gmail.com"
                                required
                                className="w-full px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Phone Number<span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <CountryCodePicker
                                    value={formData.countryCode}
                                    onChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter WhatsApp Number"
                                    required
                                    className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Educational Qualification */}
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Educational qualification
                            </label>
                            <input
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                placeholder="Bachelor of Engineering"
                                className="w-full px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 transition-colors"
                            />
                        </div>

                        {/* Current Profile */}
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Current Profile
                            </label>
                            <select
                                name="profile"
                                value={formData.profile}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#1A1A1A] border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="">Select</option>
                                <option value="student">Student</option>
                                <option value="professional">Professional</option>
                                <option value="entrepreneur">Entrepreneur</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#FFF200] hover:bg-[#FFD500] text-black font-bold text-[16px] rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <MessageCircle className="w-5 h-5" />
                                    Get Fast Help
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyNowModal;
