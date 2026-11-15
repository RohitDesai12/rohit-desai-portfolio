import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  const { personal, navigation } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#DDDFD8] bg-[#F7F7F2] pt-16 pb-12 text-[#202522]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-[#DDDFD8]">
          {/* Brand & Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-[#285943] text-[#F7F7F2] font-heading font-bold text-xs flex items-center justify-center tracking-wider">
                {personal.monogram}
              </div>
              <span className="font-heading font-bold text-base tracking-tight">
                {personal.displayName}
              </span>
            </div>
            <p className="text-sm text-[#777D78] max-w-md leading-relaxed">
              {personal.tagline}
            </p>
            <div className="text-xs font-mono text-[#777D78]">
              LOCATION // {personal.location}
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#285943] font-semibold">
              NAVIGATION
            </div>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.sectionId}>
                  <a
                    href={item.href}
                    className="text-xs font-mono uppercase tracking-wider text-[#777D78] hover:text-[#285943] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-[#285943] font-semibold">
              CONNECT
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#777D78] hover:text-[#285943] transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#777D78] hover:text-[#285943] transition-colors"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={personal.socialLinks.email}
                  className="flex items-center gap-2 text-[#777D78] hover:text-[#285943] transition-colors"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777D78]">
          <div className="flex items-center gap-2">
            <span>© {currentYear} {personal.fullName}.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#777D78]">
              Designed with Modern Editorial Engineering
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 hover:bg-[#E8EEE8] text-[#202522] rounded-xs transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
