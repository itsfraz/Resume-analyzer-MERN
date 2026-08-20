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
      const response = await api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.resume) {
        setTimeout(() => {
          navigate(`/dashboard/resumes/${response.data.resume._id}`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold dark:text-white mb-4">
          Upload Your Resume
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-bold dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UploadResume;
