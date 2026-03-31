import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="px-5 md:px-16 lg:px-36 mt-6 md:mt-10">
      <div className="px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Privacy Policy
        </h1>
        {/* <p className="text-sm text-gray-400 text-center mb-10">
          Last Updated: {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p> */}

        <p className="mb-6">
          Welcome to <strong>Expertisor Academy</strong> ("we", "our", or "us"). We are
          committed to protecting your privacy while providing quality educational
          services, including recorded courses, live mentorship, creator-led programs,
          and affiliate opportunities.
        </p>
        <p className="mb-6">
          By accessing or using our platform (website, LMS, WhatsApp, email, or mobile),
          you agree to the terms of this Privacy Policy.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full Name, Email Address, Phone Number</li>
              <li>Billing and payment information (via secure third-party gateways like Razorpay)</li>
              <li>Account activity: course progress, login timestamps, certification data</li>
              <li>Uploaded assignments, chat messages, communications with our team</li>
              <li>Cookies, device type, browser type, IP address, time zone, session history</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Authenticate accounts and provide course access</li>
              <li>Track and display course progress</li>
              <li>Generate completion certificates</li>
              <li>Send emails for transactions, updates, support, or marketing</li>
              <li>Comply with legal and tax requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Sharing Your Data</h2>
            <p className="mb-3">We do not sell your data. We may share it with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment processors (e.g., Razorpay, Stripe)</li>
              <li>Email tools (e.g., Mailchimp, Sendinblue)</li>
              <li>Mentors or trainers for course/session access</li>
              <li>Legal or regulatory bodies, if required</li>
            </ul>
            <p className="mt-2">All vendors adhere to confidentiality and privacy agreements.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>SSL encryption</li>
              <li>Secure database access</li>
              <li>Role-based permissions</li>
            </ul>
            <p className="mt-2">
              No system is completely secure. Users agree to share information at their own risk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
            <p>
              We store data for your active account and up to 3 years after completion to comply
              with audits. You may request deletion by emailing{" "}
              <a href="mailto:hi@expertisoracademy.in" className="text-yellow underline">
                hi@expertisoracademy.in
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Refund Policy</h2>
            <p>
              A 14-day refund applies only if mentioned on the course page and less than 5% of
              content is consumed. Email requests to{" "}
              <a href="mailto:hi@expertisoracademy.in" className="text-yellow underline">
                hi@expertisoracademy.in
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. User Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and review personal data</li>
              <li>Correct inaccuracies</li>
              <li>Request deletion (where applicable)</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Cookies and Tracking</h2>
            <p>
              We use cookies to improve experience and track engagement. You may disable cookies
              in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Children's Data</h2>
            <p>
              We do not knowingly collect data from users under 18. Guardians must supervise minors
              using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Platform Rights and Termination</h2>
            <p>
              We may suspend or terminate accounts violating our Terms or harming our brand,
              systems, or users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">11. Changes to This Policy</h2>
            <p>
              Updates may occur and will be posted here. Continued use implies acceptance of changes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">12. Jurisdiction</h2>
            <p>
              Governed by Indian law under Chennai courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
            <p>
              For concerns or data requests, email{" "}
              <a href="mailto:hi@expertisoracademy.in" className="text-yellow underline">
                hi@expertisoracademy.in
              </a>.
            </p>
          </div>

          <p className="mt-12 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Expertisor Academy. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
