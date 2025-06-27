import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import crmLogo from '../assets/crm-logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <img src={crmLogo} alt="Logo" className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold bg-emerald-700 bg-clip-text text-transparent">
              <Link to="/">CRMPro</Link>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/feature" className="px-4 py-2 text-gray-700 hover:text-emerald-600">Features</Link>
            <Link to="/pricing" className="px-4 py-2 text-gray-700 hover:text-emerald-600">Pricing</Link>
            <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-emerald-600">Contact</Link>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link to="/feature" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Features</Link>
            <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Pricing</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">Contact</Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/signup');
              }}
              className="block w-full text-left px-3 py-2 bg-emerald-700 text-white rounded-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
