import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const ResumeDetails = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await api.get(`/resumes/${id}`);
        setResume(response.data.resume);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch resume details');
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="text-center p-12 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Error</h2>
        <p className="text-red-500 mb-6">{error || 'Resume not found'}</p>
        <Link to="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const score = resume.atsScore || 0;
  
  const issues = [
    ...(resume.analysisData?.formattingIssues || []),
    ...(resume.analysisData?.readabilityIssues || []),
    ...(resume.analysisData?.grammarIssues || [])
  ];
  const suggestions = resume.analysisData?.suggestions || [];
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link to="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Title & Score Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col justify-center">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{resume.title || 'Untitled Resume'}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Analyzed on {new Date(resume.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6 text-center">
          <CardContent className="p-0">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Overall ATS Score</div>
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}
              <span className="text-2xl text-slate-400">/100</span>
            </div>
            <Badge className="mt-4" variant={score >= 80 ? "success" : score >= 60 ? "warning" : "danger"}>
              {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Needs Improvement' : 'Critical Issues'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues Detected */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Issues Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            {issues.length > 0 ? (
              <ul className="space-y-4">
                {issues.map((issue, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{issue}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                <p className="text-slate-600 dark:text-slate-400">No major issues detected!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actionable Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Actionable Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {suggestions.length > 0 ? (
              <ul className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex gap-3 items-start bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="bg-primary/10 dark:bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic text-center py-8">No specific suggestions available.</p>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default ResumeDetails;
