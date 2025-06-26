import React from 'react';
import {
  Rocket,
  Target,
  Megaphone,
  Headset,
  BarChart3,
  Smartphone,
  Brain,
  Layers,
  FolderLock,
  Users
} from 'lucide-react';

const categories = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Sales CRM',
    description: 'Boost your sales pipeline with automated workflows and lead intelligence.',
    features: [
      'Lead capture and scoring',
      'Sales funnel tracking',
      'Email & call integration',
      'Automated follow-ups'
    ]
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: 'Marketing Automation',
    description: 'Create, launch, and optimize campaigns with precision targeting.',
    features: [
      'Email & SMS campaigns',
      'Landing page builder',
      'Marketing analytics',
      'Campaign A/B testing'
    ]
  },
  {
    icon: <Headset className="w-6 h-6" />,
    title: 'Customer Support',
    description: 'Deliver faster and smarter customer service across multiple channels.',
    features: [
      'Ticketing system',
      'Live chat & chatbot',
      'Feedback & CSAT tools',
      'Knowledge base builder'
    ]
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Advanced Analytics',
    description: 'Get insights that drive smarter decisions with real-time reporting.',
    features: [
      'Sales & marketing dashboards',
      'Funnel performance metrics',
      'Revenue forecasts',
      'Custom report builder'
    ]
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Campaign Management',
    description: 'Manage campaigns from one place with task tracking and performance metrics.',
    features: [
      'Campaign planner',
      'Budget tracking',
      'Content scheduling',
      'Team collaboration'
    ]
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Tools',
    description: 'Automate decisions and get smart recommendations with AI-driven insights.',
    features: [
      'Lead scoring with ML',
      'Churn prediction',
      'Next-best action engine',
      'Smart notifications'
    ]
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile CRM',
    description: 'Stay connected and productive with full mobile access to your CRM.',
    features: [
      'Native iOS & Android apps',
      'Offline access & sync',
      'Push notifications',
      'Voice-to-text notes'
    ]
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'App Integrations',
    description: 'Connect seamlessly with your favorite tools and platforms.',
    features: [
      'Slack, Gmail, Zoom, Zapier',
      'Webhook & API access',
      'Two-way data sync',
      'Custom integration options'
    ]
  },
  {
    icon: <FolderLock className="w-6 h-6" />,
    title: 'Secure File Management',
    description: 'Upload, organize, and protect your critical business documents.',
    features: [
      'Encrypted file storage',
      'Access control & logs',
      'Version control',
      'E-signature support'
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Collaboration',
    description: 'Unite your sales, marketing, and support teams on one collaborative platform.',
    features: [
      'Shared pipeline visibility',
      'Task assignments & mentions',
      'Team notes on leads & deals',
      'Internal comments & chat'
    ]
  }
];

const CRMFeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-sans text-gray-800">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-br from-emerald-50 to-sky-100">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">All-in-One CRM Platform</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Streamline your sales, marketing, and support workflows with intelligent automation and deep analytics.
        </p>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white to-slate-50 border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {item.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-700 to-sky-700 py-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Grow faster with CRMPro</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Start your free 5-day trial and explore features for sales, marketing, and customer success—all in one place.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Try It Free
        </a>
      </section>
    </div>
  );
};

export default CRMFeaturesPage;
