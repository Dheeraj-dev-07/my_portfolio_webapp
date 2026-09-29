'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, GitCommit, Star, GitFork, Code2 } from 'lucide-react';

interface GitHubActivitySectionProps {
  username?: string;
}

export default function GitHubActivitySection({ username = "Dheeraj-dev-07" }: GitHubActivitySectionProps) {
  return (
    <section id="github-activity" className="py-12 md:py-20 bg-slate-900/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold border border-brand-500/20 mb-3">
            <GitCommit className="w-3.5 h-3.5" />
            Active Open Source Contributions
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            GitHub Engineering Activity
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Live contribution statistics, repository metrics, and active technical work on GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-6 border border-slate-800/90 bg-slate-950/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-800 text-brand-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">GitHub Statistics</h3>
                  <p className="text-xs text-slate-400">@{username}</p>
                </div>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                Profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex justify-center items-center overflow-hidden py-2 rounded-xl bg-slate-900/90 border border-slate-800/60 min-h-[165px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=090d16&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8`}
                alt={`${username} GitHub Stats`}
                loading="lazy"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 border border-slate-800/90 bg-slate-950/80 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-800 text-cyan-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Most Used Languages</h3>
                  <p className="text-xs text-slate-400">Repositories breakdown</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">Public Repos</span>
            </div>

            <div className="flex justify-center items-center overflow-hidden py-2 rounded-xl bg-slate-900/90 border border-slate-800/60 min-h-[165px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=090d16&title_color=38bdf8&text_color=94a3b8`}
                alt={`${username} Top Languages`}
                loading="lazy"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* GitHub Repos Quick Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl p-5 bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 hidden sm:block shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Explore Open Source Repositories</p>
              <p className="text-xs text-slate-400">View code repositories for LeadFlow CRM, PMS, and Payment Microservices.</p>
            </div>
          </div>
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors shadow-md shrink-0"
          >
            <GitFork className="w-3.5 h-3.5" />
            View Repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
}
