'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cpu, Wrench, ShieldCheck, HeartHandshake, Layers, Lightbulb, Monitor } from 'lucide-react';
import { SkillsMap } from '../types';

interface SkillsSectionProps {
  skills: SkillsMap;
}

const CATEGORY_ICONS: Record<string, any> = {
  "Frontend": Monitor,
  "Backend": Code,
  "DevOps": Cpu,
  "Tools": Wrench,
  "Concepts": Lightbulb,
  "Soft Skills": HeartHandshake,
  "Languages & Frameworks": Code,
  "Architecture": Layers,
  "Data": Database,
  "Practices": ShieldCheck,
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Object.keys(skills);
  const [activeTab, setActiveTab] = useState<string>('All');

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical & Soft Skills
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Categorized technical stack, frameworks, tools, and methodologies.
          </p>

          {/* Dynamic Category Filter Tabs */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .filter((cat) => activeTab === 'All' || activeTab === cat)
            .map((category, index) => {
              const Icon = CATEGORY_ICONS[category] || Code;
              const skillItems = skills[category] || [];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-brand-500/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
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
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
