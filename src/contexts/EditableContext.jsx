import React, { createContext, useContext, useState } from 'react';

/**
 * EditableContext - Context for managing editable elements
 */
const EditableContext = createContext({
    editMode: false,
    setEditMode: () => { },
    focusField: () => { },
    activeField: null
});

export const useEditable = () => useContext(EditableContext);

export const EditableProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(true); // Always on in CMS
    const [activeField, setActiveField] = useState(null);

    const focusField = (fieldId) => {
        setActiveField(fieldId);
        // Scroll to and focus the field in the editor
        const element = document.getElementById(fieldId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();

            // Highlight the field briefly
            element.classList.add('ring-2', 'ring-yellow-400', 'ring-offset-2', 'ring-offset-neutral-900');
            setTimeout(() => {
                element.classList.remove('ring-2', 'ring-yellow-400', 'ring-offset-2', 'ring-offset-neutral-900');
            }, 2000);
        }
    };

    return (
        <EditableContext.Provider value={{ editMode, setEditMode, focusField, activeField }}>
            {children}
        </EditableContext.Provider>
    );
};

export default EditableContext;
