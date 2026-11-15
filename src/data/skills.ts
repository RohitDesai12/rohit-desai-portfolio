export interface SkillItem {
  name: string;
  tag?: string; // e.g. "Primary", "Core", "Framework"
}

export interface SkillCategory {
  id: string;
  categoryTitle: string;
  categoryDescription: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "programming-languages",
    categoryTitle: "Programming Languages",
    categoryDescription: "Core languages used for problem solving, backend systems, and scripting.",
    skills: [
      { name: "Python", tag: "Primary" },
      { name: "Java", tag: "Core" },
      { name: "JavaScript", tag: "ES6+" }
    ]
  },
  {
    id: "backend-development",
    categoryTitle: "Backend Development",
    categoryDescription: "Server-side architectures, RESTful API design, and modular service patterns.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Flask" },
      { name: "REST APIs" },
      { name: "MVC Architecture" }
    ]
  },
  {
    id: "frontend-development",
    categoryTitle: "Frontend Development",
    categoryDescription: "Modern component-driven web interfaces, state management, and styling.",
    skills: [
      { name: "React.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    id: "databases",
    categoryTitle: "Databases & Storage",
    categoryDescription: "Relational modeling, document storage, and persistent query design.",
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Database Design" }
    ]
  },
  {
    id: "tools-and-platforms",
    categoryTitle: "Tools & Platforms",
    categoryDescription: "Version control, development environments, and modern developer tooling.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "GitHub Copilot" },
      { name: "Amazon Q" },
      { name: "Antigravity" },
      { name: "Power BI" }
    ]
  },
  {
    id: "core-cs-fundamentals",
    categoryTitle: "Core Computer Science",
    categoryDescription: "Foundational theory, algorithmic problem solving, and intelligent systems.",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "Object-Oriented Programming (OOP)" },
      { name: "AI/ML Fundamentals" },
      { name: "Natural Language Processing (NLP)" }
    ]
  }
];
