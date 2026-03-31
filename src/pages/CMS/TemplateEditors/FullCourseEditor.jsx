import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Type,
    Image,
    DollarSign,
    Video,
    FileText,
    Gift,
    HelpCircle,
    Users
} from 'lucide-react';

/**
 * Full Course Template Editor (Template 4)
 * Allows editing all sections of the full course template
 */
const FullCourseEditor = ({ course, updateCourse }) => {
    const [expandedSections, setExpandedSections] = useState({
        hero: true,
        passiveIncome: false,
        offerBanner: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Initialize template_data if it doesn't exist
    const templateData = course.template_data || {};

    const updateTemplateData = (path, value) => {
        const keys = path.split('.');
        const newTemplateData = { ...templateData };

        let current = newTemplateData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current[keys[i]] = { ...current[keys[i]] };
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        updateCourse(prev => ({
            ...prev,
            template_data: newTemplateData
        }));
    };

    const inputClasses = "w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 transition-colors";
    const labelClasses = "block text-sm font-medium text-neutral-400 mb-2";

    return (
        <div className="space-y-4">
            {/* Hero Section Editor */}
            <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                <button
                    onClick={() => toggleSection('hero')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Type className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-base font-semibold text-white">Hero Section</h3>
                    </div>
                    {expandedSections.hero ? (
                        <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                </button>

                {expandedSections.hero && (
                    <div className="px-6 py-4 border-t border-neutral-800 space-y-4">
                        {/* Headline */}
                        <div>
                            <label className={labelClasses}>Headline</label>
                            <textarea
                                value={templateData.hero_section?.head || ''}
                                onChange={(e) => updateTemplateData('hero_section.head', e.target.value)}
                                placeholder="Master the skills that get you hired..."
                                className={`${inputClasses} min-h-[80px]`}
                            />
                        </div>

                        {/* Highlight Words */}
                        <div>
                            <label className={labelClasses}>Highlight Words (comma separated)</label>
                            <input
                                type="text"
                                value={templateData.hero_section?.highlights?.join(', ') || ''}
                                onChange={(e) => updateTemplateData('hero_section.highlights', e.target.value.split(',').map(s => s.trim()))}
                                placeholder="Master, hired"
                                className={inputClasses}
                            />
                            <p className="text-xs text-neutral-500 mt-1">Words to highlight in yellow</p>
                        </div>

                        {/* Paragraph */}
                        <div>
                            <label className={labelClasses}>Description</label>
                            <textarea
                                value={templateData.hero_section?.para || ''}
                                onChange={(e) => updateTemplateData('hero_section.para', e.target.value)}
                                placeholder="Transform your career with our comprehensive training program..."
                                className={`${inputClasses} min-h-[80px]`}
                            />
                        </div>

                        {/* CTA Button */}
                        <div>
                            <label className={labelClasses}>CTA Button Text</label>
                            <input
                                type="text"
                                value={templateData.hero_section?.start_button?.name || ''}
                                onChange={(e) => updateTemplateData('hero_section.start_button.name', e.target.value)}
                                placeholder="Apply Now"
                                className={inputClasses}
                            />
                        </div>

                        {/* Use Modal Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="useModal"
                                checked={templateData.hero_section?.start_button?.useModal || false}
                                onChange={(e) => updateTemplateData('hero_section.start_button.useModal', e.target.checked)}
                                className="w-4 h-4 accent-yellow-400"
                            />
                            <label htmlFor="useModal" className="text-sm text-neutral-400">
                                Open Apply Modal on click
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Passive Income Section Editor */}
            <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                <button
                    onClick={() => toggleSection('passiveIncome')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-base font-semibold text-white">Pricing Section</h3>
                    </div>
                    {expandedSections.passiveIncome ? (
                        <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                </button>

                {expandedSections.passiveIncome && (
                    <div className="px-6 py-4 border-t border-neutral-800 space-y-4">
                        {/* Heading */}
                        <div>
                            <label className={labelClasses}>Section Heading</label>
                            <input
                                type="text"
                                value={templateData.passive_income?.head || ''}
                                onChange={(e) => updateTemplateData('passive_income.head', e.target.value)}
                                placeholder="Ready to dive into the 3D universe?"
                                className={inputClasses}
                            />
                        </div>

                        {/* Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Sale Price</label>
                                <input
                                    type="text"
                                    value={templateData.passive_income?.card?.price || ''}
                                    onChange={(e) => updateTemplateData('passive_income.card.price', e.target.value)}
                                    placeholder="₹ 6,999"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Original Price</label>
                                <input
                                    type="text"
                                    value={templateData.passive_income?.card?.original_price || ''}
                                    onChange={(e) => updateTemplateData('passive_income.card.original_price', e.target.value)}
                                    placeholder="₹ 12,499"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Coupon Code</label>
                                <input
                                    type="text"
                                    value={templateData.passive_income?.card?.coupon_code || ''}
                                    onChange={(e) => updateTemplateData('passive_income.card.coupon_code', e.target.value)}
                                    placeholder="MAXOFFER43"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Discount Percent</label>
                                <input
                                    type="text"
                                    value={templateData.passive_income?.card?.discount_percent || ''}
                                    onChange={(e) => updateTemplateData('passive_income.card.discount_percent', e.target.value)}
                                    placeholder="44%"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Expires In */}
                        <div>
                            <label className={labelClasses}>Expires In Text</label>
                            <input
                                type="text"
                                value={templateData.passive_income?.card?.expires_in || ''}
                                onChange={(e) => updateTemplateData('passive_income.card.expires_in', e.target.value)}
                                placeholder="1 days 23 hours 59 minutes"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Offer Banner Editor */}
            <div className="bg-[#111] rounded-xl border border-neutral-800 overflow-hidden">
                <button
                    onClick={() => toggleSection('offerBanner')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-base font-semibold text-white">Sticky Offer Banner</h3>
                    </div>
                    {expandedSections.offerBanner ? (
                        <ChevronUp className="w-5 h-5 text-neutral-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                </button>

                {expandedSections.offerBanner && (
                    <div className="px-6 py-4 border-t border-neutral-800 space-y-4">
                        {/* Title */}
                        <div>
                            <label className={labelClasses}>Banner Title</label>
                            <input
                                type="text"
                                value={templateData.OfferBanner?.title || ''}
                                onChange={(e) => updateTemplateData('OfferBanner.title', e.target.value)}
                                placeholder="3DS Max Mastery Program"
                                className={inputClasses}
                            />
                        </div>

                        {/* Coupon Code */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Coupon Code</label>
                                <input
                                    type="text"
                                    value={templateData.OfferBanner?.coupen_code || ''}
                                    onChange={(e) => updateTemplateData('OfferBanner.coupen_code', e.target.value)}
                                    placeholder="MAXOFFER43"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Discount %</label>
                                <input
                                    type="number"
                                    value={templateData.OfferBanner?.discount_percent || ''}
                                    onChange={(e) => updateTemplateData('OfferBanner.discount_percent', parseInt(e.target.value) || 0)}
                                    placeholder="44"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Countdown Days */}
                        <div>
                            <label className={labelClasses}>Countdown Days</label>
                            <input
                                type="number"
                                value={templateData.OfferBanner?.no_days || 2}
                                onChange={(e) => updateTemplateData('OfferBanner.no_days', parseInt(e.target.value) || 2)}
                                placeholder="2"
                                className={inputClasses}
                            />
                            <p className="text-xs text-neutral-500 mt-1">Number of days for countdown timer</p>
                        </div>

                        {/* Brochure Link */}
                        <div>
                            <label className={labelClasses}>Brochure URL (optional)</label>
                            <input
                                type="text"
                                value={templateData.OfferBanner?.d_broucher || ''}
                                onChange={(e) => updateTemplateData('OfferBanner.d_broucher', e.target.value)}
                                placeholder="/course-brochure.pdf"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Info Note */}
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                <p className="text-sm text-yellow-400">
                    <strong>Note:</strong> Template 4 uses data from the template_data field.
                    Rating, Demands, Course Preview, Mentor, Reviews, and FAQ sections can be configured
                    separately or will use default content.
                </p>
            </div>
        </div>
    );
};

export default FullCourseEditor;
