'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, ExternalLink } from 'lucide-react';
import { AchievementItem } from '../types';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            Achievements & Leadership
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 shrink-0 self-start sm:self-center mt-2 sm:mt-0"
                >
                  View Certificate
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
