"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// BONNER SPRINGS SERVICE LIMITED - Software Applications Company
const BonnerSpringsPolicies = () => {
  const searchParams = useSearchParams().toString();
  const search = searchParams.replace(/=$/, "");
  const [activeTab, setActiveTab] = useState<string>("termsOfUse");

  useEffect(() => {
    if (search === "terms-of-use") {
      setActiveTab("termsOfUse");
    } else if (search === "privacy-policy") {
      setActiveTab("privacyPolicy");
    } else if (search === "delivery-return") {
      setActiveTab("deliveryReturn");
    } else if (search === "refund-policy") {
      setActiveTab("refundPolicy");
    }
  }, [search]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="bg-primaryColor-100 mx-auto pt-32 pb-24">
      <section className="flex w-full flex-col items-center pt-8 xl:pt-16 gap-2 sm:gap-3 px-2 sm:px-8 md:px-16 text-center">
        <h4 className="text-white text-base sm:text-xl font-semibold leading-[120%]">
          Our Policies
        </h4>
        <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl leading-[150%] text-white">
          Bonner Springs Service Limited Policies
        </h3>
        <span className="text-xs sm:text-sm xl:text-base leading-[150%] text-gray-400 sm:max-w-3xl slg:max-w-2xl">
          Your privacy and satisfaction are important to us at Bonner Springs
          Service Limited. We are committed to providing exceptional software
          application solutions while protecting your data and rights.
        </span>
        <div className="flex gap-2 mt-3 xl:mt-8 text-[10px] xs:text-xs sm:text-sm slg:text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition">
          <button
            className={`px-2 xl:px-4 py-2 rounded-md ${
              activeTab === "termsOfUse"
                ? "bg-white text-black"
                : "bg-[#F5F5F5] text-[#667085]"
            }`}
            onClick={() => handleTabClick("termsOfUse")}>
            Terms of use
          </button>
          <button
            className={`px-2 xl:px-4 py-2 rounded-md ${
              activeTab === "privacyPolicy"
                ? "bg-white text-black"
                : "bg-[#F5F5F5] text-[#667085]"
            }`}
            onClick={() => handleTabClick("privacyPolicy")}>
            Privacy Policy
          </button>
          <button
            className={`px-2 xl:px-4 py-2 rounded-md ${
              activeTab === "deliveryReturn"
                ? "bg-white text-black"
                : "bg-[#F5F5F5] text-[#667085]"
            }`}
            onClick={() => handleTabClick("deliveryReturn")}>
            Delivery & Return
          </button>
          <button
            className={`px-2 xl:px-4 py-2 rounded-md ${
              activeTab === "refundPolicy"
                ? "bg-white text-black"
                : "bg-[#F5F5F5] text-[#667085]"
            }`}
            onClick={() => handleTabClick("refundPolicy")}>
            Refund Policy
          </button>
        </div>
      </section>

      <div className="flex mx-auto w-full mt-4 md:mt-8 text-base leading-[155%] px-2 sm:px-0 sm:max-w-xl slg:max-w-2xl pb-20">
        {activeTab === "termsOfUse" && (
          <div id="termsOfUse" className="text-[#667085]">
            <h4 className="text-base sm:text-xl xl:text-2xl font-semibold text-black capitalize">
              Terms of Use - Bonner Springs Service Limited
            </h4>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              By using Bonner Springs Service Limited&apos;s software
              applications and services, you agree to the following terms and
              conditions:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-2 text-xs md:text-sm xl:text-base">
              <li>
                <span className="font-medium">Software Licensing:</span> All
                software products are licensed, not sold. You receive a
                non-exclusive, non-transferable license to use our software
                applications according to the license agreement. Reverse
                engineering, decompilation, or unauthorized distribution is
                prohibited.
              </li>
              <li>
                <span className="font-medium">Eligibility:</span> You must be at
                least 18 years old or have parental consent to purchase and use
                our software applications. Business licenses require valid
                company registration.
              </li>
              <li>
                <span className="font-medium">Account Security:</span> You are
                responsible for maintaining the confidentiality of your license
                keys, login credentials, and all activities under your account.
                Unauthorized sharing of license keys will result in license
                termination.
              </li>
              <li>
                <span className="font-medium">Payment Terms:</span> Software
                licenses require full payment before activation.
                Subscription-based software is billed monthly or annually in
                advance. Failed payments may result in service suspension.
              </li>
              <li>
                <span className="font-medium">Software Delivery:</span> Software
                applications are delivered electronically within 2-4 hours of
                payment confirmation via email. Download links and license keys
                are provided with installation instructions.
              </li>
              <li>
                <span className="font-medium">System Requirements:</span> Ensure
                your system meets minimum requirements before purchase.
                Compatibility issues due to inadequate hardware/software are not
                grounds for refunds.
              </li>
              <li>
                <span className="font-medium">Updates & Support:</span> Software
                includes 12 months of updates and technical support. Extended
                support packages available separately. Bug fixes provided free
                of charge during support period.
              </li>
              <li>
                <span className="font-medium">Data Security:</span> Our software
                applications implement industry-standard security measures.
                Users are responsible for data backup and security of their
                information processed through our applications.
              </li>
            </ul>

            <p className="mt-4 leading-[1.8] text-xs md:text-sm xl:text-base">
              <span className="font-medium">Limitation of Liability:</span>{" "}
              Bonner Springs Service Limited&apos;s liability is limited to the
              value of the software license purchased. We provide software
              &quot;as is&quot; with no warranties beyond those required by
              Nigerian law.
            </p>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              <span className="font-medium">Intellectual Property:</span> All
              software, documentation, and related materials remain the
              intellectual property of Bonner Springs Service Limited. Any
              violation of intellectual property rights will be prosecuted to
              the full extent of the law.
            </p>
          </div>
        )}

        {activeTab === "privacyPolicy" && (
          <div id="privacyPolicy" className="text-[#667085]">
            <h4 className="text-sm sm:text-xl xl:text-2xl font-semibold text-black">
              PRIVACY POLICY - BONNER SPRINGS SERVICE LIMITED
            </h4>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              Bonner Springs Service Limited is committed to protecting your
              privacy. This policy explains how we collect, use, and safeguard
              your personal information when you use our software applications
              and related services.
            </p>

            <h4 className="text-sm sm:text-base lg:text-lg font-medium mt-4">
              INFORMATION WE COLLECT FOR SOFTWARE SERVICES
            </h4>

            <ul className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base list-decimal pl-4">
              <li>
                Personal identification (name, email, phone number, company
                details)
              </li>
              <li>
                Payment information (billing address, payment method for
                software licenses)
              </li>
              <li>
                Software usage data and system specifications for compatibility
                and optimization
              </li>
              <li>
                License activation data including hardware fingerprints for
                security
              </li>
              <li>
                Technical support communications and software performance logs
              </li>
              <li>Software feature usage statistics for product improvement</li>
              <li>Error reports and crash logs for debugging purposes</li>
            </ul>

            <h4 className="text-sm sm:text-base lg:text-lg font-medium mt-4">
              HOW WE USE YOUR INFORMATION
            </h4>

            <ul className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base list-disc pl-4">
              <li>To provide software licenses and manage activations</li>
              <li>To deliver software updates and security patches</li>
              <li>
                To provide technical support and troubleshooting assistance
              </li>
              <li>To process payments and maintain licensing records</li>
              <li>To improve software functionality based on usage patterns</li>
              <li>To prevent software piracy and unauthorized use</li>
              <li>
                To communicate important software updates and security notices
              </li>
              <li>
                To offer relevant software upgrades and additional services
              </li>
            </ul>

            <h4 className="text-sm sm:text-base lg:text-lg font-medium mt-4">
              SOFTWARE DATA SECURITY
            </h4>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              We implement military-grade encryption for all software
              communications and data transmission. Software licensing data is
              stored on secure servers with multiple backup systems. License
              validation occurs through encrypted channels to prevent
              unauthorized access. All software installations include built-in
              security features to protect your data and system integrity.
            </p>

            <h4 className="text-sm sm:text-base lg:text-lg font-medium mt-4">
              DATA RETENTION FOR SOFTWARE USERS
            </h4>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              Software licensing data is retained for the duration of your
              license plus 7 years for compliance and support purposes. Usage
              statistics are anonymized after 12 months. Technical support
              records are maintained for 3 years to ensure consistent service
              quality.
            </p>

            <h4 className="text-sm sm:text-base lg:text-lg font-medium mt-4">
              YOUR RIGHTS AS A SOFTWARE USER
            </h4>

            <p className="mt-2 leading-[1.8] text-xs md:text-sm xl:text-base">
              You have the right to access your licensing information, request
              data corrections, and opt-out of non-essential communications. You
              may request software data portability and deletion subject to
              licensing obligations. For privacy concerns specific to our
              software services, contact our Data Protection Officer at
              privacy@bonnersprings.com.ng.
            </p>
          </div>
        )}

        {activeTab === "deliveryReturn" && (
          <div id="deliveryReturn" className="text-[#667085]">
            <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-2">
              SOFTWARE DELIVERY & SUPPORT POLICY - BONNER SPRINGS SERVICE
              LIMITED
            </h3>

            <p className="text-xs md:text-sm xl:text-base mb-4">
              At Bonner Springs Service Limited, we ensure swift and secure
              delivery of our software applications with comprehensive support
              to maximize your productivity and satisfaction.
            </p>

            <div className="mb-6">
              <h4 className="font-medium text-xs md:text-sm xl:text-base mb-2">
                Software Delivery Process
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base">
                <li>
                  Software licenses delivered via email within 2-4 hours of
                  payment confirmation
                </li>
                <li>
                  Download links valid for 7 days with unlimited downloads
                  during this period
                </li>
                <li>
                  Installation packages include setup wizards and system
                  compatibility checkers
                </li>
                <li>
                  License keys provided with step-by-step activation
                  instructions
                </li>
                <li>
                  Technical documentation and user manuals included with all
                  software
                </li>
                <li>
                  Video tutorials and online resources available immediately
                  after purchase
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-xs md:text-sm xl:text-base mb-2">
                Technical Support Services
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base">
                <li>
                  24/7 technical support for installation and activation issues
                </li>
                <li>
                  Remote assistance available for complex software
                  configurations
                </li>
                <li>
                  Priority support for business and enterprise license holders
                </li>
                <li>
                  Comprehensive knowledge base and FAQ section on our website
                </li>
                <li>
                  Regular webinars and training sessions for advanced features
                </li>
                <li>
                  Direct hotline: +234-801-234-5001 for urgent technical issues
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-xs md:text-sm xl:text-base mb-2">
                Software Updates & Maintenance
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base">
                <li>
                  Automatic update notifications for all registered software
                </li>
                <li>Security patches delivered within 24 hours of release</li>
                <li>
                  Feature updates included free for 12 months from purchase date
                </li>
                <li>Beta testing programs available for advanced users</li>
                <li>
                  Backward compatibility maintained for at least 3 major
                  versions
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-xs md:text-sm xl:text-base mb-2">
                Return & Exchange Policy for Software
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base">
                <li>
                  30-day money-back guarantee if software doesn&apos;t meet
                  published specifications
                </li>
                <li>
                  Free license exchange for different software editions within
                  14 days
                </li>
                <li>
                  Upgrade discounts available for existing customers (up to 40%
                  off)
                </li>
                <li>
                  License transfer allowed once per license with administrative
                  fee
                </li>
                <li>
                  Refund processing requires license deactivation and
                  uninstallation verification
                </li>
                <li>
                  Custom software development projects non-refundable after
                  final acceptance
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-xs md:text-sm xl:text-base mb-2">
                Contact Information
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base">
                <li>Technical Support: support@bonnersprings.com.ng</li>
                <li>Sales Inquiries: sales@bonnersprings.com.ng</li>
                {/* <li>Phone: +234-801-234-5001</li> */}
                <li>Website: www.bonnersprings.com.ng</li>
                <li>
                  Business Hours: Monday - Friday, 8:00 AM - 6:00 PM (WAT)
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "refundPolicy" && (
          <div id="refundPolicy" className="text-[#667085]">
            <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-2">
              REFUND POLICY - BONNER SPRINGS SERVICE LIMITED
            </h3>
            <p className="text-xs md:text-sm xl:text-base mb-4">
              Effective Date: {new Date().toLocaleDateString("en-GB")}
            </p>

            <p className="text-xs md:text-sm xl:text-base mb-4">
              At Bonner Springs Service Limited, customer satisfaction is our
              top priority. This refund policy outlines our commitment to
              providing fair and transparent refund processes for our software
              application services while protecting our intellectual property
              rights.
            </p>

            <ul className="list-disc pl-5 space-y-3 leading-[1.8] text-xs md:text-sm xl:text-base">
              <li>
                <span className="font-medium">
                  1. Software License Refund Terms
                </span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>30-day money-back guarantee for all software licenses</li>
                  <li>
                    Refunds available if software fails to perform as documented
                  </li>
                  <li>
                    Technical issues that cannot be resolved within 48 hours
                    qualify for refunds
                  </li>
                  <li>
                    Compatibility problems with supported systems (as listed)
                    are refundable
                  </li>
                  <li>
                    Refund requests must include license deactivation and
                    software uninstallation
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-medium">
                  2. Non-Refundable Software Services
                </span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Custom software development after client acceptance</li>
                  <li>
                    Software licenses used beyond 30-day trial period without
                    issues
                  </li>
                  <li>
                    Training services and consultation sessions already
                    delivered
                  </li>
                  <li>
                    Software damaged by user modifications or unauthorized
                    alterations
                  </li>
                  <li>
                    Licenses purchased at promotional or discounted rates (final
                    sale)
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-medium">3. Refund Request Process</span>
                <p className="mt-1">To request a software license refund:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Email: refunds@bonnersprings.com.ng</li>
                  <li>Phone: +234-801-234-5001</li>
                  <li>Include original license key and purchase receipt</li>
                  <li>Provide detailed reason for refund request</li>
                  <li>Complete software uninstallation verification process</li>
                </ul>
              </li>

              <li>
                <span className="font-medium">
                  4. Refund Processing Timeline
                </span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Refund requests reviewed within 2 business days</li>
                  <li>
                    Technical verification completed within 3-5 business days
                  </li>
                  <li>Approved refunds processed within 7-10 business days</li>
                  <li>Refunds issued to original payment method only</li>
                  <li>Bank processing may add additional 3-5 business days</li>
                </ul>
              </li>

              <li>
                <span className="font-medium">
                  5. Partial Refunds & Upgrades
                </span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    Pro-rated refunds available for unused subscription periods
                  </li>
                  <li>
                    Upgrade credits applied for license exchanges within same
                    product family
                  </li>
                  <li>Training session credits transferable within 6 months</li>
                  <li>
                    Bundle purchases refunded proportionally based on used
                    components
                  </li>
                </ul>
              </li>

              <li>
                <span className="font-medium">
                  6. Enterprise & Volume License Refunds
                </span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    Enterprise licenses subject to separate refund terms in
                    contract
                  </li>
                  <li>Volume discounts may affect refund calculations</li>
                  <li>
                    Unused licenses in volume purchases may be partially
                    refunded
                  </li>
                  <li>
                    Enterprise support contracts refunded on pro-rata basis
                  </li>
                </ul>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-xs md:text-sm xl:text-base mb-2">
                Contact Information
              </h4>
              <p className="text-xs md:text-sm xl:text-base">
                For questions about software refunds or licensing:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm xl:text-base">
                <li>Bonner Springs Service Limited</li>
                <li>Email: refunds@bonnersprings.com.ng</li>
                <li>Support: support@bonnersprings.com.ng</li>
                <li>Phone: +234-801-234-5001</li>
                <li>Website: www.bonnersprings.com.ng</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BonnerSpringsPolicies;
