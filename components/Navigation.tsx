import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, Lock, MessageSquare, Settings, Menu, X } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useWallet();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon: Icon, label }: { path: string, icon: any, label: string }) => (
    <button
      onClick={() => {
        navigate(path);
        setIsOpen(false);
      }}
      className={`flex flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all ${
        isActive(path) 
          ? theme.navActive
          : theme.navInactive
      }`}
    >
      <Icon size={24} className={isActive(path) ? 'md:fill-none' : ''} />
      <span className="text-[10px] md:text-sm font-medium mt-1 md:mt-0">{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50">
        <NavItem path="/" icon={Home} label="Home" />
        <NavItem path="/gigs" icon={PieChart} label="Gigs" />
        
        {/* FAB for Chat */}
        <div className="relative -top-6">
            <button 
                onClick={() => navigate('/chat')}
                className={`${theme.primaryButton} p-4 rounded-full shadow-lg border-4 border-white transition-all`}
            >
                <MessageSquare size={24} />
            </button>
        </div>

        <NavItem path="/shadow-wallet" icon={Lock} label="Wallet" />
        <button onClick={() => setIsOpen(true)} className={`flex flex-col items-center p-2 ${theme.navInactive}`}>
            <Menu size={24} />
            <span className="text-[10px] font-medium mt-1">More</span>
        </button>
      </div>

      {/* Mobile "More" Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden" onClick={() => setIsOpen(false)}>
           <div className={`absolute right-0 top-0 bottom-0 w-64 ${theme.bgPanel} p-6 shadow-2xl space-y-2`}>
              <div className="flex justify-between items-center mb-6">
                  <h2 className={`font-bold text-lg ${theme.textPrimary}`}>Menu</h2>
                  <button onClick={() => setIsOpen(false)} className={theme.textSecondary}><X /></button>
              </div>
              <NavItem path="/modes" icon={Settings} label="Smart Modes" />
              <NavItem path="/predictions" icon={PieChart} label="Predictions" />
              <NavItem path="/savings" icon={Lock} label="Savings Goals" />
              <NavItem path="/expenses" icon={PieChart} label="Expenses" />
           </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 p-4">
         <div className="mb-8 px-4">
             <h1 className={`text-2xl font-bold uppercase tracking-tight`} style={{ color: theme.accentColor }}>THESTEADY</h1>
         </div>
         <nav className="space-y-2">
            <NavItem path="/" icon={Home} label="Dashboard" />
            <NavItem path="/gigs" icon={PieChart} label="Unified Gigs" />
            <NavItem path="/shadow-wallet" icon={Lock} label="Shadow Wallet" />
            <NavItem path="/modes" icon={Settings} label="Smart Modes" />
            <NavItem path="/predictions" icon={PieChart} label="Future Predict" />
            <NavItem path="/savings" icon={Lock} label="Savings Goals" />
            <NavItem path="/expenses" icon={PieChart} label="Expenses" />
            <NavItem path="/chat" icon={MessageSquare} label="AI Coach" />
         </nav>
      </div>
    </>
  );
};

export default Navigation;
