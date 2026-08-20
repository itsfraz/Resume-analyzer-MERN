import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, Brain, Target, ArrowRight, BarChart3, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass-panel p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-100 dark:border-blue-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              ResumeAI 2.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
              Land your dream job <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                with AI precision.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Upload your resume, compare it against job descriptions, and let our AI optimize your bullet points and generate targeted interview questions in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group">
                Analyze My Resume <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#demo" className="px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition-all flex items-center justify-center">
                View Live Demo
              </a>
            </div>
          </motion.div>

          {/* Hero Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 mx-auto max-w-5xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent z-10 bottom-0 h-32 mt-auto" />
            <div className="glass-panel p-2 rounded-2xl md:rounded-[2rem] border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-xl md:rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
                {/* Mockup Top Bar */}
                <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-white/50 dark:bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {/* Mockup Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 pointer-events-none">
                  <div className="col-span-2 space-y-4">
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                    <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded w-full mt-8"></div>
                  </div>
                  <div className="col-span-1 space-y-4">
                    <div className="h-32 bg-blue-100 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50 flex flex-col items-center justify-center">
                       <span className="text-4xl font-bold text-blue-600">85%</span>
                       <span className="text-sm text-blue-600/80">ATS Match</span>
                    </div>
                    <div className="h-20 bg-green-100 dark:bg-green-900/20 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Everything you need to stand out</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Stop guessing what recruiters want. Our AI analyzes your resume against industry standards and specific job descriptions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              delay={0.1}
              icon={BarChart3}
              title="Advanced ATS Scoring"
              description="Get an instant ATS score evaluating your keyword match, formatting, readability, and missing skills."
            />
            <FeatureCard 
              delay={0.2}
              icon={Brain}
              title="AI Bullet Optimizer"
              description="Our AI rewrites your weak bullet points into impactful, quantified achievements using the STAR method."
            />
            <FeatureCard 
              delay={0.3}
              icon={Target}
              title="Job Description Match"
              description="Paste a job description and instantly see your skill gaps and keyword missing from your resume."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of job seekers who landed their dream roles using our AI coach.</p>
          <Link to="/signup" className="px-8 py-4 rounded-xl bg-white text-blue-600 hover:bg-slate-50 font-bold text-lg shadow-xl transition-all inline-block">
            Start for free today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
