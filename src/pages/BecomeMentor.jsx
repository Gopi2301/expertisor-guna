import React from 'react'
import Hero from '../components/BecomeMentorComponents/Hero'
import Needs from '../components/BecomeMentorComponents/Needs'
import StickyCards from '../components/BecomeMentorComponents/StickyCards'
import KeyBenefits from '../components/BecomeMentorComponents/KeyBenefits'
import StatsSection from '../components/BecomeMentorComponents/StatsSection'
import Mentors from '../components/BecomeMentorComponents/Mentors'
import HearMentors from '../components/BecomeMentorComponents/HearMentors'
import Community from '../components/BecomeMentorComponents/Community'


const BecomeMentor = () => {
  return (
    <div>
      {/* <StickyCards/> */}
      <Hero />
      <Needs />
      <KeyBenefits />
      <StatsSection />
      <Mentors />
      <HearMentors/>
      <Community/>
    </div>
  )
}


export default BecomeMentor