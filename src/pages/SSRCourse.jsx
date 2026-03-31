import React from 'react'
import Hero from '../components/ArchitectureComponents/Hero'
import AsSeenIn from '../components/ArchitectureComponents/AsSeenIn'
import ProvenSystem from '../components/ArchitectureComponents/ProvenSystem'
import Instructor from '../components/ArchitectureComponents/Instructor'
import Testimonials from '../components/ArchitectureComponents/Testimonials'
import Pricing from '../components/ArchitectureComponents/Pricing'
import ContactForm from '../components/ArchitectureComponents/ContactForm'
import AboutUs from '../components/ArchitectureComponents/AboutUs'
import FAQ from '../components/ArchitectureComponents/FAQ'

const SSRCourse = () => {
    return (
        <div className="bg-[#050505] min-h-screen overflow-x-hidden">
            <Hero />
            <AsSeenIn />
            <ProvenSystem />
            <Instructor />
            <Testimonials />
            <Pricing />
            <ContactForm />
            <AboutUs />
            <FAQ />
        </div>
    )
}

export default SSRCourse
