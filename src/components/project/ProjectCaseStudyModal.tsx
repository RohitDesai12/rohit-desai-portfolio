import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Layers, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../../data/projects';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#202522]/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content Window */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F7F7F2] border border-[#DDDFD8] shadow-2xl rounded-sm z-10 my-auto text-[#202522]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            {/* Top Bar Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#F7F7F2]/95 backdrop-blur-md border-b border-[#DDDFD8]">
              <div className="flex items-center gap-2 sm:gap-3 truncate">
                <span className="font-mono text-xs text-[#285943] font-semibold tracking-wider shrink-0">
                  PROJECT {project.number}
                </span>
                <span className="text-[#DDDFD8] shrink-0">/</span>
                <span className="font-mono text-xs text-[#777D78] uppercase tracking-wider truncate">
                  CASE STUDY SPECIFICATION
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#777D78] hover:text-[#202522] hover:bg-[#E8EEE8] rounded-sm transition-colors shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Case Study Body */}
            <div className="p-4 sm:p-8 md:p-10 space-y-8 sm:space-y-12 overflow-x-hidden">
              {/* Header Title Block */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2 sm:mb-3">
                  <span className="font-mono text-xs text-[#777D78]">
                    {project.timeline}
                  </span>
                </div>
                <h2 id="case-study-title" className="text-xl sm:text-3xl md:text-4xl font-bold font-heading text-[#202522] break-words">
                  {project.title}
                </h2>
                <p className="mt-1.5 sm:mt-2 text-base sm:text-lg text-[#285943] font-medium break-words">
                  {project.subtitle}
                </p>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#777D78] leading-relaxed break-words">
                  {project.shortDescription}
                </p>

                {/* Optional Links: Only rendered if non-empty */}
                {(project.githubUrl || project.demoUrl) && (
                  <div className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                    {project.githubUrl && (
                      <Button
                        href={project.githubUrl}
                        variant="outline"
                        size="sm"
                        icon={<Github size={15} />}
                        iconPosition="left"
                      >
                        Source Code
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        href={project.demoUrl}
                        variant="primary"
                        size="sm"
                        icon={<ArrowUpRight size={15} />}
                        iconPosition="right"
                      >
                        Live Demonstration
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* 01 — Overview */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-3">
                  <span className="font-semibold">01</span>
                  <span>//</span>
                  <span>System Overview</span>
                </div>
                <p className="text-[#202522] leading-relaxed text-base">
                  {project.shortDescription}
                </p>
              </section>

              {/* 02 — Problem Statement */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-3">
                  <span className="font-semibold">02</span>
                  <span>//</span>
                  <span>Problem Statement</span>
                </div>
                <div className="bg-[#E8EEE8]/40 border-l-2 border-[#285943] p-4 text-[#202522] leading-relaxed">
                  {caseStudy.problem}
                </div>
              </section>

              {/* 03 — Objective */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-3">
                  <span className="font-semibold">03</span>
                  <span>//</span>
                  <span>Engineering Objective</span>
                </div>
                <p className="text-[#202522] leading-relaxed text-base">
                  {caseStudy.objective}
                </p>
              </section>

              {/* 04 — Technical Approach */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-3">
                  <span className="font-semibold">04</span>
                  <span>//</span>
                  <span>Technical Approach</span>
                </div>
                <p className="text-[#202522] leading-relaxed text-base">
                  {caseStudy.technicalApproach}
                </p>
              </section>

              {/* 05 — Implementation */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-4">
                  <span className="font-semibold">05</span>
                  <span>//</span>
                  <span>Implementation Details</span>
                </div>
                <ul className="space-y-3">
                  {caseStudy.implementationDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#202522] text-sm leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#285943] shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 06 — My Contribution */}
              <section className="border-t border-[#DDDFD8] pt-6 sm:pt-8 bg-[#E8EEE8]/30 -mx-4 sm:-mx-8 md:-mx-10 p-4 sm:p-8 md:p-10 border-b">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-4">
                  <CheckCircle2 size={15} className="text-[#285943]" />
                  <span className="font-semibold">06</span>
                  <span>//</span>
                  <span>Specific Engineering Contribution</span>
                </div>
                <div className="space-y-3">
                  {caseStudy.contribution.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[#202522] text-sm sm:text-base leading-relaxed">
                      <span className="font-mono text-xs text-[#285943] mt-1 shrink-0 font-bold">
                        [{idx + 1}]
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 07 — Technology Stack */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-4">
                  <Layers size={15} className="text-[#285943]" />
                  <span className="font-semibold">07</span>
                  <span>//</span>
                  <span>Technology Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="accent" size="md">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* 08 — Challenges and Learnings */}
              <section className="border-t border-[#DDDFD8] pt-8">
                <div className="flex items-center gap-2 font-mono text-xs text-[#285943] uppercase tracking-widest mb-4">
                  <AlertCircle size={15} className="text-[#777D78]" />
                  <span className="font-semibold">08</span>
                  <span>//</span>
                  <span>Engineering Challenges & Learnings</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {caseStudy.challengesAndLearnings.map((challenge, idx) => (
                    <div key={idx} className="p-3.5 bg-[#F0F2EB] border border-[#DDDFD8] text-sm text-[#202522]">
                      <span className="font-mono text-xs text-[#777D78] block mb-1">
                        TAKEAWAY // 0{idx + 1}
                      </span>
                      {challenge}
                    </div>
                  ))}
                </div>
              </section>

              {/* Close Action in Footer */}
              <div className="pt-6 border-t border-[#DDDFD8] flex justify-end">
                <Button variant="secondary" onClick={onClose}>
                  Close Case Study
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
