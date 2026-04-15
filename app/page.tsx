import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import {
  getProfile,
  getSkills,
  getProjects,
  fallbackProfile,
  fallbackSkills,
  fallbackProjects
} from "@/lib/api";
import type { Profile, Skill, Project } from "@/types";

// Dynamic page — always fetches fresh data from the API
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all data in parallel; each falls back gracefully if API is down
  const [profile, skills, projects] = await Promise.all([
    getProfile().catch(() => fallbackProfile),
    getSkills().catch(() => fallbackSkills),
    getProjects().catch(() => fallbackProjects)
  ]);

  const featured = projects.find((p: Project) => p.featured) ?? projects[0];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar profile={profile} />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <FeaturedProject project={featured} />
      <ProjectsSection projects={projects} profile={profile} />
      <ContactSection profile={profile} />
      <Footer profile={profile} />
    </main>
  );
}
