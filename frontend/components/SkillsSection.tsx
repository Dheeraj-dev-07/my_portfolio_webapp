'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Wrench, ShieldCheck, HeartHandshake, Layers } from 'lucide-react';
import { SkillsMap } from '../types';

interface SkillsSectionProps {
  skills: SkillsMap;
}

const CATEGORY_STYLES: Record<string, { icon: any; color: string; badge: string }> = {
  "Languages & Frameworks": {
    icon: Code,
    color: "bg-brand-500/10 text-brand-600 dark:text-brand-400",
    badge: "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border-brand-200/60 dark:border-brand-800/40 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white",
  },
  "Architecture": {
    icon: Layers,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200/60 dark:border-cyan-800/40 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 dark:hover:text-white",
  },
  "Data": {
    icon: Database,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white",
  },
  "DevOps & Cloud": {
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    badge: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/40 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white",
  },
  "Tools": {
    icon: Wrench,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white",
  },
  "Practices": {
    icon: ShieldCheck,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/40 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white",
  },
  "Soft Skills": {
    icon: HeartHandshake,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    badge: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white",
  },
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Object.keys(skills);
  const [activeTab, setActiveTab] = useState<string>('All');

  return (
    <section id="skills" className="py-10 md:py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical & Soft Skills
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Categorized technical stack, frameworks, tools, and methodologies.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'All'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Skills
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories
            .filter((cat) => activeTab === 'All' || activeTab === cat)
            .map((category, index) => {
              const categoryConfig = CATEGORY_STYLES[category] || {
                icon: Code,
                color: "bg-brand-500/10 text-brand-600 dark:text-brand-400",
                badge: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
              };
              const Icon = categoryConfig.icon;
              const skillItems = skills[category] || [];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${categoryConfig.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skillItems.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-default ${categoryConfig.badge}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {category === "DevOps & Cloud" && (
                      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          CI/CD: Pipeline Passing
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold border border-blue-500/20">
                          Docker & Pytest Verified
                        </span>
                      </div>
                    )}

                    {category === "Architecture" && (
                      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/docs`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors"
                        >
                          <span>Explore Swagger API Specs</span>
                          <span>→</span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
