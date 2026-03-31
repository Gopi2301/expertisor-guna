import { X } from "lucide-react";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { assets } from "../../assets/assets";
import { getDealNameFromRoute } from '../../utils/geolocation';
import { submitToZoho } from '../../utils/zohoApi';
import CountryCodePicker from '../CountryCodePicker';

/**
 * Apply Modal Component for RHCSA
 * Matches guna-dev Simple Elite styling with Zoho integration
 */
const ApplyModal = ({ open, onClose, onSuccess, courseId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+91',
        phone: '',
        qualification: '',
        profile: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!open) {
            setFormData(prev => ({
                ...prev,
                name: '',
                email: '',
                phone: '',
                qualification: '',
                profile: ''
            }));
        }
    }, [open]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && open) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission to Zoho
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Resolve deal name from shared mapping utility
            const course = getDealNameFromRoute();

            // Combine country code and phone number
            const fullPhone = formData.countryCode + formData.phone;
            console.log('🚀 [RHCSA ApplyModal] Submitting form...', { ...formData, phone: fullPhone, course });

            const payload = {
                name: formData.name,
                email: formData.email,
                phone: fullPhone,
                qualification: formData.qualification,
                profile: formData.profile,
                courseName: course,
                // Deal fields for Zoho CRM
                Course_ID: courseId, // New field for numeric lookup
                Deal_Name: course,
                Course: course,
                Amount: "0",
                Pipeline: "Course-Pipeline",
                Stage: "Lead Captured",
            };

            const result = await submitToZoho('/api/zoho/submit-form.php', payload);
            console.log('✅ [RHCSA ApplyModal] Submission response:', result);

            toast.success('Thank you! Redirecting to the course preview...');

            // Call onSuccess callback to navigate to video
            if (onSuccess) {
                setTimeout(() => {
                    onClose();
                    onSuccess();
                }, 1000);
            } else {
                setTimeout(() => onClose(), 1500);
            }
        } catch (error) {
            console.error('❌ [RHCSA ApplyModal] Submission error:', error);
            toast.error(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 pt-5">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-[360px] sm:max-w-[380px]
                   rounded-xl bg-black border border-white/10 p-4 sm:p-5 text-white"
            >

                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h2 className=" font-semibold text-[13px] md:text-[15px] leading-tight uppercase">
                            <span className="text-yellow">Struggling</span> to figure it out alone?
                        </h2>

                        <div className="text-[#8A8A8A]">
                            <span className="text-[11px] ">Get Expert</span>
                            <span className="relative inline-flex items-center mt-1 px-3 py-1">

                                {/* SVG Outline */}
                                <img
                                    src={assets.outer_line}
                                    alt=""
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                />

                                {/* Text */}
                                <span className="relative z-10 text-[11px] ">
                                    <span className="">1:1 Guidance</span>
                                </span>

                            </span>
                        </div>


                    </div>

                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-full border border-white/20
                       flex items-center justify-center hover:bg-white/10"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-4 space-y-3" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div>
                        <label className="text-xs text-white/70">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                            className="mt-1 w-full bg-[#141414] border border-white/10
                           rounded-md px-3 py-2.5 text-sm outline-none
                           placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-white/70">Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="yourname@gmail.com"
                            className="mt-1 w-full bg-[#141414] border border-white/10
                           rounded-md px-3 py-2.5 text-sm outline-none
                           placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-xs text-white/70">Phone Number*</label>
                        <div className="mt-1 flex gap-2">
                            <CountryCodePicker
                                value={formData.countryCode}
                                onChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter WhatsApp Number"
                                className="flex-1 bg-[#141414] border border-white/10
                           rounded-md px-3 py-2.5 text-sm outline-none
                           placeholder:text-white/30 focus:border-yellow transition-colors"
                            />
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="text-xs text-white/70">
                            Educational qualification
                        </label>
                        <input
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            placeholder="Bachelor of Engineering"
                            className="mt-1 w-full bg-[#141414] border border-white/10
                         rounded-md px-3 py-2.5 text-sm outline-none
                         placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                    </div>

                    {/* Profile */}
                    <div>
                        <label className="text-xs text-white/70">Current Profile</label>
                        <select
                            name="profile"
                            value={formData.profile}
                            onChange={handleChange}
                            className="mt-1 w-full bg-[#141414] border border-white/10
                         rounded-md px-3 py-2.5 text-sm outline-none text-white/60 focus:border-yellow transition-colors"
                        >
                            <option value="">Select</option>
                            <option value="Student">Student</option>
                            <option value="Working Professional">Working Professional</option>
                            <option value="Business Owner">Business Owner</option>
                        </select>
                    </div>



                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full bg-yellow text-black font-semibold
             py-2.5 rounded-md text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <img
                                    src={assets.help}
                                    alt="Support"
                                    className="w-4 h-4"
                                />
                                Get Fast Help
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
