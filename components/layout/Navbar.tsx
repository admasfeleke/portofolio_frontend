"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Profile } from "@/types";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  }
];

export default function Navbar({ profile }: { profile: Profile }) {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [activeSection, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const initials = profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/5 shadow-lg shadow-black/20" : ""}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          {/* Avatar or initials */}
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-accent/30 group-hover:border-accent/60 transition-colors">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs group-hover:bg-accent-2 transition-colors"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                {initials}
              </div>
            )}
          </div>
          <span className="font-semibold text-white hidden sm:block">{profile.name.split(" ").slice(0, 2).join(" ")}</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === link.href.slice(1) ? "text-white" : "text-muted hover:text-white"}`}>
                {activeSection === link.href.slice(1) && (
                  <motion.span layoutId="nav-indicator" className="absolute inset-0 bg-surface-2 rounded-lg" style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href={`mailto:${profile.email}`}
            className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent-2 text-white rounded-lg transition-colors">
            Hire Me
          </a>
        </div>

        <button className="md:hidden p-2 text-muted hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="w-5 flex flex-col gap-1">
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="md:hidden glass border-t border-white/5"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
            <ul className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="block px-4 py-2 text-sm text-muted hover:text-white rounded-lg hover:bg-surface-2 transition-colors"
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`}
                  className="block px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg text-center mt-2"
                  onClick={() => setMenuOpen(false)}>
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
