export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy?: string;
  institution: string;
  location?: string;
  duration: string;
  scoreLabel: string;
  scoreValue: string;
  highlights?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "btech-cse",
    degree: "B.Tech – Computer Science & Engineering",
    fieldOfStudy: "Computer Science and Applied Engineering",
    institution: "Parul Institute of Engineering and Technology",
    location: "Vadodara, Gujarat",
    duration: "2023 – 2027",
    scoreLabel: "CGPA",
    scoreValue: "7.63 / 10",
    highlights: [
      "Rigorous coursework in Data Structures, Object-Oriented Programming, and Database Systems.",
      "Hands-on technical explorations in applied Machine Learning and backend engineering.",
      "Active participant in technical hackathons and competitive problem-solving."
    ]
  },
  {
    id: "hsc-class-12",
    degree: "Higher Secondary Certificate (HSC – Class 12)",
    fieldOfStudy: "Science Stream",
    institution: "Ligade Patil Junior College",
    location: "Maharashtra",
    duration: "2021 – 2023",
    scoreLabel: "Percentage",
    scoreValue: "78%",
    highlights: [
      "Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals."
    ]
  },
  {
    id: "ssc-class-10",
    degree: "Secondary School Certificate (SSC – Class 10)",
    fieldOfStudy: "General Secondary Curriculum",
    institution: "Tarangan English School",
    location: "Maharashtra",
    duration: "Passed 2021",
    scoreLabel: "Percentage",
    scoreValue: "83%",
    highlights: [
      "Consistent academic record with distinction across STEM subjects."
    ]
  }
];
