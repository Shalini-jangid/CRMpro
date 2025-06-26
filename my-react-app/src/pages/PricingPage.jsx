import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Rocket,
  Users,
  Building,
  Sparkles,
  ArrowRight,
  Shield,
  Headset,
  TrendingUp,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PricingPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleStartTrial = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleRedirectToLogin = () => {
    setShowLoginPopup(false);
    // Simulate navigation to login page
    console.log('Redirecting to login page...');
   navigate('/login');
    // alert('Redirecting to login page...');
  };

  const plans = [
    {
      name: 'Starter',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Perfect for small teams getting started',
      monthlyPrice: '₹2388',
      annualPrice:'₹199',
      features: [
        'Up to 5 users',
        '1,000 contacts',
        'Basic CRM features',
        'Email integration',
        'Mobile app access',
        'Standard support',
        '5GB storage',
        'Basic analytics'
      ],
      limitations: [
        'No advanced automation',
        'Limited integrations',
        'Basic reporting only'
      ],
      buttonText: 'Start Free Trial',
      gradient: 'from-sky-800 to-sky-900',
      bgGradient: 'from-sky-50 to-sky-100/50',
      popular: false
    },
    {
      name: 'Professional',
      icon: <Users className="w-6 h-6" />,
      description: 'Ideal for growing businesses',
      monthlyPrice: '₹499',
      annualPrice: '₹499',
      features: [
        'Up to 25 users',
        '10,000 contacts',
        'Advanced CRM features',
        'Email & SMS campaigns',
        'Automation workflows',
        'Priority support',
        '50GB storage',
        'Advanced analytics',
        'Custom fields',
        'API access',
        'Team collaboration',
        'Lead scoring'
      ],
      limitations: [
        'Limited AI features'
      ],
      buttonText: 'Start Free Trial',
      gradient: 'from-amber-700 to-amber-800',
      bgGradient: 'sky-600',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: <Building className="w-6 h-6" />,
      description: 'For large organizations with complex needs',
      monthlyPrice: '₹1999',
      annualPrice: '₹1999',
      features: [
        'Unlimited users',
        'Unlimited contacts',
        'Full CRM suite',
        'Advanced automation',
        'AI-powered insights',
        'White-label options',
        'Unlimited storage',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced security',
        'Custom reporting',
        'SLA guarantee',
        'Multi-language support',
        'Advanced permissions'
      ],
      limitations: [],
      buttonText: 'Start Free Trial',
      gradient: 'from-rose-700 to-rose-800',
      bgGradient: 'amber-600',
      popular: false
    }
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: 'Enterprise-grade security'
    },
    {
      icon: <Headset className="w-5 h-5" />,
      text: '24/7 customer support'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: '99.9% uptime guarantee'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: 'Global data centers'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-emerald-50/30 to-sky-50/40" />
        
        <div className={`relative max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center mb-6">
            <Star className="w-6 h-6 text-emerald-500 mr-2" />
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              Simple, Transparent Pricing
            </span>
            <Star className="w-6 h-6 text-emerald-500 ml-2" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Scale Your Business
            </span>
            <br />
            <span className="text-gray-900">Without Breaking the Bank</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto" >
            Choose the perfect plan for your team. All plans include a 14-day free trial, 
            no setup fees, and can be cancelled anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <span className={`mr-3 font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-sky-700' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-300 ${
                isAnnual ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
            <span className={`ml-3 font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-3 bg-emerald-700 text-white text-sm px-3 py-1 rounded-full font-semibold">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-500 ${
                  plan.popular 
                    ? 'scale-105 lg:scale-110 z-10' 
                    : hoveredPlan === index 
                      ? 'scale-105 z-10' 
                      : 'hover:scale-105'
                }`}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-sky-700 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg flex items-center">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  plan.popular ? 'ring-2 ring-emerald-500/50' : ''
                }`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-50`} />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-500 ml-2">/month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-sm text-emerald-600 mt-2 font-medium">
                          Billed annually 
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <ul className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start opacity-60">
                            <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 text-sm line-through">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={handleStartTrial}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-amber-700 hover:from-amber-800 hover:to-amber-850 text-white shadow-lg hover:shadow-xl'
                          : 'bg-sky-700 hover:from-sky-700 hover:to-sky-800 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {plan.buttonText}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-16 bg-gradient-to-r from-sky-700 to-emerald-800 mx-6 rounded-3xl mb-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-sky-100 text-lg">
              All plans include these essential features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-white">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Our team is here to help you find the perfect plan for your business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-sky-500 to-emerald-900 hover:from-sky-800 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center">
                <Headset className="mr-2 w-5 h-5" />
                Contact Sales
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group border-2 border-gray-300 hover:border-sky-500 text-gray-700 hover:text-sky-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center">
                <Sparkles className="mr-2 w-5 h-5" />
                View FAQ
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-sky-900 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent)]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join over 10,000+ companies already growing with CRMPro
            </p>
          </div>
          
          <button 
            onClick={handleStartTrial}
            className="group bg-gradient-to-r from-sky-700 to-emerald-700 hover:from-sky-800 hover:to-emerald-500 text-gray-900 font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-sky-500/25"
          >
            <span className="flex items-center justify-center">
              <Rocket className="mr-3 w-6 h-6" />
              Start Your 14-Day Free Trial
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • Cancel anytime • Full access to all features
          </p>
        </div>
      </section>

      {/* Login Popup Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="bg-emerald-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600">
                  You need to log in first to start your free trial and access all the amazing features.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-rose-700 mr-3 flex-shrink-0" />
                    14-day free trial with full access
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-sky-700 mr-3 flex-shrink-0" />
                    No credit card required
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <Check className="w-5 h-5 text-amber-700 mr-3 flex-shrink-0" />
                    Cancel anytime
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRedirectToLogin}
                  className="flex-1 bg-sky-600 hover:sky-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Go to Login
                </button>
                <button
                  onClick={handleClosePopup}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;