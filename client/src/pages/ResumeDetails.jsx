import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  TrendingUp, 
  FileText,
  AlertCircle
} from 'lucide-react';

const CircularProgress = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let color = 'stroke-red-500';
  if (score >= 80) color = 'stroke-green-500';
  else if (score >= 60) color = 'stroke-yellow-500';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="stroke-slate-200 dark:stroke-slate-700"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={`${color} transition-all duration-1000 ease-out`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute text-2xl font-bold dark:text-white">{score}%</div>
    </div>
  );
};

const ScoreBar = ({ label, score }) => {
  let color = 'bg-red-500';
  if (score >= 80) color = 'bg-green-500';
  else if (score >= 60) color = 'bg-yellow-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
        <span className="font-semibold dark:text-slate-200">{score}%</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};

const ResumeDetails = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumeDetails = async () => {
      try {
        const { data } = await api.get('/resumes');
        // Find specific resume since getResumes returns all (for simplicity)
        const found = data.find(r => r._id === id);
        if (found) {
          setResume(found);
        } else {
          setError('Resume not found');
        }
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };
    fetchResumeDetails();
  }, [id]);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (error || !resume) return <div className="text-center p-8"><AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" /><p className="text-lg text-slate-600 dark:text-slate-400">{error || 'Something went wrong'}</p></div>;

  const analysis = resume.analysisData || {};

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Header */}
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{resume.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Analyzed on {new Date(resume.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Main Analysis Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Score Card */}
        <div className="glass-panel p-8 rounded-2xl bg-white dark:bg-slate-800 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold mb-6 dark:text-white">ATS Match Rating</h3>
          <CircularProgress score={resume.atsScore} size={150} strokeWidth={12} />
          
          <div className="w-full mt-8 space-y-4">
            <ScoreBar label="Formatting & Parsability" score={analysis.scores?.formatting || 0} />
            <ScoreBar label="Keyword Relevance" score={analysis.scores?.keyword || 0} />
            <ScoreBar label="Readability Index" score={analysis.scores?.readability || 0} />
            <ScoreBar label="Completeness" score={analysis.scores?.completeness || 0} />
          </div>
        </div>

        {/* Details Block */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Actionable Suggestions */}
          <div className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800">
            <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
              <TrendingUp className="text-blue-500 w-5 h-5" /> AI Recommended Fixes
            </h3>
            <ul className="space-y-3">
              {analysis.suggestions?.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Skills */}
            <div className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800">
              <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500 w-5 h-5" /> Detected Skills ({analysis.detectedSkills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.detectedSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800">
              <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500 w-5 h-5" /> Critical Missing Skills ({analysis.missingSkills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grammar & Readability Issues */}
          <div className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Issues Detected</h3>
            <div className="space-y-4">
              {analysis.formattingIssues?.map((issue, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Formatting:</strong> {issue}</span>
                </div>
              ))}
              {analysis.readabilityIssues?.map((issue, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Readability:</strong> {issue}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
