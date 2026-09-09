import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/Button';
import { PageContainer } from './ui/PageContainer';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <PageContainer>
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              ResumeAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user && (
              <div className="flex items-center gap-6">
                <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">
                  How it Works
                </a>
                <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">
                  Pricing
                </a>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </PageContainer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl md:hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {!user && (
                <div className="flex flex-col space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <a href="#features" className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                  <a href="#how-it-works" className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
                  <a href="#pricing" className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                </div>
              )}
              
              <div className="flex flex-col gap-3 pt-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="secondary" className="w-full justify-start gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="w-full justify-start gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
