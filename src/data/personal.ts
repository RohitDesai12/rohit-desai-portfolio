export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
  isExternal: boolean;
}

export interface PersonalData {
  fullName: string;
  displayName: string;
  monogram: string;
  professionalRole: string;
  tagline: string;
  editorialSummary: string[];
  location: string;
  email: string;
  phone: string;
  resumePath: string;
  profileImagePath?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    leetcode?: string;
    geeksforgeeks?: string;
  };
  academicHighlights: {
    degree: string;
    institution: string;
    cgpa: string;
    graduationYear: string;
    focusAreas: string[];
  };
}

export const personalData: PersonalData = {
  fullName: "Rohit Ramkrishna Desai",
  displayName: "Rohit Desai",
  monogram: "RD",
  professionalRole: "Software Developer | AI/ML Enthusiast",
  tagline: "I build practical software applications and intelligent systems through programming, backend development, and machine learning.",
  editorialSummary: [
    "Computer Science Engineering student at Parul Institute of Engineering and Technology with a focus on building dependable software systems, RESTful backend services, and machine learning pipelines.",
    "Driven by an engineering mindset that bridges theoretical foundations in data structures and object-oriented architecture with practical implementations in natural language processing and predictive intelligence.",
    "Committed to clean code, systematic problem-solving, and continuous technical refinement across the modern software engineering lifecycle."
  ],
  location: "Karad, Maharashtra, India",
  email: "rohitdesai6855@gmail.com",
  phone: "+91 9307383300",
  resumePath: "/assets/documents/resume.pdf",
  profileImagePath: "/assets/profile/rohit_desai.jpg",
  socialLinks: {
    github: "https://github.com/RohitDesai12",
    linkedin: "http://www.linkedin.com/in/rohit-desai-2005rd",
    email: "mailto:rohitdesai6855@gmail.com",
    phone: "tel:+919307383300",
    // Preserved as configurable placeholders from resume mentions (replace with direct handles when confirmed)
    leetcode: "https://leetcode.com/u/RohitDesai12",
    geeksforgeeks: "https://www.geeksforgeeks.org/user/rohitdesai12/",
  },
  academicHighlights: {
    degree: "B.Tech – Computer Science & Engineering",
    institution: "Parul Institute of Engineering and Technology, Vadodara",
    cgpa: "7.63",
    graduationYear: "2027",
    focusAreas: [
      "Backend Architecture & REST APIs",
      "Applied Machine Learning & NLP",
      "Relational & Document Databases",
      "Data Structures & OOP Principles"
    ]
  }
};
