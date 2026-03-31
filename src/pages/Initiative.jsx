import "../../src/init.css";
import "../../src/index.css";
import "@fontsource/inter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionIntro from '../../src/initiativeComponents/SectionIntro';
import Section2 from '../../src/initiativeComponents/Section2';
import Section3 from '../../src/initiativeComponents/Section3';
import FullStack from '../../src/initiativeComponents/FullStack';
import Section4 from '../../src/initiativeComponents/Section4';
import Section5 from '../../src/initiativeComponents/Section5';
import Section6 from '../../src/initiativeComponents/Section6';
import Section7 from '../../src/initiativeComponents/Section7';
import Aboutus from '../../src/initiativeComponents/AboutUs';
import StudReview from '../../src/initiativeComponents/StudReview';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../../src/initiativeComponents/Footer';

function Initiative() {
  console.log("Initiative page load");
  const [searchParams] = useSearchParams();

  // FIX: Define 'allParams' here so the entire component, including the return statement, can access it.
  const allParams = Object.fromEntries([...searchParams]);

  // Default course ID for the IT Foundation Course (Tech Bundle)
  const courseId = "1070637000002943072"

  // This useEffect can now be used just for logging when the params change.
  useEffect(() => {
    console.log('URL Parameters:', allParams);
  }, [allParams]); // Dependency changed to allParams for correctness

  return (
    <div>
      {/* Now the 'allParams' variable exists and can be passed as a prop */}
      <SectionIntro urlParams={allParams} />
      <Section2 urlParams={allParams} />
      <FullStack urlParams={allParams} courseId={courseId} />
      <Section3 urlParams={allParams} courseId={courseId} />
      <Section4 urlParams={allParams} courseId={courseId} />
      <Section5 urlParams={allParams} />
      <Section6 urlParams={allParams} />
      <Section7 urlParams={allParams} />
      <StudReview urlParams={allParams} />
      <Aboutus urlParams={allParams} courseId={courseId} />
      <Footer urlParams={allParams} />
      {/* <Whatsapp urlParams={allParams} /> */}
    </div>
  );
}

export default Initiative;