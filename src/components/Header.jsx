// src/components/Header.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoRocketOutline, IoClose } from 'react-icons/io5';
import { assets } from '../assets/assets';
import UserProfile from './UserProfile';
import { useAuth } from '../contexts/AuthContext';
import { getStoredUtmParams, appendUtmParamsToUrl } from '../utils/utmUtils';

const GRAPHY_URL = "https://learn.expertisoracademy.in/t/u/activecourses";

const Header = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [dashboardUrl, setDashboardUrl] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (user) {
      // Get Graphy token from localStorage
      const graphyToken = localStorage.getItem('expertisor_graphy_token');
      if (graphyToken) {
        const utmParams = getStoredUtmParams();
        const baseUrl = `${GRAPHY_URL}?ssoToken=${graphyToken}`;
        const finalUrl = appendUtmParamsToUrl(baseUrl, utmParams);
        setDashboardUrl(finalUrl);
      }
    }
  }, [user]);







  const handleLogout = () => {
    setIsMenuVisible(false);
    logout();
  };

  const handleMobileMenuClick = () => {
    setIsMenuVisible(true);
  };

  const handleMobileLogin = () => {
    setIsMenuVisible(false);
    onLoginClick();
  };

  const handleLinkClick = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  const activeClass = 'inline-block py-2 md:py-3 px-2 rounded border border-white/60 bg-gradient-to-b from-black/10 to-yellow-500/10';
  const inActiveClass = 'inline-block py-2 md:py-3 px-2 rounded';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      {/* ${scrolled ? 'bg-black shadow-md' : 'bg-transparent'} */}
      <header className={`w-full  fixed top-0 left-0 z-[1000] transition-all duration-300 bg-black `}>
        {/* ✅ This parent div now uses flexbox to align its three main children */}
        <div className="flex justify-between items-center py-4 px-4  md:px-14 lg:px-20 ">

          {/* Item 1: Logo */}
          <div className="flex-shrink-0">
            <Link to="/"><img src={assets.logo_ex} alt="Expertisor Academy Logo" className="h-8" /></Link>
          </div>

          {/* ✅ Item 2: Navigation - It now grows to fill space and centers its content */}
          <nav className="hidden sm:flex flex-grow justify-center">
            <div className="bg-[#141414] flex items-center text-white gap-1 p-1 rounded-lg text-base">
              <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Home</NavLink>
              <NavLink to="/courses" className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Courses</NavLink>
              <NavLink to="/testimonials" className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Testimonials</NavLink>
              <NavLink to="/mentors" className={({ isActive }) => (isActive ? activeClass : inActiveClass)}>Mentors</NavLink>
            </div>
          </nav>

          {/* ✅ Item 3: Actions - This will be pushed to the right */}
          <div className="flex-shrink-0">
            {/* Desktop Login/Profile Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <>
                  <a href={dashboardUrl} target="_blank" rel="noopener noreferrer" className="dashboard-btn">
                    <span>My Learning Hub</span>
                    <IoRocketOutline />
                  </a>
                  <UserProfile userName={user.name} onLogout={logout} />
                </>
              ) : (
                <button onClick={onLoginClick} className="text-black py-2.5 px-5 bg-[#FFF200] font-semibold text-base rounded-md">
                  Login
                </button>
              )}
            </div>

            {/* Mobile Hamburger Icon */}
            <div className='sm:hidden block' onClick={handleMobileMenuClick}>
              <img src={assets.menu} alt="menu icon" className='h-6 w-6 cursor-pointer' />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuVisible && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[1001] flex flex-col items-center justify-start pt-20 text-white p-4">
          <button onClick={() => setIsMenuVisible(false)} className="absolute top-5 right-5 text-white">
            <IoClose size={32} />
          </button>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm">

            {/* Login/Profile Section */}
            {user ? (
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-white/20 w-full">
                <UserProfile userName={user.name} onLogout={handleLogout} />
                <a href={dashboardUrl} target="_blank" rel="noopener noreferrer" className="dashboard-btn inline-flex text-lg" onClick={handleLinkClick}>
                  <span>My Learning Hub</span>
                  <IoRocketOutline />
                </a>
              </div>
            ) : (
              <div className="pb-6 border-b border-white/20 w-full flex justify-center">
                <button
                  onClick={handleMobileLogin}
                  className="text-black py-3 px-8 bg-[#FFF200] font-semibold text-lg rounded-md"
                >
                  Login
                </button>
              </div>
            )}

            {/* Main Navigation Links */}
            <nav className="w-full">
              <ul className="flex flex-col items-center gap-5 text-xl text-gray-300">
                <li onClick={handleLinkClick}>
                  <NavLink to="/" className={({ isActive }) => isActive ? 'text-yellow font-semibold' : ''}>Home</NavLink>
                </li>
                <li onClick={handleLinkClick}>
                  <NavLink to="/courses" className={({ isActive }) => isActive ? 'text-yellow font-semibold' : ''}>Courses</NavLink>
                </li>
                <li onClick={handleLinkClick}>
                  <NavLink to="/testimonials" className={({ isActive }) => isActive ? 'text-yellow font-semibold' : ''}>Testimonials</NavLink>
                </li>
                <li onClick={handleLinkClick}>
                  <NavLink to="/mentors" className={({ isActive }) => isActive ? 'text-yellow font-semibold' : ''}>Mentors</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;












