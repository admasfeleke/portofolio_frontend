"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

const ANDROID_NAMES: Record<number, string> = {
  5: "5.0 Lollipop", 6: "6.0 Marshmallow", 7: "7.0 Nougat",
  8: "8.0 Oreo", 9: "9.0 Pie", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14"
};

interface Props {
  project: Project;
}

export function ApkDownload({ project }: Props) {
  const [showInstructions, setShowInstructions] = useState(false);

  if (!project.apkUrl && project.platform === "mobile") {
    // APK coming soon
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-surface-2 text-sm text-muted cursor-default">
        <span>📱</span>
        APK coming soon
      </div>
    );
  }

  if (!project.apkUrl) return null;

  return (
    <div className="space-y-3">
      {/* Download button */}
      <a
        href={project.apkUrl}
        download
        className="flex items-center gap-3 px-5 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg group"
        style={{
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          boxShadow: "0 4px 14px rgba(34,197,94,0.2)"
        }}
      >
        {/* Android icon */}
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.523 15.341a.75.75 0 01-.75.75H7.227a.75.75 0 01-.75-.75V9.659a.75.75 0 01.75-.75h9.546a.75.75 0 01.75.75v5.682zM14.864 3.31l1.023-1.773a.25.25 0 00-.433-.25l-1.037 1.796A6.52 6.52 0 0012 2.75a6.52 6.52 0 00-2.417.333L8.546 1.287a.25.25 0 00-.433.25l1.023 1.773A6.5 6.5 0 005.5 8.75h13a6.5 6.5 0 00-3.636-5.44zM9.75 6.5a.75.75 0 110-1.5.75.75 0 010 1.5zm4.5 0a.75.75 0 110-1.5.75.75 0 010 1.5zM5.5 9.5v9A1.5 1.5 0 007 20h.25v2.25a1.25 1.25 0 002.5 0V20h4.5v2.25a1.25 1.25 0 002.5 0V20H17a1.5 1.5 0 001.5-1.5v-9h-13z"/>
        </svg>
        <div className="flex-1">
          <div>Download APK</div>
          <div className="text-xs opacity-75 font-normal">
            {[project.apkVersion && `v${project.apkVersion}`, project.apkSize].filter(Boolean).join(" · ")}
          </div>
        </div>
        <svg className="w-4 h-4 opacity-70 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </a>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        {project.minAndroid && (
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Android {ANDROID_NAMES[project.minAndroid] ?? project.minAndroid}+
          </span>
        )}
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center gap-1 text-accent hover:text-accent-2 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How to install
        </button>
      </div>

      {/* Install instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 text-xs space-y-2">
              <p className="font-semibold text-white mb-2">Installing outside the Play Store:</p>
              {[
                "Download the APK file to your Android device",
                'Go to Settings → Security → Enable "Install unknown apps" for your browser',
                "Open the downloaded APK file",
                "Tap Install and follow the prompts",
                "You can disable unknown sources again after installing"
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-muted">
                  <span className="w-4 h-4 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
