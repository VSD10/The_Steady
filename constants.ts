import { AppMode, DailyEarning, Transaction, WalletState, Theme } from './types';

export const INITIAL_WALLET_STATE: WalletState = {
  totalBalance: 12450,
  shadowBalance: 8200, // Locked for rent/bills
  visibleBalance: 4250, // Spendable today
  savingsGoal: 10000,
  currentSavings: 3400,
};

export const MOCK_EARNINGS: DailyEarning[] = [
  { day: 'Mon', swiggy: 450, zomato: 300, uber: 200, rapido: 100, total: 1050 },
  { day: 'Tue', swiggy: 500, zomato: 400, uber: 150, rapido: 50, total: 1100 },
  { day: 'Wed', swiggy: 300, zomato: 350, uber: 300, rapido: 100, total: 1050 },
  { day: 'Thu', swiggy: 600, zomato: 500, uber: 100, rapido: 150, total: 1350 },
  { day: 'Fri', swiggy: 800, zomato: 700, uber: 200, rapido: 200, total: 1900 },
  { day: 'Sat', swiggy: 1200, zomato: 900, uber: 300, rapido: 300, total: 2700 },
  { day: 'Sun', swiggy: 1100, zomato: 850, uber: 400, rapido: 250, total: 2600 },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: '1', amount: 250, category: 'Fuel', date: 'Today', type: 'expense' },
  { id: '2', amount: 850, category: 'Swiggy Pay', date: 'Today', type: 'income', platform: 'Swiggy' },
  { id: '3', amount: 120, category: 'Lunch', date: 'Today', type: 'expense' },
  { id: '4', amount: 50, category: 'Tea/Snacks', date: 'Today', type: 'expense' },
];

export const MODE_CONFIG = {
  [AppMode.SURVIVAL]: { color: 'red', desc: 'Strict Essentials Only', limit: 250 },
  [AppMode.STABILITY]: { color: 'indigo', desc: 'Balanced Saving', limit: 500 },
  [AppMode.GROWTH]: { color: 'emerald', desc: 'Aggressive Investing', limit: 400 },
  [AppMode.JOY]: { color: 'pink', desc: 'Reward Yourself', limit: 1200 },
};

export const THEME_CONFIG: Record<AppMode, Theme> = {
  [AppMode.SURVIVAL]: {
    name: 'Survival',
    baseColor: 'red',
    bgApp: 'bg-red-50',
    bgPanel: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-red-600',
    accentColor: '#ef4444',
    primaryButton: 'bg-red-600 hover:bg-red-700 text-white shadow-red-200',
    secondaryButton: 'bg-red-50 text-red-700 hover:bg-red-100',
    border: 'border-red-200',
    iconBg: 'bg-red-100 text-red-600',
    navActive: 'text-red-700 bg-red-100',
    navInactive: 'text-gray-400 hover:bg-red-50 hover:text-red-500'
  },
  [AppMode.STABILITY]: {
    name: 'Stability',
    baseColor: 'indigo',
    bgApp: 'bg-gray-50',
    bgPanel: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-500',
    accentColor: '#4f46e5',
    primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    secondaryButton: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    border: 'border-gray-200',
    iconBg: 'bg-indigo-100 text-indigo-600',
    navActive: 'text-indigo-700 bg-indigo-100',
    navInactive: 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
  },
  [AppMode.GROWTH]: {
    name: 'Growth',
    baseColor: 'emerald',
    bgApp: 'bg-emerald-50/50',
    bgPanel: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-emerald-600',
    accentColor: '#10b981',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
    secondaryButton: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    navActive: 'text-emerald-700 bg-emerald-100',
    navInactive: 'text-gray-400 hover:bg-emerald-50 hover:text-emerald-500'
  },
  [AppMode.JOY]: {
    name: 'Joy',
    baseColor: 'pink',
    bgApp: 'bg-pink-50/50',
    bgPanel: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-pink-600',
    accentColor: '#ec4899',
    primaryButton: 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200',
    secondaryButton: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
    border: 'border-pink-200',
    iconBg: 'bg-pink-100 text-pink-600',
    navActive: 'text-pink-700 bg-pink-100',
    navInactive: 'text-gray-400 hover:bg-pink-50 hover:text-pink-500'
  }
};

export const SYSTEM_INSTRUCTION = `You are THESTEADY, an empathetic, smart AI financial coach for gig economy workers (Swiggy, Zomato, Uber drivers) in India. 
Your goal is to help them manage volatile daily income.
Core Concept: "Shadow Wallet". You encourage users to "lock" money for rent/bills so they only see "spendable" money.
Modes:
1. Survival Mode: Cash is tight. Strict limits.
2. Stability Mode: Normal operations.
3. Growth Mode: High earnings, aggressive saving.
4. Joy Mode: Surplus available, user can enjoy.

Keep answers short, encouraging, and actionable. Use emojis. If asked about earnings, refer to the data provided in context.`;
