import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export const Navbar: React.FC = () => {
  const { personal, siteConfig, navigation } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position for backdrop blur and section spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const sections = ['about', 'projects', 'skills', 'journey', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter nav items based on siteConfig visibility
  const visibleNavItems = navigation.filter((item) => {
    if (item.sectionId === 'about' && !siteConfig.showAbout) return false;
    if (item.sectionId === 'projects' && !siteConfig.showProjects) return false;
    if (item.sectionId === 'skills' && !siteConfig.showSkills) return false;
    if (item.sectionId === 'journey' && !siteConfig.showEducation) return false;
    if (item.sectionId === 'certifications' && !siteConfig.showCertifications && !siteConfig.showAchievements) return false;
    if (item.sectionId === 'contact' && !siteConfig.showContact) return false;
    return true;
  });

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-[#F7F7F2]/90 backdrop-blur-md border-b border-[#DDDFD8] py-3 shadow-xs'
          : 'bg-[#F7F7F2]/60 backdrop-blur-xs py-5'
      )}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#285943] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-[#202522] focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Rohit Desai - Return to top"
        >
          <div className="w-8 h-8 rounded-xs bg-[#285943] text-[#F7F7F2] font-heading font-bold text-xs flex items-center justify-center tracking-wider transition-transform group-hover:scale-105">
            {personal.monogram}
          </div>
          <span className="font-heading font-bold text-sm tracking-tight hidden sm:inline-block">
            {personal.displayName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {visibleNavItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.sectionId}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono tracking-wider transition-colors uppercase relative rounded-xs',
                  isActive
                    ? 'text-[#285943] font-semibold'
                    : 'text-[#777D78] hover:text-[#202522]'
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#285943]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            href={personal.resumePath}
            variant="outline"
            size="sm"
            download="Rohit_Desai_Resume.pdf"
            icon={<FileDown size={14} />}
            iconPosition="right"
          >
            Resume
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#202522] hover:bg-[#E8EEE8] rounded-xs transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-[#DDDFD8] bg-[#F7F7F2] px-6 py-6 space-y-4 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {visibleNavItems.map((item) => (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'font-mono text-sm uppercase tracking-wider py-1.5 transition-colors border-b border-[#DDDFD8]/40',
                    activeSection === item.sectionId
                      ? 'text-[#285943] font-semibold pl-2 border-l-2 border-[#285943]'
                      : 'text-[#777D78] hover:text-[#202522]'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2">
              <Button
                href={personal.resumePath}
                variant="primary"
                size="md"
                className="w-full justify-center"
                download="Rohit_Desai_Resume.pdf"
                icon={<FileDown size={15} />}
                iconPosition="right"
              >
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
