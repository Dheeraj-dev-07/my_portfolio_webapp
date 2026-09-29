'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, ShieldCheck, RotateCw } from 'lucide-react';
import { CertificationItem } from '../types';

interface CertificationsGridProps {
  certifications: CertificationItem[];
}

function CertificationFlipCard({ cert, index }: { cert: CertificationItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = () => setIsFlipped((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm flex-grow-0 flex-shrink-0 [perspective:1000px] group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleToggle}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={`Certificate: ${cert.title}. Click or hover to view details.`}
    >
      <motion.div
        animate={{
          rotateY: shouldReduceMotion ? 0 : isFlipped ? 180 : 0,
          opacity: shouldReduceMotion ? (isFlipped ? 0.9 : 1) : 1,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-56 rounded-2xl transition-all duration-300"
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between [backface-visibility:hidden] glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 shadow-md group-hover:shadow-xl group-hover:border-brand-500/50 transition-all"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
                <RotateCw className="w-3 h-3 text-brand-500" />
                Flip
              </span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              {cert.issuer}
            </span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
              {cert.title}
            </h3>
          </div>

          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Hover or tap to reveal</span>
            <span className="text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              View →
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between [backface-visibility:hidden] rounded-2xl bg-slate-900 text-white border border-brand-500/40 shadow-2xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                Verified Credential
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                {cert.issuer}
              </span>
            </div>
            <h4 className="font-bold text-sm text-white mt-1 line-clamp-2">
              {cert.title}
            </h4>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Official certification issued by <strong className="text-brand-400 font-semibold">{cert.issuer}</strong> confirming expertise in modern software engineering principles.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors shadow-lg"
            >
              View Certificate
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsGrid({ certifications }: CertificationsGridProps) {
  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certifications & Training
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Professional certifications, completion letters, and recognized credentials. Flip a card to view credential details.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 items-stretch">
          {certifications.map((cert, index) => (
            <CertificationFlipCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

