"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/types";

const categories = [
  { id: "all",      label: "All"      },
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend"  },
  { id: "database", label: "Database" },
  { id: "tools",    label: "Tools"    }
];

function SkillGrid({ skills }: { skills: Skill[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
      {skills.map((skill, i) => (
        <motion.div key={skill.id}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          onMouseEnter={() => setHovered(skill.id)} onMouseLeave={() => setHovered(null)}
          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl cursor-default transition-all duration-200"
          style={{
            background: hovered === skill.id ? `${skill.color}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${hovered === skill.id ? skill.color + "40" : "rgba(255,255,255,0.06)"}`,
            transform: hovered === skill.id ? "translateY(-2px)" : "none"
          }}>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="15" fill="none" stroke={skill.color} strokeWidth="2.5"
                strokeDasharray={`${(skill.level / 100) * 94.2} 94.2`} strokeLinecap="round" />
            </svg>
            <span className="text-base z-10 leading-none">{skill.icon}</span>
          </div>
          <span className="text-xs font-medium text-white text-center leading-tight">{skill.name}</span>
          {hovered === skill.id && (
            <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-mono" style={{ color: skill.color }}>
              {skill.level}%
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-surface/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-accent text-sm font-mono font-medium mb-3">// skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Tools of the trade</h2>
          <p className="text-muted mt-3 max-w-md mx-auto">Technologies I use to build fast, reliable, and maintainable systems.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-accent text-white"
                  : "border border-white/10 text-muted hover:text-white hover:border-white/20"
              }`}>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-xl border border-white/5 bg-surface p-4 min-h-64">
            {inView && <SkillGrid skills={filtered} />}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }} className="space-y-3">
            {filtered.slice(0, 8).map((skill, i) => (
              <motion.div key={skill.id}
                initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{skill.icon}</span>
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${skill.color}20`, color: skill.color, border: `1px solid ${skill.color}40` }}>
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-xs text-muted font-mono">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.8, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
