import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/BusinessWebinar/Hero";
import LiveNotificationBar from "../components/BusinessWebinar/LiveNotificationBar";
import LeadGenCard from "../components/BusinessWebinar/LeadGenCard"; // Keep this eager as it's often near the top

// Lazy load below-the-fold components
const LogoCarousel = React.lazy(() => import("../components/BusinessWebinar/LogoCarousel"));
const ComparisonSection = React.lazy(() => import("../components/BusinessWebinar/ComparisonSection"));
const LearnSection = React.lazy(() => import("../components/BusinessWebinar/LearnSection"));
const ResultsSection = React.lazy(() => import("../components/BusinessWebinar/ResultsSection"));
const AboutAuthor = React.lazy(() => import("../components/BusinessWebinar/AboutAuthor"));
const WithOutSystem = React.lazy(() => import("../components/BusinessWebinar/WithOutSystem"));
const Cta = React.lazy(() => import("../components/BusinessWebinar/Cta"));
const FAQ = React.lazy(() => import("../components/BusinessWebinar/FAQ"));
const Footer = React.lazy(() => import("../components/Footer"));

const BusinessWebinar = ({ data }) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate("/proclass/ssr/seat");
  };

  if (!data) return null;

  return (
    <div className="w-full h-full bg-[#050400] font-clash pb-24">
      <LiveNotificationBar />
      <Hero data={data.hero_section} />

      <Suspense fallback={<div className="h-20" />}>
        {/* Logo carousel */}
        {/* Ensure back compatibility or safety if logo_section missing */}
        <LogoCarousel logos={data.logo_section?.logos} />
      </Suspense>

      {/* Why not Card */}
      <LeadGenCard
        title={data.lead_gen_card?.title}
        cta={data.lead_gen_card?.cta}
        highlightWord={data.lead_gen_card?.highlight_word}
        subtitle={data.lead_gen_card?.subtitle}
        tags={data.lead_gen_card?.tags}
        costingTitle={data.lead_gen_card?.costingTitle}
        costingList={data.lead_gen_card?.costingList}
        systemLabel={data.lead_gen_card?.systemLabel}
        systemText={data.lead_gen_card?.systemText}
        systemHighlight={data.lead_gen_card?.systemHighlight}
        onCtaClick={handleCtaClick}
      />

      <Suspense fallback={<div className="h-96" />}>
        {/* comparison */}
        <ComparisonSection {...data.comparison_section} onCtaClick={handleCtaClick} />
        {/* LearnSection */}
        <LearnSection {...data.learn_section} onCtaClick={handleCtaClick} />
        {/* ResultsSection */}
        <ResultsSection {...data.results_section} onCtaClick={handleCtaClick} />
        {/* about author */}
        <AboutAuthor {...data.about_author} onCtaClick={handleCtaClick} />
        {/* with & without System */}
        <WithOutSystem {...data.without_system} onCtaClick={handleCtaClick} />

        {/* Cta */}
        <Cta {...data.cta} onCtaClick={handleCtaClick} />
        {/* FAQ */}
        <FAQ {...data.faq} />
        <Footer />
      </Suspense>
    </div>
  );
};

export default BusinessWebinar;
