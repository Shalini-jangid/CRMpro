import { useEffect, useState } from 'react';
import {  Outlet, Routes,Route, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';
import UserSidebar from '../components/userSidebar';
import Dashboard from '../components/Dashboard';
import SalesPage from '../pages/SalesPage';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState();
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (mainTab, subTab) => {
    setActiveTab(mainTab);
    setActiveSubTab(subTab);
  };

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'user') {
      setValid(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!valid) return null;

  return (
    <div className="flex flex-col flex-1">
      {/* Top Navbar */}
      <UserNavbar />
      

      {/* Sidebar + Content Area */}
      <div className="flex min-h-screen bg-gray-50 pt-24">
        {/* Sidebar on the left */}
        <UserSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
          onNavigate={handleNavigation}
          userProfile={{}} // Replace with actual user data
        />
<Routes>
  <Route path="/" element={<Dashboard/>} />
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/sales" element={<SalesPage/>} />
</Routes>
        {/* Main content */}
        <main className="flex-1 bg-gray-50 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
