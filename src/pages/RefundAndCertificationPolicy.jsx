import React from "react";

const RefundAndCertificationPolicy = () => {
  return (
    <div className="px-5 md:px-16 lg:px-36 mt-6 md:mt-10">
      <div className="px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Refund & Certification Policy
        </h1>

        <p className="mb-6">
          Thank you for choosing <strong>Expertisor Academy</strong>. We are committed to providing a
          high-quality learning experience to all our learners. Like any digital service provider, our
          refund policy is governed by clear terms to ensure fairness for both learners and instructors.
        </p>
        <p className="mb-6">
          By purchasing any course, bundle, or program from Expertisor Academy, you agree to the
          terms stated in this Refund and Certification Policy.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">📜 Certification Criteria</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Learners must complete 100% of the course content.</li>
              <li>All assignments, assessments, or exams (if applicable) must be completed as per course requirements.</li>
              <li>Certificates will be issued only under the enrolled user’s name and cannot be transferred.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">💸 Refund Policy Overview</h2>
            <p>
              Expertisor Academy aims to provide a risk-free learning environment. However, all refund
              requests are governed strictly by the following guidelines to ensure fairness and operational
              integrity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">✅ Eligibility for Refunds</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Refunds apply only if eligibility is explicitly stated at the time of purchase.</li>
              <li>
                If marked “Refundable,” a refund request can be made within 14 days of purchase if:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>No more than 5% of the content has been consumed.</li>
                  <li>No certificates have been issued.</li>
                  <li>No premium downloadable materials have been accessed.</li>
                </ul>
              </li>
              <li>Refunds are processed to the original payment method as per payment gateway timelines.</li>
              <li>Courses labeled “Non-Refundable” or purchased via third-party vendors are not eligible.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">❌ When Refunds May Be Denied</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Usage exceeds 5% of the course or major content downloaded.</li>
              <li>Repeated refund requests from the same user.</li>
              <li>Courses bought under non-refundable labels.</li>
              <li>Refund requests after 14-day eligibility window.</li>
              <li>Violation of Terms of Use resulting in suspension or restriction.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">🔗 Third-Party or Partner Bundle Purchases</h2>
            <p>
              If your purchase was made via a third-party platform, contact the vendor directly.
              Expertisor Academy cannot process refunds for purchases outside our official website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">📩 Final Declaration</h2>
            <p>
              By enrolling in a course with Expertisor Academy, you confirm that you have read,
              understood, and agreed to the above terms. Refunds are not a right but a facility
              provided under specific guidelines.
            </p>
            <p className="mt-2">
              For queries, email{" "}
              <a
                href="mailto:hi@expertisoracademy.in"
                className="text-yellow underline"
              >
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

export default RefundAndCertificationPolicy;
