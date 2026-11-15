import React from 'react';
import { LogOut, ExternalLink, Database, RefreshCw } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminHeaderProps {
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onLogout,
  activeTab,
  onTabChange,
}) => {
  const { isBackendConnected, refreshData, isLoading } = usePortfolio();

  const tabs = [
    { id: 'personal', label: 'Personal & Bio' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications & Results' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'visibility', label: 'Section Visibility' },
  ];

  return (
    <header className="border-b border-[#DDDFD8] bg-[#F7F7F2] sticky top-0 z-30">
      {/* Top status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#DDDFD8]/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-[#285943] text-[#F7F7F2] font-heading font-bold text-xs flex items-center justify-center tracking-wider">
            RD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-sm sm:text-base text-[#202522]">
                Portfolio Content Manager
              </h1>
              <span className="px-1.5 py-0.5 bg-[#285943]/10 text-[#285943] text-[10px] font-mono uppercase font-semibold">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#777D78]">
              <Database size={11} />
              <span>
                Storage: {isBackendConnected ? 'Active Persistent Store (server/data/portfolio-db.json)' : 'Offline / In-Memory'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => refreshData()}
            disabled={isLoading}
            className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-xs transition-colors text-xs font-mono flex items-center gap-1"
            title="Reload latest data from server"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#E8EEE8] border border-[#DDDFD8] text-[#202522] hover:border-[#285943] hover:text-[#285943] rounded-xs transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink size={12} />
          </a>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-transparent border border-[#DDDFD8] text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xs transition-colors"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-2 py-2" aria-label="Admin Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#285943] text-[#F7F7F2] border-[#285943] font-semibold shadow-xs'
                    : 'bg-transparent text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
