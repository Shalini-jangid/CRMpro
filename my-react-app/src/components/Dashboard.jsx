
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Phone, 
  Mail, 
  BarChart3,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Settings,
  User,
  LogOut,
  ChevronDown,
  MessageCircle,
  CreditCard,
  Star,
  Target,
  Briefcase,
  Calculator,
  Bot,
  HelpCircle,
  Zap,
  Globe,
  Megaphone,
  TrendingDown,
  Activity,
  Shield,
  Award,
  MapPin,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import crmLogo from '../assets/crm-logo.png';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const { logout } = useAuth();
  const API = import.meta.env.VITE_API_BASE_URL;
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState('Loading...');
  const [currentDate, setCurrentDate] = useState('');


  
  const handleLogout = async () => {
    try {
      await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
      logout(); // Clear context
      navigate('/'); // Redirect to public layout
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  // Get user's real location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Using a reverse geocoding service (you can replace with your preferred service)
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const location = `${data.city}, ${data.principalSubdivision}`;
            setUserLocation(location);
          } catch (error) {
            console.error('Error getting location:', error);
            setUserLocation('Location unavailable');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Location unavailable');
        }
      );
    } else {
      setUserLocation('Geolocation not supported');
    }
  };


  // Simulate API call for user profile
const { user } = useAuth();
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const { token } = user || {};

      const res = await axios.get(`${API}/api/auth/user`, {
        withCredentials: true, // if you're using cookies
        headers: {
          Authorization: `Bearer ${token}` // if you're using JWT
        }
      });

      setUserProfile(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  if (user) {
    fetchUserProfile();
    getUserLocation();
  }
}, [user]);


  // Sample data
  const stats = [
    { title: 'Total Leads', value: '1,247', change: '+12.5%', icon: Users, color: 'emerald' },
    { title: 'Revenue', value: '$45,678', change: '+8.2%', icon: DollarSign, color: 'sky' },
    { title: 'Conversion Rate', value: '23.4%', change: '+3.1%', icon: TrendingUp, color: 'emerald' },
    { title: 'Active Deals', value: '156', change: '+5.7%', icon: BarChart3, color: 'sky' }
  ];

  const recentLeads = [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Hot', value: '$5,200', date: '2024-06-27' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Warm', value: '$3,400', date: '2024-06-26' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', status: 'Cold', value: '$1,800', date: '2024-06-25' },
    { id: 4, name: 'Lisa Wilson', email: 'lisa@example.com', status: 'Hot', value: '$4,600', date: '2024-06-24' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with John Smith', time: '10:00 AM', type: 'call' },
    { id: 2, task: 'Demo presentation for ABC Corp', time: '2:30 PM', type: 'meeting' },
    { id: 3, task: 'Send proposal to TechStart', time: '4:00 PM', type: 'email' },
    { id: 4, task: 'Weekly team sync', time: '5:30 PM', type: 'meeting' }
  ];


  const handleMenuClick = (itemId) => {
  if (itemId === 'sales') {
    navigate('/sales'); // Navigate to sales page
  } else {
    setActiveTab(itemId); // For other tabs, just set active tab
  }
};
  const menuItems = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: BarChart3, 
      category: 'main' 
    },
    { 
      id: 'sales', 
      label: 'Sales', 
      icon: Target, 
      category: 'main',
      submenu: ['Leads', 'Deals', 'Pipeline', 'Forecasting', 'Reports']
      
    },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: Megaphone, 
      category: 'main',
      submenu: ['Campaigns', 'Email Marketing', 'Social Media', 'SEO Tools', 'Analytics']
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: Briefcase, 
      category: 'main',
      submenu: ['Support Tickets', 'Knowledge Base', 'Service Catalog', 'SLA Management']
    },
    { 
      id: 'finance', 
      label: 'Finance', 
      icon: Calculator, 
      category: 'main',
      submenu: ['Invoicing', 'Payments', 'Reports', 'Tax Management', 'Budgeting']
    },
    
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: Calendar, 
      category: 'main' 
    },
   
  ];

  const bottomMenuItems = [
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'contact', label: 'Contact', icon: HelpCircle },
     { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const marketingFeatures = [
    { title: 'Email Campaigns', icon: Mail, description: 'Create targeted email campaigns', color: 'emerald' },
    { title: 'Social Media', icon: Globe, description: 'Manage social media presence', color: 'sky' },
    { title: 'SEO Tools', icon: TrendingUp, description: 'Optimize search rankings', color: 'emerald' },
    { title: 'Analytics', icon: Activity, description: 'Track marketing performance', color: 'sky' },
    { title: 'Lead Generation', icon: Zap, description: 'Generate quality leads', color: 'emerald' },
    { title: 'Content Marketing', icon: Award, description: 'Create engaging content', color: 'sky' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskIcon = (type) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid date';

  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


 const formatLastLogin = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date)) return 'Invalid date';

  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return '';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;

  return formatDate(dateString); // Fallback to full date if > 30 days
};


 const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return 'U';
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return (first + last).toUpperCase();
};



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatRelativeTime = (date) => {
  if (!date) return 'Not available';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-11 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                            <img src={crmLogo} alt="Logo" className="w-8 h-8" />
                          </div>
                          <span className="text-xl font-bold bg-emerald-700 bg-clip-text text-transparent">
                     CRMPro
                          </span>
                        </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads, deals, contacts..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-all duration-200 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Lead</span>
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"

                >
                  <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-medium">
                    {getInitials(userProfile?.firstName, userProfile?.lastName)}
                  </div>
                  <div className="hidden md:block text-left">
      <p className="text-sm font-medium text-gray-900">
        {userProfile?.firstName} {userProfile?.lastName}
      </p>
      <p className="text-xs text-gray-500">{userProfile?.jobTitle}</p>
    </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-rose-700 rounded-full flex items-center justify-center text-white font-medium text-lg">
                          {getInitials(userProfile?.firstName, userProfile?.lastName)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
              {userProfile?.firstName} {userProfile?.lastName}
            </h3>
                          <p className="text-sm text-gray-500">{userProfile?.email}</p>
                          <p className="text-xs text-gray-400">{userProfile?.role} at {userProfile?.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-500">Phone</p>
                            <p className="font-medium">{userProfile?.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-500">Location</p>
                            <p className="font-medium">{userLocation}</p>

                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
  <Calendar className="w-4 h-4 text-gray-400" />
  <div>
    <p className="text-gray-500">Join Date</p>
    <p className="font-medium">
      {userProfile?.joinDate ? formatDate(userProfile.joinDate) : 'Not available'}
    </p>
  </div>
</div>

<div className="flex items-center space-x-2">
  <Clock className="w-4 h-4 text-gray-400" />
  <div>
    <p className="text-xs text-gray-500">Last Login: </p>
    <p className="font-medium">
      {userProfile?.lastLogin ? formatLastLogin(userProfile.lastLogin) : 'Not available'}
    </p>
  </div>
</div>

                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Shield className="w-3 h-3 mr-1" />
                            {userProfile?.plan}
                          </span>
                        </div>
                        <div className="px-4 pb-3">
  <Link
    to="/profile"
    className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800 font-medium transition-colors"
    onClick={() => setShowProfileDropdown(false)} // optional: close dropdown on click
  >
    <User className="w-4 h-4 mr-1" />
    See More Profile Info
  </Link>
</div>

                      </div>
                      
                    </div>



                    <div className="border-t border-gray-200 p-2">
                      <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <nav className="p-4 pb-20">
            {/* User Quick Info */}
            <div className="mb-6 p-3 bg-gradient-to-r from-emerald-800 to-sky-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white font-medium">
                  {getInitials(userProfile?.firstName, userProfile?.lastName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{userProfile?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userProfile?.role}</p>
                </div>
              </div>
            </div>

            {/* Main Menu Items */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Dashboard</h3>
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {item.submenu && activeTab === item.id && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subItem, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors rounded"
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Communication Tools */}
            <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Communication</h3>
              {[
                { id: 'messenger', label: 'Email/Chat', icon: MessageCircle },
                { id: 'social', label: 'Social Media', icon: Globe },
           
               
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Automation & AI */}
            <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Automation</h3>
              {[
                
                { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
              
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Integrations */}
            <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Integrations</h3>
              {[
              
                { id: 'import', label: 'Import Data', icon: TrendingUp },
                { id: 'export', label: 'Export Data', icon: TrendingDown }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Account & Settings */}
            <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Account</h3>
              {bottomMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Help & Support */}
            <div className="space-y-2 mb-6 border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Support</h3>
              {[
                { id: 'help', label: 'Help Center', icon: HelpCircle },
                { id: 'tutorials', label: 'Tutorials', icon: Award },
      
                { id: 'updates', label: 'What\'s New', icon: Zap }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Leads</span>
                  <span className="font-medium text-emerald-600">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Deals</span>
                  <span className="font-medium text-sky-600">56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium text-emerald-600">$45.2K</span>
                </div>
              </div>
            </div>

            {/* Upgrade Banner */}
            <div className="bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Premium</span>
              </div>
              <p className="text-sm mb-3 text-emerald-100">
                Unlock advanced features and get unlimited access
              </p>
              <button className="w-full bg-white text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color === 'emerald' ? 'bg-emerald-100' : 'bg-sky-100'}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color === 'emerald' ? 'text-emerald-600' : 'text-sky-600'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Filter className="w-4 h-4" />
                        </button>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                <div className="text-sm text-gray-500">{lead.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.value}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <button className="text-sky-600 hover:text-sky-700 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-700 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Today's Tasks */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-lg flex items-center justify-center">
                              {getTaskIcon(task.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{task.task}</p>
                            <p className="text-sm text-gray-500">{task.time}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2 border-2 border-dashed border-emerald-200 rounded-lg hover:border-emerald-300 transition-colors">
                      + Add New Task
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'marketing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Marketing Hub</h2>
                <p className="text-gray-600 mb-6">Manage your marketing campaigns, track performance, and generate leads</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketingFeatures.map((feature, index) => (
                    <div key={index} className="p-6 rounded-lg border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        feature.color === 'emerald' ? 'bg-emerald-100' : 'bg-sky-100'
                      }`}>
                        <feature.icon className={`w-6 h-6 ${
                          feature.color === 'emerald' ? 'text-emerald-600' : 'text-sky-600'
                        }`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Add other tab contents here */}
          {activeTab !== 'overview' && activeTab !== 'marketing' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="text-gray-600 mb-6">
                  This section is under development. Coming soon with advanced features and functionality.
                </p>
                <button className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all duration-200">
                  Get Notified
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;