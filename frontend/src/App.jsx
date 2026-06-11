import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { Moon, Sun } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './index.css';

// New Pages
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Topics from './pages/Topics';
import Trends from './pages/Trends';
import Submissions from './pages/Submissions';
import Categories from './pages/Categories';
import Respondents from './pages/Respondents';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';

axios.defaults.baseURL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function PublicNavbar() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <nav className="nav">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
          SentimentAI
        </Link>
        <div className="nav-links">
          <button onClick={toggleTheme} className="btn" style={{ padding: '0.4rem', background: 'transparent', color: 'var(--text-primary)' }}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main className="container page-container">
        <Outlet />
      </main>
    </>
  );
}

function AuthLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="container" style={{ padding: '2rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/check-auth');
        if (res.data.authenticated) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div className="container" style={{padding: '2rem'}}>Loading...</div>;

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={!user ? <PublicLayout /> : <Navigate to="/dashboard" />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Authenticated Routes with Sidebar */}
        <Route element={user ? <AuthLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          
          <Route path="/sentiment" element={<Dashboard user={user} />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/trends" element={<Trends />} />
          
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/respondents" element={<Respondents />} />
          
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
