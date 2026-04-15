"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  screenshots: string[];
  title: string;
}

export function ScreenshotGallery({ screenshots, title }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <>
      <div>
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Screenshots
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {screenshots.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden border border-white/10 hover:border-accent/40 transition-all hover:scale-105 relative"
              aria-label={`Screenshot ${i + 1} of ${title}`}
            >
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                className="object-cover"
                sizes="112px"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-sm w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={screenshots[lightbox]}
                  alt={`${title} screenshot ${lightbox + 1}`}
                  fill
                  className="object-contain"
                  sizes="400px"
                  unoptimized
                />
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setLightbox((lightbox - 1 + screenshots.length) % screenshots.length)}
                  className="p-2 rounded-lg border border-white/10 text-muted hover:text-white transition-colors"
                  aria-label="Previous screenshot"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-xs text-muted">{lightbox + 1} / {screenshots.length}</span>
                <button
                  onClick={() => setLightbox((lightbox + 1) % screenshots.length)}
                  className="p-2 rounded-lg border border-white/10 text-muted hover:text-white transition-colors"
                  aria-label="Next screenshot"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
