// import React from 'react';
// import { FaYoutube, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
// import { SiGoogleplay, SiAppstore } from 'react-icons/si';
// import { assets } from '../assets/assets';
// import { Link, useLocation } from 'react-router-dom';
// import { pages } from '../constants/pages';


// const Footer = () => {
//   const location = useLocation();
//   const slug = location.pathname.split("/").filter(Boolean)[0];

//   // Find if slug exists in the array
//   const footerPage = pages.slugs_footer.find(item => item.path === slug);



//   return (
//     <footer className="bg-black text-white px-3 sm:px-14 lg:px-20 mt-10 mb-32">
//       {!footerPage &&
//         <div>
//           <hr className="border-[#353535] mb-10" />

//           <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-5 ">

//             {/* Column 1: Logo + About + Social */}
//             <div className="col-span-2 sm:col-span-4 md:col-span-2">
//               <img src={assets.logo_ex} alt="Expertisor" className="mb-4 h-10" />
//               <p className="text-[#8A8A8A] font-inter font-normal text-[14px] leading-5 tracking-normal">
//                 Expertisor Academy was founded by two college-broken minds with one big vision to bridge the gap between education and what reality demands. We believe true mastery comes from learning directly from those who have done it, implemented it, and created real impact.
//               </p>
//               <p className=" text-[#8A8A8A] mt-4 font-inter font-normal text-[14px] leading-5 tracking-normal">
//                 What began as a small idea has now impacted thousands of students. We are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real-world education. We believe top-quality education should be affordable and driven by value, Money is a by product of creating real impact.
//               </p>

//               {/* Social Icons */}
//               <div className="flex gap-3 mt-6 flex-wrap">
//                 <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md">
//                   <FaYoutube className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md">
//                   <FaTwitter className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md">
//                   <FaFacebookF className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md">
//                   <FaLinkedinIn className="h-5 w-5" />
//                 </a>
//                 <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md">
//                   <FaInstagram className="h-5 w-5" />
//                 </a>
//               </div>
//             </div>

//             {/* Column 2: Categories */}
//             <div className='sm:col-span-2 md:col-span-1 '>
//               <h3 className="font-inter font-medium text-[12px] leading-5 tracking-normal text-[#8A8A8A] uppercase mb-3">CATEGORIES</h3>
//               <ul className="space-y-[10px] font-inter font-normal text-[14px] leading-[100%] tracking-normal align-middle text-[#FFFFFF] ">
//                 <li><a href='https://www.expertisoracademy.in/techbundle'>Technology</a></li>
//                 <li>Civil</li>
//                 <li>Architecture</li>
//                 <li>Business</li>
//               </ul>
//             </div>

//             {/* Column 3: Popular Courses */}
//             <div className='sm:col-span-2 md:col-span-1'>
//               <h3 className="font-inter font-medium text-[12px] leading-5 tracking-normal text-[#8A8A8A] uppercase mb-3">COURSES</h3>
//               <ul className="space-y-[10px]  font-inter font-normal text-[14px] leading-[100%] tracking-normal align-middle text-[#FFFFFF]">
//                 <li><a href='https://www.expertisoracademy.in/techbundle'>Full Stack Development</a></li>
//                 <li><a href='https://www.expertisoracademy.in/techbundle'>Cloud computing</a></li>
//                 <li><a href='https://www.expertisoracademy.in/techbundle'>Linux Admin</a></li>
//                 <li><Link to={"https://www.expertisoracademy.in/reels-affiliate-marketing-tamil"}>Reels Affiliate Marketing</Link></li>
//               </ul>
//             </div>

//             {/* Column 4: Bundle Courses */}
//             <div className=' sm:col-span-2 xl:col-span-1'>
//               <h3 className="font-inter font-medium text-[12px] leading-5 tracking-normal uppercase text-[#8A8A8A] mb-3">Why we Selling?</h3>
//               <ul className="space-y-[10px] text-[#FFFFFF] font-inter font-normal text-[14px] leading-[100%] tracking-normal align-middle ">
//                 <li><a href='https://www.expertisoracademy.in/whylearnaffilate'>Reels Affiliate Marketing</a></li>
//               </ul>
//             </div>

//             {/* Column 5: Company */}
//             <div className='xl:col-span-1 sm:col-span-2'>
//               <h3 className="font-inter font-medium text-[12px] leading-5 tracking-normal text-[#8A8A8A] uppercase mb-3">COMPANY</h3>
//               <ul className="space-y-[10px] text-[#FFFFFF] font-inter font-normal text-[14px] leading-[100%] tracking-normal align-middle">
//                 {/* <li><Link to="#">About us</Link></li> */}
//                 <li><a href='https://wa.me/9363414353'>Contact us</a></li>
//                 <li><Link to="/termsandservices">Terms and Conditions</Link></li>
//                 <li><Link to="/privacypolicy">Privacy policy</Link></li>
//                 <li><Link to="/RefundAndCertificationPolicy">Refund policy</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Divider */}
//           <hr className="border-[#353535] my-8" />

//           {/* Bottom Section */}
//           <div className="flex  text-[#8A8A8A] justify-center pb-6">
//             <p className="text-center ">
//               © {new Date().getFullYear()} Expertisor academy. All Rights Reserved
//             </p>
//             {/* <div className="flex gap-3 flex-wrap justify-center md:justify-end">
//           <a href="#"><img src={assets.gplay_footer} alt="Google Play" className="h-10" /></a>
//           <a href="#"><img src={assets.refer_footer} alt="Refer & Earn" className="h-10" /></a>
//         </div> */}
//           </div>
//         </div>}


//       {footerPage &&
//         <div >
//           <hr className='border-[#353535]' />


//           <div className='text-center my-10'>
//             <div className="flex justify-center items-center mb-4">
//               <img src={assets.logo_ex} alt="" />
//             </div>

//             <p className="max-w-3xl mx-auto text-sm leading-5 font-inter font-normal tracking-normal">
//               Expertisor Academy was founded by two college-broken minds with one big vision to bridge the gap between education and what reality demands. We believe true mastery comes from learning directly from those who have done it, implemented it, and created real impact.
//             </p>
//             <p className="max-w-3xl mx-auto mt-3 md:mt-5 text-sm leading-5 font-inter font-normal tracking-normal">
//               What began as a small idea has now impacted thousands of students. We are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real-world education. We believe top-quality education should be affordable and driven by value, Money is a by product of creating real impact.
//             </p>




//             <div className="flex flex-wrap justify-center text-[#8A8A8A] gap-4 md:gap-6 mt-8 text-sm">
//               {footerPage && (
//                 <Link to={footerPage.link} className="hover:text-[#ffffff]">
//                   {footerPage.name}
//                 </Link>
//               )}

//               <Link to="/termsandservices" className="hover:text-[#ffffff]">
//                 Terms and Conditions
//               </Link>
//               <Link to="/privacypolicy" className="hover:text-[#ffffff]">
//                 Privacy Policy
//               </Link>
//               <Link to="/RefundAndCertificationPolicy" className="hover:text-[#ffffff]">
//                 Refund Policy
//               </Link>
//             </div>

//           </div>



//           <hr className="border-[#353535] mb-6" />

//           <div className="flex justify-center">
//             <p className='text-[#8A8A8A] font-inter font-normal text-sm leading-none tracking-normal align-middle'>© {new Date().getFullYear()} Expertisor academy. All Rights Reserved</p>

//             {/* <div className="flex items-center gap-3">
//           <a href="#">
//             <img
//               src={assets.gplay_footer}
//               alt="Get it on Google Play"
//               className="h-10"
//             />
//           </a>

//           <a href="#">
//             <img
//               src={assets.refer_footer}
//               alt="Get it on Google Play"
//               className="h-10"
//             />
//           </a>
//         </div> */}
//           </div>

//         </div>}

//     </footer>
//   );
// };

// export default Footer;









// new for slug

import React from 'react';
import { FaYoutube, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';
// import { courses } from '../constants/courses'; // ✅ single source of truth
import { pages } from '../constants/pages';

const Footer = () => {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean)[0]; 

  const {slug_footer}=pages

  // Find if current page matches one of the course slugs
  const footerCourse = slug_footer.find(item => item.slug === slug);

  return (
    <footer className="bg-black text-white px-3 sm:px-14 lg:px-20 mt-10 ">
      {!footerCourse && (
        <div>
          <hr className="border-[#353535] mb-10" />

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-5 ">
            {/* Column 1: Logo + About + Social */}
            <div className="col-span-2 sm:col-span-4 md:col-span-2">
              <img src={assets.logo_ex} alt="Expertisor" className="mb-4 h-10" />
              <p className="text-[#8A8A8A] font-inter font-normal text-[14px] leading-5">
                Expertisor Academy was founded by two college-broken minds with one big vision to bridge the gap between education and what reality demands. We believe true mastery comes from learning directly from those who have done it, implemented it, and created real impact.
              </p>
              <p className=" text-[#8A8A8A] mt-4 font-inter font-normal text-[14px] leading-5">
                What began as a small idea has now impacted thousands of students. We are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real-world education. We believe top-quality education should be affordable and driven by value, Money is a by product of creating real impact.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6 flex-wrap">
                <a href="https://youtube.com/@expertisoracademytamil?si=VCFeTKg7lDAr3IT0" className="p-2 bg-[#101010] border border-[#353535] rounded-md"><FaYoutube className="h-5 w-5" /></a>
                {/* <a href="#" className="p-2 bg-[#101010] border border-[#353535] rounded-md"><FaTwitter className="h-5 w-5" /></a> */}
                <a href="https://www.facebook.com/people/Expertisor-Academy/61573170590326/#" className="p-2 bg-[#101010] border border-[#353535] rounded-md"><FaFacebookF className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/company/expertisor-academy/" className="p-2 bg-[#101010] border border-[#353535] rounded-md"><FaLinkedinIn className="h-5 w-5" /></a>
                <a href="https://www.instagram.com/expertisor_official?igsh=MWwwc2NobG84cG95bg==" className="p-2 bg-[#101010] border border-[#353535] rounded-md"><FaInstagram className="h-5 w-5" /></a>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className='sm:col-span-2 md:col-span-1'>
              <h3 className="font-inter font-medium text-[12px] text-[#8A8A8A] uppercase mb-3">CATEGORIES</h3>
              <ul className="space-y-[10px] text-[#FFFFFF] font-inter text-[14px]">
                <li><a href='https://www.expertisoracademy.in/techbundle'>Technology</a></li>
                <li>Civil</li>
                <li>Architecture</li>
                <li>Business</li>
              </ul>
            </div>

            {/* Column 3: Popular Courses */}
            <div className='sm:col-span-2 md:col-span-1'>
              <h3 className="font-inter font-medium text-[12px] text-[#8A8A8A] uppercase mb-3">COURSES</h3>
              <ul className="space-y-[10px] text-[#FFFFFF] font-inter text-[14px]">
                <li><a href='https://www.expertisoracademy.in/techbundle'>Full Stack Development</a></li>
                <li><a href='https://www.expertisoracademy.in/techbundle'>Cloud computing</a></li>
                <li><a href='https://www.expertisoracademy.in/techbundle'>Linux Admin</a></li>
                <li><Link to="/reels-affiliate-marketing-tamil">Reels Affiliate Marketing</Link></li>
              </ul>
            </div>


            {/* Column 4: Bundle Courses (dynamic from courses.js) */}
            <div className='sm:col-span-2 xl:col-span-1'>
              <h3 className="font-inter font-medium text-[12px] uppercase text-[#8A8A8A] mb-3">Why we Selling?</h3>
              <ul className="space-y-[10px] text-[#FFFFFF] font-inter text-[14px]">
                {slug_footer.map(course => (
                  <li key={course.slug}>
                    <Link to={`/whylearncourse/${course.slug}`}>{course.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Company */}
            <div className='xl:col-span-1 sm:col-span-2'>
              <h3 className="font-inter font-medium text-[12px] uppercase text-[#8A8A8A] mb-3">COMPANY</h3>
              <ul className="space-y-[10px] text-[#FFFFFF] font-inter text-[14px]">
                <li><a href='https://wa.me/9363414353'>Contact us</a></li>
                <li><Link to="/termsandservices">Terms and Conditions</Link></li>
                <li><Link to="/privacypolicy">Privacy policy</Link></li>
                <li><Link to="/RefundAndCertificationPolicy">Refund policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#353535] my-8" />

          {/* Bottom Section */}
          <div className="flex justify-center pb-6 text-[#8A8A8A]">
            <p>© {new Date().getFullYear()} Expertisor Academy. All Rights Reserved</p>
          </div>
        </div>
      )}

      {footerCourse && (
        <div className='mb-32'>
          <hr className='border-[#353535]' />

          <div className='text-center my-10'>
            <div className="flex justify-center items-center mb-4">
              <img src={assets.logo_ex} alt="Expertisor" />
            </div>

            <p className="max-w-3xl mx-auto text-sm leading-5 font-inter">
              Expertisor Academy was founded by two college-broken minds with one big vision to bridge the gap between education and what reality demands. We believe true mastery comes from learning directly from those who have done it, implemented it, and created real impact.
            </p>
            <p className="max-w-3xl mx-auto mt-3 md:mt-5 text-sm leading-5 font-inter">
              What began as a small idea has now impacted thousands of students. We are now on a mission to build the world’s biggest creator ecosystem and empower millions of learners with practical, real-world education.
            </p>

            {/* Links */}
            <div className="flex flex-wrap justify-center text-[#8A8A8A] gap-4 md:gap-6 mt-8 text-sm">
              <Link to={`/whylearncourse/${footerCourse.slug}`} className="hover:text-white">
                {footerCourse.name}
              </Link>
              <Link to="/termsandservices" className="hover:text-white">Terms and Conditions</Link>
              <Link to="/privacypolicy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/RefundAndCertificationPolicy" className="hover:text-white">Refund Policy</Link>
            </div>
          </div>

          <hr className="border-[#353535] mb-6" />

          <div className="flex justify-center">
            <p className='text-[#8A8A8A] font-inter text-sm'>
              © {new Date().getFullYear()} Expertisor Academy. All Rights Reserved
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

