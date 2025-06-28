import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    password: '',
    confirmPassword: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'education', label: 'Education' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid business email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.company.trim()) newErrors.company = 'Company name is required';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
      if (!formData.companySize) newErrors.companySize = 'Please select company size';
      if (!formData.industry) newErrors.industry = 'Please select industry';
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms of service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
  if (!validateStep(3)) return;

  setIsLoading(true);

  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      ...formData
    });

    // Show success alert with SweetAlert2
    await Swal.fire({
      title: 'Account Created Successfully! 🎉',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; margin-bottom: 10px;">
            Welcome, <strong>${formData.firstName}</strong>!
          </p>
          <p style="color: #666; font-size: 14px;">
            Please check your email to verify your account.
          </p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Go to Login',
      confirmButtonColor: '#059669',
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-button'
      }
    });
    
    // Reset form after success
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      companySize: '',
      industry: '',
      password: '',
      confirmPassword: '',
    });
    setCurrentStep(1);
    setErrors({});
    
    // Navigate to login page
    navigate('/login');
    
  } catch (err) {
    const msg = err?.response?.data?.message || "Signup failed!";
    
    // Show error alert with SweetAlert2
    Swal.fire({
      title: 'Signup Failed',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#dc2626',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-swal-button'
      }
    });
  } finally {
    setIsLoading(false);
  }
};


  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 border-2 rounded-lg text-base bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-800 placeholder-gray-400";
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500`;
    }
    
    return `${baseClasses} border-gray-300 focus:border-sky-100`;
  };

  const getSelectClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 border-2 rounded-lg text-base bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600";
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500`;
    }
    
    return `${baseClasses} border-gray-300 focus:border-sky-800`;
  };

  const renderStep1 = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-sky-800">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2 text-sm">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            className={getInputClasses('firstName')}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 text-sm">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            className={getInputClasses('lastName')}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm">
          Business Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@company.com"
          className={getInputClasses('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 text-sm">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          className={getInputClasses('phone')}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Information</h2>
        <p className="text-gray-600">Tell us about your business</p>
      </div>

      <div>
        <label htmlFor="company" className="block text-gray-700 font-semibold mb-2 text-sm">
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Acme Corporation"
          className={getInputClasses('company')}
        />
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">{errors.company}</p>
        )}
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-gray-700 font-semibold mb-2 text-sm">
          Job Title *
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          placeholder="Sales Manager"
          className={getInputClasses('jobTitle')}
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
        )}
      </div>

      <div>
        <label htmlFor="companySize" className="block text-gray-700 font-semibold mb-2 text-sm">
          Company Size *
        </label>
        <select
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleInputChange}
          className={getSelectClasses('companySize')}
        >
          <option value="">Select company size</option>
          {companySizes.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
        {errors.companySize && (
          <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>
        )}
      </div>

      <div>
        <label htmlFor="industry" className="block text-gray-700 font-semibold mb-2 text-sm">
          Industry *
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className={getSelectClasses('industry')}
        >
          <option value="">Select industry</option>
          {industries.map(industry => (
            <option key={industry.value} value={industry.value}>{industry.label}</option>
          ))}
        </select>
        {errors.industry && (
          <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Security</h2>
        <p className="text-gray-600">Secure your account with a strong password</p>
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          className={getInputClasses('password')}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Password must be at least 8 characters long
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2 text-sm">
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          className={getInputClasses('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-3">

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            className="w-5 h-5 mt-1 accent-sky-600"
          />
          <label htmlFor="terms" className="text-gray-600 text-sm leading-relaxed cursor-pointer">
            I agree to the{' '}
            <button 
              type="button" 
              className="text-sky-800 font-semibold hover:underline"
              onClick={() => navigate('/terms')}
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button 
              type="button" 
              className="text-sky-600 font-semibold hover:underline"
            onClick={() => navigate('/policy')}
            >
              Privacy Policy
            </button>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs">{errors.terms}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-gray-50 p-5">
      
      {/* Back to Home Button - Responsive positioning */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          ← Back to Home
        </button>
      </div>
      
      {/* Main form container */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-8 rounded-t-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Join CRM Pro</h1>
            <p className="text-sky-100">Start your 30-day free trial today</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep 
                      ? 'bg-white text-emerald-600' 
                      : 'bg-emerald-900 text-emerald-200'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-emerald-900 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-emerald-400 text-gray-700 font-semibold rounded-lg transition-all duration-300 hover:border-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-3 bg-green-800 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 rounded-b-2xl text-center border-t border-gray-200">
          <p className="text-sky-600 text-sm">
            Already have an account?{' '}
            <Link to={"/login"} className="text-sky-800 font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
          <div className="flex justify-center items-center mt-4 space-x-4 text-xs text-gray-500">
            <span>🔒 Secure & Encrypted</span>
            <span>•</span>
            <span>📧 Email Verification</span>
            <span>•</span>
            <span>🚀 30-Day Free Trial</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignupPage;