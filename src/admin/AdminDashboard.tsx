import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminHeader } from './components/AdminHeader';
import { PersonalTab } from './tabs/PersonalTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { CertificationsTab } from './tabs/CertificationsTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { SkillsTab } from './tabs/SkillsTab';
import { EducationTab } from './tabs/EducationTab';
import { VisibilityTab } from './tabs/VisibilityTab';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const existingToken = localStorage.getItem('rohit_portfolio_admin_token');
    if (!existingToken) {
      setIsVerifying(false);
      return;
    }

    // Verify token validity with server
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${existingToken}` },
    })
      .then((res) => {
        if (res.ok) {
          setToken(existingToken);
        } else {
          localStorage.removeItem('rohit_portfolio_admin_token');
          setToken(null);
        }
      })
      .catch(() => {
        // Offline or server not responding; allow cached session token
        setToken(existingToken);
      })
      .finally(() => {
        setIsVerifying(false);
      });
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('rohit_portfolio_admin_token');
    setToken(null);
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center font-mono text-xs text-[#777D78]">
        Verifying administrator credentials...
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202522] flex flex-col font-sans">
      <AdminHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'personal' && <PersonalTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'certifications' && <CertificationsTab />}
        {activeTab === 'achievements' && <AchievementsTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'visibility' && <VisibilityTab />}
      </main>

      <footer className="border-t border-[#DDDFD8] py-4 bg-[#F7F7F2] text-center text-xs font-mono text-[#777D78]">
        Rohit Desai Portfolio Management Console • Authenticated Admin Session
      </footer>
    </div>
  );
};
