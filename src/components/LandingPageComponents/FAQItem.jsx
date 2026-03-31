import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * FAQ Item Component
 * 
 * Collapsible FAQ with smooth animations
 */
const FAQItem = ({
    question = 'Frequently asked question?',
    answer = 'Answer to the question goes here.'
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
            {/* Question Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-800/50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className="text-white font-medium text-base pr-4">
                    {question}
                </span>
                <div className="flex-shrink-0">
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-yellow-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    )}
                </div>
            </button>

            {/* Answer */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-5 pb-5 pt-2">
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQItem;
