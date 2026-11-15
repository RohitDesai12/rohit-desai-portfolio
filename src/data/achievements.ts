export interface AchievementItem {
  id: string;
  title: string;
  category: "Hackathon" | "Academic" | "Technical Training";
  organization: string;
  date?: string;
  description: string;
  impactHighlight?: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "pu-code-hackathon",
    title: "PU Code Hackathon 3.0 Participant",
    category: "Hackathon",
    organization: "Parul University",
    description: "Designed and engineered a functional prototype under rigorous competitive time constraints, collaborating on rapid problem definition and system implementation.",
    impactHighlight: "Delivered working end-to-end prototype within event timeframe."
  },
  {
    id: "govt-ai-simulations",
    title: "Government-Backed AI Training & Industry Simulations",
    category: "Technical Training",
    organization: "Ministry of Electronics & IT / FutureSkills PRIME",
    description: "Successfully completed industry-relevant computational simulations and rigorous technical assessments in artificial intelligence and applied data engineering while sustaining consistent academic coursework.",
    impactHighlight: "Recognized foundational proficiency in applied ML pipelines."
  }
];
