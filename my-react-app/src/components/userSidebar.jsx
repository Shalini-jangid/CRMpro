import React from 'react';
import {
  BarChart3,
  Target,
  Megaphone,
  Briefcase,
  Calculator,
  Calendar,
  MessageCircle,
  Globe,
  Bot,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Star,
  HelpCircle,
  Settings,
  Award,
  Zap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const UserSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3, path: '/dashboardLayout/dashboard' },
    { id: 'sales', label: 'Sales', icon: Target, path: '/dashboardLayout/sales' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, path: '/dashboard/marketing' },
    { id: 'services', label: 'Services', icon: Briefcase, path: '/dashboard/services' },
    { id: 'finance', label: 'Finance', icon: Calculator, path: '/dashboard/finance' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/dashboard/calendar' }
  ];

  const otherItems = [
    {
      title: 'Communication',
      items: [
        { id: 'messenger', label: 'Email/Chat', icon: MessageCircle, path: '/dashboard/messenger' },
        { id: 'social', label: 'Social Media', icon: Globe, path: '/dashboard/social' }
      ]
    },
    {
      title: 'Automation',
      items: [
        { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, path: '/dashboard/ai-assistant' }
      ]
    },
    {
      title: 'Integrations',
      items: [
        { id: 'import', label: 'Import Data', icon: TrendingUp, path: '/dashboard/import' },
        { id: 'export', label: 'Export Data', icon: TrendingDown, path: '/dashboard/export' }
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'pricing', label: 'Pricing', icon: CreditCard, path: '/dashboard/pricing' },
        { id: 'features', label: 'Features', icon: Star, path: '/dashboard/features' },
        { id: 'contact', label: 'Contact', icon: HelpCircle, path: '/dashboard/contact' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard/settings' }
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/dashboard/help' },
        { id: 'tutorials', label: 'Tutorials', icon: Award, path: '/dashboard/tutorials' },
        { id: 'updates', label: "What's New", icon: Zap, path: '/dashboard/updates' }
      ]
    }
  ];

  const getCurrentTab = () => {
    const parts = location.pathname.split('/');
    return parts[2] ;
  };

  const currentTab = getCurrentTab();

  const renderMenuSection = (section) => (
    <div key={section.title} className="space-y-2 mb-6 border-t border-gray-200 pt-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
      {section.items.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            currentTab === item.id
              ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <nav className="p-4">
        <div className="space-y-2 mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Dashboard
          </h3>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentTab === item.id
                  ? 'bg-gradient-to-r from-emerald-800 to-sky-800 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {otherItems.map((section) => renderMenuSection(section))}

        {/* Upgrade Section */}
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
  );
};

export default UserSidebar;
