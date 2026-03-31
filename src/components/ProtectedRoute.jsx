import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/cms/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
