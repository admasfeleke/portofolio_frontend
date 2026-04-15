import type { Profile } from "@/types";

export default function Footer({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>© {year} {profile.name}. Built with Next.js &amp; Laravel.</p>
        <div className="flex items-center gap-4">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          )}
          <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
