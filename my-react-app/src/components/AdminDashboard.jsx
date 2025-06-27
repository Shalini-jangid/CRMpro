import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  Target, 
  Settings, 
  Shield, 
  Bell, 
  Search,
  Menu,
  X,
  Home,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  UserCheck,
  Activity,
  PieChart,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('admin');

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, permissions: ['admin', 'manager', 'user'] },
    { id: 'sales', name: 'Sales', icon: TrendingUp, permissions: ['admin', 'sales_manager', 'sales_rep'] },
    { id: 'marketing', name: 'Marketing', icon: Target, permissions: ['admin', 'marketing_manager', 'marketing_user'] },
    { id: 'finance', name: 'Finance', icon: DollarSign, permissions: ['admin', 'finance_manager', 'accountant'] },
    { id: 'customers', name: 'Customers', icon: Users, permissions: ['admin', 'manager', 'user'] },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, permissions: ['admin', 'manager'] },
    { id: 'reports', name: 'Reports', icon: FileText, permissions: ['admin', 'manager'] },
    { id: 'communications', name: 'Communications', icon: MessageSquare, permissions: ['admin', 'manager', 'user'] },
    { id: 'calendar', name: 'Calendar', icon: Calendar, permissions: ['admin', 'manager', 'user'] },
    { id: 'leads', name: 'Lead Management', icon: UserCheck, permissions: ['admin', 'sales_manager', 'sales_rep'] },
    { id: 'campaigns', name: 'Campaigns', icon: Mail, permissions: ['admin', 'marketing_manager', 'marketing_user'] },
    { id: 'inventory', name: 'Inventory', icon: Briefcase, permissions: ['admin', 'inventory_manager'] },
    { id: 'support', name: 'Support', icon: Phone, permissions: ['admin', 'support_manager', 'support_agent'] },
    { id: 'website', name: 'Website', icon: Globe, permissions: ['admin', 'web_manager'] },
    { id: 'permissions', name: 'Permissions', icon: Shield, permissions: ['admin'] },
    { id: 'settings', name: 'Settings', icon: Settings, permissions: ['admin', 'manager'] }
  ];

  const userRoles = [
    'admin', 'manager', 'sales_manager', 'sales_rep', 'marketing_manager', 
    'marketing_user', 'finance_manager', 'accountant', 'inventory_manager',
    'support_manager', 'support_agent', 'web_manager', 'user'
  ];

  const hasPermission = (modulePermissions) => {
    return modulePermissions.includes(userRole);
  };

  const dashboardStats = [
    { title: 'Total Revenue', value: '$2,847,390', change: '+12.5%', icon: DollarSign, color: 'emerald' },
    { title: 'Active Customers', value: '12,847', change: '+8.2%', icon: Users, color: 'sky' },
    { title: 'Sales This Month', value: '1,249', change: '+15.3%', icon: TrendingUp, color: 'emerald' },
    { title: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: Target, color: 'sky' }
  ];

  const recentActivities = [
    { type: 'sale', message: 'New sale completed by John Doe', time: '2 minutes ago', icon: DollarSign },
    { type: 'lead', message: 'New lead generated from website', time: '15 minutes ago', icon: UserCheck },
    { type: 'support', message: 'Support ticket resolved by Sarah', time: '1 hour ago', icon: Phone },
    { type: 'campaign', message: 'Email campaign sent to 5,000 contacts', time: '3 hours ago', icon: Mail }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color === 'emerald' ? 'bg-emerald-100' : 'bg-sky-100'}`}>
                <stat.icon className={`h-6 w-6 ${stat.color === 'emerald' ? 'text-emerald-600' : 'text-sky-600'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
          <div className="h-64 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg flex items-center justify-center">
            <PieChart className="h-16 w-16 text-gray-400" />
            <span className="ml-3 text-gray-500">Chart visualization would go here</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-lg flex items-center justify-center">
            <Activity className="h-16 w-16 text-gray-400" />
            <span className="ml-3 text-gray-500">Line chart would go here</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <activity.icon className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModuleContent = () => {
    switch(activeModule) {
      case 'dashboard':
        return renderDashboard();
      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Permissions Management</h3>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <module.icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{module.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="pl-8">
                      <p className="text-sm text-gray-600 mb-2">Allowed Roles:</p>
                      <div className="flex flex-wrap gap-2">
                        {module.permissions.map((role) => (
                          <span key={role} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                            {role.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {modules.find(m => m.id === activeModule)?.name || 'Module'} Dashboard
            </h3>
            <div className="h-96 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  {React.createElement(modules.find(m => m.id === activeModule)?.icon || Settings, {
                    className: "h-8 w-8 text-emerald-600"
                  })}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {modules.find(m => m.id === activeModule)?.name} Module
                </h4>
                <p className="text-gray-500">This module content would be implemented here</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CRM</span>
            </div>
            {sidebarOpen && <span className="font-bold text-gray-900 text-lg">Admin Panel</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {modules.filter(module => hasPermission(module.permissions)).map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeModule === module.id
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <module.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{module.name}</span>}
            </button>
          ))}
        </nav>

        {/* User Role Selector */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {role.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AD</span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-gray-500 capitalize">{userRole.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {activeModule === 'dashboard' ? 'Dashboard Overview' : modules.find(m => m.id === activeModule)?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeModule === 'dashboard' 
                  ? 'Welcome to your CRM admin dashboard' 
                  : `Manage your ${modules.find(m => m.id === activeModule)?.name.toLowerCase()} operations`
                }
              </p>
            </div>
            {renderModuleContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;