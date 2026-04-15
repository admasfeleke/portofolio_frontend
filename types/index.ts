export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  avatar?: string;
  yearsOfExperience: number;
  openToWork: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: "frontend" | "backend" | "tools" | "database";
  level: number; // 1-100
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  architecture?: string;
  apiDesign?: string;
  liveUrl?: string;
  githubUrl: string;
  imageUrl?: string;
  featured: boolean;
  status: "live" | "wip" | "archived";
  year: number;
  // Mobile app fields
  platform: "web" | "mobile" | "both";
  apkUrl?: string;
  apkVersion?: string;
  apkSize?: string;
  minAndroid?: number;
  screenshots: string[];
}
