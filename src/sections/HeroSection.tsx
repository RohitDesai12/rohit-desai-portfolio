import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { EngineeringDiagramSvg } from '../components/hero/EngineeringDiagramSvg';

export const HeroSection: React.FC = () => {
  const { personal, siteConfig } = usePortfolio();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden border-b border-[#DDDFD8]"
    >
      {/* Background Architectural Vector Diagram */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-end overflow-hidden opacity-35">
        <EngineeringDiagramSvg className="w-[850px] lg:w-[1050px] translate-x-12 lg:translate-x-32 text-[#285943]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Top Status & Location Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#777D78]"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E8EEE8] border border-[#DDDFD8] text-[#202522]">
              <MapPin size={12} className="text-[#285943]" />
              <span>{personal.location}</span>
            </div>

            {/* Configurable Availability Badge (Disabled by default per prompt rules) */}
            {siteConfig.showAvailabilityBadge && (
              <div className="flex items-center gap-2 px-2.5 py-1 bg-[#285943]/10 border border-[#285943]/20 text-[#285943]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#285943] animate-pulse" />
                <span>{siteConfig.availabilityText}</span>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-1.5 text-[#777D78]">
              <span>//</span>
              <span>ENGINEERING PORTFOLIO</span>
            </div>
          </motion.div>

          {/* Hero Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-[#202522] tracking-tight leading-[1.05]">
              {personal.displayName}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#285943] font-heading tracking-tight">
              {personal.professionalRole}
            </p>
          </motion.div>

          {/* Value Proposition & Authentic Intro */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#777D78] leading-relaxed max-w-2xl font-normal"
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href="#projects"
                variant="primary"
                size="lg"
                icon={<ArrowDown size={16} />}
                iconPosition="right"
              >
                Explore Selected Work
              </Button>

              <Button
                href={personal.resumePath}
                variant="outline"
                size="lg"
                download="Rohit_Desai_Resume.pdf"
                icon={<FileDown size={16} />}
                iconPosition="left"
              >
                Download Resume
              </Button>
            </div>

            {/* Micro Social Hub */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:border-l sm:border-[#DDDFD8] sm:pl-6">
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] border border-transparent hover:border-[#DDDFD8] rounded-xs transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] border border-transparent hover:border-[#DDDFD8] rounded-xs transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personal.socialLinks.email}
                className="p-2.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] border border-transparent hover:border-[#DDDFD8] rounded-xs transition-colors"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
