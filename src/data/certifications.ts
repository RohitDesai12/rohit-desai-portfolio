export interface CertificationDocument {
  label: string;
  pdfPath: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  score?: string;
  rollNo?: string;
  certificatePdf: string;
  resultPdf?: string;
  documents?: CertificationDocument[];
  hidden: boolean;
  notes?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: "cdac-ai-bootcamp",
    title: "AI Bootcamp",
    issuer: "C-DAC Pune / FutureSkills PRIME (Ministry of Electronics & IT, Government of India)",
    date: "Completed",
    certificatePdf: "/assets/certificates/cdac-ai-bootcamp.pdf",
    resultPdf: "/assets/certificates/cdac-ai-bootcamp-result.pdf",
    documents: [
      {
        label: "Certificate of Completion",
        pdfPath: "/assets/certificates/cdac-ai-bootcamp.pdf"
      },
      {
        label: "Official Result & Grade Card",
        pdfPath: "/assets/certificates/cdac-ai-bootcamp-result.pdf"
      }
    ],
    hidden: false,
    notes: "Comprehensive government-backed AI & machine learning skilling initiative by MeitY and NASSCOM. Includes verified certificate of completion and official grade transcript."
  },
  {
    id: "nptel-cn",
    title: "Computer Networks And Internet Protocol",
    issuer: "NPTEL (IIT Certification Program)",
    score: "60%",
    date: "Jan – Apr 2025",
    rollNo: "NPTEL25CS15S11564",
    certificatePdf: "/assets/certificates/nptel-computer-networks.pdf",
    documents: [
      {
        label: "Official IIT Certificate",
        pdfPath: "/assets/certificates/nptel-computer-networks.pdf"
      }
    ],
    hidden: false,
    notes: "12-week rigorous IIT coursework covering OSI/TCP-IP models, packet routing, transport layers, and protocol design."
  },
  {
    id: "nptel-iot",
    title: "Introduction To Internet Of Things",
    issuer: "NPTEL (IIT Certification Program)",
    score: "75% (Elite)",
    date: "Jul – Oct 2026",
    rollNo: "NPTEL26CS161MANUAL0005837",
    certificatePdf: "/assets/certificates/nptel-iot.pdf",
    documents: [
      {
        label: "Official IIT Elite Certificate",
        pdfPath: "/assets/certificates/nptel-iot.pdf"
      }
    ],
    hidden: false,
    notes: "12-week IIT certification covering sensing topologies, IoT networking protocols, edge/cloud integration, and telemetry pipelines."
  }
];
