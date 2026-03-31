import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

/**
 * AuthProvider - Global authentication state management
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from stored tokens
    useEffect(() => {
        const initAuth = () => {
            try {
                const currentUser = authService.getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                console.error('Auth initialization error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login with Google
    const loginWithGoogle = useCallback(() => {
        authService.initiateGoogleLogin();
    }, []);

    // Login with GitHub
    const loginWithGitHub = useCallback(() => {
        authService.initiateGitHubLogin();
    }, []);

    // Handle OAuth callback
    const handleAuthCallback = useCallback((appToken, graphyToken) => {
        try {
            const userData = authService.handleAuthCallback(appToken, graphyToken);
            setUser(userData);
            setError(null);
            return userData;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setError(null);
    }, []);

    // Redirect to Graphy platform
    const goToGraphy = useCallback(() => {
        try {
            authService.redirectToGraphy();
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        loginWithGoogle,
        loginWithGitHub,
        handleAuthCallback,
        logout,
        goToGraphy
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * useAuth Hook - Access authentication context
 */
export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
