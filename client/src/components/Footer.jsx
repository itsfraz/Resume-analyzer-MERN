import React from 'react';
import { Briefcase, MessageCircle, Code, UserCircle, Mail } from 'lucide-react';
import { PageContainer } from './ui/PageContainer';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <PageContainer>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                ResumeAI
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
              AI-powered resume optimization to help you land your dream job faster. We analyze, you apply.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Code className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <UserCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Resume Analyzer</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">ATS Score Check</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Job Matching</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Resume Builder</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Career Guides</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Resume Tips</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <a href="mailto:support@resumeai.com" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <Mail className="w-4 h-4" /> support@resumeai.com
          </a>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
