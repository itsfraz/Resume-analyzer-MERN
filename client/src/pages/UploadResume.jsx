import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import api from '../services/api';
import { CheckCircle2, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadResume = () => {
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('title', file.name);

    try {
      const response = await api.post('/resumes/upload', formData);
      
      if (response.data && response.data.resume) {
        setTimeout(() => {
          navigate(`/dashboard/resumes/${response.data.resume._id}`);
        }, 1500);
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error.response?.data?.message || 'Failed to upload resume. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Upload Your Resume
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          Let our AI analyze your resume and give you an instant ATS score.
        </p>
      </div>

      <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />

      {/* Info section below upload */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {[
          { icon: Zap, title: "Instant Analysis", desc: "Get your ATS score in seconds with deep insights." },
          { icon: Target, title: "Keyword Matching", desc: "We check your resume against industry keywords." },
          { icon: CheckCircle2, title: "Private & Secure", desc: "Your data is encrypted and never shared." },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl subtle-shadow border border-slate-200 dark:border-slate-800"
          >
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UploadResume;
