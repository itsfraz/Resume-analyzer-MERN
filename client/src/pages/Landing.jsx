import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Target, ArrowRight, BarChart3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageContainer } from '../components/ui/PageContainer';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
        <PageContainer className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium text-xs mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              ResumeAI 2.0 is now live
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
              Optimize your resume for the <span className="text-blue-600 dark:text-blue-500">modern job market</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload your resume, compare it against actual job descriptions, and let our AI coach you on the exact keywords and formatting you need to land interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Analyze My Resume <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Live Demo
              </Button>
            </div>
          </motion.div>

          {/* Minimal App Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 sm:mt-24 mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 subtle-shadow">
              <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2 bg-white/50 dark:bg-slate-900/50">
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-60">
                  <div className="sm:col-span-2 space-y-4">
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                    <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded w-full mt-6"></div>
                  </div>
                  <div className="sm:col-span-1 space-y-4">
                    <div className="h-24 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/50 flex flex-col items-center justify-center">
                       <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">85%</span>
                    </div>
                    <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 dark:text-white">Everything you need to stand out</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Stop guessing what recruiters want. Our AI analyzes your resume against industry standards and specific job descriptions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none bg-slate-50 dark:bg-slate-950 subtle-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Advanced ATS Scoring</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Get an instant ATS score evaluating your keyword match, formatting, readability, and missing skills.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-slate-50 dark:bg-slate-950 subtle-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>AI Bullet Optimizer</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Our AI rewrites your weak bullet points into impactful, quantified achievements using the STAR method.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none bg-slate-50 dark:bg-slate-950 subtle-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Job Description Match</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Paste a job description and instantly see your skill gaps and keywords missing from your resume.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-blue-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <PageContainer className="text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to ace your next interview?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who landed their dream roles using our AI coach.
          </p>
          <Link to="/signup">
            <Button size="lg">
              Start for free today
            </Button>
          </Link>
        </PageContainer>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
