"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/types";

const archSteps = [
  { label: "Browser (Lab PCs)",  desc: "Students connect via LAN IP",        color: "#6366f1" },
  { label: "Laravel Server",     desc: "Hosted on local machine, port 80",    color: "#ff2d20" },
  { label: "Session Manager",    desc: "Tracks active exams, time limits",    color: "#8b5cf6" },
  { label: "MySQL Database",     desc: "Questions, results, student records", color: "#4479a1" }
];

const apiEndpoints = [
  { method: "GET",  path: "/exams",             desc: "List scheduled exams"  },
  { method: "POST", path: "/exams/{id}/start",  desc: "Begin student session" },
  { method: "POST", path: "/exams/{id}/submit", desc: "Submit + auto-grade"   },
  { method: "GET",  path: "/results/{student}", desc: "Student result report" }
];

export default function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="featured" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-accent text-sm font-mono font-medium mb-3">// featured project</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Deep dive</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-2xl border border-white/5 bg-surface overflow-hidden">

          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-muted font-mono">192.168.1.1 — college LAN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Live — LAN</span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">No internet required</span>
            </div>
          </div>

          <div className="p-6 lg:p-10 grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-muted leading-relaxed mb-6">{project.description}</p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <p className="text-xs font-semibold text-red-400 mb-1.5 uppercase tracking-wide">Problem</p>
                  <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                  <p className="text-xs font-semibold text-green-400 mb-1.5 uppercase tracking-wide">Solution</p>
                  <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">{tech}</span>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-white/5 rounded-lg text-sm text-muted cursor-default">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Deployed on college LAN
                </div>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />System Architecture
              </h4>
              <div className="flex flex-col gap-2 mb-6">
                {archSteps.map((step, i) => (
                  <motion.div key={step.label}
                    initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface-2 border border-white/5">
                    <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ background: step.color }} />
                    <div>
                      <p className="text-sm font-medium text-white">{step.label}</p>
                      <p className="text-xs text-muted">{step.desc}</p>
                    </div>
                    {i < archSteps.length - 1 && <div className="ml-auto text-muted text-xs">↓</div>}
                  </motion.div>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />Key API Routes
              </h4>
              <div className="rounded-xl bg-background border border-white/5 p-4 font-mono text-xs space-y-2">
                {apiEndpoints.map((ep) => (
                  <div key={ep.path} className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-10 flex-shrink-0 ${ep.method === "GET" ? "text-green-400" : "text-blue-400"}`}>{ep.method}</span>
                    <span className="text-accent/80">{ep.path}</span>
                    <span className="text-muted ml-auto hidden sm:block">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
