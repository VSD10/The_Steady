import React from 'react';
import { Calendar, AlertTriangle, ArrowUpRight, Target, Bike, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, Area } from 'recharts';
import { useWallet } from '../context/WalletContext';

const DAILY_TARGET = 2000;

const PREDICTION_DATA = [
    { day: 'Tue', val: 1100, predicted: 1150 },
    { day: 'Wed', val: 1050, predicted: 1000 },
    { day: 'Thu', val: 1350, predicted: 1400 },
    { day: 'Fri', val: 1900, predicted: 2100 },
    { day: 'Sat', val: 2700, predicted: 2900 },
    { day: 'Sun', val: 2600, predicted: 2500 },
    { day: 'Mon', val: null, predicted: 1200 }, // The forecasted day
];

const Predictions: React.FC = () => {
  const { theme } = useWallet();

  // Calculate gap for the upcoming Monday
  const nextDayPrediction = PREDICTION_DATA[PREDICTION_DATA.length - 1].predicted;
  const gap = DAILY_TARGET - nextDayPrediction;
  const isShortfall = gap > 0;
  
  // Gig calculations (Avg Swiggy = ₹80, Avg Uber = ₹200)
  const swiggyNeeded = Math.ceil(gap / 80);
  const uberNeeded = Math.ceil(gap / 200);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = data.val || data.predicted;
      const diff = value - DAILY_TARGET;
      const isAbove = diff >= 0;

      return (
        <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl text-xs">
          <p className="font-bold text-gray-700 mb-1">{label}</p>
          <p className={`text-lg font-bold ${theme.textPrimary}`}>₹{value}</p>
          <div className={`flex items-center gap-1 mt-1 font-medium ${isAbove ? 'text-green-600' : 'text-red-500'}`}>
            {isAbove ? <ArrowUpRight size={12} /> : <AlertTriangle size={12} />}
            <span>{isAbove ? '+' : ''}₹{diff} vs Goal</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
           <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Income Forecast</h1>
           <p className={`${theme.textSecondary} text-sm`}>AI-powered earning predictions</p>
        </div>
        <div className={`px-3 py-1 rounded-lg border ${theme.border} bg-white text-xs font-semibold flex items-center gap-1`}>
            <Target size={12} className="text-gray-400"/> Goal: ₹{DAILY_TARGET}/day
        </div>
      </div>
      
      {/* Main Chart */}
      <div className={`p-5 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
          <div className="flex justify-between items-center mb-4">
              <h3 className={`font-semibold ${theme.textPrimary}`}>7-Day Trend</h3>
              <div className="flex items-center gap-3 text-[10px] font-medium text-gray-400">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-300"></div> Actual</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: theme.accentColor }}></div> Predicted</span>
              </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PREDICTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Goal Line */}
                    <ReferenceLine y={DAILY_TARGET} stroke="#94a3b8" strokeDasharray="3 3">
                        <text x="10" y={DAILY_TARGET - 10} fill="#94a3b8" fontSize="10" fontWeight="bold">TARGET</text>
                    </ReferenceLine>

                    <Line type="monotone" dataKey="val" stroke="#cbd5e1" strokeWidth={3} dot={{r: 4, fill: '#cbd5e1', strokeWidth: 0}} activeDot={false} name="History" />
                    <Line type="monotone" dataKey="predicted" stroke={theme.accentColor} strokeWidth={3} dot={{r: 4, fill: theme.accentColor, strokeWidth: 2, stroke: '#fff'}} name="Predicted" />
                </LineChart>
            </ResponsiveContainer>
          </div>
      </div>

      {/* Action Plan Section */}
      {isShortfall && (
        <div className="space-y-3 animate-in slide-in-from-bottom duration-500">
            <h3 className={`font-bold pl-1 ${theme.textPrimary}`}>Bridge the Gap (Monday)</h3>
            <div className={`p-5 rounded-2xl border-l-4 border-l-orange-500 shadow-sm ${theme.bgPanel} ${theme.border}`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Shortfall Predicted</p>
                        <p className="text-2xl font-bold text-orange-500">₹{gap}</p>
                    </div>
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                </div>
                
                <p className="text-sm text-gray-700 font-medium mb-3">To hit your ₹{DAILY_TARGET} goal, choose one:</p>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                            <Bike size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-lg">{swiggyNeeded}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Extra<br/>Deliveries</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-gray-600">
                            <Clock size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-lg">2.5</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Hrs Overtime<br/>(Peak)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-sm text-red-500 mt-1">
                <AlertTriangle size={16} />
            </div>
            <div>
                <p className="font-bold text-gray-800 text-sm">Low Demand Warning</p>
                <p className="text-xs text-gray-600 mt-1">Wednesdays are typically slow. Expect 20% less orders between 2PM - 5PM.</p>
            </div>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-sm text-green-500 mt-1">
                <ArrowUpRight size={16} />
            </div>
            <div>
                <p className="font-bold text-gray-800 text-sm">Surge Opportunity</p>
                <p className="text-xs text-gray-600 mt-1">Heavy rain predicted for Friday evening. Uber surge pricing likely 1.5x.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;