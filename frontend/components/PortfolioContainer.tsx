'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ExperienceCard from './ExperienceCard';
import EducationCard from './EducationCard';
import CertificationsGrid from './CertificationsGrid';
import AchievementsSection from './AchievementsSection';
import ContactForm from './ContactForm';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import CommandPalette from './CommandPalette';
import ResumeModal from './ResumeModal';
import GitHubActivitySection from './GitHubActivitySection';
import { getResumeUrl } from '../lib/api';
import {
  Profile,
  SkillsMap,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  AchievementItem
} from '../types';

interface PortfolioContainerProps {
  profile: Profile;
  skills: SkillsMap;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
}

export default function PortfolioContainer({
  profile,
  skills,
  experience,
  education,
  certifications,
  achievements
}: PortfolioContainerProps) {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      <main className="flex-1">
        <HeroSection
          profile={profile}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
        <SkillsSection skills={skills} />
        <ExperienceCard experiences={experience} />
        <GitHubActivitySection username="Dheeraj-dev-07" />
        <EducationCard education={education} />
        <CertificationsGrid certifications={certifications} />
        <AchievementsSection achievements={achievements} />
        <ContactForm profile={profile} />
      </main>

      <Footer profile={profile} />

      {/* Interactive Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* In-Page Resume Lightbox Preview Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumeUrl={getResumeUrl()}
      />
    </>
  );
}
