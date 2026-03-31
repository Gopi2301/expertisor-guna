import React from 'react';
import { Check } from 'lucide-react';

/**
 * FeaturesList Component
 * Displays a list of features with checkmark icons
 */
const FeaturesList = ({ title, items = [] }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {title && (
                <p className="font-inter font-semibold text-[18px] sm:text-[20px] leading-[24px] text-white text-center">
                    {title}
                </p>
            )}
            <ul className="font-inter font-normal text-[14px] sm:text-[16px] leading-[20px] space-y-3 text-left md:text-center list-none">
                {items.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 justify-center md:justify-center">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-neutral-200">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeaturesList;
