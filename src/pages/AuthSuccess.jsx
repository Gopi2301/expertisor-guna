import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

/**
 * AuthSuccess - Handles OAuth callback redirect
 * URL: /auth/success?appToken=...&graphyToken=...
 */
const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      const appToken = searchParams.get('appToken');
      const graphyToken = searchParams.get('graphyToken');
      const error = searchParams.get('error');

      // Handle error
      if (error) {
        toast.error('Authentication failed. Please try again.');
        navigate('/');
        return;
      }

      // Validate tokens
      if (!appToken || !graphyToken) {
        toast.error('Invalid authentication response.');
        navigate('/');
        return;
      }

      try {
        // Store tokens and set user
        const user = handleAuthCallback(appToken, graphyToken);
        toast.success(`Welcome back, ${user.name}!`);

        // Redirect to homepage or original destination
        const returnTo = sessionStorage.getItem('auth_return_to') || '/';
        sessionStorage.removeItem('auth_return_to');
        navigate(returnTo);
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Failed to complete authentication.');
        navigate('/');
      }
    };

    processCallback();
  }, [searchParams, navigate, handleAuthCallback]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Completing sign in...</p>
        <p className="text-neutral-500 text-sm mt-2">Please wait, you will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;