export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
  isExternal?: boolean;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Journey", href: "#journey", sectionId: "journey" },
  { label: "Certifications", href: "#certifications", sectionId: "certifications" },
  { label: "Contact", href: "#contact", sectionId: "contact" }
];
