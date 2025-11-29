import React, { useState, useEffect } from 'react';
import { Lock, Unlock, AlertTriangle, Shield, Eye, X } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const ShadowWallet: React.FC = () => {
  // 0: Locked/Idle, 1: First Warning, 2: Final Warning
  const [unlockStep, setUnlockStep] = useState(0);
  const [animateValue, setAnimateValue] = useState(0);

  // Use global context
  const { shadowBalance, visibleBalance, isUnlocked, unlockWallet, lockWallet, totalBalance, theme } = useWallet();

  // Animation effect on load for the progress bar
  useEffect(() => {
    const timer = setTimeout(() => setAnimateValue(1), 100);
    return () => clearTimeout(timer);
  }, []);

  // Use values from context
  const total = totalBalance;
  
  const buckets = [
    { label: 'Rent', amt: 6000, target: 8000, icon: '🏠', colorClass: 'bg-blue-500' },
    { label: 'Bike EMI', amt: 2200, target: 2200, icon: '🏍️', colorClass: 'bg-purple-500' },
    { label: 'Grocery', amt: 1500, target: 3000, icon: '🛒', colorClass: 'bg-orange-500' },
    { label: 'Emergency', amt: 500, target: 5000, icon: '💊', colorClass: 'bg-red-500' },
  ];

  const handleUnlockClick = () => {
    if (isUnlocked) {
      lockWallet();
      setUnlockStep(0); // Reset local modal state
    } else {
      setUnlockStep(1); // Start unlock process
    }
  };

  const confirmUnlock = () => {
      unlockWallet();
      setUnlockStep(0); // Close modal
  };

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Shadow Vault</h1>
        <p className={`${theme.textSecondary} text-sm`}>Income Protection System</p>
      </div>

      {/* Main Vault Visual - Dark Mode Card */}
      <div className={`relative bg-gray-900 text-white rounded-3xl p-8 overflow-hidden shadow-2xl transition-all duration-500 ${isUnlocked ? 'ring-4 ring-red-500 ring-opacity-50' : ''}`}>
         {/* Background ambient glow - Dynamic based on Theme */}
         <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 animate-pulse" style={{ backgroundColor: theme.accentColor }}></div>
         <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-[60px] opacity-10 -ml-10 -mb-10"></div>

         <div className="relative z-10 flex flex-col items-center">
            {/* Lock Icon Animation */}
            <div 
              className={`mb-6 p-4 rounded-full bg-gray-800 ring-4 transition-all duration-700`}
              style={{ 
                 borderColor: isUnlocked ? '#ef4444' : theme.accentColor,
                 boxShadow: isUnlocked ? '0 0 30px rgba(239,68,68,0.4)' : `0 0 30px ${theme.accentColor}66`
              }}
            >
               {isUnlocked ? (
                 <Unlock size={32} className="text-red-400" />
               ) : (
                 <Lock size={32} style={{ color: theme.accentColor }} />
               )}
            </div>

            <div className="text-center mb-2">
               <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-1">Total Protected</p>
               <h2 className={`text-4xl font-bold tracking-tight font-mono ${isUnlocked ? 'text-red-400' : 'text-white'}`}>
                 ₹{shadowBalance.toLocaleString()}
               </h2>
            </div>
            
            <p className={`text-xs flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${isUnlocked ? 'bg-red-900/30 border-red-500/30 text-red-300' : 'bg-gray-800 border-gray-700 text-gray-300'}`}>
               <Shield size={10} /> {isUnlocked ? 'SECURITY OFF' : 'Auto-Lock Active'}
            </p>
         </div>

         {/* Visual Progress Gauge */}
         <div className="mt-8">
            <div className="flex justify-between text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wider">
               <span>Locked ({Math.round((shadowBalance/total)*100)}%)</span>
               <span>Goal Progress</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden flex relative">
               <div 
                  className={`h-full transition-all duration-1000 ease-out relative ${isUnlocked ? 'grayscale w-0' : ''}`}
                  style={{ 
                      width: isUnlocked ? '0%' : `${(shadowBalance / total) * 100 * animateValue}%`,
                      backgroundColor: theme.accentColor,
                      boxShadow: `0 0 15px ${theme.accentColor}`
                  }}
               >
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50"></div>
               </div>
            </div>
         </div>
      </div>

      {/* Spendable Card - Distinct Light Design */}
      <div className={`border shadow-sm rounded-2xl p-5 flex justify-between items-center transform transition hover:scale-[1.02] ${isUnlocked ? 'border-red-200 bg-red-50' : `${theme.bgPanel} ${theme.border}`}`}>
          <div>
              <p className={`text-xs font-semibold uppercase tracking-wide ${isUnlocked ? 'text-red-500' : 'text-gray-400'}`}>
                  {isUnlocked ? 'Total Exposed Balance' : 'Safe to Spend'}
              </p>
              <div className="flex items-baseline gap-1">
                <span className={`text-lg ${isUnlocked ? 'text-red-400' : 'text-gray-400'}`}>₹</span>
                <span className={`text-3xl font-bold ${isUnlocked ? 'text-red-700' : theme.textPrimary}`}>{visibleBalance.toLocaleString()}</span>
              </div>
          </div>
          <div 
            className={`h-12 w-12 rounded-full flex items-center justify-center shadow-inner ${isUnlocked ? 'bg-red-100 text-red-600' : theme.iconBg}`}
          >
             <Eye size={24} />
          </div>
      </div>

      {/* Buckets Grid */}
      <h3 className={`font-bold pl-1 ${theme.textPrimary}`}>Vault Compartments</h3>
      <div className="grid grid-cols-2 gap-4">
         {buckets.map((bucket, i) => (
           <div key={i} className={`p-4 rounded-2xl border shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all ${isUnlocked ? 'border-red-100 opacity-70 bg-white' : `${theme.bgPanel} ${theme.border}`}`}>
              {/* Background Icon Watermark */}
              <div className="absolute -bottom-2 -right-2 text-6xl opacity-5 grayscale group-hover:grayscale-0 transition-all">
                 {bucket.icon}
              </div>
              
              <div className="flex items-center gap-2 mb-2 relative z-10">
                 <div className={`w-2 h-2 rounded-full ${bucket.colorClass}`}></div>
                 <span className={`font-semibold text-sm ${theme.textPrimary}`}>{bucket.label}</span>
              </div>

              <div className="relative z-10">
                 <p className={`text-xl font-bold ${theme.textPrimary}`}>₹{bucket.amt.toLocaleString()}</p>
                 <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full ${bucket.colorClass} rounded-full`} style={{ width: `${(bucket.amt/bucket.target)*100}%` }}></div>
                 </div>
                 <div className="flex justify-between mt-1">
                    <p className="text-[10px] text-gray-400">Target: {bucket.target}</p>
                    <p className="text-[10px] font-bold text-gray-500">{Math.round((bucket.amt/bucket.target)*100)}%</p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Panic Button */}
      <div className="pt-4">
        <button 
            onClick={handleUnlockClick}
            className={`w-full py-4 rounded-xl border-2 border-dashed font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${isUnlocked ? 'bg-red-50 border-red-300 text-red-600 shadow-inner' : `bg-gray-50 border-gray-300 text-gray-400 hover:bg-white hover:border-gray-400`}`}
        >
            {isUnlocked ? (
            <>
                <Unlock size={18} /> SECURITY OVERRIDDEN (TAP TO LOCK)
            </>
            ) : (
            <>
                <AlertTriangle size={18} /> EMERGENCY UNLOCK
            </>
            )}
        </button>
        {isUnlocked && (
            <p className="text-center text-xs text-red-500 mt-2 font-medium animate-pulse">
                Warning: Funds are now exposed to spending logic.
            </p>
        )}
      </div>

      {/* Confirmation Modal */}
      {(unlockStep === 1 || unlockStep === 2) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-100 rounded-full text-red-600">
                   <AlertTriangle size={24} />
                </div>
                <button onClick={() => setUnlockStep(0)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                </button>
             </div>
             
             {unlockStep === 1 && (
               <>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Wait! Check the impact.</h3>
                 <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                   Unlocking the Shadow Wallet breaks your protection rules. You might miss your <span className="font-bold text-gray-800">Rent (₹6000)</span> and <span className="font-bold text-gray-800">Bike EMI (₹2200)</span> payments due next week.
                 </p>
                 <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setUnlockStep(2)}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
                    >
                      I Understand, Proceed
                    </button>
                    <button 
                      onClick={() => setUnlockStep(0)}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                    >
                      Cancel
                    </button>
                 </div>
               </>
             )}

             {unlockStep === 2 && (
               <>
                 <h3 className="text-lg font-bold text-red-600 mb-2">FINAL WARNING</h3>
                 <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                   This action will be recorded in your monthly report. Your funds will be fully exposed to daily spending logic.
                   <br/><br/>
                   <span className="font-bold">Are you absolutely sure?</span>
                 </p>
                 <div className="flex flex-col gap-3">
                    <button 
                      onClick={confirmUnlock}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg shadow-red-200"
                    >
                      CONFIRM UNLOCK
                    </button>
                    <button 
                      onClick={() => setUnlockStep(0)}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
                    >
                      Keep Locked
                    </button>
                 </div>
               </>
             )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ShadowWallet;
