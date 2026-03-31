// Lazy Loading Routes Configuration
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Eager load critical components
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load CMS components
const Dashboard = lazy(() => import('./pages/CMS/Dashboard'));
const CourseEditor = lazy(() => import('./pages/CMS/CourseEditor'));
const CMSLayout = lazy(() => import('./components/CMSComponents/CMSLayout'));

// Lazy load landing page components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TransformationTemplate = lazy(() => import('./pages/LandingPages/TransformationTemplate'));

// Lazy load other pages
const Success = lazy(() => import('./pages/Success'));
const Creator = lazy(() => import('./pages/Creator'));

// Loading fallback component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading...</p>
        </div>
    </div>
);

// Route configuration with lazy loading
export const AppRoutes = () => (
    <Router>
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Home - Eager loaded */}
                <Route path="/" element={<HomePage />} />

                {/* CMS Routes - Lazy loaded */}
                <Route path="/cms" element={<CMSLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="courses/:id" element={<CourseEditor />} />
                </Route>

                {/* Landing Pages - Lazy loaded */}
                <Route path="/landing/:slug" element={<LandingPage />} />

                {/* Other Pages - Lazy loaded */}
                <Route path="/success" element={<Success />} />
                <Route path="/creator" element={<Creator />} />
            </Routes>
        </Suspense>
    </Router>
);

export default AppRoutes;
