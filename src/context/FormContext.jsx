import { createContext, useContext, useState } from "react";

// Create context for form modal state
const FormContext = createContext();

// Provider component
export const FormProvider = ({ children }) => {
    const [showApplyModal, setShowApplyModal] = useState(false);

    return (
        <FormContext.Provider value={{ showApplyModal, setShowApplyModal }}>
            {children}
        </FormContext.Provider>
    );
};

// Custom hook for consuming the context
export const useFormContext = () => useContext(FormContext);
