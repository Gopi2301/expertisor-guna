// src/components/HomeComponents/Courses.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// IMPORTANT: This component is now a static preview for your home page.
// It no longer fetches data using useState, useEffect, or apiClient.
// This prevents errors for users who are not logged in.

// The WeDo and Skills components should be managed by the main Home.jsx page,
// not inside this specific Courses component.
// import WeDo from './WeDo';
// import Skills from './Skills';

// A static example card to show the look and feel
const StaticCourseCard = ({ title, description, imageUrl }) => (
  <div className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden shadow-lg">
    <img 
      src={imageUrl} 
      alt={title} 
      className="w-full h-48 object-cover" 
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  </div>
);


const CoursesPreview = () => {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Popular Courses</h1>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore our curated list of courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Display a few static, hard-coded cards as a preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StaticCourseCard 
            title="React for Beginners" 
            description="Build modern, fast, and scalable web applications from scratch."
            imageUrl="https://placehold.co/400x225/F2E41D/000000?text=React"
          />
          <StaticCourseCard 
            title="Advanced Node.js" 
            description="Master backend development, APIs, and server-side logic."
            imageUrl="https://placehold.co/400x225/42c75a/000000?text=Node.js"
          />
          <StaticCourseCard 
            title="Full-Stack Web Dev" 
            description="Go from zero to hero and learn to build complete applications."
            imageUrl="https://placehold.co/400x225/2563eb/FFFFFF?text=Full-Stack"
          />
        </div>

        {/* Add a clear call-to-action button that links to the real courses page */}
        <div className="text-center">
          <Link 
            to="/courses"
            className="bg-yellow-400 text-black font-semibold py-3 px-8 rounded-lg text-lg hover:bg-yellow-500 transition-colors"
          >
            View All Courses
          </Link>
        </div>

        {/* The WeDo and Skills components should be rendered in your Home.jsx file */}
        {/* <WeDo /> */}
        {/* <Skills /> */}
      </div>
    </div>
  );
};

export default CoursesPreview;