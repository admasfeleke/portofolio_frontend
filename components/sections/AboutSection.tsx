"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Profile } from "@/types";

const highlights = [
  { icon: "🏫", title: "TVET Educator",        desc: "4+ years as assistant instructor at Dalocha Polytechnic College under Central Ethiopia's TVET system — teaching and building simultaneously." },
  { icon: "🖧", title: "Offline-first builder", desc: "My systems run on local networks with no internet dependency. Designed for real infrastructure constraints, not ideal conditions." },
  { icon: "🌾", title: "Domain-aware",          desc: "I build for the context I know — education, agriculture, and public institutions in Ethiopia. Real problems, real users." },
  { icon: "🏗️", title: "End-to-end ownership", desc: "From database schema to UI — I design, build, deploy, and maintain. No handoffs, full accountability." }
];

export default function AboutSection({ profile }: { profile: Profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const initials = profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-accent/30">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                    {initials}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-muted">{profile.title}</p>
                <p className="text-xs text-muted mt-0.5">📍 {profile.location}</p>
              </div>
            </div>

            <p className="text-accent text-sm font-mono font-medium mb-3">// about me</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Educator by role,<br />
              <span className="text-gradient">engineer by practice.</span>
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{profile.bio}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-accent/50 rounded-lg text-sm text-muted hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
              <a href="/resume.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-sm text-accent transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="p-5 rounded-xl bg-surface border border-white/5 hover:border-accent/20 transition-colors group">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
