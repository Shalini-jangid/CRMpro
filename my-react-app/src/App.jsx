import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import FeaturesPage from './pages/Features';
import PricingPage from './pages/PricingPage';
import PublicLayout from './Layouts/PublicLayout';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>; 

  return (
    <>
      
 

      <Routes>
        {/* Public Routes wrapped with PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feature" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Protected Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <DashboardLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route index element={<Dashboard/>} />
        </Route>
      </Routes>

     
    </>
  );
}

export default App;
