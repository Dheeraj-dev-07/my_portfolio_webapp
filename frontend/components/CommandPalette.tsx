'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, User, Code, Briefcase, GraduationCap, Award, Mail, FileText, Copy, Check } from 'lucide-react';
import { getResumeUrl } from '../lib/api';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : void 0;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'about', label: 'Go to About Me', icon: User, category: 'Navigation', href: '/#about' },
    { id: 'skills', label: 'Go to Technical Skills', icon: Code, category: 'Navigation', href: '/#skills' },
    { id: 'experience', label: 'Go to Experience', icon: Briefcase, category: 'Navigation', href: '/#experience' },
    { id: 'education', label: 'Go to Education', icon: GraduationCap, category: 'Navigation', href: '/#education' },
    { id: 'certifications', label: 'Go to Certifications', icon: Award, category: 'Navigation', href: '/#certifications' },
    { id: 'contact', label: 'Go to Contact Form', icon: Mail, category: 'Navigation', href: '/#contact' },
    { id: 'resume', label: 'Preview Resume (Modal)', icon: FileText, category: 'Actions', action: () => { onOpenResume(); onClose(); } },
    { id: 'email', label: 'Copy Email Address', icon: Copy, category: 'Actions', action: () => { navigator.clipboard.writeText('dheerajsisodiya.dev@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); } },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or section name..."
              className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
              autoFocus
            />
            {copied && (
              <span className="text-xs font-semibold text-emerald-500 mr-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Copied!
              </span>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                No matching command found.
              </div>
            ) : (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else if (item.href) {
                        window.location.href = item.href;
                        onClose();
                      }
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-500/10 text-slate-500 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 text-xs sm:text-sm font-semibold">{item.label}</span>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
