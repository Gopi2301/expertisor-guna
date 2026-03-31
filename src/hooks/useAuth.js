import { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, verifyToken } from '../services/auth';

/**
 * Custom hook for authentication state management
 */
export const useAuth = () => {
    const [user, setUser] = useState(getCurrentUser());
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    useEffect(() => {
        const checkAuth = async () => {
            if (isAuthenticated()) {
                const valid = await verifyToken();
                setAuthenticated(valid);
                if (!valid) {
                    setUser(null);
                }
            } else {
                setAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const updateAuth = () => {
        setUser(getCurrentUser());
        setAuthenticated(isAuthenticated());
    };

    return {
        user,
        loading,
        authenticated,
        isAuthenticated: authenticated,
        updateAuth,
    };
};

export default useAuth;
