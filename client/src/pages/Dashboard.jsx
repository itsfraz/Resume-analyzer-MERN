import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

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
  <Card>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <Badge variant="success" className="flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          <span>{trend}</span>
        </Badge>
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
        <div className="text-3xl font-bold dark:text-white">{value}</div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here's what's happening with your job search today.
          </p>
        </div>
        <Link to="/dashboard/upload">
          <Button className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5" />
            Upload Resume
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Average ATS Score" 
          value="85%" 
          trend="+12%" 
          icon={TrendingUp} 
          colorClass="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard 
          title="Resumes Analyzed" 
          value="14" 
          trend="+3 this week" 
          icon={FileText} 
          colorClass="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
        />
        <StatCard 
          title="Avg. Job Match" 
          value="78%" 
          trend="+5%" 
          icon={Target} 
          colorClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ATS Score Improvement</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your resume scoring trend over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 dark:text-blue-400">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: 'Software Engineer Resume', action: 'Optimized', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
                { title: 'Google SWE Match', action: 'Analyzed', time: '5 hours ago', icon: Target, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
                { title: 'Mock Interview Prep', action: 'Completed', time: 'Yesterday', icon: Clock, color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.action}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
