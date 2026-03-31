// import React from "react";

// const WhyLearnAffiliate = () => {
//   return (
//     <div className="px-5 md:px-16 lg:px-36 mt-6 md:mt-10">
//       <div className="px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
//         <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow">
//           Why Sell Expertisor Academy’s Affiliate Marketing Course?
//         </h1>

//         <section className="space-y-8">
//           <div>
//             <h2 className="text-xl font-semibold mb-2">1. In-Demand Product</h2>
//             <p>
//               Affiliate marketing is one of the fastest-growing opportunities in India. By
//               promoting this course, you’re selling what people already want.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">
//               2. Trusted Academy = Easy to Sell
//             </h2>
//             <p>
//               Expertisor Academy is known for career-focused, practical training. Selling
//               under a trusted brand builds instant credibility.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">
//               3. High Commissions & Better Returns
//             </h2>
//             <p>
//               Each sale gives you a high commission payout, so you earn more with fewer
//               sales.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">
//               4. Done-for-You Marketing Tools
//             </h2>
//             <p>We provide affiliates with:</p>
//             <ul className="list-disc pl-6 space-y-1 mt-2">
//               <li>Meta Ads–friendly creatives</li>
//               <li>Landing pages</li>
//               <li>Copy templates</li>
//               <li>Compliance guidance</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">5. Evergreen Audience</h2>
//             <p>Target groups include:</p>
//             <ul className="list-disc pl-6 space-y-1 mt-2">
//               <li>Students seeking side income</li>
//               <li>Job seekers exploring digital careers</li>
//               <li>Professionals shifting to online business</li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">6. Long-Term Income Potential</h2>
//             <p>
//               Affiliate marketing is not a trend. As digital adoption grows, this course
//               stays relevant and profitable.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">7. Important Disclaimers</h2>
//             <p className="mb-3">
//               This site is not a part of the Facebook™ website or Facebook™ Inc. Additionally,
//               this site is NOT endorsed by Facebook™ in any way. FACEBOOK™ is a trademark of
//               FACEBOOK™, Inc.
//             </p>
//             <p>
//               We cannot and do not guarantee your ability to get results or earn money with
//               our ideas, information, tools, or strategies. Results depend on your own effort
//               and market factors.
//             </p>
//             <p className="mt-2">
//               We provide strategies and direction that have worked for us and our clients,
//               and we believe they can help you too.
//             </p>
//             <p className="mt-2">
//               This is not a “get rich quick” scheme. It is a real business model that
//               requires learning and consistent implementation.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">8. Training Format</h2>
//             <p>
//               📌 This program is a recorded session presented in a LIVE replay format to
//               encourage participation and action. For anytime access recordings, you can
//               select that option during checkout.
//             </p>
//           </div>

//           <p className="mt-12 text-center text-gray-500 text-sm">
//             © {new Date().getFullYear()} Expertisor Academy. All rights reserved.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default WhyLearnAffiliate;










// import React from "react";

// const WhyLearnCourse = ({ data }) => {
//   return (
//     <div className="px-5 md:px-16 lg:px-36 mt-6 md:mt-10">
//       <div className="px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
//         <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow">
//           {data.title}
//         </h1>

//         <section className="space-y-8">
//           {data.sections.map((sec, idx) => (
//             <div key={idx}>
//               {sec.title && (
//                 <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
//               )}
//               {sec.content && <p>{sec.content}</p>}
//               {sec.listTitle && <p>{sec.listTitle}</p>}
//               {sec.listItems && (
//                 <ul className="list-disc pl-6 space-y-1 mt-2">
//                   {sec.listItems.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}

//           <p className="mt-12 text-center text-gray-500 text-sm">
//             © {new Date().getFullYear()} Expertisor Academy. All rights reserved.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default WhyLearnCourse;






// new for all


import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import { courses } from "../constants/courses";
import { pages } from "../constants/pages";
import ApplyModal from "../components/Simple_elite_temp_Components.jsx/ApplyModal";

const WhyLearnCourse = () => {
  const { slug } = useParams();
  const { slug_footer } = pages
  const course = slug_footer.find(c => c.slug === slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!course) {
    return <p className="text-center mt-10">Course not found</p>;
  }

  // LOG ADDED HERE TO VERIFY
  console.log("🚀 [WhyLearnCourse] Loaded course data:", {
    slug: course.slug,
    title: course.title,
    deal_course_id: course.deal_course_id,
  });

  const handleApplyClick = () => {
    // LOG ADDED BEFORE OPENING MODAL
    console.log("📌 [WhyLearnCourse] Opening modal with course ID:", course.deal_course_id);
    setIsModalOpen(true);
  };

  return (
    <div className="px-5 md:px-16 lg:px-36 mt-6 md:mt-10">
      <div className="px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-yellow">
          {course.title}
        </h1>

        <section className="space-y-8">
          {course.sections.map((sec, idx) => (
            <div key={idx}>
              {sec.title && (
                <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
              )}
              {sec.content && <p>{sec.content}</p>}
              {sec.listTitle && <p>{sec.listTitle}</p>}
              {sec.listItems && (
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  {sec.listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          
          <div className="mt-10 flex justify-center">
             <button 
                onClick={handleApplyClick} 
                className="bg-yellow text-black font-semibold text-lg py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
             >
                Apply Now
             </button>
          </div>

          <p className="mt-12 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Expertisor Academy. All rights reserved.
          </p>
        </section>
      </div>

      <ApplyModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseId={course.deal_course_id} 
      />
    </div>
  );
};

export default WhyLearnCourse;
