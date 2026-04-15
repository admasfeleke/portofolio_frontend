import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admasu Feleke — Full-Stack Developer",
  description:
    "Full-stack developer and TVET instructor based in Central Ethiopia. Building production systems with Laravel, Next.js, and IoT — designed for real-world constraints.",
  keywords: [
    "full-stack developer", "Laravel", "Next.js", "PHP", "Ethiopia",
    "TVET", "portfolio", "Admasu Feleke"
  ],
  authors: [{ name: "Admasu Feleke Mulatu" }],
  openGraph: {
    title: "Admasu Feleke — Full-Stack Developer",
    description:
      "Full-stack developer and TVET instructor based in Central Ethiopia. Building production systems that work in the real world.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
