import React, { useState, useEffect, useContext, createContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Plus, Edit3, Trash2, Users, TrendingUp, DollarSign, Target, ChevronDown, Search, Filter, Eye } from 'lucide-react';

// Mock AuthContext - Replace with your actual AuthContext
const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Mock auth data for demo
    return {
      user: { id: 1, name: 'John Doe', role: 'admin', email: 'john@company.com' },
      isAuthenticated: true
    };
  }
  return context;
};

// Mock API endpoints - Replace with your actual .env API URLs
const API_BASE = import.meta.env.VITE_API_BASE_URL

const SalesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesData, setSalesData] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    fetchSalesData();
    fetchPipelineData();
    fetchTeamData();
  }, []);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`${API_BASE}/sales`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      
      // Mock data
      const mockSalesData = [
        { month: 'Jan', revenue: 45000, deals: 12, target: 50000 },
        { month: 'Feb', revenue: 52000, deals: 15, target: 50000 },
        { month: 'Mar', revenue: 48000, deals: 14, target: 50000 },
        { month: 'Apr', revenue: 61000, deals: 18, target: 55000 },
        { month: 'May', revenue: 55000, deals: 16, target: 55000 },
        { month: 'Jun', revenue: 67000, deals: 20, target: 60000 }
      ];
      setSalesData(mockSalesData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPipelineData = async () => {
    try {
      const mockPipeline = [
        { id: 1, company: 'Tech Corp', value: 25000, stage: 'Proposal', manager: 'Alice Johnson', probability: 75 },
        { id: 2, company: 'StartupXYZ', value: 15000, stage: 'Negotiation', manager: 'Bob Smith', probability: 60 },
        { id: 3, company: 'Enterprise Ltd', value: 45000, stage: 'Qualified', manager: 'Alice Johnson', probability: 40 },
        { id: 4, company: 'Innovation Inc', value: 32000, stage: 'Proposal', manager: 'Carol Davis', probability: 80 },
        { id: 5, company: 'Global Solutions', value: 28000, stage: 'Closed Won', manager: 'Bob Smith', probability: 100 }
      ];
      setPipelineData(mockPipeline);
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
    }
  };

  const fetchTeamData = async () => {
    try {
      const mockTeam = [
        { id: 1, name: 'Alice Johnson', role: 'Team Lead', email: 'alice@company.com', deals: 8, revenue: 95000, manager: 'John Doe' },
        { id: 2, name: 'Bob Smith', role: 'Sales Rep', email: 'bob@company.com', deals: 6, revenue: 72000, manager: 'Alice Johnson' },
        { id: 3, name: 'Carol Davis', role: 'Sales Rep', email: 'carol@company.com', deals: 5, revenue: 68000, manager: 'Alice Johnson' },
        { id: 4, name: 'David Wilson', role: 'Junior Rep', email: 'david@company.com', deals: 3, revenue: 45000, manager: 'Bob Smith' }
      ];
      setTeamData(mockTeam);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };

const handleCRUD = async (action, type, data = null) => {
  try {
    setLoading(true);
    let url = `${API_BASE}/api/${type}`;
    let method = 'GET';

    switch (action) {
      case 'create':
        method = 'POST';
        break;
      case 'update':
        url = `${API_BASE}/api/${type}/${data?.id}`;
        method = 'PUT';
        break;
      case 'delete':
        url = `${API_BASE}/api/${type}/${data?.id}`;
        method = 'DELETE';
        break;
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log(`${action} ${type}:`, result);

    if (type === 'pipeline') fetchPipelineData();
    if (type === 'team') fetchTeamData();
    if (type === 'sales') fetchSalesData();

    setShowModal(false);
    setSelectedItem(null);

  } catch (error) {
    console.error(`Error ${action} ${type}:`, error.message);
  } finally {
    setLoading(false);
  }
};



  const canPerformAction = (action) => {
    if (user?.role === 'admin') return true;
    if (action === 'read' || action === 'view') return true;
    if (user?.role === 'manager' && (action === 'create' || action === 'update')) return true;
    return false;
  };

  const StatsCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const PipelineForm = ({ item, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(item || {
      company: '',
      value: '',
      stage: 'Qualified',
      manager: '',
      probability: 50
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>

          <input
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
          <select
            value={formData.manager}
            onChange={(e) => setFormData({...formData, manager: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="choose">Choose</option>
            <option value="name1">Venkastesh Kumawat</option>
            <option value="name2">Shivam Sharma</option>
            <option value="name3">Vilakshana Rathore</option>
          
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
          <select
            value={formData.stage}
            onChange={(e) => setFormData({...formData, stage: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.probability}
            onChange={(e) => setFormData({...formData, probability: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {item ? 'Update' : 'Create'} 
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const TeamMemberForm = ({ member, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(member || {
      name: '',
      email: '',
      role: 'Sales Rep',
      manager: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Sales Rep">Sales Rep</option>
            <option value="Senior Rep">Senior Rep</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Junior Rep">Junior Rep</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
          <input
            type="text"
            value={formData.manager}
            onChange={(e) => setFormData({...formData, manager: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {member ? 'Update' : 'Add'} Member
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the sales dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Sales Dashboard</h1>
              <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                user?.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                user?.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['dashboard', 'pipeline', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Revenue"
                value="$328,000"
                icon={DollarSign}
                color="bg-green-500"
                change={12.5}
              />
              <StatsCard
                title="Active Deals"
                value="24"
                icon={Target}
                color="bg-blue-500"
                change={8.2}
              />
              <StatsCard
                title="Team Members"
                value={teamData.length}
                icon={Users}
                color="bg-purple-500"
                change={0}
              />
              <StatsCard
                title="Win Rate"
                value="73%"
                icon={TrendingUp}
                color="bg-orange-500"
                change={5.1}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Stages</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Qualified', value: 30, fill: '#3B82F6' },
                        { name: 'Proposal', value: 25, fill: '#10B981' },
                        { name: 'Negotiation', value: 20, fill: '#F59E0B' },
                        { name: 'Closed Won', value: 25, fill: '#EF4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {[
                        { name: 'Qualified', value: 30, fill: '#3B82F6' },
                        { name: 'Proposal', value: 25, fill: '#10B981' },
                        { name: 'Negotiation', value: 20, fill: '#F59E0B' },
                        { name: 'Closed Won', value: 25, fill: '#EF4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
              {canPerformAction('create') && (
                <button
                  onClick={() => {
                    setModalType('pipeline');
                    setSelectedItem(null);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Deal</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pipelineData.map((deal) => (
                      <tr key={deal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deal.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${deal.value.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            deal.stage === 'Closed Won' ? 'bg-green-100 text-green-800' :
                            deal.stage === 'Proposal' ? 'bg-blue-100 text-blue-800' :
                            deal.stage === 'Negotiation' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deal.manager}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deal.probability}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          {canPerformAction('update') && (
                            <button
                              onClick={() => {
                                setModalType('pipeline');
                                setSelectedItem(deal);
                                setShowModal(true);
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                          {canPerformAction('delete') && (
                            <button
                              onClick={() => handleCRUD('delete', 'pipeline', deal)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
              {canPerformAction('create') && (
                <button
                  onClick={() => {
                    setModalType('team');
                    setSelectedItem(null);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamData.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            member.role === 'Team Lead' ? 'bg-purple-100 text-purple-800' :
                            member.role === 'Sales Rep' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.manager}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.deals}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          {canPerformAction('update') && (
                            <button
                              onClick={() => {
                                setModalType('team');
                                setSelectedItem(member);
                                setShowModal(true);
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                          {canPerformAction('delete') && (
                            <button
                              onClick={() => handleCRUD('delete', 'team', member)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        title={modalType === 'pipeline' ? 
          (selectedItem ? 'Edit Deal' : 'Add New Deal') : 
          (selectedItem ? 'Edit Team Member' : 'Add Team Member')
        }
      >
        {modalType === 'pipeline' ? (
          <PipelineForm
            item={selectedItem}
            onSubmit={(data) => handleCRUD(selectedItem ? 'update' : 'create', 'pipeline', data)}
            onCancel={() => setShowModal(false)}
          />
        ) : (
          <TeamMemberForm
            member={selectedItem}
            onSubmit={(data) => handleCRUD(selectedItem ? 'update' : 'create', 'team', data)}
            onCancel={() => setShowModal(false)}
          />
        )}
      </Modal>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};


export default SalesPage;