import React from 'react'

const TermsAndServices = () => {
    return (
        <div className='px-5 md:px-16 lg:px-36 mt-6 md:mt-10'>
            <div className=" px-5 md:px-10 py-11 md:py-16 text-white bg-[#0a0a0a] rounded-[40px]">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    Terms of Service
                </h1>
                {/* <p className="text-sm text-gray-400 text-center mb-10">
                    Effective Date: August 6, 2025
                </p> */}

                <p className="mb-6">
                    Welcome to <strong>Expertisor Academy</strong>, a digital learning
                    platform providing recorded tech and career courses, live mentorship
                    sessions, creator-led training programs, and affiliate/ambassador
                    opportunities.
                </p>
                <p className="mb-6">
                    By accessing or using any part of our services, you agree to the
                    following Terms of Service ("ToS"). Please read them carefully.
                </p>

                <section className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">1. Definitions</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>
                                <strong>Company:</strong> Expertisor Academy
                            </li>
                            <li>
                                <strong>Platform:</strong> Our website, mobile apps,
                                WhatsApp/Slack groups, and other forums
                            </li>
                            <li>
                                <strong>User:</strong> Students, mentors, creators, affiliates,
                                and visitors
                            </li>
                            <li>
                                <strong>Services:</strong> All our programs, sessions, courses,
                                features, and affiliate tools
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            2. Governing Law & Jurisdiction
                        </h2>
                        <p>
                            These Terms are governed by the laws of India. Any dispute arising
                            shall be subject to the exclusive jurisdiction of the courts of
                            Chennai, Tamil Nadu.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">3. Refund Policy</h2>
                        <p className="mb-3">
                            We offer a 14-day refund for eligible courses only if:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>It is explicitly mentioned on the course landing page</li>
                            <li>You have consumed less than 5% of the total course content</li>
                        </ul>
                        <p className="mt-3">
                            Once 5% or more is consumed, or 14 days have passed, no refunds
                            will be processed under any circumstance. Refunds will be made to
                            the original payment method within 30 days of approval.
                        </p>
                        <p className="mt-3">
                            We do not offer refunds for:
                            <ul className="list-disc pl-6">
                                <li>Subscription-based services after 7 days</li>
                                <li>Any bundled course bought via a third-party platform</li>
                                <li>
                                    Affiliate/marketing-related purchases resulting in a business
                                    loss
                                </li>
                            </ul>
                        </p>
                        <p className="mt-3">
                            For refunds, contact:{" "}
                            <a
                                href="mailto:hi@expertisoracademy.in"
                                className="text-yellow underline"
                            >
                                hi@expertisoracademy.in
                            </a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">4. Liability Disclaimer</h2>
                        <p>
                            Expertisor Academy, its founders, directors, team members,
                            partners, or mentors shall not be held responsible for any direct
                            or indirect loss, damage, financial or business setback arising
                            from:
                        </p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Course content or strategies</li>
                            <li>Application of knowledge taught inside programs</li>
                            <li>
                                Any user decisions based on our content or mentor advice
                            </li>
                        </ul>
                        <p className="mt-2">
                            All learning outcomes are subjective and depend on the user’s
                            execution and external factors.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            5. Creator & Mentor Roles
                        </h2>
                        <p>
                            Creators and Mentors who contribute to the platform are responsible
                            for originality and accuracy of their content, and may not be
                            considered full-time employees unless explicitly stated.
                        </p>
                        <p className="mt-2">
                            We reserve the right to revoke access or revenue share at any time
                            due to policy violations, plagiarism, damaging reputation, or
                            inactivity.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            6. Revenue Sharing & Platform Rights
                        </h2>
                        <p>
                            We reserve full rights to modify or stop services, withhold revenue
                            in disputes, and remove users/mentors/affiliates violating
                            policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            7. Intellectual Property
                        </h2>
                        <p>
                            All content, branding, and assets created by Expertisor Academy are
                            our sole intellectual property and cannot be reused without written
                            permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">8. Data & Communication</h2>
                        <p>
                            Users agree to receive communications related to programs, feedback,
                            and offers. We do not sell your data to third parties.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">9. Use of Platform</h2>
                        <p>
                            You may not use the platform for harassment, copying content,
                            engaging in fraud, or misleading others using our brand. Violations
                            may lead to suspension or permanent ban.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">10. Final Clause</h2>
                        <p>
                            By accessing our platform, you acknowledge results vary per
                            individual, accept we are not liable for your decisions, and agree
                            to act in good faith. These ToS may be updated periodically without
                            notice.
                        </p>
                        <p className="mt-2">
                            For questions, contact:{" "}
                            <a
                                href="mailto:hi@expertisoracademy.in"
                                className="text-yellow underline"
                            >
                                hi@expertisoracademy.in
                            </a>
                        </p>

                        <p className="mt-12 text-center text-gray-500 text-sm">
                            © {new Date().getFullYear()} Expertisor Academy. All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TermsAndServices