import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Settings,  
  Search,
  Calendar,
  Clock,
  LogOut,
  ChevronRight,
  ShoppingCart,
  Target,
  CreditCard,
  UserCheck,
  MessageSquare,
  FileText,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
import crmLogo from '../assets/crm-logo.png';
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');

  const { user } = useAuth();
  // Mock admin data
 const adminData = {
  name: user?.firstName || "Admin",
  email: user?.email || "admin@example.com",
  role: user?.role || "admin",
  avatar: user?.firstName?.charAt(0).toUpperCase() || "A",
  lastLogin: localStorage.getItem("lastLogin") || "Recently", // fallback
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Mock dashboard stats
  const stats = [
    { title: 'Total Sales', value: '$124,563', change: '+12.5%', color: 'sky', icon: DollarSign },
    { title: 'Marketing ROI', value: '287%', change: '+8.2%', color: 'rose', icon: TrendingUp },
    { title: 'Finance Growth', value: '$45,231', change: '+15.3%', color: 'amber', icon: BarChart3 },
    { title: 'Total Employees', value: '1,247', change: '+5.7%', color: 'sky', icon: Users }
  ];

  // Mock calendar events
  const calendarEvents = [
    { id: 1, title: 'Team Meeting', time: '09:00 AM', date: '2025-06-28', type: 'meeting', color: 'sky' },
    { id: 2, title: 'Product Launch', time: '02:00 PM', date: '2025-06-30', type: 'event', color: 'rose' },
    { id: 3, title: 'Financial Review', time: '11:00 AM', date: '2025-07-01', type: 'review', color: 'amber' },
    { id: 4, title: 'Client Presentation', time: '03:30 PM', date: '2025-07-02', type: 'presentation', color: 'sky' },
    { id: 5, title: 'Marketing Workshop', time: '10:00 AM', date: '2025-07-03', type: 'workshop', color: 'rose' }
  ];

  // Mock recent notifications
  const notifications = [
    { id: 1, message: 'New order #12345 received', time: '2 min ago', type: 'success', read: false },
    { id: 2, message: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning', read: false },
    { id: 3, message: 'Monthly report ready', time: '3 hours ago', type: 'info', read: true },
    { id: 4, message: 'Payment failed for order #12340', time: '1 day ago', type: 'error', read: true }
  ];

  // Mock recent messages
  const recentMessages = [
    { id: 1, sender: 'Sarah Johnson', message: 'Can we schedule a meeting for next week?', time: '5 min ago', avatar: 'SJ' },
    { id: 2, sender: 'Mike Chen', message: 'The quarterly report is ready for review', time: '1 hour ago', avatar: 'MC' },
    { id: 3, sender: 'Lisa Wang', message: 'Client feedback on the new design', time: '2 hours ago', avatar: 'LW' },
    { id: 4, sender: 'Tom Wilson', message: 'Server performance metrics updated', time: '1 day ago', avatar: 'TW' }
  ];

  // Mock task list
  const tasks = [
    { id: 1, title: 'Review quarterly budget', completed: false, priority: 'high', dueDate: '2025-06-30' },
    { id: 2, title: 'Update employee handbook', completed: true, priority: 'medium', dueDate: '2025-06-28' },
    { id: 3, title: 'Prepare board presentation', completed: false, priority: 'high', dueDate: '2025-07-01' },
    { id: 4, title: 'Conduct team performance reviews', completed: false, priority: 'medium', dueDate: '2025-07-05' },
    { id: 5, title: 'Update security protocols', completed: true, priority: 'low', dueDate: '2025-06-25' }
  ];

  // Mock top performers
  const topPerformers = [
    { name: 'Alice Cooper', department: 'Sales', performance: 95, avatar: 'AC' },
    { name: 'Bob Smith', department: 'Marketing', performance: 92, avatar: 'BS' },
    { name: 'Carol Davis', department: 'Finance', performance: 89, avatar: 'CD' },
    { name: 'David Wilson', department: 'IT', performance: 87, avatar: 'DW' }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    return calendarEvents.filter(event => event.date === formatDate(date));
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'sky' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'rose' },
    { id: 'tasks', name: 'Tasks', icon: CheckCircle, color: 'amber' },
    { id: 'messages', name: 'Messages', icon: MessageSquare, color: 'sky' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'rose' },
    { id: 'sales', name: 'Sales', icon: ShoppingCart, color: 'amber' },
    { id: 'marketing', name: 'Marketing', icon: Target, color: 'sky' },
    { id: 'finance', name: 'Finance', icon: CreditCard, color: 'rose' },
    { id: 'employees', name: 'Employees', icon: UserCheck, color: 'amber' },
    { id: 'reports', name: 'Reports', icon: FileText, color: 'sky' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'rose' }
  ];

  const handleSignOut = async () => {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.clear();
    window.location.href = '/login';
  } catch (error) {
    console.error('Sign out failed:', error);
    alert('Sign out failed. Please try again.');
  }
};


  const renderContent = () => {
    switch (activeSection) {
      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Calendar Management</h2>
              <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-800 transition-colors flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
            
            {/* Calendar View */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    ←
                  </button>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    →
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className={`px-3 py-1 rounded-lg ${calendarView === 'month' ? 'bg-rose-100 text-rose-700' : 'hover:bg-gray-100'}`}>Month</button>
                  <button className={`px-3 py-1 rounded-lg ${calendarView === 'week' ? 'bg-rose-100 text-rose-700' : 'hover:bg-gray-100'}`}>Week</button>
                  <button className={`px-3 py-1 rounded-lg ${calendarView === 'day' ? 'bg-rose-100 text-rose-700' : 'hover:bg-gray-100'}`}>Day</button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((day, index) => {
                  const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                  const isToday = formatDate(day) === formatDate(new Date());
                  const dayEvents = getEventsForDate(day);
                  
                  return (
                    <div
                      key={index}
                      className={`p-3 min-h-24 text-sm cursor-pointer rounded-lg border hover:bg-gray-50 ${
                        !isCurrentMonth ? 'text-gray-300 bg-gray-50' : 'text-gray-700 bg-white'
                      } ${isToday ? 'bg-rose-100 border-2 border-rose-500' : 'border-gray-100'}`}
                    >
                      <div className="font-semibold mb-1">{day.getDate()}</div>
                      <div className="space-y-1">
                        {dayEvents.map(event => (
                          <div key={event.id} className={`text-xs p-1 rounded bg-${event.color}-100 text-${event.color}-700 truncate`}>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Today's Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {calendarEvents.filter(event => event.date === formatDate(new Date())).map(event => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className={`w-4 h-4 bg-${event.color}-500 rounded-full`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-sky-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Task Management</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>New Task</span>
                </button>
              </div>
            </div>

            {/* Task Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500">
                <h3 className="text-sm font-medium text-gray-600">Total Tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                <p className="text-3xl font-bold text-gray-900">{tasks.filter(t => t.completed).length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-500">
                <h3 className="text-sm font-medium text-gray-600">High Priority</h3>
                <p className="text-3xl font-bold text-gray-900">{tasks.filter(t => t.priority === 'high').length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-500">
                <h3 className="text-sm font-medium text-gray-600">Due Today</h3>
                <p className="text-3xl font-bold text-gray-900">{tasks.filter(t => t.dueDate === formatDate(new Date())).length}</p>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">All Tasks</h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <button className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
                    }`}>
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-sky-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>New Message</span>
              </button>
            </div>

            {/* Message Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-700">
                <h3 className="text-sm font-medium text-gray-600">Total Messages</h3>
                <p className="text-3xl font-bold text-gray-900">847</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-700">
                <h3 className="text-sm font-medium text-gray-600">Unread</h3>
                <p className="text-3xl font-bold text-gray-900">23</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-700">
                <h3 className="text-sm font-medium text-gray-600">Today</h3>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
            </div>

            {/* Messages List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Messages</h3>
              <div className="space-y-4">
                {recentMessages.map(message => (
                  <div key={message.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-rose-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{message.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900">{message.sender}</h4>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{message.message}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-sky-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-500">
                <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
                <p className="text-3xl font-bold text-gray-900">124,563</p>
                <p className="text-sm text-green-600">↗ +12.5% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-500">
                <h3 className="text-sm font-medium text-gray-600">Unique Visitors</h3>
                <p className="text-3xl font-bold text-gray-900">45,231</p>
                <p className="text-sm text-green-600">↗ +8.3% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-500">
                <h3 className="text-sm font-medium text-gray-600">Bounce Rate</h3>
                <p className="text-3xl font-bold text-gray-900">32.1%</p>
                <p className="text-sm text-red-600">↘ -2.1% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-500">
                <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
                <p className="text-3xl font-bold text-gray-900">3.4%</p>
                <p className="text-sm text-green-600">↗ +0.8% from last month</p>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Reports</h2>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Monthly Sales Report', date: '2025-06-01', type: 'Sales', color: 'sky' },
                { title: 'Employee Performance', date: '2025-06-15', type: 'HR', color: 'rose' },
                { title: 'Financial Summary', date: '2025-06-20', type: 'Finance', color: 'amber' },
                { title: 'Marketing Analytics', date: '2025-06-25', type: 'Marketing', color: 'sky' },
                { title: 'Customer Feedback', date: '2025-06-28', type: 'Customer', color: 'rose' },
                { title: 'Inventory Report', date: '2025-06-30', type: 'Operations', color: 'amber' }
              ].map((report, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <FileText className={`w-6 h-6 text-${report.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Generated: {report.date}</p>
                  <span className={`text-xs px-2 py-1 bg-${report.color}-100 text-${report.color}-700 rounded-full`}>
                    {report.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'sales':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Sales Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-500">
                <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-rose-600">$45,892</p>
                <p className="text-sm text-green-600">↗ +18% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-400">
                <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
                <p className="text-3xl font-bold text-rose-500">2,847</p>
                <p className="text-sm text-green-600">↗ +12% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-rose-300">
                <h3 className="text-lg font-semibold text-gray-800">Conversion Rate</h3>
                <p className="text-3xl font-bold text-rose-400">3.2%</p>
                <p className="text-sm text-green-600">↗ +0.5% from last month</p>
              </div>
            </div>
          </div>
        );
      case 'marketing':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-amber-800">Social Media ROI</h3>
                <p className="text-4xl font-bold text-amber-600">425%</p>
                <p className="text-amber-700">Across all platforms</p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-amber-800">Email Campaign</h3>
                <p className="text-4xl font-bold text-amber-600">89.2%</p>
                <p className="text-amber-700">Open rate this month</p>
              </div>
            </div>
          </div>
        );
      case 'finance':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Revenue', 'Expenses', 'Profit', 'Growth'].map((item, index) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-sky-500">
                  <h3 className="text-sm font-medium text-gray-600">{item}</h3>
                  <p className="text-2xl font-bold text-sky-600">${(Math.random() * 100000).toFixed(0)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'employees':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Employee Management</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-rose-800">Total Staff</h3>
                  <p className="text-3xl font-bold text-rose-600">1,247</p>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-rose-800">New Hires</h3>
                  <p className="text-3xl font-bold text-rose-600">23</p>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-rose-800">Departments</h3>
                  <p className="text-3xl font-bold text-rose-600">12</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
                <div className="text-sm text-gray-600">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${stat.color}-500 group`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm flex items-center ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 bg-${stat.color}-100 rounded-full group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Calendar Widget */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Calendar</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ←
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      →
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendarDays().map((day, index) => {
                    const isCurrentMonth = day.getMonth() === selectedDate.getMonth();
                    const isToday = formatDate(day) === formatDate(new Date());
                    const dayEvents = getEventsForDate(day);
                    
                    return (
                      <div
                        key={index}
                        className={`p-2 min-h-12 text-sm cursor-pointer rounded-lg hover:bg-gray-50 ${
                          !isCurrentMonth ? 'text-gray-300' : 'text-gray-700'
                        } ${isToday ? 'bg-sky-100 border-2 border-sky-500' : ''}`}
                      >
                        <div className="font-medium">{day.getDate()}</div>
                        {dayEvents.map(event => (
                          <div key={event.id} className={`text-xs p-1 mt-1 rounded bg-${event.color}-100 text-${event.color}-700 truncate`}>
                            {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {calendarEvents.slice(0, 5).map(event => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 bg-${event.color}-500 rounded-full`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                  View All Events
                </button>
              </div>
            </div>

            {/* Second Row - Tasks and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Task Management */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Tasks</h3>
                  <button className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg">
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <button className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                            task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New order received', time: '2 minutes ago', color: 'sky', icon: ShoppingCart },
                    { action: 'Marketing campaign launched', time: '1 hour ago', color: 'amber', icon: Target },
                    { action: 'Employee onboarded', time: '3 hours ago', color: 'rose', icon: UserCheck },
                    { action: 'Financial report generated', time: '1 day ago', color: 'sky', icon: FileText }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`p-2 bg-${activity.color}-100 rounded-full`}>
                        <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Third Row - Messages and Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Messages */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Messages</h3>
                  <button className="text-sky-600 hover:text-sky-700 text-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {recentMessages.map(message => (
                    <div key={message.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-rose-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{message.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{performer.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                        <p className="text-xs text-gray-600">{performer.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{performer.performance}%</p>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                            style={{ width: `${performer.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

           
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                          <img src={crmLogo} alt="Logo" className="w-8 h-8" />
                        </div>
            {sidebarOpen && <span className="font-bold text-xl text-emerald-800">Admin Panel</span>}
          </div>
        </div>

        {/* Menu Items */}
       <nav className="flex-1 p-4 space-y-2">
  {menuItems.map((item) => (
    <button
      key={item.id}
      onClick={() => setActiveSection(item.id)}
      className={`w-full flex items-center space-x-3 px-2.5 py-2.5 rounded-lg transition-colors ${
        activeSection === item.id
          ? `bg-${item.color}-100 text-${item.color}-700 border-r-2 border-${item.color}-500`
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <item.icon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'}`} />
      {sidebarOpen && <span className="font-medium">{item.name}</span>}
      {sidebarOpen && activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  ))}

  {/* ✅ Conditionally render footer */}
  {sidebarOpen && (
    <footer className="mt-4 px-4 py-2 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
      <p>
        © 2025 <span className="text-emerald-600 font-semibold">CRMPro</span> All rights reserved.
      </p>
    </footer>
  )}
</nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
             
              
              <button
                onClick={() => setProfileModalOpen(!profileModalOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-sky-700 to-rose-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{adminData.avatar}</span>
                </div>
                <span className="font-medium text-gray-700">{adminData.name}</span>
              </button>

              {/* Profile Modal */}
              {profileModalOpen && (
                <div className="absolute top-16 right-6 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-6 z-50">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{adminData.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{adminData.name}</h3>
                      <p className="text-sm text-gray-600">{adminData.email}</p>
                      <p className="text-xs text-amber-700 font-medium">{adminData.role}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Last login: {adminData.lastLogin}</span>
                    </div>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
        
      </div>

      {/* Overlay for mobile */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setProfileModalOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;