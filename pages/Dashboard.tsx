import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  IndianRupee,
  AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_EARNINGS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { visibleBalance, shadowBalance, isUnlocked, appMode, theme } = useWallet();

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Welcome */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Hello, Rahul 👋</h1>
          <p className={`text-sm ${theme.textSecondary}`}>Ready for today's shift?</p>
        </div>
        <div 
          onClick={() => navigate('/modes')}
          className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer border ${theme.secondaryButton} ${theme.border}`}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: theme.accentColor }} />
          <span className="text-xs font-semibold uppercase">{appMode} MODE</span>
        </div>
      </div>

      {/* Shadow Wallet Overview Card */}
      <div 
        onClick={() => navigate('/shadow-wallet')}
        className={`bg-gray-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden cursor-pointer transition-all ${isUnlocked ? 'ring-4 ring-red-500/50' : ''}`}
      >
        {/* Dynamic Background Gradient based on Mode */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 animate-pulse"
          style={{ backgroundColor: isUnlocked ? '#ef4444' : theme.accentColor }}
        ></div>

        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-gray-400 text-sm mb-1">
             {isUnlocked ? <span className="text-red-400 font-bold flex items-center gap-1"><AlertTriangle size={12}/> WALLET UNLOCKED (UNSAFE)</span> : "Spendable Balance (Visible)"}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-light">₹</span>
            <span className={`text-4xl font-bold ${isUnlocked ? 'text-red-100' : ''}`}>{visibleBalance.toLocaleString()}</span>
          </div>
          
          <div className="mt-6 flex items-center gap-3">
            <div className={`bg-gray-800/50 rounded-lg p-2 flex items-center gap-2 border ${isUnlocked ? 'border-red-900/50' : 'border-gray-700'}`}>
              <div className={`p-1 rounded-full`} style={{ backgroundColor: isUnlocked ? '#ef4444' : theme.accentColor }}>
                 <Wallet size={12} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Shadow (Locked)</p>
                <p className="text-sm font-semibold">₹{shadowBalance.toLocaleString()}</p>
              </div>
            </div>
            {!isUnlocked && (
                <div className="text-xs text-green-400 flex items-center bg-green-900/30 px-2 py-1 rounded">
                + ₹850 Today
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Unified Earnings Chart Mini */}
      <div className={`p-5 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-semibold ${theme.textPrimary}`}>Weekly Flow</h3>
          <button onClick={() => navigate('/gigs')} className={`text-xs font-medium flex items-center ${theme.textSecondary}`}>
            Details <ArrowRight size={12} className="ml-1" />
          </button>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_EARNINGS}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.accentColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={theme.accentColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke={theme.accentColor} fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => navigate('/predictions')} className={`p-4 rounded-xl border cursor-pointer transition ${theme.bgPanel} ${theme.border} hover:shadow-md`}>
          <TrendingUp className="mb-2" size={24} style={{ color: theme.accentColor }} />
          <p className={`text-xs font-semibold ${theme.textSecondary}`}>Prediction</p>
          <p className={`text-sm font-bold ${theme.textPrimary}`}>Good Day Tmrw</p>
        </div>
        <div onClick={() => navigate('/savings')} className={`p-4 rounded-xl border cursor-pointer transition ${theme.bgPanel} ${theme.border} hover:shadow-md`}>
          <IndianRupee className="mb-2" size={24} style={{ color: theme.accentColor }} />
          <p className={`text-xs font-semibold ${theme.textSecondary}`}>Goal: Bike</p>
          <p className={`text-sm font-bold ${theme.textPrimary}`}>34% Done</p>
        </div>
      </div>

       {/* Floating Quick Add */}
       <div className="fixed bottom-24 right-6 md:right-72">
          <button className={`${theme.primaryButton} w-14 h-14 rounded-full shadow-lg transition active:scale-95 flex items-center justify-center`}>
            <span className="text-xl font-bold">+</span>
          </button>
       </div>
    </div>
  );
};

export default Dashboard;
