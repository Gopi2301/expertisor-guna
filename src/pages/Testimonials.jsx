import React, { Suspense, lazy, useMemo } from 'react'
import Hero from '../components/TestimonialsComponents/Hero'
import { assets } from '../assets/assets'
import { pages } from '../constants/pages'
import SEO from '../components/SEO'

const Achieve = lazy(() => import('../components/TestimonialsComponents/Achieve'));
const StudentsSay = lazy(() => import('../components/HomeComponents/StudentsSay'));
const Success = lazy(() => import('../components/TestimonialsComponents/Success'));

const Testimonials = () => {
  const defaultSiteUrl = 'https://expertisor.com';
  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/testimonials` : `${defaultSiteUrl}/testimonials`;
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Expertisor Academy Testimonials",
    "url": canonicalUrl,
    "about": {
      "@type": "EducationalOrganization",
      "name": "Expertisor Academy"
    }
  }), [canonicalUrl]);
  return (
    <>
      <div className='bg-black'>
        <SEO
          title="Testimonials | Expertisor Academy"
          description="Hear from thousands of students who advanced their careers through Expertisor Academy’s creator-led programs."
          image={assets.creators}
          canonical={canonicalUrl}
          structuredData={structuredData}
        />
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Achieve />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <StudentsSay students_say={pages.testimonial_page.students_say_video} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Success />
        </Suspense>
      </div>
    </>
  )
}

export default Testimonials

const SectionFallback = () => (
  <div className='px-4 sm:px-10 py-16 animate-pulse'>
    <div className='h-8 w-1/3 bg-[#1f1f1f] rounded mb-4'></div>
    <div className='h-4 w-3/5 bg-[#151515] rounded mb-2'></div>
    <div className='h-4 w-2/3 bg-[#151515] rounded'></div>
  </div>
)