import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Base URL from Vite .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

// ✅ AuthProvider wraps the whole app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Stores user info
  const [loading, setLoading] = useState(true);  // Used for initial check

  // ⏳ Check if user is logged in (on first load)
  const fetchUser = async () => {
    try {
      console.log("Fetching user from:", `${API_BASE_URL}/api/auth/user`);
      const res = await axios.get(`${API_BASE_URL}/api/auth/user`, {
        withCredentials: true, // ⬅️ Required for sending cookies
      });
      console.log("User fetched successfully:", res.data);
      setUser(res.data);
    } catch (err) {
      console.log("No authenticated user found:", err.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Login helper: call login endpoint then fetch user
  const login = async (email, password) => {
    try {
      console.log("Attempting login to:", `${API_BASE_URL}/api/auth/login`);
      
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      
      console.log("Login response:", res.data);
      
      // After setting cookie, fetch the user data
      await fetchUser();
      return res.data;
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // 🚪 Logout helper: clear cookie and user state
  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout error", err);
      // Even if logout fails on server, clear local state
      setUser(null);
    }
  };

  // ✔️ Check if user is authenticated
  const isAuthenticated = () => !!user;

  useEffect(() => {
    console.log("API_BASE_URL:", API_BASE_URL);
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};