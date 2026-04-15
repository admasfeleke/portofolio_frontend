import type { Profile, Skill, Project } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      // No cache — always fetch fresh data so admin changes show immediately
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return getFallback<T>(endpoint);
  }
}

function getFallback<T>(endpoint: string): T {
  if (endpoint.includes("profile")) return fallbackProfile as T;
  if (endpoint.includes("skills")) return fallbackSkills as T;
  if (endpoint.includes("projects")) return fallbackProjects as T;
  return {} as T;
}

export const getProfile = () => fetchAPI<Profile>("/profile");
export const getSkills = () => fetchAPI<Skill[]>("/skills");
export const getProjects = () => fetchAPI<Project[]>("/projects");
export const getFeaturedProject = async () => {
  const projects = await getProjects();
  return projects.find((p) => p.featured) ?? projects[0];
};

// ─── Fallback data (mirrors DB seed) ─────────────────────────────────────────

export const fallbackProfile: Profile = {
  name: "Admasu Feleke Mulatu",
  title: "Full-Stack Developer & TVET Instructor",
  bio: "I build software that works in the real world — not just on fast connections with unlimited budgets. Based in Central Ethiopia, I teach at a government polytechnic college and ship production systems that run on local networks, serve real students, and solve genuine problems.",
  location: "Dalocha, Central Ethiopia",
  email: "admsu.feleke21@gmail.com",
  phone: "+251900824328",
  github: "https://github.com/admasufeleke",
  linkedin: "https://linkedin.com/in/admasufeleke",
  yearsOfExperience: 4,
  openToWork: true
};

export const fallbackSkills: Skill[] = [
  // Frontend
  { id: 1,  name: "React",        category: "frontend",  level: 85, icon: "⚛️", color: "#61dafb" },
  { id: 2,  name: "Next.js",      category: "frontend",  level: 80, icon: "▲",  color: "#ffffff" },
  { id: 3,  name: "JavaScript",   category: "frontend",  level: 88, icon: "JS", color: "#f7df1e" },
  { id: 4,  name: "Tailwind CSS", category: "frontend",  level: 90, icon: "🎨", color: "#38bdf8" },
  { id: 5,  name: "Flutter",      category: "frontend",  level: 78, icon: "🐦", color: "#54c5f8" },
  // Backend
  { id: 6,  name: "Laravel",      category: "backend",   level: 90, icon: "🔴", color: "#ff2d20" },
  { id: 7,  name: "PHP",          category: "backend",   level: 88, icon: "🐘", color: "#777bb4" },
  { id: 8,  name: "REST APIs",    category: "backend",   level: 90, icon: "🔗", color: "#6366f1" },
  { id: 9,  name: "Python",       category: "backend",   level: 70, icon: "🐍", color: "#3776ab" },
  // Database
  { id: 10, name: "MySQL",        category: "database",  level: 88, icon: "🗄️", color: "#4479a1" },
  { id: 11, name: "SQLite",       category: "database",  level: 80, icon: "📦", color: "#003b57" },
  // Tools
  { id: 12, name: "Git",          category: "tools",     level: 82, icon: "🌿", color: "#f05032" },
  { id: 13, name: "Linux",        category: "tools",     level: 78, icon: "🐧", color: "#fcc624" },
  { id: 14, name: "LAN Deploy",   category: "tools",     level: 85, icon: "🖧",  color: "#6366f1" },
  { id: 15, name: "Filament",     category: "tools",     level: 82, icon: "🔷", color: "#f59e0b" }
];

export const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Online Examination System",
    slug: "online-exam-system",
    description:
      "A fully functional computer-based examination platform deployed on the local network of Dalocha Polytechnic College. Currently serving students and instructors for internal assessments.",
    problem:
      "Paper-based exams at the college were time-consuming to prepare, prone to cheating, and slow to grade. There was no digital infrastructure for assessments despite having a computer lab.",
    solution:
      "Built a LAN-hosted exam platform where instructors create question banks, schedule exams, and get instant results. Students sit exams from lab computers with no internet required. Fully operational since deployment.",
    techStack: ["Laravel", "MySQL", "PHP", "JavaScript", "Bootstrap", "LAN Deployment"],
    architecture:
      "Single-server Laravel application hosted on a local machine acting as the network server. All college lab computers connect via the internal network. No internet dependency — designed to work reliably in low-infrastructure environments.",
    apiDesign:
      "Server-rendered Laravel MVC with RESTful internal routes. Key modules: /exams (create, schedule, publish), /questions (bank management), /results (auto-grading, reports), /students (enrollment, auth).",
    liveUrl: undefined,
    githubUrl: "https://github.com/admasufeleke",
    featured: true,
    status: "live",
    year: 2023,
    platform: "web",
    screenshots: []
  },
  {
    id: 2,
    title: "Smart Farming System",
    slug: "smart-farming",
    description:
      "A production-grade agricultural intelligence platform for smallholder farmers in Central Ethiopia. Laravel REST API backend, Flutter mobile app with Amharic/Oromo/Tigrinya/English support, AI-powered disease detection, soil health monitoring, and crop yield prediction.",
    problem:
      "Smallholder farmers in the region have no access to agronomic expertise at the field level. Disease outbreaks go undetected until significant crop loss occurs, soil management is guesswork, and yield planning is based purely on experience.",
    solution:
      "A full-stack platform where farmers scan crops for disease via mobile camera, get AI-diagnosed treatment guidance in their local language, monitor soil health and weather trends, and receive yield predictions with confidence intervals — all designed to work in low-connectivity environments.",
    techStack: ["Laravel", "Flutter", "MySQL", "Python (ML inference)", "REST API v1", "Filament Admin", "Multi-language (Amharic, Oromo, Tigrinya)"],
    architecture:
      "Versioned Laravel API (/api/v1/) with role-based access control, audit logs, and an ops health-check system. A separate ML inference service handles disease image classification with model version contracts and KPI monitoring (uncertain rate, family mismatch rate). Flutter mobile app with offline-capable design and full localization.",
    apiDesign:
      "Key endpoint groups: /disease-reports (scan + AI diagnosis + treatment guidance), /soil-health (pH, N, P, K with recommendations), /weather-data (trend tracking), /yield-prediction (ML-based with confidence intervals), /disease-prevention (risk assessment + automated alerts), /alerts (farm-level notifications). Ops endpoints: /ops/health-check, /ops/inference-kpi, /ops/release-gate.",
    githubUrl: "https://github.com/admasufeleke",
    featured: false,
    status: "wip",
    year: 2024,
    platform: "both",
    apkUrl: undefined,
    apkVersion: "1.0.0-beta",
    apkSize: undefined,
    minAndroid: 8,
    screenshots: []
  },
  {
    id: 3,
    title: "Developer Portfolio",
    slug: "portfolio",
    description:
      "This portfolio — built with Next.js, React Three Fiber, and a Laravel REST API backend. Features interactive 3D animations, dynamic content from a MySQL database, and a clean dark UI.",
    problem:
      "Needed a professional web presence that demonstrates both frontend creativity and backend engineering depth, not just a static page.",
    solution:
      "Full-stack portfolio with a 3D interactive hero, animated skill visualization, and project showcase — all backed by a real Laravel API with seeded data.",
    techStack: ["Next.js", "React Three Fiber", "Laravel", "MySQL", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/admasufeleke",
    featured: false,
    status: "live",
    year: 2025,
    platform: "web",
    screenshots: []
  }
];
