import React from 'react';
import { X } from 'lucide-react';
import SocialButton from './SocialButton';
import { useAuth } from '../../hooks/useAuth';

/**
 * LoginModal - Social login modal
 */
const LoginModal = ({ isOpen, onClose }) => {
    const { loginWithGoogle, loginWithGitHub } = useAuth();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-[#111] rounded-2xl shadow-2xl border border-neutral-800 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-neutral-400">
                            Sign in to access your courses and dashboard
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <SocialButton
                            provider="google"
                            onClick={loginWithGoogle}
                        />
                        <SocialButton
                            provider="github"
                            onClick={loginWithGitHub}
                        />
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-xs text-center text-neutral-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
