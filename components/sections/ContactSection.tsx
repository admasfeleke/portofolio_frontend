"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Profile } from "@/types";

export default function ContactSection({ profile }: { profile: Profile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="text-accent text-sm font-mono font-medium mb-3">// contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Have a problem worth<br />
            <span className="text-gradient">solving? Let&apos;s talk.</span>
          </h2>
          <p className="text-muted leading-relaxed mb-10 max-w-lg mx-auto">
            {profile.openToWork
              ? "I'm open to freelance projects, collaboration, and full-time opportunities. Reach out."
              : "I'm always happy to connect. If you have something worth building, let's talk."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a href={`mailto:${profile.email}`}
              className="px-8 py-3.5 bg-accent hover:bg-accent-2 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25 text-sm">
              Send me an email
            </a>
            <button onClick={copyEmail}
              className="flex items-center gap-2 px-6 py-3.5 border border-white/10 hover:border-white/20 text-muted hover:text-white rounded-xl transition-all text-sm">
              {copied ? (
                <><svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy email</>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="p-3 rounded-xl border border-white/10 hover:border-accent/30 text-muted hover:text-white transition-all hover:bg-accent/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-3 rounded-xl border border-white/10 hover:border-accent/30 text-muted hover:text-white transition-all hover:bg-accent/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} aria-label="Phone"
                className="p-3 rounded-xl border border-white/10 hover:border-accent/30 text-muted hover:text-white transition-all hover:bg-accent/5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </a>
            )}
          </div>

          {profile.phone && (
            <p className="text-muted text-sm mt-6">
              Or call / WhatsApp: <a href={`tel:${profile.phone}`} className="text-white hover:text-accent transition-colors">{profile.phone}</a>
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
