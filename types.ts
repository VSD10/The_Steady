export enum AppMode {
  SURVIVAL = 'Survival',
  STABILITY = 'Stability',
  GROWTH = 'Growth',
  JOY = 'Joy'
}

export interface Theme {
  name: string;
  baseColor: string;
  bgApp: string;
  bgPanel: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string; // Hex for charts
  primaryButton: string;
  secondaryButton: string;
  border: string;
  iconBg: string;
  navActive: string;
  navInactive: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string; // e.g., 'Fuel', 'Food', 'Rent'
  date: string;
  type: 'income' | 'expense';
  platform?: string; // e.g., 'Swiggy', 'Uber'
}

export interface WalletState {
  totalBalance: number;
  shadowBalance: number; // Locked
  visibleBalance: number; // Spendable
  savingsGoal: number;
  currentSavings: number;
}

export interface DailyEarning {
  day: string;
  swiggy: number;
  zomato: number;
  uber: number;
  rapido: number;
  total: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WalletContextType {
  totalBalance: number;
  shadowBalance: number;
  visibleBalance: number;
  isUnlocked: boolean;
  appMode: AppMode;
  theme: Theme;
  setAppMode: (mode: AppMode) => void;
  unlockWallet: () => void;
  lockWallet: () => void;
  addTransaction: (amount: number, type: 'income' | 'expense') => void;
}