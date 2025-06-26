import React, { useState } from 'react';
import { BarChart3, Users, Target, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';


const HomePage = () => {

     // Function to handle signup navigation
  const handleSignupClick = () => {

  };
    
  return (
    <div>
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
     
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-emerald-700 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="text-gray-900">Customer Relations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your sales process, manage customer relationships, and boost revenue with our cutting-edge CRM platform designed for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleSignupClick}
              className="px-8 py-4 bg-emerald-700 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              
              <Link to="/signup">Start Free Trial</Link>
              
              
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200">
              <a href="https://www.youtube.com/watch?v=D29zg_5hfeg" target="_blank" rel="noopener noreferrer">Watch Demo</a>
            </button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Contact Management</h3>
            <p className="text-gray-600">Organize and track all your customer interactions in one centralized platform.</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sales Analytics</h3>
            <p className="text-gray-600">Get real-time insights into your sales performance with advanced analytics.</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Deal Tracking</h3>
            <p className="text-gray-600">Monitor your sales pipeline and close deals faster with intelligent tracking.</p>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm font-medium mb-8">TRUSTED BY 10,000+ COMPANIES WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-gray-200 px-6 py-3 rounded-lg font-bold text-gray-600">TechCorp</div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg font-bold text-gray-600">InnovateCo</div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg font-bold text-gray-600">GrowthLab</div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg font-bold text-gray-600">ScaleUp</div>
            <div className="bg-gray-200 px-6 py-3 rounded-lg font-bold text-gray-600">FutureTech</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="text-emerald-700">Scale Your Business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive CRM platform provides all the tools you need to manage customers, track deals, and grow your revenue.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Powerful Contact Management</h3>
              <p className="text-lg text-gray-600 mb-8">
                Keep all your customer information organized in one place. Track interactions, manage relationships, and never miss a follow-up opportunity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">360° customer view with complete interaction history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Advanced segmentation and tagging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Automated follow-up reminders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Bulk import and export capabilities</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact Profile</h4>
                    <p className="text-sm text-gray-500">Complete customer overview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Last Contact</span>
                    <span className="text-sm font-medium">2 days ago</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Deal Value</span>
                    <span className="text-sm font-medium text-emerald-600">$25,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Hot Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Sales Pipeline</h4>
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Prospects</span>
                      <span className="text-sm font-medium">24 deals</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Qualified</span>
                      <span className="text-sm font-medium">18 deals</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Closed Won</span>
                      <span className="text-sm font-medium text-emerald-600">$127k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Visual Sales Pipeline</h3>
              <p className="text-lg text-gray-600 mb-8">
                Track your deals through every stage of the sales process. Get real-time insights into your pipeline health and identify bottlenecks before they impact revenue.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Drag-and-drop deal management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Customizable pipeline stages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Revenue forecasting and analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">Automated stage progression</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-700 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-emerald-100">
              Join thousands of companies that have transformed their sales process
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-emerald-100">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-emerald-100">Revenue Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-emerald-100">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-emerald-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "CRMPro has completely transformed how we manage our sales process. Our conversion rates have increased by 40% since implementation."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">VP of Sales, TechCorp</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The analytics and reporting features are incredible. We can now make data-driven decisions that directly impact our bottom line."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                  <div className="text-gray-600 text-sm">CEO, GrowthLab</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Outstanding customer support and an intuitive interface. Our team was up and running in just a few hours."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">EC</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Emily Chen</div>
                  <div className="text-gray-600 text-sm">Sales Director, InnovateCo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">₹199</div>
                <div className="text-gray-600 mb-6">per user/month</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Up to 1,000 contacts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Mobile app</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSignupClick}
                  className="w-full py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-700 hover:text-white transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
            <div className="bg-emerald-700 p-8 rounded-2xl text-white relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold mb-1">₹499</div>
                <div className="text-emerald-100 mb-6">per user/month</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Unlimited contacts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-200 mr-3" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <button 
                  onClick={handleSignupClick}
                  className="w-full py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                ><Link to={"/signup"}> Start Free Trial</Link>
                 
                </button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">₹1999</div>
                <div className="text-gray-600 mb-6">per user/month</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Custom training</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>Advanced security</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span>SLA guarantee</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-700 hover:text-white transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-700 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Sales Process?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of businesses already using CRMPro to accelerate their growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleSignupClick}
              className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            ><Link to={"/signup"}>Start Your Free Trial</Link>
              
            </button>
        
          </div>
          <p className="text-emerald-100 text-sm mt-6">
            No credit card required • 5-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
    </div>
  )
}

export default HomePage
