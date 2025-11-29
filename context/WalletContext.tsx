import React, { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_WALLET_STATE, THEME_CONFIG } from '../constants';
import { AppMode, WalletContextType } from '../types';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [appMode, setAppMode] = useState<AppMode>(AppMode.STABILITY);
  
  // Use State for dynamic updates
  const [totalBalance, setTotalBalance] = useState(INITIAL_WALLET_STATE.totalBalance);
  const [shadowBalance, setShadowBalance] = useState(INITIAL_WALLET_STATE.shadowBalance);

  const theme = THEME_CONFIG[appMode];

  // Derived state based on Lock status
  // If LOCKED: Visible = Total - Shadow
  // If UNLOCKED: Visible = Total (Shadow is technically exposed)
  const visibleBalance = isUnlocked ? totalBalance : (totalBalance - shadowBalance);
  const displayShadowBalance = isUnlocked ? 0 : shadowBalance;

  const unlockWallet = () => setIsUnlocked(true);
  const lockWallet = () => setIsUnlocked(false);

  const addTransaction = (amount: number, type: 'income' | 'expense') => {
    if (type === 'income') {
      setTotalBalance(prev => prev + amount);
      // Smart Rule: Automatically lock 30% of new income to Shadow Wallet
      setShadowBalance(prev => prev + (amount * 0.3)); 
    } else {
      setTotalBalance(prev => prev - amount);
      // Expenses reduce total. If total dips below shadow, shadow might need adjustment 
      // but for this demo we assume expenses come from visible balance first.
    }
  };

  return (
    <WalletContext.Provider value={{
      totalBalance,
      shadowBalance: displayShadowBalance,
      visibleBalance,
      isUnlocked,
      appMode,
      theme,
      setAppMode,
      unlockWallet,
      lockWallet,
      addTransaction
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};