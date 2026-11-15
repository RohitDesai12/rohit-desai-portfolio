export interface CaseStudySection {
  problem: string;
  objective: string;
  technicalApproach: string;
  implementationDetails: string[];
  contribution: string[];
  challengesAndLearnings: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  timeline: string;
  shortDescription: string;
  featured: boolean;
  technologies: string[];
  keyFeatures: string[];
  myContribution: string[];
  caseStudy: CaseStudySection;
  previewImage?: string;
  images?: string[]; // Multiple screenshots (supports up to 10+ images with interactive carousel)
  placeholderTheme: {
    accentColor: string;
    diagramType: "neural-network" | "sensor-pipeline";
  };
  githubUrl?: string; // Optional: Only rendered when valid URL provided
  demoUrl?: string;   // Optional: Only rendered when valid URL provided
}

export const projectsData: ProjectItem[] = [
  {
    id: "ai-career-recommender",
    number: "01",
    title: "AI-Based Career Recommendation System",
    subtitle: "Intelligent Guidance & Resume Engineering Platform",
    timeline: "May 2026 – Oct 2026",
    shortDescription:
      "A comprehensive career platform integrating assessment-driven ML recommendations, skill roadmaps, job discovery, and an intelligent Resume Studio.",
    featured: true,
    technologies: [
      "Python",
      "NLP",
      "Machine Learning",
      "Node.js",
      "Express.js",
      "Flask",
      "React.js"
    ],
    keyFeatures: [
      "Personalized career and skill recommendations generated via trained ML models",
      "Dynamic career path roadmaps customized to individual assessment outcomes",
      "Integrated 'Resume Studio' supporting multi-resume management and job-tailored optimization",
      "Automated resume analysis and AI-assisted cover-letter synthesis",
      "Unified frontend interface connecting assessment telemetry to backend inference APIs"
    ],
    myContribution: [
      "Developed NLP/ML-powered recommendation workflows and integrated model inference with backend APIs to generate personalized career and skill recommendations.",
      "Engineered the core 'Resume Studio' subsystem supporting resume creation, multiple resume management, resume analysis, job-specific tailoring, and cover-letter generation.",
      "Designed clean REST endpoints to connect user assessment inputs to ML inference pipelines."
    ],
    caseStudy: {
      problem:
        "Students and early-career developers frequently encounter scattered career advice, lack visibility into specific industry skill gaps, and struggle to tailor their resumes effectively for distinct software engineering roles.",
      objective:
        "Architect a centralized platform that leverages machine learning and natural language processing to evaluate user competency profiles, suggest data-driven career paths, and streamline the resume creation and tailoring workflow.",
      technicalApproach:
        "Employed a modular architecture combining a Python ML service for text extraction, similarity scoring, and recommendation inference, paired with a Node.js/Express service handling user management, state persistence, and API orchestration.",
      implementationDetails: [
        "Constructed NLP feature extraction pipelines to analyze skill keywords from candidate profiles and job role benchmarks.",
        "Integrated model inference endpoints returning scored career recommendations and personalized curriculum roadmaps.",
        "Built the Resume Studio workspace enabling side-by-side editing, ATS-friendly structuring, and job-description alignment.",
        "Implemented secure RESTful API contracts between the React client and backend services."
      ],
      contribution: [
        "Spearheaded the development of NLP/ML-powered recommendation workflows and integrated model inference with backend APIs.",
        "Designed and implemented Resume Studio with multi-resume management and automated tailoring capabilities.",
        "Refined backend API response structures to ensure responsive client-side state updates."
      ],
      challengesAndLearnings: [
        "Handling diverse phrasing in user inputs and parsing unstructured resume text into standardized skill taxonomies.",
        "Designing intuitive visual feedback while recommendation inference processes run in the background.",
        "Deepened practical understanding of end-to-end ML integration within production web application architectures."
      ]
    },
    placeholderTheme: {
      accentColor: "#285943",
      diagramType: "neural-network"
    },
    // Set to your actual repository or demo link when ready. Left empty to prevent fake URLs.
    githubUrl: "",
    demoUrl: ""
  },
  {
    id: "ai-agri-closed-loop",
    number: "02",
    title: "AI-Driven Closed-Loop Agricultural Management System",
    subtitle: "Predictive Analytics & Environmental Telemetry Architecture",
    timeline: "Feb 2026 – Apr 2026",
    shortDescription:
      "An automated crop management system utilizing sensor telemetry preprocessing, machine learning predictions, and simulated IoT closed-loop feedback triggers.",
    featured: true,
    technologies: [
      "Python",
      "Machine Learning",
      "Data Pipelines",
      "IoT Simulation",
      "Predictive Modeling",
      "Flask"
    ],
    keyFeatures: [
      "Automated crop decision-support backend powered by predictive machine learning models",
      "Telemetry preprocessing pipelines ingesting simulated environmental and soil sensor data",
      "Yield estimation and crop condition forecasting algorithms",
      "Simulated closed-loop feedback mechanisms triggering automated irrigation and nutrient adjustments",
      "Modular data processing stages separating raw intake from model inference"
    ],
    myContribution: [
      "Developed a Python backend to automate crop management decisions using sensor data and machine learning predictions.",
      "Built data pipelines to preprocess and feed agricultural inputs into trained models for yield and condition forecasting.",
      "Implemented IoT-based workflow concepts to simulate real-time data intake and automated response triggers."
    ],
    caseStudy: {
      problem:
        "Traditional agricultural resource allocation relies heavily on manual observation or post-facto measurement, leading to inefficient irrigation, late disease detection, and sub-optimal harvest yields.",
      objective:
        "Develop an automated Python decision-support system capable of processing multi-variable sensor inputs and utilizing predictive models to simulate a closed-loop crop advisory workflow.",
      technicalApproach:
        "Structured a data ingestion and inference pipeline that simulates real-time soil moisture, temperature, and nutrient telemetry, runs these inputs through trained regressors/classifiers, and emits actionable threshold-based recommendations.",
      implementationDetails: [
        "Designed Python preprocessing routines for normalization, outlier handling, and sensor feature validation.",
        "Implemented predictive inference routines forecasting crop condition indexes and expected yields.",
        "Modeled simulated closed-loop actuators that respond autonomously when parameters deviate from target agronomic envelopes.",
        "Encapsulated model scoring into clean modular interfaces suitable for automated batch or streaming execution."
      ],
      contribution: [
        "Engineered the core Python decision engine automating crop advisory outputs.",
        "Designed the data preparation scripts converting multi-dimensional sensor metrics into model-ready tensors.",
        "Formulated the simulated IoT feedback logic that issues programmatic response triggers."
      ],
      challengesAndLearnings: [
        "Calibrating simulated sensor variance to reflect realistic environmental noise and fluctuations.",
        "Maintaining clear separation between conceptual/simulated hardware layers and production-grade software data processing.",
        "Gained hands-on proficiency in building robust data pipelines and integrating predictive models into automated control architectures."
      ]
    },
    placeholderTheme: {
      accentColor: "#3B7A57",
      diagramType: "sensor-pipeline"
    },
    // Set to your actual repository or demo link when ready. Left empty to prevent fake URLs.
    githubUrl: "",
    demoUrl: ""
  }
];
