import React from 'react';
import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-50">
                Resume<span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              AI-powered resume optimization and interview coaching to help you land your dream job faster.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Resume Analyzer</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">AI Optimizer</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Mock Interviews</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Job Matching</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Career Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Resume Templates</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">ATS Guide</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} ResumeAI Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Built with modern AI</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
