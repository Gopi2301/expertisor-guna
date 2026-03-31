// src/components/HomeComponents/LoginModal.jsx

// --- 1. Import Core Libraries and Components ---
import React, { useState, useRef, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { assets } from '../../assets/assets'; // For images
import apiClient from '../../api/apiClient'; // For making API calls
import authService from '../../services/authService'; // For OAuth login

// Get the dynamic API URL from environment variables.
const API_URL = import.meta.env.VITE_API_URL;

/**
 * A responsive modal component for handling user login and registration.
 *
 * @param {object} props - Component props.
 * @param {Function} props.onClose - A callback function to close the modal.
 */
const LoginModal = ({ onClose }) => {
  // --- 2. State Management ---
  const [mode, setMode] = useState('login'); // Toggles between 'login' and 'signup' forms.
  const [showOtpScreen, setShowOtpScreen] = useState(false); // Controls visibility of the OTP screen.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill("")); // Manages the 4-digit OTP input.
  const [loading, setLoading] = useState(false); // Disables buttons during API calls.
  const [error, setError] = useState(''); // Displays error messages to the user.
  const inputRefs = useRef([]); // Refs for OTP inputs to manage focus automatically.

  // Effect to auto-focus the first OTP input when the screen appears.
  useEffect(() => {
    if (showOtpScreen) {
      inputRefs.current[0]?.focus();
      setOtp(new Array(4).fill("")); // Clear previous OTP on re-entry.
    }
  }, [showOtpScreen]);

  // --- 3. Event Handlers ---

  /**
   * Handles the initial step of email-based authentication for both login and signup.
   * It now correctly handles the loading state in both success and error cases.
   */
  const handleManualAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      await apiClient.post('/api/auth/initiate-otp', { name, email, password });
      setShowOtpScreen(true);
      setLoading(false); // Stop loading on success before screen transition
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      setLoading(false); // CRUCIAL: Stop loading on error so the user isn't stuck.
    }
  };

  /**
   * Handles the final step: verifying the OTP entered by the user.
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError("Please enter the complete 4-digit OTP.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post(`/api/virtuagrid/verify-otp`, { email, otp: enteredOtp });
      const { appToken, graphyToken } = response.data;
      if (appToken && graphyToken) {
        const userInfo = { appToken, graphyToken };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        onClose();
        window.location.reload();
      } else {
        throw new Error("Invalid response from server during OTP verification.");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manages changes in the OTP input fields and auto-focuses the next input.
   */
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  /**
   * Handles the 'Backspace' key in OTP fields to move focus to the previous input.
   */
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  // --- 4. JSX Render ---
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-4">
      {/* Dark overlay that closes the modal on click */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main modal container with responsive width and layout */}
      <div className="relative bg-black rounded-2xl text-white w-full max-w-3xl mx-auto flex flex-col md:flex-row overflow-hidden">

        {/* Left side image panel (hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-4">
          <img src={assets.ex_logo} alt="Expertisor Academy Logo" className="max-w-full h-auto object-contain" />
        </div>

        {/* Mobile-specific header with a smaller logo and a close button */}
        <div className="relative w-full md:hidden flex items-center justify-center px-4 pt-4 pb-2">
          <img src={assets.ex_logo_mob} alt="Expertisor Academy Logo" className="max-h-36 w-auto object-contain" />
          <img
            src={assets.close}
            alt="Close modal"
            className="absolute top-2 right-2 border p-2 rounded-lg border-[#373737] cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Right side form content with responsive padding */}
        <div className="w-full md:w-1/2 py-6 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-center">

          {showOtpScreen ? (
            // --- OTP Verification Form ---
            <form onSubmit={handleVerifyOtp}>
              <h2 className="font-clash font-semibold text-xl sm:text-2xl uppercase text-center">CHECK YOUR <span className="text-yellow">EMAIL</span></h2>
              <p className="mt-2 mb-6 text-gray-300 text-center text-sm">We’ve sent a 4-digit code to <strong>{email}</strong></p>
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((data, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={e => handleOtpChange(e, i)}
                    onKeyDown={e => handleOtpKeyDown(e, i)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-black font-bold text-xl rounded-md bg-gray-100 focus:outline-yellow"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-center text-sm my-2">{error}</p>}
              <button type="submit" disabled={loading} className="bg-yellow text-black w-full py-2 rounded-md font-semibold mb-3 disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify'}
              </button>
              <button type="button" onClick={() => { setShowOtpScreen(false); setError(''); }} className="bg-[#0F0F0F] text-white w-full py-2 rounded-md border border-gray-600">
                Cancel
              </button>
            </form>
          ) : (
            // --- Login/Signup Form ---
            <form onSubmit={handleManualAuth}>
              <h2 className="font-clash font-semibold text-lg sm:text-xl text-center uppercase">Learn from <span className="text-yellow">top creator</span> mentors</h2>
              <p className="mt-2 mb-6 text-gray-300 text-center text-sm">Begin your journey of learning with us today.</p>

              {/* Social Login Buttons */}
              <button
                onClick={() => authService.initiateGoogleLogin()}
                className="flex items-center justify-center gap-3 px-4 py-2 bg-[#0F0F0F] hover:bg-gray-800 rounded-md mb-2 w-full"
              >
                <FcGoogle className="w-5 h-5" /> Continue with Google
              </button>
              <button
                onClick={() => authService.initiateGitHubLogin()}
                className="flex items-center justify-center gap-3 px-4 py-2 bg-[#0F0F0F] hover:bg-gray-800 rounded-md w-full"
              >
                <FaGithub className="w-5 h-5" /> Continue with GitHub
              </button>
              {/* 
              {/* <div className="text-center text-sm text-gray-400 my-4">or</div> */}

              {/* Conditional Signup Fields */}
              {/* {mode === 'signup' && (
                <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-2 px-4 py-2">
                  <IoPersonSharp className="text-gray-400 mr-2" />
                  <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-transparent outline-none text-sm" />
                </label>
              )} */}
              {/* Email Input (common to both modes) */}
              {/* <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-2 px-4 py-2">
                <MdEmail className="text-gray-400 mr-2" />
                <input type="email" placeholder="Enter Email address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-transparent outline-none text-sm" />
              </label> */}
              {/* Conditional Signup Password Fields */}
              {/* {mode === 'signup' && (
                <>
                  <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-2 px-4 py-2">
                    <MdLock className="text-gray-400 mr-2" />
                    <input type="password" placeholder="Enter Password (min. 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-transparent outline-none text-sm" />
                  </label>
                  <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-4 px-4 py-2">
                    <MdLock className="text-gray-400 mr-2" />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-transparent outline-none text-sm" />
                  </label>
                </>
              )}

              {error && <p className="text-red-500 text-center text-sm my-2">{error}</p>}
              
              {/* Main Action Button */}
              {/* <button type="submit" disabled={loading} className="bg-yellow text-black w-full py-2 rounded-md font-semibold disabled:opacity-50">
                {loading ? 'Processing...' : (mode === 'signup' ? 'Create Account' : 'Continue with Email')}
              </button> */}

              {/* Toggle link between Login and Signup modes */}
              {/* <p className="text-sm mt-4 text-center">
                {mode === 'signup' ? "Already have an account?" : "Don't have an account?"}{' '}
                <span className="text-yellow cursor-pointer" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}>
                  {mode === 'signup' ? "Log In" : "Sign Up"}
                </span>
              </p>  */}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;