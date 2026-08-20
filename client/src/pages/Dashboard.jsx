import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Target, 
  TrendingUp, 
  ArrowUpRight,
  UploadCloud,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock Data for charts
const scoreData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 68 },
  { name: 'Mar', score: 74 },
  { name: 'Apr', score: 82 },
  { name: 'May', score: 88 },
  { name: 'Jun', score: 92 },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-1 text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg text-sm font-medium">
        <ArrowUpRight className="w-4 h-4" />
        <span>{trend}</span>
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold dark:text-white">{value}</div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/dashboard/upload" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all font-medium">
          <UploadCloud className="w-5 h-5" />
          <span>Upload Resume</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Average ATS Score" 
          value="85%" 
          trend="+12%" 
          icon={TrendingUp} 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
        />
        <StatCard 
          title="Resumes Analyzed" 
          value="14" 
          trend="+3 this week" 
          icon={FileText} 
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
        />
        <StatCard 
          title="Avg. Job Match" 
          value="78%" 
          trend="+5%" 
          icon={Target} 
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold dark:text-white">ATS Score Improvement</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Your resume scoring trend over the last 6 months</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl bg-white dark:bg-slate-800"
        >
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-bold dark:text-white">Recent Activity</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All</button>
          </div>
          
          <div className="space-y-6">
            {[
              { title: 'Software Engineer Resume', action: 'Optimized', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500 bg-green-100 dark:bg-green-500/20' },
              { title: 'Google SWE Match', action: 'Analyzed', time: '5 hours ago', icon: Target, color: 'text-blue-500 bg-blue-100 dark:bg-blue-500/20' },
              { title: 'Mock Interview Prep', action: 'Completed', time: 'Yesterday', icon: Clock, color: 'text-purple-500 bg-purple-100 dark:bg-purple-500/20' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium dark:text-slate-200">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.action}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
