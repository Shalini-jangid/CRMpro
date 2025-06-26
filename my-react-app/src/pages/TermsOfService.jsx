import React from 'react';
import { FileText, Shield, Users, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using our CRM platform
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: June 24, 2025
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Quick Navigation */}
          <div className="bg-blue-50 px-8 py-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#acceptance" className="flex items-center space-x-2 text-emerald-600 hover:text-blue-800 transition-colors">
                <Shield className="h-4 w-4" />
                <span>Acceptance of Terms</span>
              </a>
              <a href="#services" className="flex items-center space-x-2 text-emerald-600 hover:text-blue-800 transition-colors">
                <Users className="h-4 w-4" />
                <span>Service Description</span>
              </a>
              <a href="#privacy" className="flex items-center space-x-2 text-emerald-600 hover:text-blue-800 transition-colors">
                <AlertCircle className="h-4 w-4" />
                <span>Privacy & Data</span>
              </a>
            </div>
          </div>

          {/* Terms Content */}
          <div className="px-8 py-8 space-y-12">
            
            {/* Section 1 */}
            <section id="acceptance">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  By accessing and using our Customer Relationship Management (CRM) platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you and our company. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="services">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                2. Service Description
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our CRM platform provides customer relationship management tools including but not limited to:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 my-6">
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Contact and lead management systems</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sales pipeline tracking and analytics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Communication and collaboration tools</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Reporting and business intelligence features</span>
                    </li>
                  </ul>
                </div>
                <p>
                  We strive to maintain high service availability but do not guarantee uninterrupted service. Scheduled maintenance and updates may temporarily affect service availability.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                3. User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  As a user of our CRM platform, you agree to:
                </p>
                <p>
                  Provide accurate and complete information during registration and maintain the security of your account credentials. You are responsible for all activities that occur under your account and must notify us immediately of any unauthorized access.
                </p>
                <p>
                  Use the service in compliance with all applicable laws and regulations. You may not use our platform for any illegal activities, spam, or to violate the privacy rights of others.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="privacy">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                4. Privacy and Data Protection
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="bg-blue-50 border-l-4 border-sky-400 p-6 rounded-r-lg">
                  <p className="font-medium text-blue-900 mb-2">Data Security Commitment</p>
                  <p className="text-emerald-800">
                    We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits.
                  </p>
                </div>
                <p>
                  Your privacy is important to us. We collect and process personal data in accordance with our Privacy Policy and applicable data protection laws, including GDPR and CCPA where applicable.
                </p>
                <p>
                  You retain ownership of all customer data you input into our system. We will not access, use, or disclose your data except as necessary to provide our services or as required by law.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                5. Payment and Billing
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Subscription fees are billed in advance on a monthly or annual basis as selected during signup. All fees are non-refundable except as expressly stated in our refund policy.
                </p>
                <p>
                  We reserve the right to modify our pricing with 30 days advance notice. Price changes will not affect your current billing cycle but will apply to subsequent renewals.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                6. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our liability for any claims arising from your use of the service is limited to the amount you paid for the service in the 12 months preceding the claim. We are not liable for any indirect, incidental, or consequential damages.
                </p>
                <p>
                  This limitation applies to the fullest extent permitted by applicable law and survives termination of these terms.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                7. Termination
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Either party may terminate this agreement at any time. Upon termination, your access to the service will cease, and we will provide you with the ability to export your data for a period of 30 days.
                </p>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.
                </p>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Questions about these terms?</h3>
                <p className="text-gray-600">
                  Contact our legal team at <a href="mailto:legal@company.com" className="text-sky-600 hover:underline">legal@company.com</a>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Document Version 2.1</p>
                <p className="text-sm text-gray-500">Effective Date: June 24, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;