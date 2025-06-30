import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Globe,
  Activity,
  Award,
  Zap
} from 'lucide-react';

// Import your separate components



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    { id: 4, name: 'Lisa Wilson', email: 'lisa@example.com', status: 'Hot', value: '$4,600', date: '2024-06-24' },
    { id: 5, name: 'Robert Brown', email: 'robert@example.com', status: 'Warm', value: '$2,900', date: '2024-06-23' },
    { id: 6, name: 'Emily Clark', email: 'emily@example.com', status: 'Cold', value: '$1,200', date: '2024-06-22' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Follow up with John Smith', time: '10:00 AM', type: 'call', priority: 'high' },
    { id: 2, task: 'Demo presentation for ABC Corp', time: '2:30 PM', type: 'meeting', priority: 'high' },
    { id: 3, task: 'Send proposal to TechStart', time: '4:00 PM', type: 'email', priority: 'medium' },
    { id: 4, task: 'Weekly team sync', time: '5:30 PM', type: 'meeting', priority: 'low' },
    { id: 5, task: 'Review quarterly reports', time: '6:00 PM', type: 'email', priority: 'medium' }
  ];

  const marketingFeatures = [
    { title: 'Email Campaigns', icon: Mail, description: 'Create targeted email campaigns', color: 'emerald', campaigns: 24 },
    { title: 'Social Media', icon: Globe, description: 'Manage social media presence', color: 'sky', campaigns: 12 },
    { title: 'SEO Tools', icon: TrendingUp, description: 'Optimize search rankings', color: 'emerald', campaigns: 8 },
    { title: 'Analytics', icon: Activity, description: 'Track marketing performance', color: 'sky', campaigns: 15 },
    { title: 'Lead Generation', icon: Zap, description: 'Generate quality leads', color: 'emerald', campaigns: 32 },
    { title: 'Content Marketing', icon: Award, description: 'Create engaging content', color: 'sky', campaigns: 18 }
  ];

  const recentDeals = [
    { id: 1, company: 'TechCorp Inc.', value: '$25,000', stage: 'Proposal', probability: 75, contact: 'Jane Doe' },
    { id: 2, company: 'StartupXYZ', value: '$15,000', stage: 'Negotiation', probability: 60, contact: 'Mark Johnson' },
    { id: 3, company: 'Enterprise Ltd.', value: '$45,000', stage: 'Closed Won', probability: 100, contact: 'Sarah Wilson' },
    { id: 4, company: 'Innovation Co.', value: '$8,500', stage: 'Qualification', probability: 40, contact: 'Tom Brown' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warm': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${stat.color === 'emerald' ? 'bg-emerald-100 group-hover:bg-emerald-200' : 'bg-sky-100 group-hover:bg-sky-200'} transition-colors`}>
                <stat.icon className={`w-8 h-8 ${stat.color === 'emerald' ? 'text-emerald-600' : 'text-sky-600'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                  View All
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {lead.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-emerald-600 hover:text-emerald-900 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{task.task}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{task.time}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-3 border-2 border-emerald-200 border-dashed rounded-lg hover:bg-emerald-50 transition-colors">
              + Add New Task
            </button>
          </div>
        </div>
      </div>

      {/* Recent Deals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Pipeline Overview</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{deal.company}</h3>
                  <span className="text-sm font-bold text-emerald-600">{deal.value}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{deal.contact}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{deal.stage}</span>
                  <span className="text-xs font-medium text-gray-700">{deal.probability}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${deal.probability}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          + Add New Lead
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lead Management</h3>
          <p className="text-gray-600 mb-6">Comprehensive lead tracking and management system coming soon.</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          + Create Deal
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Deal Pipeline</h3>
          <p className="text-gray-600 mb-6">Advanced deal tracking and pipeline management tools.</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Build Pipeline
          </button>
        </div>
      </div>
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          + New Campaign
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className={`p-4 rounded-xl inline-block mb-4 ${feature.color === 'emerald' ? 'bg-emerald-100 group-hover:bg-emerald-200' : 'bg-sky-100 group-hover:bg-sky-200'} transition-colors`}>
              <feature.icon className={`w-8 h-8 ${feature.color === 'emerald' ? 'text-emerald-600' : 'text-sky-600'}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{feature.campaigns} campaigns</span>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Launch →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
          <p className="text-gray-600 mb-6">Comprehensive reporting and analytics dashboard.</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚙️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
          <p className="text-gray-600 mb-6">Configure your CRM system preferences and settings.</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Configure
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'leads': return renderLeads();
      case 'deals': return renderDeals();
      case 'marketing': return renderMarketing();
      case 'reports': return renderReports();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
   
      
       
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-scroll p-6 scrollbar-hide">
          {renderContent()}
        </main>
      </div>
    
  );
};

export default Dashboard;