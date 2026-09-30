'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, Github, Linkedin, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '../types';
import { getResumeUrl } from '../lib/api';

export interface HeroSectionProps {
  profile: Profile;
  onOpenResumeModal?: () => void;
}

export default function HeroSection({ profile, onOpenResumeModal }: HeroSectionProps) {
  return (
    <section id="about" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          
          {/* Left Text Content */}
          <div className="flex-1 max-w-2xl text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5" />
              Open for Engineering Opportunities
            </motion.div>

            {/* Name & Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Hi, I'm <span className="bg-gradient-to-r from-brand-600 to-cyan-500 bg-clip-text text-transparent">{profile.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mt-3"
            >
              {profile.title}
            </motion.h2>

            {/* Location & Contact Meta */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-4"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                {profile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-500" />
                {profile.phone}
              </span>
            </motion.div>

            {/* Objective Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
            >
              "{profile.summary}"
            </motion.p>

            {/* Key Tech Highlights Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'MySQL', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  <CheckCircle2 className="w-3 h-3 text-brand-500" />
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Action CTAs & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="inline-flex items-center gap-1">
                <a
                  href={getResumeUrl(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </a>
                <a
                  href={getResumeUrl(true)}
                  title="Download PDF Resume"
                  aria-label="Download PDF Resume"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium text-sm transition-all duration-200 border border-slate-200 dark:border-slate-700"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                Get in Touch
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 ml-auto sm:ml-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/80 dark:border-slate-700/60"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/80 dark:border-slate-700/60"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column / Mobile Top: Circular Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="shrink-0 mb-4 md:mb-0"
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full p-1 bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-400 shadow-xl shadow-brand-500/20">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white dark:border-slate-950">
                <Image
                  src="/images/dheeraj-sisodiya.webp"
                  alt="Dheeraj Sisodiya, Java Full Stack Developer"
                  width={256}
                  height={256}
                  priority
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
