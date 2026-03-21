export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string[];
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
