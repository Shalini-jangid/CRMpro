import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Building2, ArrowLeft, CheckCircle, AlertCircle, Info, X, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Custom Toast Component
const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const Toast = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBgColor()} border rounded-lg shadow-lg p-4 flex items-center space-x-3 animate-in slide-in-from-top-2 duration-300`}>
      {getIcon()}
      <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

function LoginPage() {
  const { login } = useAuth();
  const [loginMode, setLoginMode] = useState('password'); 
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Toast helper function
  const showToast = (message, type = 'info', duration = 4000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  // Redirect helper function - Updated to navigate to /dashboard
  const redirectToDashboard = () => {
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1500); // Small delay to show success message
  };

  // Get API base URL from environment
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${import.meta.env.VITE_PORT || 3000}`;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation - always required
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    
    // Password validation for password login mode
    if (loginMode === 'password') {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Minimum 6 characters";
      }
    }

    // OTP validation for OTP verification mode
    if (loginMode === 'otp-verify') {
      if (!formData.otp) {
        newErrors.otp = "OTP is required";
      } else if (formData.otp.length !== 6 || !/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = "OTP must be 6 digits";
      }
    }

    // Password reset validation
    if (loginMode === 'reset-password') {
      if (!formData.otp) {
        newErrors.otp = "OTP is required";
      } else if (formData.otp.length !== 6 || !/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = "OTP must be 6 digits";
      }

      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Minimum 6 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Login with email & password
const handlePasswordLogin = async () => {
  if (!validateForm()) return;
  setIsLoading(true);
  setApiError("");

  try {
    // ✅ Use the AuthContext login method correctly
    const result = await login(formData.email, formData.password);
    
    showToast(`Welcome back, ${result.user?.firstName || result.firstName || result.email || formData.email}! 🎉`, 'success', 3000);
    setFormData({ email: '', password: '', otp: '', newPassword: '', confirmPassword: '', rememberMe: false });

    redirectToDashboard();

  } catch (err) {
    console.error("Login error:", err);
    setApiError(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

const handlePasswordLoginAlternative = async () => {
  if (!validateForm()) return;
  setIsLoading(true);
  setApiError("");

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    
    // ✅ Use setUserSession to update the context with user data
    const { setUserSession } = useAuth();
    await setUserSession(result.user || result);

    showToast(`Welcome back, ${result.user?.firstName || result.firstName || result.email || formData.email}! 🎉`, 'success', 3000);
    setFormData({ email: '', password: '', otp: '', newPassword: '', confirmPassword: '', rememberMe: false });

    redirectToDashboard();

  } catch (err) {
    console.error("Login error:", err);
    setApiError(err.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
}


  //  Send OTP for Password Reset
  const handleForgotPassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset OTP');
      }

      setLoginMode('reset-password');
      showToast(`Password reset OTP sent to ${formData.email} 📧`, 'info', 4000);

    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //  Reset Password with OTP
  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp-and-reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          otp: formData.otp, 
          newPassword: formData.newPassword 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      showToast('Password reset successful! Please log in with your new password. ✅', 'success', 4000);
      setLoginMode("password");
      setFormData((prev) => ({ ...prev, password: '', otp: '', newPassword: '', confirmPassword: '' }));

    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //  Send OTP for Login
  const handleSendOtp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }
      
      setLoginMode('otp-verify');
      showToast(`Login OTP sent to ${formData.email} 📱`, 'info', 4000);
      
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //  Verify OTP and Login
  const handleVerifyOtp = async () => {
  if (!validateForm()) return;
  setIsLoading(true);
  setApiError("");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login-with-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid OTP');
    }

    const result = await response.json();
    setCookie("crm_token", result.token);

    // Optional: fetch user data (if needed separately)
    showToast(`Welcome back, ${result.firstName || result.email}! 🎉`, 'success', 3000);

    setFormData({ email: '', password: '', otp: '', newPassword: '', confirmPassword: '', rememberMe: false });
    setLoginMode('password');

    redirectToDashboard();

  } catch (err) {
    setApiError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleSubmit = () => {
    switch (loginMode) {
      case 'password':
        handlePasswordLogin();
        break;
      case 'otp':
        handleSendOtp();
        break;
      case 'forgot':
        handleForgotPassword();
        break;
      case 'otp-verify':
        handleVerifyOtp();
        break;
      case 'reset-password':
        handleResetPassword();
        break;
      default:
        break;
    }
  };

  const resetToPasswordMode = () => {
    setLoginMode('password');
    setFormData({ email: formData.email, password: '', otp: '', newPassword: '', confirmPassword: '', rememberMe: false });
    setErrors({});
    setApiError('');
  };

  const getTitle = () => {
    switch (loginMode) {
      case 'otp': return 'Login with OTP';
      case 'forgot': return 'Reset Password';
      case 'otp-verify': return 'Verify OTP';
      case 'reset-password': return 'Reset Password';
      default: return 'Welcome Back';
    }
  };

  const getSubtitle = () => {
    switch (loginMode) {
      case 'otp': return 'We\'ll send an OTP to your email';
      case 'forgot': return 'Enter your email to reset password';
      case 'otp-verify': return 'Enter the OTP sent to your email';
      case 'reset-password': return 'Enter OTP and new password';
      default: return 'Sign in to your CRM dashboard';
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      switch (loginMode) {
        case 'otp': return 'Sending OTP...';
        case 'forgot': return 'Sending Reset OTP...';
        case 'otp-verify': return 'Verifying...';
        case 'reset-password': return 'Resetting Password...';
        default: return 'Signing in...';
      }
    }
    switch (loginMode) {
      case 'otp': return 'Send OTP';
      case 'forgot': return 'Send Reset OTP';
      case 'otp-verify': return 'Verify & Login';
      case 'reset-password': return 'Reset Password';
      default: return 'Sign In';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-emerald-50">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Back to Home Button - Left Center Position */}
      <a
        href="/"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex items-center px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white-700 hover:text-white-900 border border-gray-300 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl group"
      >
        <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform " />
        <span className="text-sm font-medium ">Back to Home</span>
      </a>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-700 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getTitle()}</h1>
          <p className="text-sky-600">{getSubtitle()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-6">
            {/* Back button for non-password modes */}
            {loginMode !== 'password' && (
              <button
                onClick={resetToPasswordMode}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to login
              </button>
            )}

            {/* Email field - always shown */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition-colors ${errors.email ? "border-red-400" : "border-gray-300"}`}
                  placeholder="Enter your email"
                  disabled={loginMode === 'otp-verify' || loginMode === 'reset-password'}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Password field - only shown for password login */}
            {loginMode === 'password' && (
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition-colors ${errors.password ? "border-red-400" : "border-gray-300"}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>
            )}

            {/* OTP field - shown for OTP verification and password reset */}
            {(loginMode === 'otp-verify' || loginMode === 'reset-password') && (
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                  OTP Code
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    maxLength="6"
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition-colors text-center text-lg tracking-widest font-mono ${errors.otp ? "border-red-400" : "border-gray-300"}`}
                    placeholder="••••••"
                  />
                </div>
                {errors.otp && <p className="text-sm text-red-600 mt-1">{errors.otp}</p>}
              </div>
            )}

            {/* New Password fields - only shown for password reset */}
            {loginMode === 'reset-password' && (
              <>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition-colors ${errors.newPassword ? "border-red-400" : "border-gray-300"}`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 transition-colors ${errors.confirmPassword ? "border-red-400" : "border-gray-300"}`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm">{apiError}</p>
              </div>
            )}

            {/* Action links - only shown for password login */}
            {loginMode === 'password' && (
              <div className="flex items-center justify-between text-sm">
                <button 
                  onClick={() => setLoginMode('forgot')} 
                  className="text-sky-600 hover:text-sky-800 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
                <button 
                  onClick={() => setLoginMode('otp')} 
                  className="text-sky-600 hover:text-sky-800 font-medium transition-colors"
                >
                  Login With OTP
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex justify-center items-center transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {getButtonText()}
                </div>
              ) : getButtonText()}
            </button>
          </div>

          {/* Sign up link - only shown for password login */}
          {loginMode === 'password' && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-sky-600 hover:text-sky-800 font-medium transition-colors">
                Sign up here
              </a>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          © 2025 Your CRM. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;