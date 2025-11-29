import React, { useState } from 'react';
import { Target, Gift, Plus, X, Trophy, Smartphone, Home, Bike, Plane } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

interface SavingsGoal {
    id: string;
    name: string;
    target: number;
    current: number;
    icon: any;
    deadline?: string;
    color: string;
}

const Savings: React.FC = () => {
    const { theme } = useWallet();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');

    // Initial Mock Data
    const [goals, setGoals] = useState<SavingsGoal[]>([
        { id: '1', name: 'New Bike', target: 85000, current: 28500, icon: Bike, color: 'text-blue-500', deadline: '45 days left' },
        { id: '2', name: 'Emergency Fund', target: 10000, current: 8200, icon: Target, color: 'text-red-500', deadline: 'Always Active' },
    ]);

    const handleAddGoal = () => {
        if (!newGoalName || !newGoalTarget) return;

        const newGoal: SavingsGoal = {
            id: Date.now().toString(),
            name: newGoalName,
            target: parseInt(newGoalTarget),
            current: 0,
            icon: Trophy, // Default icon
            color: 'text-emerald-500',
            deadline: 'Just started'
        };

        setGoals([...goals, newGoal]);
        setShowAddModal(false);
        setNewGoalName('');
        setNewGoalTarget('');
    };

    return (
        <div className="space-y-6 pb-24 relative">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>My Dreams</h1>
                    <p className={`${theme.textSecondary} text-sm`}>Track & smash your targets</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className={`${theme.primaryButton} p-2 rounded-full shadow-lg active:scale-95 transition-transform`}
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Goals List */}
            <div className="grid gap-4">
                {goals.map((goal) => {
                    const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
                    const Icon = goal.icon;

                    return (
                        <div key={goal.id} className={`p-5 rounded-2xl shadow-sm border transition-all hover:shadow-md ${theme.bgPanel} ${theme.border}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl bg-gray-50 ${goal.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${theme.textPrimary}`}>{goal.name}</h3>
                                        <p className="text-xs text-gray-400">{goal.deadline}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xl font-bold ${theme.textPrimary}`}>{progress}%</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${theme.primaryButton.split(' ')[0]}`} // Use theme primary color class
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between text-xs font-medium">
                                <span className={`${theme.textSecondary}`}>Saved: ₹{goal.current.toLocaleString()}</span>
                                <span className="text-gray-400">Target: ₹{goal.target.toLocaleString()}</span>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State / Add New Placeholder */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${theme.border} hover:bg-gray-50`}
                >
                    <div className={`p-3 rounded-full bg-gray-100 ${theme.textSecondary}`}>
                        <Plus size={24} />
                    </div>
                    <p className={`font-medium ${theme.textPrimary}`}>Add New Savings Goal</p>
                </button>
            </div>

            {/* Smart Rules Section */}
            <div className="pt-4">
                <h3 className={`font-bold ${theme.textPrimary} mb-3`}>Smart Saving Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-4 rounded-xl border flex items-center gap-4 ${theme.bgPanel} ${theme.border}`}>
                        <div className={`p-2 rounded-lg ${theme.iconBg}`}>
                            <Target size={20} />
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium text-sm ${theme.textPrimary}`}>Daily Skim (5%)</p>
                            <p className="text-[10px] text-gray-500">Auto-save from daily earnings</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-xl border flex items-center gap-4 ${theme.bgPanel} ${theme.border}`}>
                        <div className={`p-2 rounded-lg bg-purple-100 text-purple-600`}>
                            <Gift size={20} />
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium text-sm ${theme.textPrimary}`}>Windfall (50%)</p>
                            <p className="text-[10px] text-gray-500">If earnings {'>'} ₹2000/day</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Goal Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className={`w-full max-w-sm rounded-2xl shadow-2xl p-6 ${theme.bgPanel}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className={`text-xl font-bold ${theme.textPrimary}`}>New Goal</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Goal Name</label>
                                <input
                                    type="text"
                                    value={newGoalName}
                                    onChange={(e) => setNewGoalName(e.target.value)}
                                    placeholder="e.g. New Phone, Insurance"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Target Amount (₹)</label>
                                <input
                                    type="number"
                                    value={newGoalTarget}
                                    onChange={(e) => setNewGoalTarget(e.target.value)}
                                    placeholder="10000"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="pt-2">
                                <p className="text-xs font-medium text-gray-500 mb-2">Select Icon</p>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {[Smartphone, Bike, Home, Plane, Trophy].map((Ico, idx) => (
                                        <button key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-600">
                                            <Ico size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleAddGoal}
                                disabled={!newGoalName || !newGoalTarget}
                                className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed ${theme.primaryButton}`}
                            >
                                Create Goal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Savings;