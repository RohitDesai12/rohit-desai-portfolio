import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/projects';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { ProjectCard } from '../components/project/ProjectCard';
import { ProjectCaseStudyModal } from '../components/project/ProjectCaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseCaseStudy = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-24 border-b border-[#DDDFD8] bg-[#F7F7F2]">
      <Container>
        <SectionHeader
          number="02"
          tag="SELECTED WORK"
          title="Featured Engineering Projects"
          subtitle="Detailed case studies showcasing backend architecture, applied machine learning, and structured software development."
        />

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </div>

        {/* Global Case Study Modal */}
        <ProjectCaseStudyModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseCaseStudy}
        />
      </Container>
    </section>
  );
};
