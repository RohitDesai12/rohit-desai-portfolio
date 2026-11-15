import React, { createContext, useContext, useState, useEffect } from 'react';

import { personalData, PersonalData } from '../data/personal';
import { siteConfig, SiteConfig } from '../data/siteConfig';
import { projectsData, ProjectItem } from '../data/projects';
import { skillsData, SkillCategory } from '../data/skills';
import { educationData, EducationItem } from '../data/education';
import { certificationsData, CertificationItem } from '../data/certifications';
import { achievementsData, AchievementItem } from '../data/achievements';
import { navItems, NavItem } from '../data/navigation';

export interface PortfolioContextType {
  personal: PersonalData;
  siteConfig: SiteConfig;
  projects: ProjectItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  navigation: NavItem[];
  isLoading: boolean;
  isBackendConnected: boolean;
  refreshData: () => Promise<void>;
  updateSection: (section: string, data: any) => Promise<{ success: boolean; error?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personal, setPersonal] = useState<PersonalData>(personalData);
  const [siteConfigState, setSiteConfigState] = useState<SiteConfig>(siteConfig);
  const [projects, setProjects] = useState<ProjectItem[]>(projectsData);
  const [skills, setSkills] = useState<SkillCategory[]>(skillsData);
  const [education, setEducation] = useState<EducationItem[]>(educationData);
  const [certifications, setCertifications] = useState<CertificationItem[]>(certificationsData);
  const [achievements, setAchievements] = useState<AchievementItem[]>(achievementsData);
  const [navigation, setNavigation] = useState<NavItem[]>(navItems);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        if (data.personal) setPersonal(data.personal);
        if (data.siteConfig) setSiteConfigState(data.siteConfig);
        if (data.projects) setProjects(data.projects);
        if (data.skills) setSkills(data.skills);
        if (data.education) setEducation(data.education);
        if (data.certifications) setCertifications(data.certifications);
        if (data.achievements) setAchievements(data.achievements);
        if (data.navigation) setNavigation(data.navigation);
        setIsBackendConnected(true);
      }
    } catch (err) {
      // Backend not running or unreachable; gracefully rely on static initial data
      console.warn('Backend server not connected; using static initial data.');
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateSection = async (section: string, data: any): Promise<{ success: boolean; error?: string }> => {
    const token = localStorage.getItem('rohit_portfolio_admin_token');
    if (!token) {
      return { success: false, error: 'Unauthorized. Please login again.' };
    }

    try {
      const res = await fetch(`/api/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        return { success: false, error: errData.error || `HTTP ${res.status}` };
      }

      // Optimistically update local context state
      if (section === 'personal') setPersonal(data);
      else if (section === 'siteConfig') setSiteConfigState(data);
      else if (section === 'projects') setProjects(data);
      else if (section === 'skills') setSkills(data);
      else if (section === 'education') setEducation(data);
      else if (section === 'certifications') setCertifications(data);
      else if (section === 'achievements') setAchievements(data);
      else if (section === 'navigation') setNavigation(data);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network request failed.' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personal,
        siteConfig: siteConfigState,
        projects,
        skills,
        education,
        certifications,
        achievements,
        navigation,
        isLoading,
        isBackendConnected,
        refreshData: fetchContent,
        updateSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
