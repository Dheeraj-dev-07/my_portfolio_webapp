import {
  Profile,
  SkillsMap,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  AchievementItem,
  ContactFormData,
  ContactApiResponse
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const FALLBACK_PROFILE: Profile = {
  name: "Dheeraj Sisodiya",
  title: "Java Full Stack Developer",
  location: "Vijay Nagar, Indore, India",
  phone: "+91-7415484636",
  email: "dheerajsisodiy1122@gmail.com",
  linkedin: "https://www.linkedin.com/in/dheerajS05",
  github: "https://github.com/Dheeraj-dev-07?tab=repositories",
  summary: "Java Full Stack Developer with hands-on internship experience building secure, production-ready applications using Java, Spring Boot, Spring Security, REST APIs, and MySQL. Skilled in authentication, authorization, and scalable backend design, with growing expertise in DevOps and AI technologies. Seeking to contribute to an innovative engineering team while continuing to grow as a full-stack developer."
};

const FALLBACK_SKILLS: SkillsMap = {
  "Frontend": [
    "JavaScript",
    "React"
  ],
  "Backend": [
    "Java",
    "J2EE",
    "Spring Boot",
    "Spring Security",
    "Redis",
    "Spring AI",
    "MVC & Microservices",
    "REST APIs",
    "MySQL",
    "JDBC",
    "Hibernate (JPA)",
    "Python",
    "FastAPI (basic)"
  ],
  "DevOps": [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "GitHub Actions",
    "Terraform",
    "AWS"
  ],
  "Tools": [
    "Antigravity IDE",
    "IntelliJ IDEA",
    "VS Code",
    "Git",
    "GitHub",
    "Postman",
    "Jira",
    "Grafana"
  ],
  "Concepts": [
    "Object-Oriented Programming",
    "Agile/Scrum",
    "LLMs",
    "RAG",
    "Memory",
    "Vector Databases",
    "AI Agents",
    "Tool Calling",
    "MCP",
    "Spring AI",
    "LangChain4J"
  ],
  "Soft Skills": [
    "Decision Making",
    "Time Management",
    "Cross-functional Collaboration",
    "Adaptability"
  ]
};

const FALLBACK_EXPERIENCE: ExperienceItem[] = [
  {
    company: "Augment Infotech Pvt",
    role: "Java Full Stack Developer Intern",
    location: "Indore, India",
    period: "Apr 2026 – Jul 2026",
    responsibilities: [
      "Contributed to enterprise-grade full-stack applications using Java, Spring Boot, React.js, MySQL, and REST APIs in an Agile environment.",
      "Built backend modules following MVC architecture, implementing secure authentication, authorization, and RESTful APIs with Spring Boot and Spring Security (LeadFlow CRM lead-management system).",
      "Developed responsive UI components and integrated REST APIs for a live enterprise Property Management System (PMS) using React.js, improving usability and performance.",
      "Collaborated across frontend/backend teams on bug fixes, feature delivery, and production deployments.",
      "Implemented structured logging (SLF4J/Logback) and global exception handling, collaborating with cross-functional teams on active debugging, issue resolution"
    ],
    sub_projects: [
      {
        name: "LeadFlow CRM (Lead Management System)",
        tech_stack: ["Java", "Spring Boot", "Spring Security", "React.js"],
        highlights: [
          "Developed the Authentication and Authorization module using Spring Boot, implementing secure login and role-based access control.",
          "Designed RESTful APIs following the MVC architecture and integrated them with the React frontend.",
          "Collaborated with the backend team to implement production-ready authentication workflows and improve application security."
        ]
      },
      {
        name: "Property Management System (PMS)",
        tech_stack: ["React.js", "JavaScript", "REST APIs"],
        highlights: [
          "Worked with the frontend team on a live enterprise Property Management System (PMS) to develop and maintain user-facing modules.",
          "Built responsive UI components, integrated REST APIs, and resolved frontend issues to improve usability and performance.",
          "Supported feature development, testing, and cross-functional collaboration to ensure timely delivery of production releases."
        ]
      }
    ]
  },
  {
    company: "HulkHire Tech",
    role: "Java Developer Trainee",
    location: "Hyderabad, India",
    period: "Aug 2025 – Sep 2025",
    responsibilities: [
      "Built a secure, scalable Stripe Payment Integration System in Java Spring Boot using a microservices architecture with modular payment-processing and stripe-provider services.",
      "Integrated Stripe PSP APIs (Create/Retrieve/Expire Session) and secured webhook processing with Stripe Basic Authentication and HmacSHA256.",
      "Implemented payment status tracking, custom error codes, and Spring exception handling for reliable, consistent transaction processing."
    ],
    sub_projects: [
      {
        name: "Stripe Payment Integration System",
        tech_stack: ["Java", "Spring Boot", "Microservices", "Stripe API"],
        highlights: [
          "Developed a secure and scalable Stripe Payment Integration System using Java Spring Boot in a microservices architecture.",
          "Implemented modular payment-processing and stripe-provider services and integrated Stripe PSP APIs including Create Session, Retrieve Session, and Expire Session.",
          "Implemented security using Stripe Basic Authentication and HmacSHA256 for secure webhook notification processing.",
          "Developed payment status tracking to ensure reliable payment processing and transaction consistency.",
          "Designed custom error codes and applied Spring exception handling for robust error management.",
          "Processed Stripe webhook events and followed RESTful API standards while collaborating with the team on the end-to-end integration workflow."
        ]
      }
    ]
  }
];

const FALLBACK_EDUCATION: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Sri Aurobindo Institute of Technology, Indore (RGPV)",
    period: "2022 – 2026",
    score: "CGPA: 6.6/10"
  },
  {
    degree: "Class 12th – PCM",
    institution: "Madhya Pradesh Board",
    period: "2022",
    score: ""
  },
  {
    degree: "Class 10th",
    institution: "Madhya Pradesh Board",
    period: "2020",
    score: ""
  }
];

const FALLBACK_CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Infosys Springboard – Java Foundation",
    issuer: "Infosys Springboard",
    url: "https://drive.google.com/file/d/155Osr1-2Fr7E8QkYPQeg697fpWIsvElW/view?usp=drive_link"
  },
  {
    title: "Google Cloud – Cloud Computing Foundation",
    issuer: "Google Cloud",
    url: "https://drive.google.com/file/d/1BPNEGAnf9C4-M4dUXB6wROl5LCSEjU2H/view?usp=drive_link"
  },
  {
    title: "Neo4j Certified Professional",
    issuer: "Neo4j",
    url: "https://graphacademy.neo4j.com/c/bf136275-1e58-4fe4-80ce-f7534a70980e/"
  },
  {
    title: "Walmart USA – Advanced Software Engineering",
    issuer: "Walmart / Forage",
    url: "https://www.theforage.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_6a703800a220bc3003ad72d7_1785751064478_completion_certificate.pdf"
  },
  {
    title: "CII – Volunteer Participation Certificate",
    issuer: "Confederation of Indian Industry",
    url: "https://drive.google.com/file/d/1nLbqCULrHtP4klS1NE7t3ZZrziyeU5yB/view?usp=drive_link"
  }
];

const FALLBACK_ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "TieCon MP 2025 Volunteer",
    description: "Volunteered at TieCon MP 2025, managing the registration process for investors and delegates and ensuring smooth event coordination.",
    link: "https://drive.google.com/file/d/1j1NhZEMvYHxHSat2jSDDHih247QIw48m/view?usp=drive_link"
  }
];

async function fetchWithFallback<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`[API] Fallback used for ${endpoint}:`, error);
    return fallback;
  }
}

export async function getProfile(): Promise<Profile> {
  return fetchWithFallback<Profile>('/api/profile', FALLBACK_PROFILE);
}

export async function getSkills(): Promise<SkillsMap> {
  return fetchWithFallback<SkillsMap>('/api/skills', FALLBACK_SKILLS);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return fetchWithFallback<ExperienceItem[]>('/api/experience', FALLBACK_EXPERIENCE);
}

export async function getEducation(): Promise<EducationItem[]> {
  return fetchWithFallback<EducationItem[]>('/api/education', FALLBACK_EDUCATION);
}

export async function getCertifications(): Promise<CertificationItem[]> {
  return fetchWithFallback<CertificationItem[]>('/api/certifications', FALLBACK_CERTIFICATIONS);
}

export async function getAchievements(): Promise<AchievementItem[]> {
  return fetchWithFallback<AchievementItem[]>('/api/achievements', FALLBACK_ACHIEVEMENTS);
}

export async function postContactForm(data: ContactFormData): Promise<ContactApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error?.message || 'Failed to send message');
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network error while sending contact form.'
    };
  }
}

export function getResumeUrl(download: boolean = false): string {
  return download ? `${API_BASE_URL}/api/resume?download=true` : `${API_BASE_URL}/api/resume`;
}
