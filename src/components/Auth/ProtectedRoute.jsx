import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute - Wrapper for routes that require authentication
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Redirect to home if not authenticated
    if (!isAuthenticated) {
        // Store the attempted location for redirect after login
        sessionStorage.setItem('auth_return_to', location.pathname);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
