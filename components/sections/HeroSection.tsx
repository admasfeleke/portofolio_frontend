"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Suspense } from "react";
import type { Profile } from "@/types";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-radial from-accent-glow to-transparent" />
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" }
  })
};

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
        }}
      />
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full pointer-events-none md:pointer-events-auto">
        <Suspense fallback={null}><HeroCanvas /></Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {profile.openToWork && (
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities &amp; collaboration
            </motion.div>
          )}

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            I build systems<br />
            <span className="text-gradient">that work.</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
            {profile.title} from {profile.location}. I ship production software that runs on
            real networks, serves real users, and solves real problems.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-3">
            <a href="#projects" className="px-6 py-3 bg-accent hover:bg-accent-2 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/5">
              Get in Touch
            </a>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/5">
            {[
              { value: `${profile.yearsOfExperience}+`, label: "Years experience" },
              { value: "2",  label: "Production systems" },
              { value: "1",  label: "College served" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <span>Scroll</span>
        <motion.div className="w-0.5 h-8 bg-gradient-to-b from-muted to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}
