// src/pages/Home.jsx

import React, { Suspense, lazy, useMemo } from 'react';
import Hero from '../components/HomeComponents/Hero';
import SEO from '../components/SEO';
import { assets } from '../assets/assets';
import { pages } from '../constants/pages';

const WeDo = lazy(() => import('../components/HomeComponents/WeDo'));
const Skills = lazy(() => import('../components/HomeComponents/Skills'));
const AboutUs = lazy(() => import('../components/HomeComponents/AboutUs'));
const StudentsSay = lazy(() => import('../components/HomeComponents/StudentsSay'));
const Infinite = lazy(() => import('../components/HomeComponents/Infinite'));
const StudWorksAt = lazy(() => import('../components/HomeComponents/StudWorksAt'));
const DownloadSection = lazy(() => import('../components/HomeComponents/DownloadSection'));

const Home = () => {
  const defaultSiteUrl = 'https://expertisor.com';
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : `${defaultSiteUrl}/`;
  const seoDescription = 'Our vision is to turn friendly YouTubers and creators into mentors, bringing real education to life.';
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Expertisor Academy",
    url: defaultSiteUrl,
    logo: assets.logo_ex,
    sameAs: [
      "https://www.youtube.com/@Expertisor",
      "https://www.instagram.com/experti.sor",
      "https://www.linkedin.com/company/expertisor"
    ]
  }), []);
  return (
    <div>
      <SEO
        title="Expertisor Academy | Creator-led Mentors"
        description={seoDescription}
        image={assets.creators}
        canonical={canonicalUrl}
        structuredData={structuredData}
      />
      <Hero />

      {/* --- 2. The <CoursesPreview /> component has been deleted from here --- */}

      <Suspense fallback={<SectionFallback />}>
        <WeDo />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AboutUs />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StudentsSay students_say={pages.home_page.students_say_video}/>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Infinite />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StudWorksAt />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DownloadSection />
      </Suspense>
    </div>
  );
};

export default Home;

const SectionFallback = () => (
  <div className='px-3 sm:px-14 lg:px-20 py-16 animate-pulse'>
    <div className='h-8 sm:h-10 w-1/3 bg-[#1f1f1f] rounded mb-6' />
    <div className='h-4 w-full bg-[#111111] rounded mb-3' />
    <div className='h-4 w-5/6 bg-[#111111] rounded mb-3' />
    <div className='h-4 w-3/4 bg-[#111111] rounded' />
  </div>
);