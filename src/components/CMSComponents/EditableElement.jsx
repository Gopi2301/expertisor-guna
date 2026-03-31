import React, { useState } from 'react';
import { Edit3, Check } from 'lucide-react';
import { useEditable } from '../../contexts/EditableContext';

/**
 * EditableElement - Wrapper for making preview elements editable
 * @param {string} fieldId - ID of the form field to focus
 * @param {string} label - Label to show on hover
 * @param {ReactNode} children - Content to wrap
 * @param {string} className - Additional classes
 */
const EditableElement = ({ fieldId, label, children, className = '' }) => {
    const { editMode, focusField, activeField } = useEditable();
    const [isHovered, setIsHovered] = useState(false);
    const isActive = activeField === fieldId;

    if (!editMode) {
        return <>{children}</>;
    }

    return (
        <div
            className={`relative group cursor-pointer transition-all ${className} ${isActive ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-[#0a0a0a]' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => focusField(fieldId)}
        >
            {children}

            {/* Edit Overlay */}
            {(isHovered || isActive) && (
                <div className="absolute inset-0 bg-yellow-400/5 border-2 border-yellow-400 rounded pointer-events-none">
                    <div className="absolute -top-8 left-0 flex items-center gap-2 px-2 py-1 bg-yellow-400 text-black text-xs font-medium rounded shadow-lg">
                        {isActive ? (
                            <>
                                <Check className="w-3 h-3" />
                                <span>Editing</span>
                            </>
                        ) : (
                            <>
                                <Edit3 className="w-3 h-3" />
                                <span>Click to edit {label}</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditableElement;
