import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Users, 
  Shield, 
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Contact = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth(); 
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '', 
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
    subject: '',
    message: '',
    feedbackType: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Use environment variable for API base URL
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const endpoint = `${apiBaseUrl}/api/feedback`;

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if user is authenticated
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          ...formData,
          userId: user?.id, // Include user ID if authenticated
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormStatus({
          type: 'success',
          message: data.message || 'Thank you for your feedback! We\'ll get back to you within 24 hours.'
        });
        // Reset form except pre-filled user data
        setFormData({
          fullName: user?.fullName || '',
          email: user?.email || '',
          company: user?.company || '',
          phone: user?.phone || '',
          subject: '',
          message: '',
          feedbackType: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setFormStatus({
        type: 'error',
        message: error.message || 'Sorry, there was an error submitting your feedback. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How quickly can I get started with CrmPro?",
      answer: "You can be up and running in under 5 minutes! Our quick setup wizard guides you through importing your contacts, customizing your pipeline, and configuring your team settings. Most users are actively managing leads within their first hour."
    },
    {
      question: "What integrations does CrmPro support?",
      answer: "CrmPro integrates with 200+ popular business tools including Gmail, chatbot, sales, marketing, QuickBooks, HubSpot, Salesforce, and all major email marketing platforms. Our API also supports custom integrations."
    },
    {
      question: "Is my data secure with CrmPro?",
      answer: "Absolutely! We use bank-level security with 256-bit SSL encryption, SOC 2 Type II compliance, and regular security audits. Your data is backed up daily and stored in secure, redundant data centers."
    },
    {
      question: "Can I migrate from my current CRM?",
      answer: "Yes! Our migration specialists will help you transfer all your data from any CRM platform at no extra cost. We support automated imports from Salesforce, HubSpot, Pipedrive, and 50+ other platforms."
    },
    {
      question: "What support options are available?",
      answer: "We offer 24/7 chat support, phone support during business hours, extensive documentation, video tutorials, and weekly live training sessions. Premium plans include dedicated account managers."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! Start with our 5-day free trial with full access to all features. No credit card required. You can also schedule a personalized demo with our team to see CrmPro in action."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      text: "CrmPro transformed our sales process. We've seen a 40% increase in conversion rates since switching.",
      rating: 5
    },
    {
      name: "Mike Chen",
      company: "Growth Marketing Co",
      text: "The automation features save us 10 hours per week. Best investment we've made for our business.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      company: "Premium Services Inc",
      text: "Customer support is incredible. They helped us migrate 10,000+ contacts seamlessly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                Get in Touch with CrmPro
              </h1>
              <p className="text-gray-600 mt-2">
                {user ? `Welcome back, ${user.name}!` : 'We\'re here to help you grow your business'}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>50,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'contact', label: 'Contact Info', icon: Phone },
              { id: 'feedback', label: 'Feedback', icon: MessageSquare },
              { id: 'faq', label: 'FAQ', icon: HelpCircle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-sky-100 rounded-lg">
                    <Phone className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-sm text-gray-600">Mon-Fri 9am-6pm PST</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-600 mt-1">Sales & Support</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-sm text-gray-600">We reply within 2 hours</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-900">contact@crmpro.com</p>
                <p className="text-sm text-gray-600 mt-1">General inquiries</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-sm text-gray-600">Corporate Headquarters</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">123 Innovation Drive</p>
                <p className="text-sm text-gray-600">San Francisco, CA 94107</p>
              </div>
            </div>

            {/* Marketing Content */}
            <div className="bg-gradient-to-r from-sky-600 to-emerald-600 p-8 rounded-2xl text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Sales?</h2>
                  <p className="text-sky-100 mb-6">
                    Join thousands of businesses already using CrmPro to close more deals, 
                    build better relationships, and grow faster.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
                      onClick={() => navigate('/signup')}
                    >
                      Start Free Trial
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sky-100 text-sm">Customer Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">2M+</div>
                    <div className="text-sky-100 text-sm">Contacts Managed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">45%</div>
                    <div className="text-sky-100 text-sm">Average Sales Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sky-100 text-sm">Support Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="p-3 bg-sky-100 rounded-lg w-fit mb-4">
                  <Zap className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast Setup</h3>
                <p className="text-gray-600 text-sm">Get started in minutes with our intuitive onboarding process and data import tools.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                <p className="text-gray-600 text-sm">Bank-level encryption and SOC 2 compliance to keep your data safe and secure.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="p-3 bg-amber-100 rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600 text-sm">24/7 customer support from CRM experts who understand your business needs.</p>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
                <p className="text-gray-600">Help us improve CrmPro with your suggestions and ideas</p>
              </div>

              {formStatus.message && (
                <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                  formStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {formStatus.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Type
                  </label>
                  <select
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="feedback">General Feedback</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Brief description of your feedback"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                    placeholder="Please share your detailed feedback, suggestions, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-sky-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Feedback
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Customer Testimonials */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-sky-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Why Your Feedback Matters</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  Every piece of feedback helps us build better features and improve your CRM experience. 
                  We read every message and use your input to guide our product roadmap.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find quick answers to common questions about CrmPro</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-sky-50 p-6 rounded-xl text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">Can't find what you're looking for? Our support team is here to help!</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="bg-sky-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-sky-700 transition-colors"
                >
                  Contact Support
                </button>
                <button 
                  onClick={() => setActiveTab('feedback')}
                  className="border border-sky-600 text-sky-600 px-6 py-2 rounded-lg font-medium hover:bg-sky-600 hover:text-white transition-colors"
                >
                  Send Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;