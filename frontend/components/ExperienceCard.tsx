'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Layers, CheckCircle } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const getTechBadgeStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('java') || t.includes('spring')) {
    return 'bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border-brand-200/60 dark:border-brand-800/50';
  }
  if (t.includes('react') || t.includes('js') || t.includes('frontend')) {
    return 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200/60 dark:border-cyan-800/50';
  }
  if (t.includes('microservice') || t.includes('stripe') || t.includes('api')) {
    return 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/50';
  }
  return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
};

export default function ExperienceCard({ experiences }: ExperienceSectionProps) {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    'LeadFlow CRM (Lead Management System)': true,
    'Stripe Payment Integration System': true,
  });

  const toggleProject = (projectName: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectName]: !prev[projectName],
    }));
  };

  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work & Internship Experience
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Hands-on development experience across Java, Spring Boot microservices, and React.js.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 md:pl-10 group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md ring-4 ring-white dark:ring-slate-950">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Card Container */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {exp.role}
                      <span className="text-brand-600 dark:text-brand-400 font-medium text-base">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-500" /> {exp.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold self-start sm:self-center">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                </div>

                {/* General Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sub-projects Section */}
                {exp.sub_projects && exp.sub_projects.length > 0 && (
                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-200/40 dark:border-slate-800/40">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-brand-500" /> Sub-Projects & Key Modules
                    </h4>

                    {exp.sub_projects.map((project) => {
                      const isExpanded = !!expandedProjects[project.name];
                      return (
                        <div
                          key={project.name}
                          className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleProject(project.name)}
                            className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                                {project.name}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {project.tech_stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getTechBadgeStyle(tech)}`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                            )}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 pb-4 border-t border-slate-200/40 dark:border-slate-800/40 pt-3"
                              >
                                <ul className="space-y-2">
                                  {project.highlights.map((highlight, hIdx) => (
                                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
