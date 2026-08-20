import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import ResumeDetails from './pages/ResumeDetails';

// A simple protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<UploadResume />} />
              <Route path="resumes/:id" element={<ResumeDetails />} />
              <Route path="resumes" element={<div className="p-4">My Resumes Page Coming Soon</div>} />
              <Route path="jobs" element={<div className="p-4">Job Matches Page Coming Soon</div>} />
              <Route path="interview" element={<div className="p-4">Interview Coach Page Coming Soon</div>} />
              <Route path="settings" element={<div className="p-4">Settings Page Coming Soon</div>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
