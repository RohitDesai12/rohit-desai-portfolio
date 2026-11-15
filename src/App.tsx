import { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { JourneySection } from './sections/JourneySection';
import { CertificationsSection } from './sections/CertificationsSection';
import { ContactSection } from './sections/ContactSection';
import { AdminDashboard } from './admin/AdminDashboard';

function PortfolioMain() {
  const { siteConfig } = usePortfolio();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#202522]">
      {/* Sticky Top Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Modular Sections controlled by siteConfig */}
        {siteConfig.showAbout && <AboutSection />}
        {siteConfig.showProjects && <ProjectsSection />}
        {siteConfig.showSkills && <SkillsSection />}
        {siteConfig.showEducation && <JourneySection />}
        {(siteConfig.showCertifications || siteConfig.showAchievements) && (
          <CertificationsSection />
        )}
        {siteConfig.showContact && <ContactSection />}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  const [isAdmin, setIsAdmin] = useState(
    window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#/admin')
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(
        window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#/admin')
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return (
    <PortfolioProvider>
      {isAdmin ? <AdminDashboard /> : <PortfolioMain />}
    </PortfolioProvider>
  );
}

export default App;
