export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface SubProject {
  name: string;
  tech_stack: string[];
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  responsibilities: string[];
  sub_projects: SubProject[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  url: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  url?: string;
}


export type SkillsMap = Record<string, string[]>;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}
