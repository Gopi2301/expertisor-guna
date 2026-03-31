// // src/App.jsx

// // --- 1. Import Core Libraries and Components ---
// import React, { useState, useCallback, useEffect } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast'; // For showing notifications

// // Import global font styles.
// import "@fontsource/inter";

// // Import layout components.
// import Header from './components/Header';
// import Footer from './components/Footer';
// import LoginModal from './components/HomeComponents/LoginModal';

// // Import page components.
// import Home from './pages/Home';
// import Courses from './pages/Courses';
// import Testimonials from './pages/Testimonials';
// import Course from './pages/Course';
// import Mentors from './pages/Mentors';
// import Initiative from './pages/Initiative';
// import AuthSuccess from './pages/AuthSuccess';

// // Import nested route components for the Course page.
// import Videos from './components/CourseComponents/Videos';
// import StudRev from './components/CourseComponents/StudRev';
// import AffilateMarketing from './pages/AffilateMarketing';
// import ThreeDMax from './pages/ThreeDMax'
// import TermsAndServices from './pages/TermsAndServices';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import RefundAndCertificationPolicy from './pages/RefundAndCertificationPolicy';
// import AmazonCourse from './pages/AmazonCourse';
// import { getUtmParams, storeUtmParams } from './utils/utmUtils';
// import BecomeMentor from './pages/BecomeMentor';
// import WhyLearnCourse from './pages/WhyLearnCourse';
// import WhatsAppButton from './components/WhatsAppButton'
// import SolidWorks from './pages/SolidWorks';
// import Civil3D from './pages/Civil3D';
// import Mentorship from './pages/Mentorship';
// import { pages } from './constants/pages';
// import MentDet from './components/MentorshipComponents/MentDet';
// import { Navigate } from 'react-router-dom';

// /**
//  * The main root component of the application.
//  * It sets up the overall page structure, routing, and modal visibility.
//  */
// const App = () => {
//   // --- 2. Hooks and State Management ---

//   useEffect(() => {
//     const utmParams = getUtmParams();
//     if (Object.keys(utmParams).length > 0) {
//       storeUtmParams(utmParams);
//     }
//   }, []);

//   // `useLocation` hook from React Router gives us access to the current URL location object.
//   const location = useLocation();
//   // An array of routes where the standard Header and Footer should be hidden.
//   const layoutHiddenRoutes = ['/techbundle', '/auth/success'];
//   // A boolean to determine if the current route should hide the layout.
//   const isLayoutHidden = layoutHiddenRoutes.includes(location.pathname);

//   // scrll to top
//   useEffect(() => {
//     // prevent the browser from restoring the old scroll position
//     if ('scrollRestoration' in window.history) {
//       window.history.scrollRestoration = 'manual';
//     }

//     // ensure it runs after the route content is rendered
//     const id = requestAnimationFrame(() => {
//       window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
//       // extra guards for some browsers
//       document.documentElement.scrollTop = 0;
//       document.body.scrollTop = 0;
//     });

//     return () => cancelAnimationFrame(id);
//   }, [location.pathname]);

//   // `useState` to control the visibility of the Login Modal.
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   // `useCallback` is used to memoize these functions so they don't get recreated on every render,
//   // which is a performance optimization when passing them down as props.
//   const handleOpenLoginModal = useCallback(() => setShowLoginModal(true), []);
//   const handleCloseLoginModal = useCallback(() => setShowLoginModal(false), []);

//   // --- 3. JSX Render with Layout Fix ---

//   return (
//     // ✅ THIS IS THE ROOT LAYOUT FIX:
//     // `min-h-screen`: Ensures the app's container is at least as tall as the browser viewport.
//     // `flex flex-col`: Establishes a vertical flexbox layout. This is key to making `flex-grow` work.

//     <div className='font-inter bg-black min-h-screen flex flex-col text-white'>

//       {/* Toaster component for displaying notifications globally. */}
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         toastOptions={{
//           style: { background: '#333', color: '#fff', border: '1px solid #555' },
//           error: { style: { background: '#EF4444', color: '#fff' } }
//         }}
//       />

//       {/* Conditionally render the Header unless the route is in the hidden list. */}

//       {/* {!isLayoutHidden && <Header onLoginClick={handleOpenLoginModal} />} */}

//       {!['/eliteconnect'].includes(location.pathname) || !isLayoutHidden && (
//         <Header onLoginClick={handleOpenLoginModal} />
//       )}

//       {/* The <main> element wraps the page content. */}
//       {/* ✅ `flex-grow`: This crucial class tells the main content area to expand and
//           take up all available free space, pushing the Footer to the bottom of the screen. */}
//       {/* The margin-top (`mt-20`) creates space for the fixed header. */}
//       <main className={`flex-grow ${!isLayoutHidden  ? 'mt-20 sm:mt-20' : ''}`}>

//         {/* React Router's <Routes> component manages all the page routes. */}
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/courses' element={<Courses />} />
//           <Route path='/testimonials' element={<Testimonials />} />
//           {/* Nested routes for the Course details page. */}
//           <Route path='/course/:id' element={<Course />}>
//             <Route index element={<Videos />} />
//             <Route path='review' element={<StudRev />} />
//           </Route>
//           <Route path='/mentors' element={<Mentors />} />
//           <Route path='/techbundle' element={<Initiative />} />
//           <Route path='/auth/success' element={<AuthSuccess />} />
//           <Route path='/reels-affiliate-marketing-tamil' element={<AffilateMarketing />} />
//           <Route path='/3dsmax-tamil' element={<ThreeDMax />} />
//           <Route path='/termsandservices' element={<TermsAndServices />} />
//           <Route path='/privacypolicy' element={<PrivacyPolicy />} />
//           <Route path='/RefundAndCertificationPolicy' element={<RefundAndCertificationPolicy />} />
//           <Route path='/amazon-seller-tamil-course' element={<AmazonCourse />} />
//           <Route path='/creator-mentor' element={<BecomeMentor />} />
//           <Route path="/whylearncourse/:slug" element={<WhyLearnCourse />} />
//           <Route path='/solidworks-tamil' element={<SolidWorks />} />
//           <Route path='/civil3d-tamil' element={<Civil3D />} />
//           {/* <Route path='/mentorship' element={<Mentorship data={pages.mentorship.mentor_raghulan} />} />
//           <Route path='/mentorship/book/:id' element={<MentDet />} /> */}
//           {/* Default mentorship route → redirect to mentor_raghulan */}
//           <Route path="/eliteconnect" element={<Navigate to="/eliteconnect/askraghulan" />} />

//           {/* Dynamic eliteconnect route */}
//           <Route path="/eliteconnect/:mentorKey" element={<Mentorship />} />

//           {/* eliteconnect booking route */}
//           <Route path="/eliteconnect/:mentorKey/life-transformation" element={<MentDet />} />

//           {/* Optional: fallback / home route */}
//           <Route path="*" element={<div>Page Not Found</div>} />
//         </Routes>
//       </main>

//       {/* Conditionally render the Footer. It will be at the bottom because <main> grew to fill the space. */}
//       {!isLayoutHidden && <Footer />}

//       {/* Conditionally render the Login Modal based on the `showLoginModal` state. */}
//       {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}
//       {/*
//       <div className='fixed bottom-24 lg:bottom-32 right-6 md:right-10 z-10 '>
//         <WhatsAppButton />
//       </div> */}

//       {/* Conditionally render WhatsApp Button */}
//       {!['/eliteconnect'].includes(location.pathname) && (
//         <div className='fixed bottom-24 lg:bottom-32 right-6 md:right-10 z-[9999]'>
//           <WhatsAppButton />
//         </div>
//       )}

//     </div>
//   );
// };

// export default App;

// src/App.jsx
import React, { useState, useCallback, useEffect, Suspense } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "@fontsource/inter";

// Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/HomeComponents/LoginModal";
import WhatsAppButton from "./components/WhatsAppButton";
import LoadingSpinner from "./components/LoadingSpinner";

// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Courses = React.lazy(() => import("./pages/Courses"));
const Testimonials = React.lazy(() => import("./pages/Testimonials"));
const Course = React.lazy(() => import("./pages/Course"));
const Videos = React.lazy(() => import("./components/CourseComponents/Videos"));
const StudRev = React.lazy(() => import("./components/CourseComponents/StudRev"));
const Mentors = React.lazy(() => import("./pages/Mentors"));
const Initiative = React.lazy(() => import("./pages/Initiative"));
const AuthSuccess = React.lazy(() => import("./pages/AuthSuccess"));
const AffilateMarketing = React.lazy(() => import("./pages/AffilateMarketing"));
const ThreeDMax = React.lazy(() => import("./pages/ThreeDMax"));
const TermsAndServices = React.lazy(() => import("./pages/TermsAndServices"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const RefundAndCertificationPolicy = React.lazy(() => import("./pages/RefundAndCertificationPolicy"));
const AmazonCourse = React.lazy(() => import("./pages/AmazonCourse"));
const BecomeMentor = React.lazy(() => import("./pages/BecomeMentor"));
const WhyLearnCourse = React.lazy(() => import("./pages/WhyLearnCourse"));
const SolidWorks = React.lazy(() => import("./pages/SolidWorks"));
const Civil3D = React.lazy(() => import("./pages/Civil3D"));
const Mentorship = React.lazy(() => import("./pages/Mentorship"));
const BusinessWebinar = React.lazy(() => import("./pages/BusinessWebinar"));
const MentDet = React.lazy(() => import("./components/MentorshipComponents/MentDet"));
import { getUtmParams, storeUtmParams } from "./utils/utmUtils";
const Blockchain = React.lazy(() => import("./pages/Blockchain"));
const SSRCourse = React.lazy(() => import("./pages/SSRCourse"));
const Workshops = React.lazy(() => import("./pages/Workshops"));

import { pages } from "./constants/pages";

// CMS Pages
const CMSLayout = React.lazy(() => import("./components/CMSComponents/CMSLayout"));
const Settings = React.lazy(() => import("./pages/CMS/Settings"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const CourseList = React.lazy(() => import("./pages/CMS/CourseList"));
const CourseEditor = React.lazy(() => import("./pages/CMS/CourseEditor"));
const Dashboard = React.lazy(() => import("./pages/CMS/Dashboard"));
const CourseListing = React.lazy(() => import("./pages/CourseListing"));
const CourseDetail = React.lazy(() => import("./pages/CourseDetail"));
const Login = React.lazy(() => import("./pages/CMS/Login"));
const TemplatePreview = React.lazy(() => import("./pages/CMS/TemplatePreview"));
import ProtectedRoute from "./components/ProtectedRoute";
const Rhcsa = React.lazy(() => import("./pages/Rhcsa"));
const RhscaVideo = React.lazy(() => import("./pages/RhscaVideo"));
const Template = React.lazy(() => import("./pages/landingPages/Template"));
import { FormProvider } from "./context/FormContext";
const BusinessWebinarOnboarding = React.lazy(() => import("./pages/BusinessWebinarOnboarding"));

const App = () => {
  const location = useLocation();

  // --- Scroll to top on route change ---
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  // --- Handle UTMs ---
  useEffect(() => {
    const utmParams = getUtmParams();
    if (Object.keys(utmParams).length > 0) storeUtmParams(utmParams);
  }, []);

  // --- Layout visibility ---
  const layoutHiddenRoutes = ["/auth/success"];
  const isLayoutHidden = layoutHiddenRoutes.includes(location.pathname);

  const headerHiddenRoutes = [
    "/techbundle",
    "/ssr-course",
    "/reels-affiliate-marketing-tamil",
    "/3dsmax-tamil",
    "/3dsmax-english",
    "/amazon-seller-tamil-course",
    "/solidworks-tamil",
    "/civil3d-tamil",
    "/civil3d-english",
    "/blockchain-course-for-students",
    "/blockchain-course-for-working-professionals",
    "/blockchain-course-for-business",
    "/rhcsa-exam-training-tamil",
    "/rhcsa-exam-training-tamil/video",
  ];

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleOpenLoginModal = useCallback(() => setShowLoginModal(true), []);
  const handleCloseLoginModal = useCallback(() => setShowLoginModal(false), []);

  // Normalize path
  const currentPath = location.pathname.replace(/\/$/, "");

  // Check if this is a dynamic course page (single segment like /aman)
  // Exclude known routes that should show header
  const knownRoutes = [
    "",
    "courses",
    "courses-list",
    "testimonials",
    "mentors",
    "techbundle",
    "ssr-course",
    "auth",
    "404",
  ];
  const pathSegments = currentPath.split("/").filter(Boolean);
  const isDynamicCourseRoute =
    pathSegments.length === 1 && !knownRoutes.includes(pathSegments[0]);

  // Header and main margin condition
  const isCMSRoute =
    currentPath.startsWith("/cms") || currentPath.startsWith("/courses");
  const isHiddenLayout = isCMSRoute || isDynamicCourseRoute;
  const showHeader =
    !currentPath.includes("/eliteconnect") &&
    !currentPath.includes("/proclass/ssr") &&
    !isLayoutHidden &&
    !headerHiddenRoutes.includes(location.pathname) &&
    !isHiddenLayout;
  const mainClasses = `flex-grow${showHeader ? " mt-20 sm:mt-20" : ""}`;

  return (
    <div className="font-inter bg-black min-h-screen flex flex-col text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            border: "1px solid #555",
          },
          error: { style: { background: "#EF4444", color: "#fff" } },
        }}
      />

      {/* Header */}
      {showHeader && <Header onLoginClick={handleOpenLoginModal} />}

      {/* Main Content */}
      <main className={mainClasses}>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/workshops" element={<Workshops data={pages.business_webinar}/>} />



            <Route path="/courses" element={<Courses />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/course/:id" element={<Course />}>
              <Route index element={<Videos />} />
              <Route path="review" element={<StudRev />} />
            </Route>
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/techbundle" element={<Initiative />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route
              path="/reels-affiliate-marketing-tamil"
              element={<AffilateMarketing />}
            />

            <Route
              path="/3dsmax-tamil"
              element={<ThreeDMax data={pages.ThreeDMax} />}
            />
            <Route
              path="/3dsmax-english"
              element={<ThreeDMax data={pages.ThreeDMax_english} />}
            />

            <Route path="/termsandservices" element={<TermsAndServices />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="/RefundAndCertificationPolicy"
              element={<RefundAndCertificationPolicy />}
            />
            <Route
              path="/amazon-seller-tamil-course"
              element={<AmazonCourse />}
            />
            <Route path="/creator-mentor" element={<BecomeMentor />} />
            <Route path="/whylearncourse/:slug" element={<WhyLearnCourse />} />
            <Route path="/solidworks-tamil" element={<SolidWorks />} />
            <Route
              path="/civil3d-tamil"
              element={<Civil3D data={pages.civil3d} />}
            />
            <Route
              path="/civil3d-english"
              element={<Civil3D data={pages.civil3d_english} />}
            />
            <Route
              path="/proclass/ssr"
              element={<BusinessWebinar data={pages.business_webinar} />}
            />
            <Route
              path="/blockchain-course-for-students"
              element={<Blockchain data={pages.blockchain_students} />}
            />
            <Route
              path="/blockchain-course-for-working-professionals"
              element={<Blockchain data={pages.blockchain_working} />}
            />
            <Route
              path="/blockchain-course-for-business"
              element={<Blockchain data={pages.blockchain_bussiness} />}
            />

            <Route path="/ssr-course" element={<SSRCourse />} />

            {/* New Business Webinar Onboarding Routes */}
            <Route
              path="/proclass/ssr/seat"
              element={
                <BusinessWebinarOnboarding data={pages.business_webinar} />
              }
            />
            <Route
              path="/proclass/ssr/checkout"
              element={
                <BusinessWebinarOnboarding data={pages.business_webinar} />
              }
            />
            <Route
              path="/proclass/ssr/thank-you"
              element={
                <BusinessWebinarOnboarding data={pages.business_webinar} />
              }
            />

            {/* RHCSA Route */}
            <Route path="/rhcsa-exam-training-tamil" element={<Rhcsa />} />
            <Route
              path="/rhcsa-exam-training-tamil/video"
              element={<RhscaVideo />}
            />

            {/* Template Route */}
            <Route
              path="/template"
              element={
                <FormProvider>
                  <Template data={pages.template || pages.solidworks} />
                </FormProvider>
              }
            />

            {/* Eliteconnect Routes */}
            <Route
              path="/eliteconnect"
              element={<Navigate to="/eliteconnect/askraghulan" />}
            />
            <Route path="/eliteconnect/:mentorKey" element={<Mentorship />} />
            <Route
              path="/eliteconnect/:mentorKey/life-transformation"
              element={<MentDet />}
            />

            {/* CMS Login */}
            <Route path="/cms/login" element={<Login />} />

            {/* CMS Admin Routes - Protected */}
            <Route
              path="/cms"
              element={
                <ProtectedRoute>
                  <CMSLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CourseList />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/new" element={<CourseEditor />} />
              <Route path="courses/edit/:id" element={<CourseEditor />} />
              <Route path="preview/:id" element={<TemplatePreview />} />
            </Route>

            {/* Dynamic Landing Pages */}
            <Route path="/courses/:slug" element={<LandingPage />} />

            {/* Public Course Pages */}
            <Route path="/courses-list" element={<CourseListing />} />
            <Route path="/:slug" element={<CourseDetail />} />


            {/* Fallback */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      {!isLayoutHidden && !isHiddenLayout && <Footer />}
      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={handleCloseLoginModal} />}

      {/* WhatsApp Button */}
      {
        location.pathname === "/" && (
          <div className="fixed bottom-24 lg:bottom-32 right-6 md:right-10 z-[9999]">
            <WhatsAppButton />
          </div>
        )
      }
    </div >
  );
}


export default App;
