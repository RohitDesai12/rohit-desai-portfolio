export interface SiteConfig {
  showAbout: boolean;
  showProjects: boolean;
  showSkills: boolean;
  showEducation: boolean;
  showCertifications: boolean;
  showAchievements: boolean;
  showContact: boolean;
  showAvailabilityBadge: boolean; // Configurable; disabled by default
  availabilityText: string;
}

export const siteConfig: SiteConfig = {
  showAbout: true,
  showProjects: true,
  showSkills: true,
  showEducation: true,
  showCertifications: true,
  showAchievements: true,
  showContact: true,
  showAvailabilityBadge: false, // Explicitly false by default as requested
  availabilityText: "Open to software engineering and AI/ML opportunities",
};
