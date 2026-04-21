import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import {
  fallbackProfile,
  fallbackSkills,
  fallbackProjects
} from "@/lib/api";
import type { Project } from "@/types";

// Use fallback data — fetched at build time from admin CMS
// To update: push a new commit or trigger redeploy in Vercel dashboard
export default function Home() {
  const profile  = fallbackProfile;
  const skills   = fallbackSkills;
  const projects = fallbackProjects;
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
