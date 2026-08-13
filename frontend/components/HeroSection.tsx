'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, Phone, MapPin, Sparkles, CheckCircle2, Eye, ChevronDown, Code2, Server } from 'lucide-react';
import { Profile } from '../types';
import { getResumeUrl } from '../lib/api';

interface HeroSectionProps {
  profile: Profile;
  onOpenResumeModal?: () => void;
}

const TYPING_ROLES = [
  'Java Full Stack Developer',
  'Spring Boot Microservices Engineer',
  'REST API & Database Specialist',
  'React.js & Next.js Developer',
];

export default function HeroSection({ profile, onOpenResumeModal }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect loop
  useEffect(() => {
    const currentRole = TYPING_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="about" className="relative pt-6 pb-8 md:pt-12 md:pb-12 overflow-hidden">
      {/* Glow background accents & grid pattern */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-500/15 dark:bg-brand-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Subtle Background SVG Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column — Text & Bio */}
          <div className="lg:col-span-7">
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

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            >
              Hi, I'm <span className="bg-gradient-to-r from-brand-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">{profile.name}</span>
            </motion.h1>

            {/* Dynamic Typewriter Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 mt-3 flex items-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400 font-mono">
                {displayedText}
                <span className="animate-pulse text-cyan-500">|</span>
              </h2>
            </motion.div>

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
              {['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'MySQL', 'React.js', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Action CTAs & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href={getResumeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>

              {onOpenResumeModal && (
                <button
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium text-sm transition-all duration-200 border border-slate-200 dark:border-slate-700"
                >
                  <Eye className="w-4 h-4 text-brand-500" />
                  Preview Resume
                </button>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium text-sm transition-all duration-200 border border-slate-200 dark:border-slate-700"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                Get in Touch
              </a>

              {/* Social Links */}
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

          {/* Right Column — Headshot Portrait & Floating Stat Cards */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end my-6 lg:my-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group p-6 sm:p-8"
            >
              {/* Gradient Glowing Ring Frame */}
              <div className="absolute inset-4 bg-gradient-to-r from-brand-500 via-cyan-500 to-indigo-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 group-hover:scale-105" />

              {/* Tight Circular Image Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 shrink-0">
                <Image
                  src="/profile.jpg"
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Stat Card 1 — Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-2 -right-3 sm:-right-8 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xl z-20"
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Microservices</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">Production Ready</p>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 — Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-8 -left-3 sm:-left-8 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xl z-20"
              >
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Stack</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">Spring + React</p>
                </div>
              </motion.div>

              {/* Floating Badge 3 — Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -bottom-2 right-0 sm:right-2 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-bold shadow-2xl z-20 border border-brand-400/40 backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                Java & Spring Specialist
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Animated "Scroll to Explore" Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#skills"
            className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-brand-500 transition-colors group"
          >
            <span>Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-brand-500 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
