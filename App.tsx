import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import GigDashboard from './pages/GigDashboard';
import ShadowWallet from './pages/ShadowWallet';
import SmartModes from './pages/SmartModes';
import Predictions from './pages/Predictions';
import Savings from './pages/Savings';
import Expenses from './pages/Expenses';
import Chat from './pages/Chat';
import { WalletProvider, useWallet } from './context/WalletContext';

// Inner component to access context
const AppContent: React.FC = () => {
  const { theme } = useWallet();
  
  return (
    <Router>
      <div className={`min-h-screen ${theme.bgApp} flex transition-colors duration-500`}>
        <Navigation />
        <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-full overflow-hidden">
          <div className="max-w-2xl mx-auto h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/gigs" element={<GigDashboard />} />
              <Route path="/shadow-wallet" element={<ShadowWallet />} />
              <Route path="/modes" element={<SmartModes />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
};

export default App;
