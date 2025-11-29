import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MOCK_EARNINGS } from '../constants';
import { CheckCircle, AlertTriangle, Loader2, Link as LinkIcon, Bike, ShoppingBag, MapPin, Clock, WifiOff, PlusCircle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

interface Platform {
  name: string;
  status: 'active' | 'inactive' | 'error' | 'connecting';
  lastSync: string;
  color: string;
}

const INITIAL_GIG_HISTORY = [
  { id: 101, platform: 'Swiggy', type: 'delivery', desc: 'Lunch Delivery • 4.2 km', time: '2:30 PM', amount: 85, status: 'Completed' },
  { id: 102, platform: 'Uber', type: 'ride', desc: 'Airport Drop • 18 km', time: '1:15 PM', amount: 420, status: 'Completed' },
  { id: 103, platform: 'Zomato', type: 'delivery', desc: 'Snack Order • 2.1 km', time: '12:45 PM', amount: 65, status: 'Completed' },
  { id: 104, platform: 'Rapido', type: 'ride', desc: 'Metro Drop • 3.5 km', time: '12:10 PM', amount: 45, status: 'Completed' },
  { id: 105, platform: 'Swiggy', type: 'grocery', desc: 'Instamart • 12 items', time: '11:30 AM', amount: 120, status: 'Completed' },
];

const GigDashboard: React.FC = () => {
  const { theme, addTransaction } = useWallet();
  const [gigHistory, setGigHistory] = useState(INITIAL_GIG_HISTORY);
  const [platforms, setPlatforms] = useState<Platform[]>([
    { name: 'Swiggy', status: 'active', lastSync: 'Synced 1 min ago', color: 'bg-orange-500' },
    { name: 'Zomato', status: 'active', lastSync: 'Synced 5 mins ago', color: 'bg-red-500' },
    { name: 'Uber', status: 'error', lastSync: 'Login Expired', color: 'bg-black' },
    { name: 'Rapido', status: 'inactive', lastSync: 'Not Connected', color: 'bg-yellow-400' },
  ]);

  const handleConnect = (index: number) => {
    const currentStatus = platforms[index].status;
    if (currentStatus === 'active' || currentStatus === 'connecting') return;

    setPlatforms(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: 'connecting', lastSync: 'Establishing secure link...' };
      return updated;
    });

    setTimeout(() => {
      setPlatforms(prev => {
        const updated = [...prev];
        updated[index] = { 
          ...updated[index], 
          status: 'active', 
          lastSync: 'Synced just now' 
        };
        return updated;
      });
    }, 2000);
  };

  const handleSimulateOrder = () => {
    const platforms = ['Swiggy', 'Zomato', 'Uber', 'Rapido'];
    const types = ['delivery', 'ride', 'grocery'];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomAmount = Math.floor(Math.random() * 100) + 40; // Random between 40 and 140

    const newGig = {
      id: Date.now(),
      platform: randomPlatform,
      type: randomType,
      desc: 'New Order • Just Now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: randomAmount,
      status: 'Completed'
    };

    setGigHistory([newGig, ...gigHistory]);
    addTransaction(randomAmount, 'income');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={14} className="text-green-600" />;
      case 'error': return <AlertTriangle size={14} className="text-red-600" />;
      case 'inactive': return <WifiOff size={14} className="text-gray-400" />;
      case 'connecting': return <Loader2 size={14} className="text-blue-600 animate-spin" />;
      default: return <Loader2 size={14} className="text-blue-600 animate-spin" />;
    }
  };

  const getStatusButtonClass = (status: string) => {
      switch (status) {
          case 'active': return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-default shadow-sm';
          case 'error': return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 shadow-sm animate-pulse';
          case 'connecting': return 'bg-blue-50 text-blue-700 border-blue-200 cursor-wait';
          case 'inactive': return 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 border-dashed';
          default: return 'bg-gray-50';
      }
  };

  const getPlatformIcon = (platform: string, type: string) => {
     if (type === 'ride') return <Bike size={16} className="text-white" />;
     if (type === 'grocery') return <ShoppingBag size={16} className="text-white" />;
     return <MapPin size={16} className="text-white" />;
  };

  const getPlatformColor = (platform: string) => {
      switch(platform) {
          case 'Swiggy': return 'bg-orange-500';
          case 'Zomato': return 'bg-red-500';
          case 'Uber': return 'bg-black';
          case 'Rapido': return 'bg-yellow-500';
          default: return 'bg-gray-400';
      }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div>
          <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>Unified Earnings</h1>
          <p className={`${theme.textSecondary} text-sm`}>Swiggy • Zomato • Uber • Rapido</p>
        </div>
        <button 
          onClick={handleSimulateOrder}
          className={`${theme.primaryButton} text-xs px-3 py-2 rounded-lg flex items-center gap-1 shadow-md active:scale-95 transition-all`}
        >
          <PlusCircle size={14} /> Test: Add Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-4 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
           <p className="text-xs text-gray-400">Total Today</p>
           <p className={`text-2xl font-bold`} style={{ color: theme.accentColor }}>₹1,900</p>
           <p className="text-[10px] text-green-500 font-medium">↑ 12% vs last Mon</p>
        </div>
        <div className={`p-4 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
           <p className="text-xs text-gray-400">Best Platform</p>
           <p className="text-lg font-bold text-orange-500">Swiggy</p>
           <p className="text-[10px] text-gray-400">42% of income</p>
        </div>
      </div>

      {/* Connection Status Section */}
      <div className={`p-4 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
        <h3 className={`font-semibold mb-3 text-sm uppercase tracking-wide ${theme.textPrimary}`}>Platform Connections</h3>
        <div className="space-y-3">
          {platforms.map((p, index) => (
            <div key={p.name} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${p.status === 'active' ? 'bg-opacity-50 border-transparent' : 'border-gray-100 bg-gray-50/50'}`}>
              <div className="flex items-center gap-3">
                <div className={`relative w-10 h-10 rounded-full ${p.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                  {p.name[0]}
                  {/* Status Indicator Dot */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center
                      ${p.status === 'active' ? 'bg-green-500' : 
                        p.status === 'error' ? 'bg-red-500' : 
                        p.status === 'connecting' ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                  </div>
                </div>
                <div>
                  <p className={`font-bold text-sm ${theme.textPrimary}`}>{p.name}</p>
                  <p className={`text-[10px] ${p.status === 'error' ? 'text-red-500 font-semibold' : p.status === 'connecting' ? 'text-blue-500' : 'text-gray-400'}`}>
                    {p.lastSync}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => handleConnect(index)}
                disabled={p.status === 'active' || p.status === 'connecting'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all active:scale-95 ${getStatusButtonClass(p.status)}`}
              >
                 {getStatusIcon(p.status)}
                 <span>
                    {p.status === 'active' ? 'Connected' : 
                     p.status === 'error' ? 'Fix Issue' : 
                     p.status === 'connecting' ? 'Linking...' : 
                     'Connect'}
                 </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className={`p-5 rounded-xl shadow-sm border ${theme.bgPanel} ${theme.border}`}>
        <h3 className={`font-semibold mb-4 ${theme.textPrimary}`}>Earnings Breakdown</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_EARNINGS} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.border.replace('border-', '#e5e7eb')} />
              <XAxis dataKey="day" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend wrapperStyle={{fontSize: '12px'}} />
              <Bar dataKey="swiggy" stackId="a" fill="#f97316" name="Swiggy" radius={[0, 0, 4, 4]} />
              <Bar dataKey="zomato" stackId="a" fill="#ef4444" name="Zomato" />
              <Bar dataKey="uber" stackId="a" fill="#000000" name="Uber" />
              <Bar dataKey="rapido" stackId="a" fill="#fbbf24" name="Rapido" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className={`space-y-4`}>
          <h3 className={`font-semibold px-1 ${theme.textPrimary}`}>Recent Activity</h3>
          {gigHistory.map((gig) => (
              <div key={gig.id} className={`flex items-center justify-between p-4 rounded-xl border shadow-sm hover:shadow-md transition-all ${theme.bgPanel} ${theme.border} animate-in slide-in-from-top-2 duration-300`}>
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${getPlatformColor(gig.platform)}`}>
                          {getPlatformIcon(gig.platform, gig.type)}
                      </div>
                      <div>
                          <p className={`font-bold text-sm ${theme.textPrimary}`}>{gig.platform}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                              {gig.desc}
                          </p>
                      </div>
                  </div>
                  <div className="text-right">
                      <p className={`font-bold text-lg ${theme.textPrimary}`}>+ ₹{gig.amount}</p>
                      <p className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
                          <Clock size={10} /> {gig.time}
                      </p>
                  </div>
              </div>
          ))}
          <button className={`w-full py-3 text-sm font-medium rounded-xl border border-dashed transition-colors ${theme.border} ${theme.textSecondary} hover:bg-gray-50`}>
              View Previous Days
          </button>
      </div>
    </div>
  );
};

export default GigDashboard;