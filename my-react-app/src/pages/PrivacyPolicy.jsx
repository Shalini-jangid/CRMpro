import React from 'react';
import { Shield, Mail, Phone, MapPin, Calendar, Users, Database, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-sky-600" />
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Introduction */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy describes how CRM pro ("we," "our," or "us") collects, uses, and protects your personal information when you use our customer relationship management platform and services. We are committed to protecting your privacy and ensuring the security of your data.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Last Updated:</strong> June 24, 2025
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-sky-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Name, email address, and phone number</li>
                  <li>• Company information and job title</li>
                  <li>• Billing and payment information</li>
                  <li>• Account credentials and preferences</li>
                </ul>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Platform usage analytics and behavior</li>
                  <li>• Feature usage and interaction data</li>
                  <li>• Login times and session duration</li>
                  <li>• Device and browser information</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Customer Data</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Contact information of your customers</li>
                  <li>• Communication history and notes</li>
                  <li>• Sales pipeline and opportunity data</li>
                  <li>• Custom fields and tags you create</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Service Provision</h3>
                <p className="text-gray-700 text-sm">
                  To provide, maintain, and improve our CRM platform, including customer support and technical assistance.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-700 text-sm">
                  To send important updates, security alerts, and respond to your inquiries and support requests.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-700 text-sm">
                  To analyze usage patterns and improve our platform's performance, features, and user experience.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                <p className="text-gray-700 text-sm">
                  To comply with legal obligations, enforce our terms of service, and protect against fraud.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-white p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Encryption</h4>
                  <p className="text-xs text-gray-600">AES-256 encryption at rest and in transit</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Database className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Secure Storage</h4>
                  <p className="text-xs text-gray-600">SOC 2 compliant data centers</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-3 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-sm">Access Control</h4>
                  <p className="text-xs text-gray-600">Role-based permissions and 2FA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Access & Portability</h4>
                  <p className="text-sm text-gray-700">Request access to your personal data and receive it in a portable format.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Correction</h4>
                  <p className="text-sm text-gray-700">Update or correct inaccurate personal information in your account.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Deletion</h4>
                  <p className="text-sm text-gray-700">Request deletion of your personal data, subject to legal obligations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Opt-out</h4>
                  <p className="text-sm text-gray-700">Unsubscribe from marketing communications at any time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Data Retention</h2>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Account data is typically retained for 7 years after account closure for compliance purposes, while some usage analytics may be retained indefinitely in anonymized form.
              </p>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We may share data with trusted third-party service providers who help us operate our platform:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <strong>Payment Processors:</strong> For billing and subscription management
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <strong>Cloud Providers:</strong> For hosting and infrastructure services
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <strong>Analytics Tools:</strong> For platform performance monitoring
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <strong>Support Services:</strong> For customer service and technical support
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-sky-700 p-6 rounded-lg text-white">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Contact Us</h2>
            </div>
            <p className="mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>privacy@crmsolutions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Business Ave, Suite 100</span>
              </div>
            </div>
          </div>

          {/* Updates Notice */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our platform. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;