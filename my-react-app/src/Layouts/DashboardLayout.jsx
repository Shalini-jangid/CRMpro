import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user?.role === 'user') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="p-6">
      <p className="text-gray-500">Redirecting to your dashboard...</p>
    </div>
  );
};

export default DashboardLayout;
