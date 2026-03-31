// src/components/UserProfile.jsx

import React, { useState, useEffect, useRef } from 'react';

/**
 * A helper function to generate user initials from a full name string.
 * This is used for creating a fallback avatar if no profile picture is available.
 *
 * @param {string} name - The user's full name.
 * @returns {string} A string containing the user's initials (e.g., "JD" for "John Doe").
 */
const getInitials = (name) => {
  // --- 1. Input Validation ---
  // Return a fallback if the name is not a valid string.
  if (!name || typeof name !== 'string') return '??';

  // --- 2. Process the Name ---
  //  a. `trim()`: Remove any leading/trailing whitespace.
  //  b. `split(' ')`: Split the name into an array of words.
  //  c. `filter(Boolean)`: Remove any empty strings that might result from multiple spaces.
  const parts = name.trim().split(' ').filter(Boolean);

  // --- 3. Determine Initials based on the number of name parts ---
  // If the user has only one name (e.g., "Admin"), take the first two letters.
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  // If the user has multiple names (e.g., "John Fitzgerald Doe"), take the first
  // letter of the first name and the first letter of the last name.
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};


/**
 * A component that displays a user's profile information in the header.
 * It shows the user's initials and, when clicked, reveals a dropdown menu with a logout option.
 *
 * @param {object} props - Component props.
 * @param {string} props.userName - The full name of the logged-in user.
 * @param {Function} props.onLogout - The callback function to execute when the logout button is clicked.
 */
const UserProfile = ({ userName, onLogout }) => {
  // --- State Management ---

  // `isMenuOpen`: A boolean state to control the visibility of the dropdown menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // `dropdownRef`: A ref to attach to the main container div of the component.
  // This allows us to detect clicks outside the component to close the menu.
  const dropdownRef = useRef(null);

  // --- Effects ---

  // This effect sets up a global event listener to handle clicks outside the component.
  // This is a common pattern for closing dropdowns, modals, or popovers.
  useEffect(() => {
    /**
     * Closes the menu if a click is detected outside of the component's DOM node.
     * @param {MouseEvent} event - The mousedown event object.
     */
    const handleClickOutside = (event) => {
      // The `dropdownRef.current` holds the actual DOM element.
      // `!dropdownRef.current.contains(event.target)` checks if the clicked element
      // is NOT a child of our component's main div.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu.
      }
    };

    // Add the event listener to the entire document when the component mounts.
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function: This is crucial to prevent memory leaks.
    // It removes the event listener when the component unmounts.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.


  // --- JSX Render ---

  return (
    // The main container div for the component, with the ref attached.
    // The CSS class `profile-dropdown` is used for positioning.
    <div className="profile-dropdown" ref={dropdownRef}>
      
      {/* The main button that the user clicks to open/close the menu. */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggles the `isMenuOpen` state on each click.
        className="profile-menu-button"
      >
        {/* The user's initials are displayed here. */}
        <span className="initials">{getInitials(userName)}</span>
        
        {/* A chevron icon to indicate that this is a dropdown. */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {/* Conditional rendering of the dropdown menu.
          This block is only rendered if `isMenuOpen` is true. */}
      {isMenuOpen && (
        <div className="dropdown-menu">
          {/* The logout button inside the dropdown. */}
          <button onClick={onLogout} className="logout-btn">
            <span>Logout</span>
            {/* A logout icon for visual clarity. */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;