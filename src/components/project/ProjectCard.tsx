import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, FileText, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../../data/projects';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy,
}) => {
  // Alternating layout: even index = preview left, odd index = preview right
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-full overflow-hidden border border-[#DDDFD8] bg-[#F7F7F2] p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:border-[#285943]/60 hover:shadow-xs"
    >
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center',
          isReversed && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
        )}
      >
        {/* Preview / Visual Diagram Column (6 cols) */}
        <div className="lg:col-span-6 min-w-0 w-full overflow-hidden">
          <div className="relative group overflow-hidden border border-[#DDDFD8] bg-[#E8EEE8] min-h-[220px] sm:min-h-[260px] md:aspect-[16/11] flex flex-col justify-between p-3.5 sm:p-5 md:p-6 w-full">
            {/* Visual Header */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs font-mono text-[#777D78] border-b border-[#DDDFD8] pb-2.5">
              <span className="flex items-center gap-1.5 truncate max-w-[190px] sm:max-w-none">
                <span className="w-2 h-2 rounded-full bg-[#285943] shrink-0" />
                <span className="truncate">SPEC // {project.id}</span>
              </span>
              <span className="shrink-0 text-[10px] sm:text-xs">{project.timeline}</span>
            </div>

            {/* Visual Content: Custom Screenshot or Responsive Schematic */}
            {project.previewImage ? (
              <div className="my-auto py-3 w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={project.previewImage}
                  alt={`${project.title} Preview`}
                  className="w-full max-h-[220px] object-cover border border-[#DDDFD8] shadow-xs transition-transform duration-300 group-hover:scale-102"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="my-auto py-4 sm:py-6 flex flex-col items-center justify-center w-full overflow-x-hidden">
                {project.placeholderTheme.diagramType === 'neural-network' ? (
                  <div className="w-full max-w-sm flex items-center justify-between gap-1.5 sm:gap-2 px-1 sm:px-4 py-2 sm:py-6 font-mono text-[10px] sm:text-xs">
                    <div className="space-y-2 sm:space-y-3 text-center min-w-0 flex-1">
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px] sm:text-xs">
                        Skill Assessment
                      </div>
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px] sm:text-xs">
                        Resume Profile
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 sm:gap-1 text-[#285943] shrink-0 px-1">
                      <span className="text-sm sm:text-base font-bold">→</span>
                      <span className="text-[9px] sm:text-[10px] tracking-wider text-[#777D78] uppercase">
                        NLP/ML
                      </span>
                      <span className="text-sm sm:text-base font-bold">→</span>
                    </div>

                    <div className="space-y-2 sm:space-y-3 text-center min-w-0 flex-1">
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#285943] text-[#F7F7F2] font-medium shadow-xs truncate text-[10px] sm:text-xs">
                        Roadmap
                      </div>
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#285943] text-[#285943] shadow-xs truncate text-[10px] sm:text-xs">
                        Tailored CV
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-sm flex items-center justify-between gap-1.5 sm:gap-2 px-1 sm:px-4 py-2 sm:py-6 font-mono text-[10px] sm:text-xs">
                    <div className="space-y-2 sm:space-y-3 text-center min-w-0 flex-1">
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px] sm:text-xs">
                        IoT Telemetry
                      </div>
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#DDDFD8] shadow-xs truncate text-[10px] sm:text-xs">
                        Sensor Intake
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 sm:gap-1 text-[#285943] shrink-0 px-1">
                      <span className="text-sm sm:text-base font-bold">→</span>
                      <span className="text-[9px] sm:text-[10px] tracking-wider text-[#777D78] uppercase">
                        Pipeline
                      </span>
                      <span className="text-sm sm:text-base font-bold">→</span>
                    </div>

                    <div className="space-y-2 sm:space-y-3 text-center min-w-0 flex-1">
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#285943] text-[#F7F7F2] font-medium shadow-xs truncate text-[10px] sm:text-xs">
                        Forecasting
                      </div>
                      <div className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#F7F7F2] border border-[#285943] text-[#285943] shadow-xs truncate text-[10px] sm:text-xs">
                        Closed-Loop
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Visual Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#DDDFD8] pt-2.5 text-[11px] sm:text-xs font-mono text-[#777D78]">
              <span>STATUS: COMPLETE</span>
              <button
                onClick={() => onOpenCaseStudy(project)}
                className="text-[#285943] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Details Column (6 cols) */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6 min-w-0 w-full overflow-hidden">
          {/* Index & Timeline */}
          <div className="flex items-center justify-between border-b border-[#DDDFD8] pb-2.5">
            <span className="font-mono text-xs sm:text-sm font-bold text-[#285943]">
              PROJECT {project.number}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#777D78]">
              {project.timeline}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#202522] leading-snug break-words">
              {project.title}
            </h3>
            <p className="font-mono text-[11px] sm:text-xs text-[#285943] uppercase tracking-wider break-words">
              {project.subtitle}
            </p>
          </div>

          {/* Overview */}
          <p className="text-xs sm:text-sm md:text-base text-[#777D78] leading-relaxed break-words">
            {project.shortDescription}
          </p>

          {/* Key Contribution Highlights */}
          {project.myContribution && project.myContribution.length > 0 && (
            <div className="bg-[#E8EEE8]/40 border-l-2 border-[#285943] p-3 sm:p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#285943] font-semibold uppercase tracking-wider">
                <CheckCircle2 size={13} className="shrink-0" />
                <span>Core Contribution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#202522] leading-relaxed break-words">
                {project.myContribution[0]}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="default" size="sm" className="text-[10px] sm:text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onOpenCaseStudy(project)}
              icon={<FileText size={15} />}
              iconPosition="left"
              className="text-xs sm:text-sm"
            >
              Deep-Dive Case Study
            </Button>

            {/* Optional Links: only show if non-empty valid URL provided */}
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                variant="outline"
                size="md"
                icon={<Github size={15} />}
                iconPosition="left"
                className="text-xs sm:text-sm"
              >
                Code
              </Button>
            )}

            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                variant="outline"
                size="md"
                icon={<ArrowUpRight size={15} />}
                iconPosition="right"
                className="text-xs sm:text-sm"
              >
                Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
