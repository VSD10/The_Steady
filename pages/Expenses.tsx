import React, { useState } from 'react';
import { RECENT_TRANSACTIONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useWallet } from '../context/WalletContext';
import { Plus, Coffee, Fuel, Wrench, ShoppingBag } from 'lucide-react';
import { Transaction } from '../types';

const INITIAL_DATA = [
  { name: 'Fuel', value: 250, color: '#ef4444' },
  { name: 'Food', value: 170, color: '#f59e0b' },
  { name: 'Other', value: 50, color: '#94a3b8' },
];

const Expenses: React.FC = () => {
  const { theme, addTransaction } = useWallet();
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS);

  const handleAddExpense = (category: string, amount: number) => {
    const newTx: Transaction = {
      id: Date.now().toString(),
      amount: amount,
      category: category,
      date: 'Just Now',
      type: 'expense'
    };
    
    setTransactions([newTx, ...transactions]);
    addTransaction(amount, 'expense');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Spending</h1>
        <p className={`text-xs ${theme.textSecondary}`}>Today's Limit: ₹450</p>
      </div>

      <div className="flex gap-4">
          <div className={`w-1/2 h-40 p-2 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Pie data={INITIAL_DATA} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                        {INITIAL_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                  </PieChart>
              </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-2 py-2">
              {INITIAL_DATA.map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-gray-600">{d.name}</span>
                      <span className={`font-bold ml-auto ${theme.textPrimary}`}>₹{d.value}</span>
                  </div>
              ))}
          </div>
      </div>

      {/* Quick Add Expense Buttons */}
      <div className="space-y-2">
        <h3 className={`font-bold text-sm px-1 ${theme.textPrimary}`}>Quick Add (Test)</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => handleAddExpense('Fuel', 100)}
            className="flex flex-col items-center gap-1 p-3 min-w-[80px] rounded-xl border border-gray-200 bg-white shadow-sm active:scale-95 transition-all hover:bg-red-50 hover:border-red-100"
          >
            <Fuel size={20} className="text-red-500" />
            <span className="text-xs font-medium text-gray-700">Fuel ₹100</span>
          </button>
          <button 
             onClick={() => handleAddExpense('Food', 80)}
             className="flex flex-col items-center gap-1 p-3 min-w-[80px] rounded-xl border border-gray-200 bg-white shadow-sm active:scale-95 transition-all hover:bg-orange-50 hover:border-orange-100"
          >
            <Coffee size={20} className="text-orange-500" />
            <span className="text-xs font-medium text-gray-700">Food ₹80</span>
          </button>
           <button 
             onClick={() => handleAddExpense('Repair', 250)}
             className="flex flex-col items-center gap-1 p-3 min-w-[80px] rounded-xl border border-gray-200 bg-white shadow-sm active:scale-95 transition-all hover:bg-gray-50 hover:border-gray-200"
          >
            <Wrench size={20} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-700">Fix ₹250</span>
          </button>
        </div>
      </div>

      <h3 className={`font-bold mt-4 ${theme.textPrimary}`}>Recent Transactions</h3>
      <div className="space-y-3">
          {transactions.filter(t => t.type === 'expense').map(t => (
              <div key={t.id} className={`p-4 rounded-xl border flex justify-between items-center animate-in slide-in-from-left duration-300 ${theme.bgPanel} ${theme.border}`}>
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 rounded-lg text-red-500">
                        {t.category === 'Fuel' ? <Fuel size={16}/> : t.category === 'Food' ? <Coffee size={16}/> : <ShoppingBag size={16} />}
                      </div>
                      <div>
                          <p className={`font-semibold ${theme.textPrimary}`}>{t.category}</p>
                          <p className="text-xs text-gray-400">{t.date}</p>
                      </div>
                  </div>
                  <p className="font-bold text-red-600">- ₹{t.amount}</p>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Expenses;