"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectCard3D } from "@/components/3d/ProjectCard3D";
import { ApkDownload } from "@/components/ui/ApkDownload";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";
import type { Project, Profile } from "@/types";

const statusColors: Record<string, string> = {
  live:     "text-green-400 bg-green-500/10 border-green-500/20",
  wip:      "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  archived: "text-muted bg-white/5 border-white/10"
};

const platformBadge: Record<string, { label: string; color: string }> = {
  web:    { label: "Web",         color: "#6366f1" },
  mobile: { label: "Android App", color: "#22c55e" },
  both:   { label: "Web + Mobile", color: "#f59e0b" }
};

export default function ProjectsSection({ projects, profile }: { projects: Project[]; profile: Profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding bg-surface/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-accent text-sm font-mono font-medium mb-3">// projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Things I&apos;ve built</h2>
          <p className="text-muted mt-3 max-w-md">
            A selection of projects that demonstrate my range — from production web systems to Android apps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <ProjectCard3D className="h-full">
                <article className="h-full flex flex-col p-6 rounded-xl bg-surface border border-white/5 hover:border-accent/20 transition-colors">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      {project.platform === "mobile" || project.platform === "both" ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth={1.5}/>
                          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {/* Platform badge */}
                      {project.platform !== "web" && (
                        <span className="text-xs px-2 py-0.5 rounded-full border"
                          style={{
                            color: platformBadge[project.platform]?.color,
                            background: `${platformBadge[project.platform]?.color}15`,
                            borderColor: `${platformBadge[project.platform]?.color}30`
                          }}>
                          {platformBadge[project.platform]?.label}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

                  {/* Screenshots (mobile projects) */}
                  {project.screenshots?.length > 0 && (
                    <div className="mb-4">
                      <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 rounded bg-surface-2 text-muted border border-white/5">{tech}</span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-surface-2 text-muted border border-white/5">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* APK download (mobile projects) */}
                  {(project.platform === "mobile" || project.platform === "both") && (
                    <div className="mb-4">
                      <ApkDownload project={project} />
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
                      aria-label={`${project.title} source code`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Source
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-2 transition-colors ml-auto"
                        aria-label={`${project.title} live demo`}>
                        Live Demo
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              </ProjectCard3D>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }} className="text-center mt-10">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
              See more on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
