import React from 'react';
import { AppMode } from '../types';
import { MODE_CONFIG, THEME_CONFIG } from '../constants';
import { Zap, Shield, TrendingUp, Smile, Check } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const SmartModes: React.FC = () => {
  const { appMode, setAppMode, theme } = useWallet();

  const getIcon = (mode: AppMode) => {
    switch (mode) {
      case AppMode.SURVIVAL: return <Shield />;
      case AppMode.STABILITY: return <Zap />;
      case AppMode.GROWTH: return <TrendingUp />;
      case AppMode.JOY: return <Smile />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Smart Modes</h1>
        <p className={`${theme.textSecondary} text-sm`}>Current System Theme: <span className="font-bold">{appMode}</span></p>
      </div>

      <div className="grid gap-4">
        {Object.values(AppMode).map((mode) => {
          const modeConfig = MODE_CONFIG[mode];
          const themeConfig = THEME_CONFIG[mode];
          const isActive = appMode === mode;

          return (
            <div 
              key={mode}
              onClick={() => setAppMode(mode)}
              className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm group ${
                isActive 
                  ? `${themeConfig.border} ${themeConfig.bgApp}` 
                  : 'border-white bg-white hover:border-gray-100'
              }`}
            >
              {isActive && (
                <div className={`absolute -top-3 left-4 ${themeConfig.primaryButton} text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider flex items-center gap-1 shadow-md`}>
                  <Check size={10} /> Active
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-xl transition-colors ${isActive ? themeConfig.primaryButton : themeConfig.iconBg}`}>
                      {getIcon(mode)}
                   </div>
                   <div>
                      <h3 className={`font-bold text-lg ${isActive ? themeConfig.textPrimary : 'text-gray-700'}`}>{mode}</h3>
                      <p className="text-xs text-gray-500">{modeConfig.desc}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 uppercase">Daily Limit</p>
                   <p className={`font-bold ${isActive ? themeConfig.textPrimary : 'text-gray-900'}`}>₹{modeConfig.limit}</p>
                </div>
              </div>

              <div className={`mt-4 pt-3 border-t flex justify-between items-center text-sm transition-colors ${isActive ? `border-${themeConfig.baseColor}-200` : 'border-gray-100'}`}>
                  <span className="text-gray-500 text-xs">Shadow Lock Rate</span>
                  <div className="flex items-center gap-2">
                     <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isActive ? themeConfig.primaryButton : 'bg-gray-300'}`} 
                          style={{ width: mode === AppMode.SURVIVAL ? '60%' : mode === AppMode.JOY ? '15%' : '35%' }}
                        />
                     </div>
                     <span className={`font-bold text-xs ${isActive ? themeConfig.textSecondary : 'text-gray-400'}`}>
                       {mode === AppMode.SURVIVAL ? '60%' : mode === AppMode.JOY ? '15%' : '35%'}
                     </span>
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${theme.bgPanel} p-4 rounded-xl text-center shadow-sm border ${theme.border}`}>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">AI Insight</p>
          <p className={`text-sm font-medium ${theme.textPrimary}`}>
             Switching to <span className="font-bold text-emerald-600">Growth Mode</span>? Great! You have a surplus of ₹1,200 this week.
          </p>
      </div>
    </div>
  );
};

export default SmartModes;
