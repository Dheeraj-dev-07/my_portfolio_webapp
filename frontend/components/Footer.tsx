import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0">
              <Image
                src="/images/dheeraj-sisodiya.webp"
                alt="Dheeraj Sisodiya"
                width={40}
                height={40}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                {profile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-500" /> {profile.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Dheeraj Sisodiya. All rights reserved. Built with FastAPI & Next.js.</p>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <span>Live API Docs (Swagger UI)</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
