    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import {
    Search,
    Plus,
    ChevronDown,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Shield,
    User,
    LogOut
    } from 'lucide-react';
    import { Link, useNavigate } from 'react-router-dom';
    import crmLogo from '../assets/crm-logo.png';
    import { useAuth } from '../context/AuthContext';

    const UserNavbar = () => {
    const { user, token, logout } = useAuth(); // `logout` from AuthContext
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [userLocation, setUserLocation] = useState('');

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch user data
    useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/user`, {
        withCredentials: true,
      });

      setUserProfile(res.data);

      if (res.data?.location && res.data.location.trim() !== '') {
        setUserLocation(res.data.location);
      } else if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const geoData = await geoRes.json();
              const city = geoData?.address?.city || geoData?.address?.town || geoData?.address?.state || 'Unknown';
              const state = geoData?.address?.state || geoData?.address?.country || 'Unknown';
              setUserLocation(`${city}, ${state}`);
            } catch {
              setUserLocation('N/A');
            }
          },
          () => {
            setUserLocation('Permission Denied');
          }
        );
      } else {
        setUserLocation('Not Available');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error?.response?.data || error.message);
      setUserLocation('N/A');
    }
  };

  fetchUserProfile();
}, [API_URL]);




    // Logout API call
    const handleLogout = async () => {
        try {
        await axios.post(
            `${API_URL}/api/auth/logout`,
            {},
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );
        logout(); // clear auth context
        navigate('/login'); // redirect
        } catch (error) {
        console.error('Logout error:', error?.response?.data || error.message);
        }
    };

    const getInitials = (firstName, lastName) => {
        if (!firstName && !lastName) return 'U';
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid date' : date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    };

    const formatLastLogin = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        if (diffInMinutes < 1) return '';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return diffInDays < 30 ? `${diffInDays}d ago` : formatDate(dateString);
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0  z-50">
        <div className="px-11 py-4">
            <div className="flex items-center justify-between">
            {/* Left: Logo + Search */}
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

            {/* Right: Add Lead + Profile */}
            <div className="flex items-center space-x-4">
                <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Lead</span>
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
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
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
                    <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-rose-700 rounded-full flex items-center justify-center text-white font-medium text-lg">
                            {getInitials(userProfile?.firstName, userProfile?.lastName)}
                        </div>
                        <div>
                            <h3 className="font-semibold">{userProfile?.firstName} {userProfile?.lastName}</h3>
                            <p className="text-sm text-gray-500">{userProfile?.email}</p>
                            <p className="text-xs text-gray-400">{userProfile?.role} at {userProfile?.company}</p>
                        </div>
                        </div>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-4 text-sm">
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
                            <p className="font-medium">{userProfile?.joinDate ? formatDate(userProfile.joinDate) : 'N/A'}</p>
                        </div>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                            <p className="text-gray-500">Last Login</p>
                            <p className="font-medium">{userProfile?.lastLogin ? formatLastLogin(userProfile.lastLogin) : 'N/A'}</p>
                        </div>
                        </div>
                    </div>

                    <div className="px-4 pt-2 pb-3 flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center">
                        <Shield className="w-3 h-3 mr-1" /> {userProfile?.plan || 'Free'}
                        </span>
                        <Link
                        to="/profile"
                        className="text-sm text-sky-600 hover:text-sky-800"
                        onClick={() => setShowProfileDropdown(false)}
                        >
                        <User className="w-4 h-4 mr-1 inline" /> See More
                        </Link>
                    </div>

                    <div className="border-t p-2">
                        <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
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
    );
    };

    export default UserNavbar;
