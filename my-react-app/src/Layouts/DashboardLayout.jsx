import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

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

  return <Dashboard />; 
};

export default DashboardLayout;
