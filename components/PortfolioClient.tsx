"use client";

import { useEffect, useState } from "react";
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

export default function PortfolioClient() {
  const [profile, setProfile]   = useState<Profile>(fallbackProfile);
  const [skills, setSkills]     = useState<Skill[]>(fallbackSkills);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loaded, setLoaded]     = useState(false);

  useEffect(() => {
    // Fetch from visitor's browser — bypasses Vercel server IP blocks
    Promise.all([
      getProfile().catch(() => fallbackProfile),
      getSkills().catch(() => fallbackSkills),
      getProjects().catch(() => fallbackProjects)
    ]).then(([p, s, pr]) => {
      setProfile(p);
      setSkills(s);
      setProjects(pr);
      setLoaded(true);
    });
  }, []);

  const featured = projects.find((p) => p.featured) ?? projects[0];

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
