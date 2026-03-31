import React, { Suspense, lazy, useMemo } from 'react'
import Hero from '../components/MentorsComponents/Hero'
import SEO from '../components/SEO'
import { assets } from '../assets/assets'

const OurMentors = lazy(() => import('../components/MentorsComponents/OurMentors'));
const PaginatedGrid = lazy(() => import('../components/MentorsComponents/PaginatedGrid'));
const Creator = lazy(() => import('../components/MentorsComponents/Creator'));

const Mentors = () => {
  const defaultSiteUrl = 'https://expertisor.com';
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/mentors` : `${defaultSiteUrl}/mentors`;
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Expertisor Creator Mentors",
    "itemListElement": [],
    "url": canonicalUrl
  }), [canonicalUrl]);
  return (
    <>
    <div className='text-white'>
     <SEO
        title="Mentors | Expertisor Academy"
        description="Meet Expertisor Academy’s top creator mentors spanning tech, design, business, and more."
        image={assets.creators}
        canonical={canonicalUrl}
        structuredData={structuredData}
     />
     <Hero/>
     <Suspense fallback={<SectionFallback />}>
      <OurMentors/>
     </Suspense>
     <Suspense fallback={<SectionFallback />}>
      <PaginatedGrid />
     </Suspense>
     <Suspense fallback={<SectionFallback />}>
      <Creator/>
     </Suspense>
    </div>
    </>
  )
}

export default Mentors

const SectionFallback = () => (
  <div className='px-4 sm:px-10 py-12 animate-pulse'>
    <div className='h-8 w-1/4 bg-[#1f1f1f] rounded mb-4'></div>
    <div className='h-4 w-2/3 bg-[#151515] rounded mb-2'></div>
    <div className='h-4 w-1/2 bg-[#151515] rounded'></div>
  </div>
)